// js/app.js
const STORAGE_KEY = 'ssc_cgl_portal_progress_v1';

let currentSubject = 'english';
let currentChapter = chaptersData[0];
let activeQuestions = pronounQuestions;
let currentQuestionIndex = 0;
let isSidePanelVisible = window.innerWidth >= 768; // Open on tablet/desktop, clean on small phones
let isFullScreenMode = false;
let chapterProgressStore = loadProgressFromStorage();

function loadProgressFromStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch (err) {
        return {};
    }
}

function saveProgressToStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(chapterProgressStore));
    } catch (err) {
        // Ignore storage quota errors in private browsing
    }
}

function getChapterState(chapterId, totalCount) {
    if (!chapterProgressStore[chapterId] || chapterProgressStore[chapterId].userAnswers.length !== totalCount) {
        chapterProgressStore[chapterId] = {
            userAnswers: new Array(totalCount).fill(null),
            markedForReview: new Array(totalCount).fill(false),
            visited: new Array(totalCount).fill(false)
        };
        saveProgressToStorage();
    }
    return chapterProgressStore[chapterId];
}

function getChapterSubject(chapter) {
    return chapter.subject || 'english';
}

function getSubjectHeading(subject) {
    if (subject === 'gs') return 'General Awareness Chapters';
    if (subject === 'quant') return 'Quantitative Aptitude Chapters';
    if (subject === 'reasoning') return 'Reasoning Chapters';
    return 'English Language Chapters';
}

function navigateTo(viewName, subjectName) {
    const viewHome = document.getElementById('view-home');
    const viewChapters = document.getElementById('view-chapters');
    const viewQuiz = document.getElementById('view-quiz');
    const portalNavbar = document.getElementById('portal-navbar');

    if (subjectName) {
        currentSubject = subjectName;
    }

    viewHome.classList.add('hidden');
    viewChapters.classList.add('hidden');
    viewQuiz.classList.add('hidden');

    if (viewName === 'home') {
        if (isFullScreenMode) exitFullScreenSilently();
        portalNavbar.classList.remove('hidden');
        viewHome.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'chapters') {
        if (isFullScreenMode) exitFullScreenSilently();
        portalNavbar.classList.remove('hidden');
        renderChaptersGrid(currentSubject);
        viewChapters.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'quiz') {
        portalNavbar.classList.add('hidden');
        viewQuiz.classList.remove('hidden');
    }
}

function renderChaptersGrid(subjectName = currentSubject) {
    currentSubject = subjectName;
    const grid = document.getElementById('chapters-grid');
    const heading = document.getElementById('chapters-heading');
    if (heading) {
        heading.textContent = getSubjectHeading(currentSubject);
    }

    grid.innerHTML = '';

    const filteredChapters = chaptersData.filter(ch => getChapterSubject(ch) === currentSubject);

    if (filteredChapters.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full bg-white rounded-2xl border border-slate-200 p-6 text-center text-sm text-slate-500">
                No chapters added for this subject yet.
            </div>
        `;
        return;
    }

    filteredChapters.forEach((chapter) => {
        const total = chapter.questions.length;
        const state = total > 0 ? getChapterState(chapter.id, total) : null;
        const attempted = state ? state.userAnswers.filter(a => a !== null).length : 0;
        const pct = total > 0 ? Math.round((attempted / total) * 100) : 0;

        const card = document.createElement('div');
        card.className = `card-hover bg-white rounded-2xl border ${chapter.active ? 'border-slate-200 hover:border-sky-400 cursor-pointer' : 'border-slate-200 opacity-85 cursor-pointer'} p-5 sm:p-6 flex flex-col justify-between shadow-2xs touch-manipulation`;

        card.onclick = () => {
            if (chapter.active && total > 0) {
                startChapterQuiz(chapter.id);
            } else {
                showToast(`"${chapter.title}" is coming soon! Try an active chapter to practice.`);
            }
        };

        card.innerHTML = `
            <div>
                <div class="flex items-center justify-between gap-2 mb-3">
                    <span class="text-[11px] font-bold px-2.5 py-1 rounded-full ${chapter.tagColor}">${chapter.tag}</span>
                    ${chapter.active ? `<span class="text-xs font-bold text-slate-500">${attempted}/${total} Done</span>` : ''}
                </div>
                <h3 class="font-extrabold text-lg text-slate-900">${chapter.title}</h3>
                <p class="text-xs font-semibold text-sky-600 mt-0.5">${chapter.subtitle}</p>
                <p class="text-xs text-slate-500 mt-2.5 leading-relaxed">${chapter.description}</p>
            </div>

            <div class="mt-5 pt-4 border-t border-slate-100">
                ${chapter.active ? `
                    <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-3">
                        <div class="bg-emerald-500 h-full transition-all duration-300" style="width: ${pct}%"></div>
                    </div>
                    <button type="button" class="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm py-3 rounded-xl transition flex items-center justify-center space-x-2">
                        <i class="fa-solid fa-play text-xs"></i>
                        <span>${attempted > 0 ? 'Resume CBT Practice' : 'Start CBT Practice'}</span>
                    </button>
                ` : `
                    <button type="button" class="w-full bg-slate-100 text-slate-500 font-semibold text-xs sm:text-sm py-3 rounded-xl">
                        <i class="fa-solid fa-lock mr-1.5"></i>Coming Soon
                    </button>
                `}
            </div>
        `;
        grid.appendChild(card);
    });
}

function startChapterQuiz(chapterId) {
    const found = chaptersData.find(c => c.id === chapterId);
    if (!found || found.questions.length === 0) return;

    currentChapter = found;
    activeQuestions = found.questions;

    const state = getChapterState(currentChapter.id, activeQuestions.length);
    const firstUnanswered = state.userAnswers.findIndex(a => a === null);
    currentQuestionIndex = firstUnanswered > 0 ? firstUnanswered : 0;
    state.visited[currentQuestionIndex] = true;
    saveProgressToStorage();

    document.getElementById('quiz-breadcrumb-chapter').textContent = `${currentChapter.title} (${activeQuestions.length} Qs)`;
    document.getElementById('quiz-mobile-title').textContent = `${currentChapter.title} (${activeQuestions.length})`;
    document.getElementById('total-q-num').textContent = activeQuestions.length;
    document.getElementById('fs-q-total').textContent = activeQuestions.length;
    document.getElementById('palette-count-label').textContent = `1 – ${activeQuestions.length}`;

    applySidePanelState();
    navigateTo('quiz');
    renderCurrentQuestion();
    updateStatsAndPalette();
}

function renderCurrentQuestion() {
    const q = activeQuestions[currentQuestionIndex];
    const state = getChapterState(currentChapter.id, activeQuestions.length);
    state.visited[currentQuestionIndex] = true;
    saveProgressToStorage();

    const userAnswer = state.userAnswers[currentQuestionIndex];
    const isMarked = state.markedForReview[currentQuestionIndex];
    const isAnswered = userAnswer !== null;

    document.getElementById('curr-q-num').textContent = currentQuestionIndex + 1;
    document.getElementById('fs-q-curr').textContent = currentQuestionIndex + 1;
    document.getElementById('q-type-badge').textContent = q.type;
    document.getElementById('btn-prev').disabled = currentQuestionIndex === 0;

    const saveNextLabel = document.getElementById('btn-save-next-label');
    saveNextLabel.textContent = currentQuestionIndex === activeQuestions.length - 1
        ? 'Scorecard'
        : (isAnswered ? 'Next' : 'Save & Next');

    let optionsHTML = '';
    Object.entries(q.options).forEach(([key, text]) => {
        let cardClasses = 'border-slate-200 bg-white hover:border-sky-400 active:bg-sky-50 cursor-pointer';
        let badgeClasses = 'bg-slate-100 text-slate-700 border-slate-300';
        let statusIcon = '';

        if (isAnswered) {
            cardClasses = 'border-slate-200 bg-slate-50/70 opacity-85 cursor-default';
            if (key === q.correctOption) {
                cardClasses = 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500 cursor-default';
                badgeClasses = 'bg-emerald-600 text-white border-emerald-600';
                statusIcon = '<span class="ml-auto text-[11px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">✓ Right</span>';
            } else if (key === userAnswer && userAnswer !== q.correctOption) {
                cardClasses = 'border-red-500 bg-red-50 ring-1 ring-red-500 cursor-default';
                badgeClasses = 'bg-red-600 text-white border-red-600';
                statusIcon = '<span class="ml-auto text-[11px] font-extrabold text-red-700 bg-red-100 px-2 py-0.5 rounded-full shrink-0">✕ Wrong</span>';
            }
        }

        optionsHTML += `
            <button type="button" onclick="selectOption('${key}')" ${isAnswered ? 'disabled' : ''}
                class="w-full text-left p-3.5 sm:p-4 rounded-xl border-2 transition flex items-center gap-3 touch-manipulation ${cardClasses}">
                <span class="w-8 h-8 rounded-lg border flex items-center justify-center font-extrabold text-xs sm:text-sm uppercase shrink-0 ${badgeClasses}">
                    ${key}
                </span>
                <span class="text-sm sm:text-base font-medium text-slate-800 leading-snug question-wrap">${text}</span>
                ${statusIcon}
            </button>
        `;
    });

    let solutionHTML = '';
    if (isAnswered) {
        const isUserRight = userAnswer === q.correctOption;
        const bannerBg = isUserRight ? 'bg-emerald-600' : 'bg-red-600';
        const bannerTitle = isUserRight
            ? `Correct (+2.0) — (${q.correctOption.toUpperCase()})`
            : `Incorrect (-0.50) — You: (${userAnswer.toUpperCase()}), Ans: (${q.correctOption.toUpperCase()})`;

        solutionHTML = `
            <div class="mt-5 rounded-2xl border-2 ${isUserRight ? 'border-emerald-200' : 'border-amber-200'} bg-white shadow-xs overflow-hidden">
                <div class="${bannerBg} text-white px-4 py-2.5 flex items-center justify-between gap-2">
                    <span class="font-extrabold text-xs sm:text-sm">${bannerTitle}</span>
                    <span class="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full shrink-0">4-Part Key</span>
                </div>
                <div class="p-4 space-y-3 text-xs sm:text-sm">
                    <div class="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3">
                        <div class="text-[11px] font-extrabold text-emerald-800 uppercase mb-1">1. Corrected Sentence</div>
                        <p class="font-semibold text-slate-900 leading-relaxed question-wrap">${q.correctedSentence}</p>
                    </div>
                    <div class="bg-sky-50/80 border border-sky-200 rounded-xl p-3">
                        <div class="text-[11px] font-extrabold text-sky-800 uppercase mb-1">2. Grammar Rule</div>
                        <p class="text-slate-700 leading-relaxed question-wrap">${q.rule}</p>
                    </div>
                    <div class="bg-rose-50/80 border border-rose-200 rounded-xl p-3">
                        <div class="text-[11px] font-extrabold text-rose-800 uppercase mb-1">3. Common Distractor</div>
                        <p class="text-slate-700 leading-relaxed question-wrap">${q.distractor}</p>
                    </div>
                    <div class="bg-amber-50 border border-amber-300 rounded-xl p-3">
                        <div class="text-[11px] font-extrabold text-amber-900 uppercase mb-1">4. 10-Second Exam Shortcut</div>
                        <p class="font-bold text-slate-900 leading-relaxed question-wrap">${q.shortcut}</p>
                    </div>
                </div>
            </div>
        `;
    }

    document.getElementById('single-question-container').innerHTML = `
        <div class="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-7">
            <div class="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    ${currentChapter.title} • Q.${currentQuestionIndex + 1}
                </span>
                <button type="button" onclick="toggleMarkCurrent()" class="text-xs font-bold px-3 py-1.5 rounded-lg border transition flex items-center gap-1.5 touch-manipulation ${isMarked ? 'bg-purple-600 text-white border-purple-600' : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'}">
                    <i class="fa-solid fa-bookmark"></i>
                    <span>${isMarked ? 'Marked' : 'Mark'}</span>
                </button>
            </div>
            <div class="question-box mb-5">
                <p class="question-text text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">${q.prompt}</p>
            </div>
            <div class="space-y-2.5 sm:space-y-3">${optionsHTML}</div>
            ${solutionHTML}
        </div>
    `;

    const scrollArea = document.getElementById('question-scroll-area');
    if (scrollArea) scrollArea.scrollTop = 0;
}

function selectOption(optionKey) {
    const state = getChapterState(currentChapter.id, activeQuestions.length);
    if (state.userAnswers[currentQuestionIndex] !== null) return;
    state.userAnswers[currentQuestionIndex] = optionKey;
    saveProgressToStorage();
    renderCurrentQuestion();
    updateStatsAndPalette();
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderCurrentQuestion();
        updateStatsAndPalette();
    }
}

function saveAndNext() {
    if (currentQuestionIndex < activeQuestions.length - 1) {
        currentQuestionIndex++;
        renderCurrentQuestion();
        updateStatsAndPalette();
    } else {
        openSummaryModal();
    }
}

function markForReviewAndNext() {
    const state = getChapterState(currentChapter.id, activeQuestions.length);
    state.markedForReview[currentQuestionIndex] = true;
    saveProgressToStorage();
    if (currentQuestionIndex < activeQuestions.length - 1) {
        currentQuestionIndex++;
    } else {
        showToast('Marked the final question for review!');
    }
    renderCurrentQuestion();
    updateStatsAndPalette();
}

function toggleMarkCurrent() {
    const state = getChapterState(currentChapter.id, activeQuestions.length);
    state.markedForReview[currentQuestionIndex] = !state.markedForReview[currentQuestionIndex];
    saveProgressToStorage();
    renderCurrentQuestion();
    updateStatsAndPalette();
}

function clearCurrentResponse() {
    const state = getChapterState(currentChapter.id, activeQuestions.length);
    if (state.userAnswers[currentQuestionIndex] === null && !state.markedForReview[currentQuestionIndex]) {
        showToast('Nothing to clear on this question.');
        return;
    }
    state.userAnswers[currentQuestionIndex] = null;
    state.markedForReview[currentQuestionIndex] = false;
    saveProgressToStorage();
    renderCurrentQuestion();
    updateStatsAndPalette();
    showToast(`Cleared Question ${currentQuestionIndex + 1}.`);
}

function jumpToQuestion(index) {
    if (index >= 0 && index < activeQuestions.length) {
        currentQuestionIndex = index;
        if (window.innerWidth < 768 && isSidePanelVisible) {
            isSidePanelVisible = false;
            applySidePanelState();
        }
        renderCurrentQuestion();
        updateStatsAndPalette();
    }
}

function resetEntireChapter() {
    chapterProgressStore[currentChapter.id] = {
        userAnswers: new Array(activeQuestions.length).fill(null),
        markedForReview: new Array(activeQuestions.length).fill(false),
        visited: new Array(activeQuestions.length).fill(false)
    };
    saveProgressToStorage();
    currentQuestionIndex = 0;
    renderCurrentQuestion();
    updateStatsAndPalette();
    showToast(`Reset progress for ${currentChapter.title}.`);
}

function updateStatsAndPalette() {
    const total = activeQuestions.length;
    const state = getChapterState(currentChapter.id, total);

    let correctCount = 0;
    let incorrectCount = 0;
    let markedCount = 0;
    let visitedCount = 0;

    activeQuestions.forEach((q, idx) => {
        const ans = state.userAnswers[idx];
        if (ans !== null) {
            if (ans === q.correctOption) correctCount++;
            else incorrectCount++;
        }
        if (state.markedForReview[idx]) markedCount++;
        if (state.visited[idx]) visitedCount++;
    });

    const attempted = correctCount + incorrectCount;
    const score = (correctCount * 2.0) - (incorrectCount * 0.5);
    const accuracy = attempted > 0 ? Math.round((correctCount / attempted) * 100) : 0;
    const notVisitedCount = Math.max(0, total - visitedCount);

    document.getElementById('stat-score').textContent = score.toFixed(1);
    document.getElementById('fs-score').textContent = score.toFixed(1);
    document.getElementById('stat-accuracy').textContent = `${accuracy}%`;
    document.getElementById('stat-correct').textContent = correctCount;
    document.getElementById('stat-incorrect').textContent = incorrectCount;

    document.getElementById('legend-correct').textContent = correctCount;
    document.getElementById('legend-incorrect').textContent = incorrectCount;
    document.getElementById('legend-marked').textContent = markedCount;
    document.getElementById('legend-unattempted').textContent = notVisitedCount;

    const paletteGrid = document.getElementById('palette-grid');
    paletteGrid.innerHTML = '';

    activeQuestions.forEach((q, idx) => {
        const ans = state.userAnswers[idx];
        const isMarked = state.markedForReview[idx];
        const isActive = idx === currentQuestionIndex;

        let btnClasses = 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200';
        if (ans !== null) {
            btnClasses = ans === q.correctOption
                ? 'bg-emerald-600 text-white border-emerald-700'
                : 'bg-red-600 text-white border-red-700';
        } else if (isMarked) {
            btnClasses = 'bg-purple-600 text-white border-purple-700 rounded-full';
        } else if (state.visited[idx]) {
            btnClasses = 'bg-amber-100 text-amber-900 border-amber-300';
        }

        const activeRing = isActive ? 'ring-2 ring-offset-1 ring-sky-600 scale-105 font-extrabold' : '';

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = idx + 1;
        btn.onclick = () => jumpToQuestion(idx);
        btn.className = `h-9 w-full rounded-lg border text-xs font-bold transition flex items-center justify-center relative touch-manipulation ${btnClasses} ${activeRing}`;

        if (isMarked && ans !== null) {
            btn.innerHTML = `${idx + 1}<span class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-purple-500 border border-white rounded-full"></span>`;
        }

        paletteGrid.appendChild(btn);
    });
}

function openSummaryModal() {
    const total = activeQuestions.length;
    const state = getChapterState(currentChapter.id, total);

    let correctCount = 0;
    let incorrectCount = 0;
    let markedCount = 0;

    activeQuestions.forEach((q, idx) => {
        const ans = state.userAnswers[idx];
        if (ans !== null) {
            if (ans === q.correctOption) correctCount++;
            else incorrectCount++;
        }
        if (state.markedForReview[idx]) markedCount++;
    });

    const attempted = correctCount + incorrectCount;
    const score = (correctCount * 2.0) - (incorrectCount * 0.5);
    const accuracy = attempted > 0 ? Math.round((correctCount / attempted) * 100) : 0;

    document.getElementById('modal-chapter-title').textContent = `${currentChapter.title} Summary`;
    document.getElementById('modal-score').textContent = score.toFixed(1);
    document.getElementById('modal-correct').textContent = correctCount;
    document.getElementById('modal-incorrect').textContent = incorrectCount;
    document.getElementById('modal-accuracy').textContent = `${accuracy}%`;
    document.getElementById('modal-total-q').textContent = total;
    document.getElementById('modal-attempted').textContent = attempted;
    document.getElementById('modal-marked').textContent = markedCount;
    document.getElementById('modal-unattempted').textContent = total - attempted;

    document.getElementById('summary-modal').classList.remove('hidden');
}

function closeSummaryModal() {
    document.getElementById('summary-modal').classList.add('hidden');
}

function applySidePanelState() {
    const sidePanel = document.getElementById('side-panel');
    const btnText = document.getElementById('sidebar-btn-text');
    const btnIcon = document.getElementById('sidebar-btn-icon');

    if (isSidePanelVisible) {
        sidePanel.classList.remove('hidden');
        btnText.textContent = 'Hide Palette';
        btnIcon.textContent = '👁️';
    } else {
        sidePanel.classList.add('hidden');
        btnText.textContent = 'Palette';
        btnIcon.textContent = '📋';
    }
}

function toggleSidePanel() {
    isSidePanelVisible = !isSidePanelVisible;
    applySidePanelState();
}

function toggleFullScreenQuestion() {
    const quizHeader = document.getElementById('quiz-header');
    const sidePanel = document.getElementById('side-panel');
    const floatingBar = document.getElementById('fullscreen-floating-bar');

    isFullScreenMode = !isFullScreenMode;
    if (isFullScreenMode) {
        quizHeader.classList.add('hidden');
        sidePanel.classList.add('hidden');
        floatingBar.classList.remove('hidden');
    } else {
        exitFullScreenSilently();
    }
}

function exitFullScreenSilently() {
    isFullScreenMode = false;
    document.getElementById('quiz-header').classList.remove('hidden');
    document.getElementById('fullscreen-floating-bar').classList.add('hidden');
    applySidePanelState();
}

let toastTimer = null;
function showToast(msg) {
    const box = document.getElementById('toast-box');
    const text = document.getElementById('toast-message');
    text.textContent = msg;
    box.classList.remove('hidden');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        box.classList.add('hidden');
    }, 3000);
}

document.addEventListener('keydown', (e) => {
    const viewQuiz = document.getElementById('view-quiz');
    if (viewQuiz.classList.contains('hidden')) return;
    if (!document.getElementById('summary-modal').classList.contains('hidden')) {
        if (e.key === 'Escape') closeSummaryModal();
        return;
    }

    if (e.key === 'ArrowRight') saveAndNext();
    else if (e.key === 'ArrowLeft') prevQuestion();
    else {
        const keyMap = { 'a': 'a', '1': 'a', 'b': 'b', '2': 'b', 'c': 'c', '3': 'c', 'd': 'd', '4': 'd' };
        const mapped = keyMap[e.key.toLowerCase()];
        if (mapped && activeQuestions[currentQuestionIndex].options[mapped]) {
            selectOption(mapped);
        }
    }
});

window.addEventListener('DOMContentLoaded', () => {
    navigateTo('home');
});
