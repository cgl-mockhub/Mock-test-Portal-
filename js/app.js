let syllabusData = {};
let activeSubject = "";
let allTopicQuestions = [];
let activeQuestions = [];
let currentIndex = 0;
let userAnswers = {};
let timerInterval = null;
let secondsElapsed = 0;

// 1. Load Master Syllabus on Startup
async function initPortal() {
  try {
    const res = await fetch("data/syllabus.json");
    syllabusData = await res.json();
    const subjects = Object.keys(syllabusData);
    renderSubjectTabs(subjects);
    if (subjects.length > 0) selectSubject(subjects[0]);
  } catch (err) {
    document.getElementById("chapters-container").innerHTML =
      `<div class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm">
        Could not load <strong>data/syllabus.json</strong>. Make sure it is saved in your <code>data</code> folder.
      </div>`;
  }
}

function renderSubjectTabs(subjects) {
  const tabsDiv = document.getElementById("subject-tabs");
  tabsDiv.innerHTML = subjects
    .map(
      (subj) => `
      <button type="button" id="tab-${subj}" onclick="selectSubject('${subj}')"
        class="tab-btn px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs sm:text-sm transition shadow-2xs">
        ${subj}
      </button>`
    )
    .join("");
}

function selectSubject(subject) {
  activeSubject = subject;
  document.querySelectorAll(".tab-btn").forEach((b) => {
    b.className = "tab-btn px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs sm:text-sm transition shadow-2xs hover:border-sky-400";
  });
  const activeBtn = document.getElementById(`tab-${subject}`);
  if (activeBtn) {
    activeBtn.className = "tab-btn px-4 py-2.5 rounded-xl border border-sky-600 bg-sky-600 text-white font-bold text-xs sm:text-sm transition shadow-xs";
  }

  const container = document.getElementById("chapters-container");
  const subjectObj = syllabusData[subject];

  if (subjectObj.hasSubChapters) {
    container.innerHTML = subjectObj.sections
      .map(
        (sec) => `
        <div class="space-y-3">
          <h2 class="text-base sm:text-lg font-extrabold text-slate-900 border-b border-slate-200 pb-2">
            ${sec.sectionName}
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${sec.chapters.map((ch) => buildChapterCard(ch)).join("")}
          </div>
        </div>`
      )
      .join("");
  } else {
    container.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${subjectObj.topics.map((topic) => buildChapterCard(topic)).join("")}
      </div>`;
  }
}

function buildChapterCard(item) {
  const subInfo = item.subtopics
    ? `<p class="text-[11px] text-slate-500 mt-1.5 line-clamp-2">Topics: ${item.subtopics.join(", ")}</p>`
    : "";

  const actionArea = item.ready
    ? `<button type="button" onclick="startTest('${item.name.replace(/'/g, "\\'")}', '${item.file}')"
        class="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm py-2.5 rounded-xl transition flex items-center justify-center gap-2">
        <i class="fa-solid fa-play text-xs"></i><span>Start Practice</span>
      </button>`
    : `<div class="w-full bg-slate-100 text-slate-400 font-semibold text-xs py-2.5 rounded-xl text-center">
        <i class="fa-regular fa-clock mr-1"></i>Questions Coming Soon
      </div>`;

  return `
    <div class="bg-white rounded-2xl border ${item.ready ? "border-slate-200 hover:border-sky-400" : "border-slate-200/80 opacity-85"} p-4 sm:p-5 flex flex-col justify-between gap-4 shadow-2xs transition">
      <div>
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${item.ready ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"}">
            ${item.ready ? "Active" : "Upcoming"}
          </span>
        </div>
        <h3 class="font-extrabold text-sm sm:text-base text-slate-900">${item.name}</h3>
        ${subInfo}
      </div>
      ${actionArea}
    </div>`;
}

// 2. Load Single Topic JSON File & Start Test
async function startTest(title, filePath) {
  try {
    const res = await fetch(filePath);
    if (!res.ok) throw new Error("File not found");
    allTopicQuestions = await res.json();
    if (!allTopicQuestions || allTopicQuestions.length === 0) {
      alert("No questions uploaded in this file yet!");
      return;
    }

    document.getElementById("test-title").textContent = title;
    setupSubtopicBar(allTopicQuestions);

    activeQuestions = [...allTopicQuestions];
    resetTestState();

    document.getElementById("view-home").classList.add("hidden");
    document.getElementById("view-result").classList.add("hidden");
    document.getElementById("view-test").classList.remove("hidden");
  } catch (err) {
    alert("Could not open question file: " + filePath);
  }
}

function setupSubtopicBar(questions) {
  const uniqueSubs = [...new Set(questions.map((q) => q.subtopic).filter((s) => s && s !== "General"))];
  const bar = document.getElementById("subtopic-bar");

  if (uniqueSubs.length > 1) {
    bar.innerHTML =
      `<span class="text-[11px] font-bold text-slate-400 uppercase shrink-0 mr-1">Topic:</span>` +
      `<button type="button" onclick="filterBySubtopic('ALL', this)" class="sub-chip px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 bg-sky-600 text-white">All (${questions.length})</button>` +
      uniqueSubs
        .map((s) => {
          const count = questions.filter((q) => q.subtopic === s).length;
          return `<button type="button" onclick="filterBySubtopic('${s.replace(/'/g, "\\'")}', this)" class="sub-chip px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 bg-slate-100 text-slate-700 hover:bg-slate-200">${s} (${count})</button>`;
        })
        .join("");
    bar.classList.remove("hidden");
  } else {
    bar.classList.add("hidden");
  }
}

function filterBySubtopic(chosen, btnEl) {
  document.querySelectorAll(".sub-chip").forEach((b) => {
    b.className = "sub-chip px-2.5 py-1 rounded-lg text-
