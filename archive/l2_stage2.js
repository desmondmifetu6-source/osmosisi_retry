initModal();
const state = sharedState.load();
sharedState.startTimer();
sharedState.updateTimerUI();

if (!state.selectedWords || state.selectedWords.length === 0) window.location.href = 'index.html';

let testSequence = [...state.selectedWords].sort(() => 0.5 - Math.random());
let testIndex = 0;
let stageScore = 0;
let answerLocked = false;

document.getElementById('current-score').textContent = state.score || 0;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderQuestion() {
  answerLocked = false;
  document.getElementById('next-btn').style.display = 'none';
  document.getElementById('test-feedback').textContent = '';
  document.getElementById('test-feedback').className = 'feedback';
  
  const currentWord = testSequence[testIndex];
  const correctMeaning = state.meanings[currentWord] || "Definition not found.";
  
  document.getElementById('target-word').textContent = correctMeaning;
  document.getElementById('test-progress').textContent = `${testIndex + 1}/${testSequence.length}`;
  
  // Get 3 random wrong words
  const otherWords = Object.keys(state.meanings).filter(w => w !== currentWord);
  const pool = shuffle(otherWords);
  
  let options = [currentWord];
  
  // Try to find deceptive words
  for (let w of pool) {
    if (options.length < 4) options.push(w);
  }
  
  // If we still need more, fallback to wordBank or default
  if (options.length < 4 && typeof window.STEMDictionary !== 'undefined') {
    const all = window.STEMDictionary.getWordsByLetter('B'); // Just random fallback
    for (let w of all) {
       if (options.length < 4 && !options.includes(w.word)) {
          options.push(w.word);
       }
    }
  }
  
  while(options.length < 4) {
    options.push("Anomaly");
  }
  
  options = shuffle(options);
  const container = document.getElementById('options-container');
  container.innerHTML = '';
  
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.onclick = () => handleSelection(btn, opt === currentWord);
    container.appendChild(btn);
  });
}

function handleSelection(btn, isCorrect) {
  if (answerLocked) return;
  answerLocked = true;
  
  const allBtns = document.querySelectorAll('.option-btn');
  allBtns.forEach(b => b.style.pointerEvents = 'none'); // Disable clicking
  
  const feedEl = document.getElementById('test-feedback');
  
  if (isCorrect) {
    btn.classList.add('correct');
    feedEl.textContent = 'Precise.';
    feedEl.className = 'feedback success';
    AudioManager.play('success');
    
    stageScore += 5;
    updateScoreboard(5, btn);
  } else {
    btn.classList.add('wrong');
    feedEl.textContent = 'Incorrect word.';
    feedEl.className = 'feedback error';
    AudioManager.play('error');
    
    // Highlight correct
    allBtns.forEach(b => {
      if (b.textContent === testSequence[testIndex]) {
        b.classList.add('correct');
      }
    });
  }
  
  document.getElementById('next-btn').style.display = 'block';
  document.getElementById('next-btn').textContent = (testIndex < testSequence.length - 1) ? 'Next Word' : 'Complete Stage';
}

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

document.getElementById('next-btn').addEventListener('click', () => {
  testIndex++;
  if (testIndex < testSequence.length) {
    renderQuestion();
  } else {
    finishStage();
  }
});

function finishStage() {
  sharedState.save(state);
  AudioManager.play('success');
  sharedState.showStageScoreThen('l2_s2', 'Round 3', stageScore, () => {
    navigateWithTransition('round4.html');
  });
}

// Bootstrap
renderQuestion();

// Developer Cheat
document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'p' && e.altKey) {
    e.preventDefault();
    if (!answerLocked) {
      const allBtns = document.querySelectorAll('.option-btn');
      const correctWord = testSequence[testIndex];
      allBtns.forEach(b => {
        if (b.textContent === correctWord) b.click();
      });
    } else {
      document.getElementById('next-btn').click();
    }
  }
});
