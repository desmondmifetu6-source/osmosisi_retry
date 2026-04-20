initModal();
const state = sharedState.load();
sharedState.startTimer();
sharedState.updateTimerUI();

if (!state.selectedWords || state.selectedWords.length === 0) window.location.href = 'index.html';

const transitionContainer = document.getElementById('transition-container');
const examContainer = document.getElementById('exam-container');

let examIdentified = [];
let stageScore = 0;
let globalTimerInt = null;

document.getElementById('start-stage-btn').addEventListener('click', () => {
  transitionContainer.style.display = 'none';
  document.getElementById('scoreboard').style.display = 'block';
  document.getElementById('current-score').textContent = state.score || 0;
  startExamPhase();
});

function startExamPhase() {
  examContainer.style.display = 'block';
  
  let timeLeft = state.selectedWords.length * 6; // Max 60s for 10 words
  const timeEl = document.getElementById('exam-timer');
  const inputEl = document.getElementById('exam-input');
  const feedEl = document.getElementById('exam-feedback');
  
  inputEl.focus();
  
  const tick = () => {
    const min = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const sec = String(timeLeft % 60).padStart(2, '0');
    timeEl.textContent = `${min}:${sec}`;
    
    if (timeLeft <= 0) {
      clearInterval(globalTimerInt);
      endExam();
    } else if (timeLeft <= 10) {
      AudioManager.play('click'); 
    }
    timeLeft--;
  };
  tick();
  globalTimerInt = setInterval(tick, 1000);
  
  inputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const val = inputEl.value.trim().toLowerCase();
      inputEl.value = '';
      if (!val) return;
      
      if (examIdentified.includes(val)) {
        feedEl.textContent = "Already appended!";
        feedEl.className = 'feedback error';
        return;
      }
      
      if (state.selectedWords.map(w => w.toLowerCase()).includes(val)) {
        examIdentified.push(val);
        feedEl.textContent = "Match!";
        feedEl.className = 'feedback success';
        AudioManager.play('chip');
        
        spawnFloatingPoint(inputEl, 10);
        stageScore += 10;
        updateScoreboard();
        
        const t = document.createElement('div');
        t.className = 'word-tile';
        t.textContent = val;
        document.getElementById('exam-words-list').appendChild(t);
        
        if (examIdentified.length === state.selectedWords.length) {
          clearInterval(globalTimerInt);
          setTimeout(endExam, 1000);
        }
      } else {
        feedEl.textContent = "Not in your selection.";
        feedEl.className = 'feedback error';
        AudioManager.play('error');
      }
    }
  });
}

function spawnFloatingPoint(refElement, amount) {
  const rect = refElement.getBoundingClientRect();
  const floater = document.createElement('div');
  floater.className = 'floating-point';
  floater.textContent = `+${amount}`;
  floater.style.left = `${rect.left + rect.width / 2}px`;
  floater.style.top = `${rect.top - 20}px`;
  document.body.appendChild(floater);
  setTimeout(() => floater.remove(), 1000);
}

function updateScoreboard() {
  state.score = (state.score || 0) + 10;
  document.getElementById('current-score').textContent = state.score;
}

function endExam() {
  examContainer.style.display = 'none';
  document.getElementById('scoreboard').style.display = 'none';
  
  sharedState.save(state);
  
  AudioManager.play('success');
  showModal("Assessment Concluded", `You remembered ${examIdentified.length} out of ${state.selectedWords.length} words under pressure.`);
  setTimeout(() => {
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) modalOverlay.classList.add('hidden');
    sharedState.showStageScoreThen('l1_s5', 'Round 2', stageScore, () => {
      navigateWithTransition('l2_stage1.html');
    });
  }, 2200);
}

// Developer Cheat
document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'p' && e.altKey) {
    e.preventDefault();
    if (transitionContainer.style.display !== 'none') {
      document.getElementById('start-stage-btn').click();
    } else if (examContainer.style.display !== 'none') {
      const input = document.getElementById('exam-input');
      state.selectedWords.forEach(w => {
        if (!examIdentified.includes(w.toLowerCase())) {
          input.value = w;
          input.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
        }
      });
    }
  }
});
