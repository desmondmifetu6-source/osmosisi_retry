/**
 * ROUND 4.5: Go through the words again
 * Show the full meaning; player types the word (no multiple choice).
 */
initModal();
const state = sharedState.load();
sharedState.startTimer();
sharedState.updateTimerUI();

if (!state.selectedWords || state.selectedWords.length === 0) window.location.href = 'index.html';

const introContainer = document.getElementById('intro-container');
const quizContainer = document.getElementById('quiz-container');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const feedbackEl = document.getElementById('r45-feedback');
const wordInput = document.getElementById('target-word-input');

let testSequence = [];
let testIndex = 0;
let hasAnsweredRow = false;
const stageStartScore = state.score || 0;

const pauseOverlay = document.getElementById('r45-pause-overlay');
const r45PauseBtn = document.getElementById('r45-pause-btn');
const r45ResumeBtn = document.getElementById('r45-resume-btn');
const r45BackBtn = document.getElementById('r45-back-btn');
const r45IntroBackBtn = document.getElementById('r45-intro-back-btn');

function setR45Paused(on) {
  if (on) {
    pauseOverlay.classList.remove('hidden');
    pauseOverlay.setAttribute('aria-hidden', 'false');
    wordInput.disabled = true;
    submitBtn.disabled = true;
    nextBtn.disabled = true;
  } else {
    pauseOverlay.classList.add('hidden');
    pauseOverlay.setAttribute('aria-hidden', 'true');
    nextBtn.disabled = false;
    if (!hasAnsweredRow) {
      wordInput.disabled = false;
      submitBtn.disabled = false;
      wordInput.focus();
    }
  }
}

r45PauseBtn.addEventListener('click', () => setR45Paused(true));
r45ResumeBtn.addEventListener('click', () => setR45Paused(false));
r45IntroBackBtn.addEventListener('click', () => { navigateWithTransition('round5.html'); });
r45BackBtn.addEventListener('click', () => { navigateWithTransition('round5.html'); });

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
  submitBtn.style.display = 'inline-block';
  nextBtn.style.display = 'none';
  feedbackEl.textContent = '';
  wordInput.value = '';
  wordInput.disabled = false;
  wordInput.classList.remove('correct', 'wrong');
  wordInput.focus();
  
  const correctWord = testSequence[testIndex];
  document.getElementById('r45-meaning').textContent = state.meanings[correctWord];
  document.getElementById('quiz-progress').textContent = `${testIndex + 1} / ${testSequence.length}`;
}

submitBtn.addEventListener('click', () => {
  if (hasAnsweredRow) return;
  const userText = wordInput.value.trim().toLowerCase();
  if (!userText) return;

  hasAnsweredRow = true;
  wordInput.disabled = true;
  submitBtn.style.display = 'none';
  
  const correctWord = testSequence[testIndex].toLowerCase();
  
  if (userText === correctWord) {
    wordInput.classList.add('correct');
    feedbackEl.textContent = "👍 Correct!";
    feedbackEl.className = 'feedback success';
    AudioManager.play('success');
    
    updateScoreboard(30, wordInput);
  } else {
    wordInput.classList.add('wrong');
    feedbackEl.textContent = `Incorrect. The word was "${correctWord.toUpperCase()}".`;
    feedbackEl.className = 'feedback error';
    AudioManager.play('error');
  }
  
  nextBtn.style.display = 'inline-block';
});

wordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    if (!hasAnsweredRow) submitBtn.click();
    else nextBtn.click();
  }
});

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
  const stageScore = Math.max(0, (state.score || 0) - stageStartScore);
  sharedState.showStageScoreThen('round4_5', 'Round 4.5', stageScore, () => {
    navigateWithTransition('round4.html');
  });
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
      if (nextBtn.style.display !== 'none') nextBtn.click();
      else {
        wordInput.value = testSequence[testIndex];
        submitBtn.click();
      }
    }
  }
});
