/**
 * ROUND 6: The Final Recall Exam (Boss Stage)
 * The player faces 2 "boss" words from their collection. After a breathing exercise,
 * they must manually type out the full definition from memory. Their input is graded
 * against key scientific keywords extracted from the true definition.
 */
initModal();
const state = sharedState.load();
sharedState.startTimer();
sharedState.updateTimerUI();

if (!state.selectedWords || state.selectedWords.length === 0) window.location.href = 'index.html';

const introContainer = document.getElementById('intro-container');
const assimilationContainer = document.getElementById('assimilation-container');
const breathingContainer = document.getElementById('breathing-container');
const examContainer = document.getElementById('exam-container');

let bossWords = [];
let currentBossIndex = 0;
let targetKeywords = [];
let breathTimeouts = [];
let examPaused = false;
const stageStartScore = state.score || 0;

const r6PauseOverlay = document.getElementById('r6-pause-overlay');

function clearBreathTimeouts() {
  breathTimeouts.forEach(id => clearTimeout(id));
  breathTimeouts = [];
}

function setR6ExamPaused(on) {
  examPaused = on;
  const input = document.getElementById('r6-input');
  const submit = document.getElementById('submit-btn');
  const skip = document.getElementById('skip-btn');
  if (on) {
    r6PauseOverlay.classList.remove('hidden');
    r6PauseOverlay.setAttribute('aria-hidden', 'false');
    input.disabled = true;
    submit.disabled = true;
    skip.disabled = true;
  } else {
    r6PauseOverlay.classList.add('hidden');
    r6PauseOverlay.setAttribute('aria-hidden', 'true');
    submit.disabled = false;
    const postSubmit = submit.textContent.includes('Next') || submit.textContent.includes('Final');
    if (!postSubmit) {
      input.disabled = false;
      skip.disabled = false;
      input.focus();
    } else {
      input.disabled = true;
      skip.disabled = true;
    }
  }
}

document.getElementById('r6-intro-back-btn').addEventListener('click', () => {
  clearBreathTimeouts();
  navigateWithTransition('round4.html');
});
document.getElementById('r6-pause-btn').addEventListener('click', () => setR6ExamPaused(true));
document.getElementById('r6-resume-btn').addEventListener('click', () => setR6ExamPaused(false));
document.getElementById('r6-back-btn').addEventListener('click', () => {
  clearBreathTimeouts();
  navigateWithTransition('round4.html');
});

function bootstrapStage() {
  document.getElementById('scoreboard').style.display = 'block';
  document.getElementById('current-score').textContent = state.score || 0;
  
  // Pick 2 random words if possible
  let shuffled = [...state.selectedWords].sort(() => 0.5 - Math.random());
  bossWords = shuffled.slice(0, 2);
  
  document.getElementById('start-btn').addEventListener('click', () => {
    introContainer.style.display = 'none';
    startBreathing();
  });
}

function startAssimilation() {
  assimilationContainer.style.display = 'block';
  const word = bossWords[currentBossIndex];
  document.getElementById('a-wordName').textContent = word;
  document.getElementById('a-meaning').textContent = state.meanings[word];
  document.getElementById('word-progress-a').textContent = `${currentBossIndex + 1}/${bossWords.length}`;
}

document.getElementById('ready-btn').addEventListener('click', () => {
  assimilationContainer.style.display = 'none';
  startBreathing();
});

function startBreathing() {
  clearBreathTimeouts();
  breathingContainer.style.display = 'block';
  const circle = document.getElementById('breath-circle');
  circle.textContent = "Breathe In";
  circle.style.animation = 'none';
  void circle.offsetWidth; // trigger reflow
  circle.style.animation = 'breatheInOut 5s ease-in-out forwards';
  
  breathTimeouts.push(setTimeout(() => {
    circle.textContent = "Breathe Out";
  }, 2500));
  
  breathTimeouts.push(setTimeout(() => {
    breathingContainer.style.display = 'none';
    startExam();
  }, 5000));
}

function extractKeywords(text) {
  const stopwords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'of', 'as', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'it', 'this', 'that', 'which', 'who', 'whom', 'whose', 'some', 'any', 'such', 'into'];
  let words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
  return [...new Set(words.filter(w => w.length > 2 && !stopwords.includes(w)))];
}

function startExam() {
  examContainer.style.display = 'block';
  const word = bossWords[currentBossIndex];
  document.getElementById('e-wordName').textContent = word;
  document.getElementById('word-progress-e').textContent = `${currentBossIndex + 1}/${bossWords.length}`;
  
  const input = document.getElementById('r6-input');
  input.value = '';
  input.disabled = false;
  input.focus();
  
  document.getElementById('keyword-results').innerHTML = '';
  document.getElementById('r6-feedback').textContent = '';
  document.getElementById('r6-feedback').className = 'feedback';
  
  targetKeywords = extractKeywords(state.meanings[word]);
  
  const submitBtn = document.getElementById('submit-btn');
  submitBtn.textContent = 'Submit Thesis';
  submitBtn.disabled = false;
  document.getElementById('skip-btn').disabled = false;
  document.getElementById('skip-btn').textContent = 'Surrender (0 pts)';
  examPaused = false;
  r6PauseOverlay.classList.add('hidden');
  r6PauseOverlay.setAttribute('aria-hidden', 'true');
}

document.getElementById('submit-btn').addEventListener('click', processValidation);
document.getElementById('skip-btn').addEventListener('click', surrender);

function processValidation() {
  if (examPaused) return;
  const btn = document.getElementById('submit-btn');
  if (btn.textContent.includes('Next') || btn.textContent.includes('Final')) {
    nextWord();
    return;
  }
  
  const word = bossWords[currentBossIndex];
  const input = document.getElementById('r6-input');
  const userText = input.value;
  if (!userText.trim()) return;
  input.disabled = true;
  document.getElementById('skip-btn').disabled = true;
  
  const userKeywords = extractKeywords(userText);
  let matchedParams = [];
  let html = '';
  
  let pointsAwarded = 0;
  
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  targetKeywords.forEach(kw => {
    const safeKw = escapeHTML(kw);
    if (userKeywords.includes(kw)) {
      matchedParams.push(kw);
      html += `<span class="keyword-pill">${safeKw}</span>`;
      pointsAwarded += 10;
    } else {
      html += `<span class="keyword-pill missed">${safeKw}</span>`;
    }
  });
  
  document.getElementById('keyword-results').innerHTML = html;
  
  const matchRatio = matchedParams.length / targetKeywords.length;
  const feed = document.getElementById('r6-feedback');
  
  if (matchRatio === 1) {
    feed.textContent = "You hit every key word!";
    feed.className = 'feedback success';
    AudioManager.play('success');
  } else if (matchRatio >= 0.5) {
    feed.textContent = "Excellent recall, you captured the essence.";
    feed.className = 'feedback success';
    AudioManager.play('success');
  } else if (matchRatio > 0) {
    feed.textContent = "Partial recall. You missed some critical details.";
    feed.className = 'feedback warning';
    AudioManager.play('chip');
  } else {
    feed.textContent = "Completely incorrect transcription.";
    feed.className = 'feedback error';
    AudioManager.play('error');
  }
  
  updateScoreboard(pointsAwarded, btn);
  
  if (currentBossIndex < bossWords.length - 1) {
    btn.textContent = "Next Boss Word";
  } else {
    btn.textContent = "Final Results";
  }
}

function surrender() {
  if (examPaused) return;
  const input = document.getElementById('r6-input');
  input.disabled = true;
  document.getElementById('skip-btn').disabled = true;
  
  const feed = document.getElementById('r6-feedback');
  const actualDef = state.meanings[bossWords[currentBossIndex]];
  feed.textContent = `Surrendered. Meaning: "${actualDef}"`;
  feed.className = 'feedback error';
  AudioManager.play('error');
  
  let html = '';
  targetKeywords.forEach(kw => {
     html += `<span class="keyword-pill missed">${kw}</span>`;
  });
  document.getElementById('keyword-results').innerHTML = html;
  
  const btn = document.getElementById('submit-btn');
  if (currentBossIndex < bossWords.length - 1) {
    btn.textContent = "Next Boss Word";
  } else {
    btn.textContent = "Final Results";
  }
}

function nextWord() {
  examContainer.style.display = 'none';
  currentBossIndex++;
  if (currentBossIndex < bossWords.length) {
    startExam();
  } else {
    finishGame();
  }
}

function updateScoreboard(amount, refElement) {
  if (amount <= 0) return;
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
  sharedState.showStageScoreThen('round6', 'Round 6', stageScore, () => {
    // Optional pre-final stage: easy to remove by changing target back to 'round7.html'
    navigateWithTransition('round_nebuchadnezzar.html');
  });
}

bootstrapStage();

// Developer Cheat
document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'p' && e.altKey) {
    e.preventDefault();
    if (introContainer.style.display !== 'none') {
      document.getElementById('start-btn').click();
    } else if (assimilationContainer.style.display !== 'none') {
      document.getElementById('ready-btn').click();
    } else if (examContainer.style.display !== 'none') {
      const btn = document.getElementById('submit-btn');
      if (btn.textContent.includes('Next') || btn.textContent.includes('Final')) {
        btn.click();
      } else {
        const input = document.getElementById('r6-input');
        input.value = state.meanings[bossWords[currentBossIndex]]; // Perfect response
        btn.click();
      }
    }
  }
});
