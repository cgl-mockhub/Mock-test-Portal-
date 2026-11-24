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
  const safeName = encodeURIComponent(item.name);
  const subInfo = item.subtopics
    ? `<p class="text-[11px] text-slate-500 mt-1.5 line-clamp-2">Topics: ${item.subtopics.join(", ")}</p>`
    : "";

  const actionArea = item.ready
    ? `<button type="button" onclick="startTest(decodeURIComponent('${safeName}'), '${item.file}')"
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
          const safeSub = encodeURIComponent(s);
          return `<button type="button" onclick="filterBySubtopic(decodeURIComponent('${safeSub}'), this)" class="sub-chip px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 bg-slate-100 text-slate-700 hover:bg-slate-200">${s} (${count})</button>`;
        })
        .join("");
    bar.classList.remove("hidden");
  } else {
    bar.classList.add("hidden");
  }
}

function filterBySubtopic(chosen, btnEl) {
  document.querySelectorAll(".sub-chip").forEach((b) => {
    b.className = "sub-chip px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 bg-slate-100 text-slate-700 hover:bg-slate-200";
  });
  if (btnEl) {
    btnEl.className = "sub-chip px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 bg-sky-600 text-white";
  }

  activeQuestions =
    chosen === "ALL"
      ? [...allTopicQuestions]
      : allTopicQuestions.filter((q) => q.subtopic === chosen);
  resetTestState();
}

function resetTestState() {
  currentIndex = 0;
  userAnswers = {};
  clearInterval(timerInterval);
  secondsElapsed = 0;
  document.getElementById("timer-display").textContent = "00:00";

  timerInterval = setInterval(() => {
    secondsElapsed++;
    const mins = String(Math.floor(secondsElapsed / 60)).padStart(2, "0");
    const secs = String(secondsElapsed % 60).padStart(2, "0");
    document.getElementById("timer-display").textContent = `${mins}:${secs}`;
  }, 1000);

  renderQuestion();
}

// 3. Render Current Question, Options & Instant English Solution
function renderQuestion() {
  const q = activeQuestions[currentIndex];
  const isEnglishInstant = activeSubject === "English";
  const chosen = userAnswers[currentIndex];
  const hasAnswered = chosen !== undefined;

  document.getElementById("q-curr").textContent = currentIndex + 1;
  document.getElementById("q-total").textContent = activeQuestions.length;
  document.getElementById("q-badge").textContent = q.subtopic || "General";
  document.getElementById("q-text").textContent = q.question;

  const optionsList = document.getElementById("options-list");
  let optionsHTML = q.options
    .map((opt, idx) => {
      let cardClass = "border-slate-200 bg-white hover:border-sky-400";
      let badgeClass = "bg-slate-100 text-slate-700 border-slate-300";
      let iconHTML = "";

      if (isEnglishInstant && hasAnswered) {
        if (idx === q.answer) {
          cardClass = "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500";
          badgeClass = "bg-emerald-600 text-white border-emerald-600";
          iconHTML = `<span class="ml-auto text-xs font-extrabold text-emerald-700">✓ Correct</span>`;
        } else if (idx === chosen) {
          cardClass = "border-red-500 bg-red-50 ring-1 ring-red-500";
          badgeClass = "bg-red-600 text-white border-red-600";
          iconHTML = `<span class="ml-auto text-xs font-extrabold text-red-700">✕ Your Choice</span>`;
        } else {
          cardClass = "border-slate-200 bg-slate-50 opacity-70";
        }
      } else if (chosen === idx) {
        cardClass = "border-sky-500 bg-sky-50 ring-1 ring-sky-500";
        badgeClass = "bg-sky-600 text-white border-sky-600";
      }

      const disabledAttr = isEnglishInstant && hasAnswered ? "disabled" : "";

      return `
        <button type="button" ${disabledAttr} onclick="selectOption(${idx})"
          class="w-full text-left p-3.5 rounded-xl border-2 transition flex items-center gap-3 ${cardClass}">
          <span class="w-8 h-8 rounded-lg border flex items-center justify-center font-extrabold text-xs shrink-0 ${badgeClass}">
            ${String.fromCharCode(65 + idx)}
          </span>
          <span class="text-sm sm:text-base font-medium text-slate-800">${opt}</span>
          ${iconHTML}
        </button>`;
    })
    .join("");

  // Instant 4-Point Solution Box for English
  if (isEnglishInstant && hasAnswered) {
    const correctLetter = String.fromCharCode(65 + q.answer);
    const ruleText = q.rule || q.explanation || "No rule provided.";
    const distractorText = q.distractor || "Review the other options carefully to avoid trap choices.";
    const shortcutText = q.shortcut || "Look for key tense/subject clues in the sentence.";

    optionsHTML += `
      <div class="mt-5 bg-slate-50 border-2 border-sky-200 rounded-2xl p-4 sm:p-5 space-y-3 text-xs sm:text-sm">
        <div class="flex items-center justify-between border-b border-slate-200 pb-2">
          <span class="font-extrabold text-sky-900 text-sm"><i class="fa-solid fa-lightbulb text-amber-500 mr-1.5"></i>Instant Exam Breakdown</span>
          <span class="bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-md">Correct: (${correctLetter}) ${q.options[q.answer]}</span>
        </div>
        <div>
          <p class="font-bold text-slate-900">1. Grammar Rule / Vocabulary Nuance:</p>
          <p class="text-slate-700 mt-0.5">${ruleText}</p>
        </div>
        <div class="bg-amber-50/80 border-l-4 border-amber-500 p-2.5 rounded-r-lg">
          <p class="font-bold text-amber-900">2. The 'Distractor' (Common Trap):</p>
          <p class="text-amber-950 mt-0.5">${distractorText}</p>
        </div>
        <div class="bg-sky-50 border-l-4 border-sky-600 p-2.5 rounded-r-lg">
          <p class="font-bold text-sky-900">3. 10-Second Exam Shortcut / Keyword:</p>
          <p class="text-sky-950 mt-0.5">${shortcutText}</p>
        </div>
      </div>`;
  }

  optionsList.innerHTML = optionsHTML;
  renderPalette();
}

function selectOption(optIdx) {
  if (activeSubject === "English" && userAnswers[currentIndex] !== undefined) return;
  userAnswers[currentIndex] = optIdx;
  renderQuestion();
}

function clearResponse() {
  delete userAnswers[currentIndex];
  renderQuestion();
}

function nextQuestion() {
  if (currentIndex < activeQuestions.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    submitTest();
  }
}

function prevQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
  }
}

function jumpToQuestion(idx) {
  currentIndex = idx;
  renderQuestion();
}

function renderPalette() {
  const answeredCount = Object.keys(userAnswers).length;
  document.getElementById("palette-stats").textContent = `${answeredCount}/${activeQuestions.length} Answered`;

  const pal = document.getElementById("palette-grid");
  pal.innerHTML = activeQuestions
    .map((_, idx) => {
      const isAnswered = userAnswers[idx] !== undefined;
      const isCurrent = idx === currentIndex;
      let btnClass = "bg-slate-100 text-slate-700 border-slate-300";
      if (isAnswered) btnClass = "bg-emerald-600 text-white border-emerald-700";
      if (isCurrent) btnClass += " ring-2 ring-offset-1 ring-sky-600 font-extrabold";

      return `<button type="button" onclick="jumpToQuestion(${idx})" class="h-9 rounded-lg border text-xs font-bold transition ${btnClass}">${idx + 1}</button>`;
    })
    .join("");
}

// 4. Submit & Show Full Summary
function submitTest() {
  clearInterval(timerInterval);
  let correct = 0;
  let wrong = 0;
  let skipped = 0;

  const solutionsHTML = activeQuestions
    .map((q, idx) => {
      const chosen = userAnswers[idx];
      let badgeHTML = `<span class="text-xs font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">Skipped</span>`;

      if (chosen === undefined) {
        skipped++;
      } else if (chosen === q.answer) {
        correct++;
        badgeHTML = `<span class="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">✓ Correct (+2.0)</span>`;
      } else {
        wrong++;
        badgeHTML = `<span class="text-xs font-bold bg-red-100 text-red-800 px-2.5 py-1 rounded-full">✕ Wrong (-0.50)</span>`;
      }

      const yourAnsText = chosen !== undefined ? q.options[chosen] : "Not Attempted";
      const extraDetails = q.rule
        ? `<p class="mt-1"><strong>Rule:</strong> ${q.rule}</p>
           <p class="mt-1"><strong>Distractor Trap:</strong> ${q.distractor || ""}</p>
           <p class="mt-1"><strong>10-Sec Shortcut:</strong> ${q.shortcut || ""}</p>`
        : `<p><strong>Explanation:</strong> ${q.explanation || "No explanation provided."}</p>`;

      return `
        <div class="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-2.5">
          <div class="flex items-center justify-between gap-2">
            <span class="text-xs font-extrabold text-sky-700">Question ${idx + 1}</span>
            ${badgeHTML}
          </div>
          <p class="text-sm sm:text-base font-semibold text-slate-900 whitespace-pre-line">${q.question}</p>
          <div class="text-xs sm:text-sm space-y-1 pt-1">
            <p><strong class="text-emerald-700">Correct Answer:</strong> ${q.options[q.answer]}</p>
            <p><strong class="text-slate-600">Your Answer:</strong> ${yourAnsText}</p>
          </div>
          <div class="bg-sky-50/80 border-l-4 border-sky-600 p-3 rounded-r-xl text-xs sm:text-sm text-slate-700">
            ${extraDetails}
          </div>
        </div>`;
    })
    .join("");

  const netScore = (correct * 2.0 - wrong * 0.5).toFixed(2);
  document.getElementById("res-score").textContent = netScore;
  document.getElementById("res-correct").textContent = correct;
  document.getElementById("res-wrong").textContent = wrong;
  document.getElementById("res-skipped").textContent = skipped;
  document.getElementById("solutions-list").innerHTML = solutionsHTML;

  document.getElementById("view-test").classList.add("hidden");
  document.getElementById("view-result").classList.remove("hidden");
}

function showHome() {
  clearInterval(timerInterval);
  document.getElementById("view-test").classList.add("hidden");
  document.getElementById("view-result").classList.add("hidden");
  document.getElementById("view-home").classList.remove("hidden");
}

window.addEventListener("DOMContentLoaded", initPortal);
