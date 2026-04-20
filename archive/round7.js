/**
 * ROUND 7: Final free recall — type each word and its meaning with no hints first.
 */
initModal();
const state = sharedState.load();
sharedState.startTimer();
sharedState.updateTimerUI();

if (!state.selectedWords || state.selectedWords.length === 0) window.location.href = 'index.html';

const introContainer = document.getElementById('intro-container');
const quizContainer = document.getElementById('quiz-container');
const wordInput = document.getElementById('r7-word-input');
const meaningInput = document.getElementById('r7-meaning-input');
const wordPicker = document.getElementById('r7-word-picker');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const feedbackEl = document.getElementById('r7-feedback');
const revealEl = document.getElementById('r7-reveal');
const pauseOverlay = document.getElementById('r7-pause-overlay');

let sequence = [];
let currentWord = null;
let locked = false;
let isPaused = false;
let lastGrade = { wOk: false, mRatio: 0 };
const stageStartScore = state.score || 0;

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const MOTIVATE_STRONG = [
  'Strong recall — you earned this!',
  'That was sharp.',
  'Your brain showed up. Keep it up!',
  'Nice work — keep stacking wins like this.',
];
const MOTIVATE_MIDDLE = [
  'Good effort — every rep counts.',
  'You are building the skill.',
  'Not perfect, but you tried. That matters.',
  'Keep going — memory grows with practice.',
];
const MOTIVATE_TOUGH = [
  'Hard word, but you stayed in the fight.',
  'Tough round — courage still counts.',
  'Mistakes are part of learning. Keep pushing.',
  'Do not quit — next one can be better.',
];
const MOTIVATE_LAST = [
  'Last word done — you finished the whole list!',
  'You went through every word. That takes grit!',
  'All recall cards cleared — huge effort!',
];

const CHEER_AFTER_CHECK = [
  'Tap Next and we move on.',
  'Next up: another word.',
  'Hit Next to continue.',
];
const CHEER_AFTER_CHECK_LAST = [
  'Tap Next to open your score.',
  'Next step and you are done!',
  'Next: final step, then your results page.',
];

function pickPerWordTitle() {
  const isLast = sequence.length === 0;
  if (isLast) return pickRandom(MOTIVATE_LAST);
  if (lastGrade.wOk && lastGrade.mRatio >= 0.85) return pickRandom(MOTIVATE_STRONG);
  if (lastGrade.wOk || lastGrade.mRatio >= 0.5) return pickRandom(MOTIVATE_MIDDLE);
  return pickRandom(MOTIVATE_TOUGH);
}

function extractKeywords(text) {
  const stopwords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'of', 'as', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'it', 'this', 'that', 'which', 'who', 'whom', 'whose', 'some', 'any', 'such', 'into'];
  const words = String(text || '').toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
  return [...new Set(words.filter(w => w.length > 2 && !stopwords.includes(w)))];
}

function gradeRow(userWord, userMeaning, correctWord, trueMeaning) {
  const wOk = userWord.trim().toLowerCase() === correctWord.toLowerCase();
  const trueK = extractKeywords(trueMeaning);
  const userK = extractKeywords(userMeaning);
  let mRatio = 0;
  if (trueK.length > 0) {
    const hit = trueK.filter(k => userK.includes(k)).length;
    mRatio = hit / trueK.length;
  } else if (String(userMeaning || '').trim().length > 15) {
    mRatio = 0.35;
  }
  let pts = 0;
  if (wOk) pts += 28;
  pts += Math.round(mRatio * 42);
  return { wOk, mRatio, pts, keyTotal: trueK.length };
}

function setPaused(on) {
  isPaused = on;
  if (on) {
    pauseOverlay.classList.remove('hidden');
    pauseOverlay.setAttribute('aria-hidden', 'false');
    wordInput.disabled = true;
    meaningInput.disabled = true;
    submitBtn.disabled = true;
    nextBtn.disabled = true;
  } else {
    pauseOverlay.classList.add('hidden');
    pauseOverlay.setAttribute('aria-hidden', 'true');
    nextBtn.disabled = false;
    if (!locked) {
      wordInput.disabled = false;
      meaningInput.disabled = false;
      submitBtn.disabled = false;
      wordInput.focus();
    }
  }
}

document.getElementById('r7-pause-btn').addEventListener('click', () => setPaused(true));
document.getElementById('r7-resume-btn').addEventListener('click', () => setPaused(false));
document.getElementById('r7-intro-back-btn').addEventListener('click', () => { navigateWithTransition('round6.html'); });
document.getElementById('r7-back-btn').addEventListener('click', () => { navigateWithTransition('round6.html'); });

function renderRow() {
  locked = false;
  if (sequence.length === 0) return;
  if (!currentWord || !sequence.includes(currentWord)) currentWord = sequence[0];
  wordInput.value = '';
  meaningInput.value = '';
  wordPicker.disabled = false;
  wordInput.disabled = false;
  meaningInput.disabled = false;
  submitBtn.disabled = false;
  submitBtn.style.display = 'inline-block';
  nextBtn.style.display = 'none';
  feedbackEl.textContent = '';
  feedbackEl.className = 'r7-feedback';
  revealEl.style.display = 'none';
  document.getElementById('quiz-progress').textContent = `${(state.selectedWords.length - sequence.length) + 1} / ${state.selectedWords.length}`;
  wordPicker.innerHTML = sequence.map(w => `<option value="${w}">${w.toUpperCase()}</option>`).join('');
  wordPicker.value = currentWord;
  wordInput.focus();
}

wordPicker.addEventListener('change', () => {
  currentWord = wordPicker.value;
});

document.getElementById('start-btn').addEventListener('click', () => {
  sequence = [...state.selectedWords].sort(() => Math.random() - 0.5);
  currentWord = sequence[0] || null;
  introContainer.style.display = 'none';
  quizContainer.style.display = 'block';
  document.getElementById('scoreboard').style.display = 'block';
  document.getElementById('current-score').textContent = state.score || 0;
  renderRow();
});

submitBtn.addEventListener('click', () => {
  if (isPaused || locked) return;
  const cw = currentWord;
  if (!cw) return;
  const trueMeaning = state.meanings[cw] || '';
  const uw = wordInput.value;
  const um = meaningInput.value;
  if (!uw.trim() && !um.trim()) return;

  const floatRect = submitBtn.getBoundingClientRect();

  locked = true;
  wordPicker.disabled = true;
  wordInput.disabled = true;
  meaningInput.disabled = true;
  submitBtn.style.display = 'none';

  const g = gradeRow(uw, um, cw, trueMeaning);
  lastGrade = { wOk: g.wOk, mRatio: g.mRatio };
  state.score += g.pts;
  document.getElementById('current-score').textContent = state.score;

  const pct = Math.round(g.mRatio * 100);
  let msg = '';
  if (g.wOk && g.mRatio >= 0.85) {
    msg = `Strong recall — word correct, meaning about ${pct}% of key ideas. +${g.pts} pts`;
    feedbackEl.className = 'r7-feedback ok';
    AudioManager.play('success');
  } else if (g.wOk || g.mRatio >= 0.5) {
    msg = `Partly there — word ${g.wOk ? 'right' : 'off'}, meaning ~${pct}% of key ideas. +${g.pts} pts`;
    feedbackEl.className = 'r7-feedback partial';
    AudioManager.play('chip');
  } else {
    msg = `Tough one — keep practicing. +${g.pts} pts`;
    feedbackEl.className = 'r7-feedback bad';
    AudioManager.play('error');
  }
  const cheerPool = sequence.length === 1 ? CHEER_AFTER_CHECK_LAST : CHEER_AFTER_CHECK;
  feedbackEl.textContent = `${msg} ${pickRandom(cheerPool)}`;

  const floater = document.createElement('div');
  floater.className = 'floating-point';
  floater.textContent = `+${g.pts}`;
  const rect = floatRect.width ? floatRect : wordInput.getBoundingClientRect();
  floater.style.left = `${rect.left + rect.width / 2}px`;
  floater.style.top = `${rect.top - 10}px`;
  document.body.appendChild(floater);
  setTimeout(() => floater.remove(), 1000);

  document.getElementById('r7-reveal-word').textContent = cw;
  document.getElementById('r7-reveal-meaning').textContent = trueMeaning;
  revealEl.style.display = 'block';
  nextBtn.style.display = 'inline-block';
});

nextBtn.addEventListener('click', () => {
  if (isPaused) return;
  const title = pickPerWordTitle();
  showGiftBoxThen(title, () => {
    if (currentWord) {
      sequence = sequence.filter(w => w !== currentWord);
    }
    sharedState.save(state);
    if (sequence.length > 0) {
      currentWord = sequence[0];
      renderRow();
    } else {
      AudioManager.play('success');
      const stageScore = Math.max(0, (state.score || 0) - stageStartScore);
      sharedState.showStageScoreThen('round7', 'Pharous Dream', stageScore, () => {
        navigateWithTransition('round_nebuchadnezzar.html');
      });
    }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'p' && e.altKey) {
    e.preventDefault();
    if (introContainer.style.display !== 'none') {
      document.getElementById('start-btn').click();
    } else if (quizContainer.style.display !== 'none') {
      if (nextBtn.style.display !== 'none') nextBtn.click();
      else {
        const cw = currentWord || sequence[0];
        wordInput.value = cw;
        meaningInput.value = state.meanings[cw] || '';
        submitBtn.click();
      }
    }
  }
});
