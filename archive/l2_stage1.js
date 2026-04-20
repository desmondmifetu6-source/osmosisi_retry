initModal();
const state = sharedState.load();
sharedState.startTimer();
sharedState.updateTimerUI();

if (!state.selectedWords || state.selectedWords.length === 0) window.location.href = 'index.html';

const transitionContainer = document.getElementById('transition-container');
const revisionContainer = document.getElementById('revision-container');

let globalTimerInt = null;

document.getElementById('start-btn').addEventListener('click', () => {
  transitionContainer.style.display = 'none';
  document.getElementById('current-score').textContent = state.score || 0;
  startRevisionPhase();
});

function startRevisionPhase() {
  revisionContainer.style.display = 'block';
  
  const listEl = document.getElementById('rev-list');
  state.selectedWords.forEach(w => {
    const item = document.createElement('div');
    item.className = 'revision-item';
    item.innerHTML = `<strong>${w}</strong><p>${state.meanings[w]}</p>`;
    listEl.appendChild(item);
  });
  
  // 5 minutes
  let timeLeft = 300; 
  const timeEl = document.getElementById('rev-timer');
  
  const tick = () => {
    const min = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const sec = String(timeLeft % 60).padStart(2, '0');
    timeEl.textContent = `${min}:${sec}`;
    if (timeLeft <= 0) {
      clearInterval(globalTimerInt);
      endRevisionPhase();
    }
    timeLeft--;
  };
  tick();
  globalTimerInt = setInterval(tick, 1000);
  
  document.getElementById('start-test-btn').addEventListener('click', () => {
    clearInterval(globalTimerInt);
    endRevisionPhase();
  });
}

function endRevisionPhase() {
  navigateWithTransition('l2_stage2.html');
}

// Developer Cheat
document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'p' && e.altKey) {
    e.preventDefault();
    if (transitionContainer.style.display !== 'none') {
      document.getElementById('start-btn').click();
    } else {
      document.getElementById('start-test-btn').click();
    }
  }
});
