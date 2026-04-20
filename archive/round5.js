/**
 * ROUND 5: Multiple Choice Mastery
 * A fast-paced quiz round. The player is shown a definition and must select the correct 
 * corresponding word from a list of options (including 3 random distractors).
 */
initModal();
const state = sharedState.load();
sharedState.startTimer();
sharedState.updateTimerUI();

if (!state.selectedWords || state.selectedWords.length === 0) window.location.href = 'index.html';

const introContainer = document.getElementById('intro-container');
const quizContainer = document.getElementById('quiz-container');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const feedbackEl = document.getElementById('r5-feedback');
const pauseOverlay = document.getElementById('r5-pause-overlay');
const r5CompleteEl = document.getElementById('r5-complete');

const MOTIVATION_QUOTES = [
  'Every round you finish is proof you are learning. Keep going!',
  'Nice work — steady practice is how memory grows.',
  'You showed up and finished. That counts for a lot.',
  'Small steps today add up to stronger recall tomorrow.',
];

let testSequence = [];
let testIndex = 0;
let hasAnsweredRow = false;
let isPaused = false;
const stageStartScore = state.score || 0;

function pickDistractors(correctWord) {
  const correct = correctWord.toLowerCase();
  const seen = new Set([correct]);
  const pushUnique = (out, candidates) => {
    for (const w of candidates) {
      if (!w || typeof w !== 'string') continue;
      const lo = w.toLowerCase();
      if (seen.has(lo)) continue;
      seen.add(lo);
      out.push(w);
      if (out.length >= 3) break;
    }
    return out;
  };

  let out = [];
  out = pushUnique(out, [...(state.selectedWords || [])].sort(() => Math.random() - 0.5));

  if (out.length < 3 && state.wordsPool && state.wordsPool.length) {
    out = pushUnique(out, [...state.wordsPool].sort(() => Math.random() - 0.5));
  }

  if (out.length < 3 && typeof window.STEMDictionary !== 'undefined') {
    const first = correct[0] || '';
    const sameLetter = [];
    Object.values(window.STEMDictionary.wordBank).forEach(arr => {
      arr.forEach(item => {
        const w = item.word;
        if (w && w.toLowerCase() !== correct && w.toLowerCase().startsWith(first)) {
          sameLetter.push(w);
        }
      });
    });
    out = pushUnique(out, sameLetter.sort(() => Math.random() - 0.5));
  }

  const fallbacks = ['biology', 'osmosis', 'cell', 'atom', 'molecule', 'energy', 'force', 'phase', 'reaction'];
  out = pushUnique(out, fallbacks.sort(() => Math.random() - 0.5));

  return out.slice(0, 3);
}

function setR5Paused(on) {
  isPaused = on;
  if (on) {
    pauseOverlay.classList.remove('hidden');
    pauseOverlay.setAttribute('aria-hidden', 'false');
    document.querySelectorAll('.option-btn').forEach(b => { b.disabled = true; });
    nextBtn.disabled = true;
  } else {
    pauseOverlay.classList.add('hidden');
    pauseOverlay.setAttribute('aria-hidden', 'true');
    if (!hasAnsweredRow) {
      document.querySelectorAll('.option-btn').forEach(b => { b.disabled = false; });
    }
    nextBtn.disabled = false;
  }
}

document.getElementById('r5-pause-btn').addEventListener('click', () => setR5Paused(true));
document.getElementById('r5-resume-btn').addEventListener('click', () => setR5Paused(false));
document.getElementById('r5-intro-back-btn').addEventListener('click', () => { navigateWithTransition('round3.html'); });
document.getElementById('r5-back-btn').addEventListener('click', () => { navigateWithTransition('round3.html'); });

document.getElementById('r5-continue-btn').addEventListener('click', () => {
  const stageScore = Math.max(0, (state.score || 0) - stageStartScore);
  sharedState.showStageScoreThen('round5', 'Round 5', stageScore, () => {
    navigateWithTransition('round4_5.html');
  });
});

function bootstrapStage() {
  testSequence = [...state.selectedWords].sort(() => 0.5 - Math.random());
  
  document.getElementById('start-btn').addEventListener('click', () => {
    introContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    
    document.getElementById('scoreboard').style.display = 'block';
    document.getElementById('current-score').textContent = state.score || 0;
    
    renderQuizCurrent();
  });
}

function renderQuizCurrent() {
  hasAnsweredRow = false;
  nextBtn.style.display = 'none';
  feedbackEl.textContent = '';
  optionsContainer.innerHTML = '';
  
  const correctWord = testSequence[testIndex];
  document.getElementById('r5-meaning').textContent = state.meanings[correctWord];
  document.getElementById('quiz-progress').textContent = `${testIndex + 1} / ${testSequence.length}`;
  
  const distractors = pickDistractors(correctWord);
  let options = [...distractors, correctWord].sort(() => Math.random() - 0.5);
  
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.dataset.word = opt.toLowerCase();
    
    btn.addEventListener('click', () => handleOptionClick(btn, opt, correctWord));
    
    optionsContainer.appendChild(btn);
  });
}

function handleOptionClick(clickedBtn, selectedWord, correctWord) {
  if (isPaused || hasAnsweredRow) return;
  hasAnsweredRow = true;
  
  const allBtns = document.querySelectorAll('.option-btn');
  allBtns.forEach(btn => btn.disabled = true);
  
  if (selectedWord.toLowerCase() === correctWord.toLowerCase()) {
    // Correct logic
    clickedBtn.classList.add('correct');
    feedbackEl.textContent = "👍 Correct!";
    feedbackEl.className = 'feedback success';
    AudioManager.play('success');
    
    updateScoreboard(20, clickedBtn);
  } else {
    // Wrong logic
    clickedBtn.classList.add('wrong');
    feedbackEl.textContent = "Incorrect.";
    feedbackEl.className = 'feedback error';
    AudioManager.play('error');
    
    // Highlight correct response
    allBtns.forEach(btn => {
      if (btn.dataset.word === correctWord.toLowerCase()) {
        btn.classList.add('correct');
      }
    });
  }
  
  nextBtn.style.display = 'inline-block';
}

nextBtn.addEventListener('click', () => {
  testIndex++;
  if (testIndex < testSequence.length) {
    renderQuizCurrent();
  } else {
    finishGame();
  }
});

function updateScoreboard(amount, refElement) {
  state.score += amount;
  document.getElementById('current-score').textContent = state.score;
  
  const rect = refElement.getBoundingClientRect();
  const floater = document.createElement('div');
  floater.className = 'floating-point';
  floater.textContent = `+${amount}`;
  floater.style.left = `${rect.left + rect.width / 2}px`;
  floater.style.top = `${rect.top - 20}px`;
  document.body.appendChild(floater);
  setTimeout(() => floater.remove(), 1000);
}

function finishGame() {
  sharedState.save(state);
  AudioManager.play('success');
  quizContainer.style.display = 'none';
  document.getElementById('r5-motivation-quote').textContent =
    MOTIVATION_QUOTES[Math.floor(Math.random() * MOTIVATION_QUOTES.length)];
  r5CompleteEl.style.display = 'block';
}

// Bootstrap
bootstrapStage();

// Developer Cheat
document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'p' && e.altKey) {
    e.preventDefault();
    if (introContainer.style.display !== 'none') {
      document.getElementById('start-btn').click();
    } else if (quizContainer.style.display !== 'none') {
      const correct = testSequence[testIndex].toLowerCase();
      const btns = document.querySelectorAll('.option-btn');
      btns.forEach(b => { 
        if (b.dataset.word === correct && !b.disabled) b.click(); 
      });
      if (nextBtn.style.display !== 'none') nextBtn.click();
    }
  }
});
