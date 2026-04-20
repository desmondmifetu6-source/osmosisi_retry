// =====================================================================
// FILE: 05_stage3_speed_recall.js (The Flash Memorization & Panic Typing Test)
// =====================================================================
// Welcome to the Speed Recall room! Imagine you are a spy and you only have
// a split second to look at a secret document before it burns up.
// Here, we flash a word at you, hide it, and you have to type it back from memory!
// In the second part, the final recall, you have to type out ALL the words you saw 
// before a ticking time bomb (our timer) goes off!

const Stage3Controller = {
  state: {
    gameData: null,
    domCache: {},
    sequence: [],
    currentIndex: 0,
    answerLocked: false,
    flashStageScore: 0,
    lap2Score: 0,
    lap2Identified: [],
    lap2TimerInt: null
  },

  init() {
    if (typeof initModal === 'function') initModal();
    this.state.gameData = sharedState.load();
    sharedState.startTimer();
    sharedState.updateTimerUI();

    if (!this.state.gameData.selectedWords || this.state.gameData.selectedWords.length === 0) {
      window.location.href = '00_login.html';
      return;
    }

    this.cacheDOM();
    this.renderInitialUI();
    this.attachListeners();
  },

  cacheDOM() {
    this.state.domCache = {
      scoreEl: document.getElementById('current-score'),
      introContainer: document.getElementById('intro-container'),
      quizContainer: document.getElementById('quiz-container'),
      startBtn: document.getElementById('start-btn'),
      flashWordEl: document.getElementById('flash-word'),
      hintEl: document.getElementById('flash-hint'),
      inputEl: document.getElementById('typed-word-input'),
      feedbackEl: document.getElementById('flash-feedback'),
      submitBtn: document.getElementById('submit-btn'),
      nextBtn: document.getElementById('next-btn'),
      progressEl: document.getElementById('quiz-progress'),
      transitionContainerLap2: document.getElementById('transition-container'),
      lap2Container: document.getElementById('lap2-container'),
      startLap2Btn: document.getElementById('start-lap2-btn'),
      lap2Timer: document.getElementById('lap2-timer'),
      lap2Input: document.getElementById('lap2-input'),
      lap2Feedback: document.getElementById('lap2-feedback'),
      lap2WordsList: document.getElementById('lap2-words-list')
    };
  },

  renderInitialUI() {
    if (this.state.domCache.scoreEl) {
      this.state.domCache.scoreEl.textContent = this.state.gameData.score || 0;
    }
  },

  attachListeners() {
    const { domCache } = this.state;

    if (domCache.startBtn) {
      domCache.startBtn.addEventListener('click', () => this.startFlashRecall());
    }

    if (domCache.submitBtn) {
      domCache.submitBtn.addEventListener('click', () => this.submitFlashRow());
    }

    if (domCache.inputEl) {
      domCache.inputEl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          if (!this.state.answerLocked) this.submitFlashRow();
          else if (domCache.nextBtn) domCache.nextBtn.click();
        }
      });
    }

    if (domCache.nextBtn) {
      domCache.nextBtn.addEventListener('click', () => this.advanceFlashRow());
    }

    if (domCache.startLap2Btn) {
      domCache.startLap2Btn.addEventListener('click', () => {
        if (domCache.transitionContainerLap2) domCache.transitionContainerLap2.style.display = 'none';
        this.startFinalRecall();
      });
    }

    if (domCache.lap2Input) {
      domCache.lap2Input.addEventListener('keypress', (e) => this.handleLap2Keypress(e));
    }
  },

  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },

  // --- PART 1: FLASH RECALL ---
  startFlashRecall() {
    // We shuffle your selected words like a deck of cards so you don't know 
    // what order they will come out in! Keep on your toes!
    const { domCache, gameData } = this.state;
    this.state.sequence = this.shuffle([...gameData.selectedWords]);
    this.state.currentIndex = 0;

    if (domCache.introContainer) domCache.introContainer.style.display = 'none';
    if (domCache.quizContainer) domCache.quizContainer.style.display = 'block';

    this.beginFlashRow();
  },

  beginFlashRow() {
    const { domCache, sequence, currentIndex } = this.state;
    this.state.answerLocked = false;

    if (domCache.inputEl) {
      domCache.inputEl.value = '';
      domCache.inputEl.disabled = true;
      domCache.inputEl.classList.remove('correct', 'wrong');
    }

    if (domCache.submitBtn) domCache.submitBtn.style.display = 'none';
    if (domCache.nextBtn) domCache.nextBtn.style.display = 'none';

    if (domCache.feedbackEl) {
      domCache.feedbackEl.textContent = '';
      domCache.feedbackEl.className = 'feedback';
    }

    if (domCache.progressEl) domCache.progressEl.textContent = `${currentIndex + 1} / ${sequence.length}`;

    const currentWord = sequence[currentIndex];
    if (domCache.flashWordEl) {
      domCache.flashWordEl.textContent = currentWord;
      domCache.flashWordEl.classList.remove('hidden');
    }
    if (domCache.hintEl) domCache.hintEl.textContent = 'Memorize it...';

    setTimeout(() => {
      if (domCache.flashWordEl) domCache.flashWordEl.classList.add('hidden');
      if (domCache.hintEl) domCache.hintEl.textContent = 'Now type the word you saw.';

      if (domCache.inputEl) {
        domCache.inputEl.disabled = false;
        domCache.inputEl.focus();
      }
      if (domCache.submitBtn) domCache.submitBtn.style.display = 'block';
    }, 1000);
  },

  submitFlashRow() {
    if (this.state.answerLocked) return;

    const { domCache, sequence, currentIndex } = this.state;
    const typed = domCache.inputEl ? domCache.inputEl.value.trim().toLowerCase() : '';
    if (!typed) return;

    this.state.answerLocked = true;
    if (domCache.inputEl) domCache.inputEl.disabled = true;
    if (domCache.submitBtn) domCache.submitBtn.style.display = 'none';

    const correct = sequence[currentIndex].toLowerCase();

    if (typed === correct) {
      if (domCache.inputEl) domCache.inputEl.classList.add('correct');
      this.triggerFlashFeedback('Correct.', 'success');
      this.rewardFlashPoints(10);
    } else {
      if (domCache.inputEl) domCache.inputEl.classList.add('wrong');
      this.triggerFlashFeedback(`Incorrect. It was "${correct.toUpperCase()}".`, 'error');
    }

    if (domCache.nextBtn) domCache.nextBtn.style.display = 'block';
  },

  advanceFlashRow() {
    this.state.currentIndex++;
    if (this.state.currentIndex < this.state.sequence.length) {
      this.beginFlashRow();
    } else {
      this.finishFlashRecall();
    }
  },

  triggerFlashFeedback(message, type) {
    if (this.state.domCache.feedbackEl) {
      this.state.domCache.feedbackEl.textContent = message;
      this.state.domCache.feedbackEl.className = `feedback ${type}`;
    }
    if (typeof AudioManager !== 'undefined') AudioManager.play(type);
  },

  rewardFlashPoints(amount) {
    this.state.flashStageScore += amount;
    this.state.gameData.score = (this.state.gameData.score || 0) + amount;
    
    if (this.state.domCache.scoreEl) {
      this.state.domCache.scoreEl.textContent = this.state.gameData.score;
    }
  },

  finishFlashRecall() {
    sharedState.save(this.state.gameData);
    if (typeof AudioManager !== 'undefined') AudioManager.play('success');

    sharedState.showStageScoreThen('05_stage3', 'Flash Recall', this.state.flashStageScore, () => {
      if (this.state.domCache.quizContainer) this.state.domCache.quizContainer.style.display = 'none';
      if (this.state.domCache.transitionContainerLap2) this.state.domCache.transitionContainerLap2.style.display = 'block';
    });
  },

  // --- PART 2: FINAL RECALL ---
  startFinalRecall() {
    // This is the panic room! You have to remember and type EVERY single word 
    // you collected so far, and the clock is furiously ticking down!
    const { domCache, gameData } = this.state;
    if (domCache.lap2Container) domCache.lap2Container.style.display = 'block';

    let timeLeft = gameData.selectedWords.length * 6;

    if (domCache.lap2Input) domCache.lap2Input.focus();

    const tick = () => {
      const min = String(Math.floor(timeLeft / 60)).padStart(2, '0');
      const sec = String(timeLeft % 60).padStart(2, '0');
      if (domCache.lap2Timer) domCache.lap2Timer.textContent = `${min}:${sec}`;

      if (timeLeft <= 0) {
        this.clearLap2Timer();
        this.endFinalRecall();
      } else if (timeLeft <= 10) {
        if (typeof AudioManager !== 'undefined') AudioManager.play('click');
      }
      timeLeft--;
    };

    tick();
    this.state.lap2TimerInt = setInterval(tick, 1000);
  },

  clearLap2Timer() {
    if (this.state.lap2TimerInt) {
      clearInterval(this.state.lap2TimerInt);
      this.state.lap2TimerInt = null;
    }
  },

  handleLap2Keypress(e) {
    if (e.key !== 'Enter') return;

    const { domCache, gameData } = this.state;
    const val = domCache.lap2Input.value.trim().toLowerCase();
    domCache.lap2Input.value = '';
    
    if (!val) return;

    if (this.state.lap2Identified.includes(val)) {
      this.triggerLap2Feedback("Already appended!", 'error');
      return;
    }

    const allCorrectWords = gameData.selectedWords.map(w => w.toLowerCase());
    
    if (allCorrectWords.includes(val)) {
      this.state.lap2Identified.push(val);
      this.triggerLap2Feedback("Match!", 'success');
      
      this.rewardLap2Points(20);
      
      const t = document.createElement('div');
      t.className = 'word-tile';
      t.textContent = val;
      if (domCache.lap2WordsList) domCache.lap2WordsList.appendChild(t);

      if (this.state.lap2Identified.length === gameData.selectedWords.length) {
        this.clearLap2Timer();
        setTimeout(() => this.endFinalRecall(), 1000);
      }
    } else {
      this.triggerLap2Feedback("Not in your selection.", 'error');
    }
  },

  triggerLap2Feedback(message, type) {
    if (this.state.domCache.lap2Feedback) {
      this.state.domCache.lap2Feedback.textContent = message;
      this.state.domCache.lap2Feedback.className = `feedback ${type}`;
    }
    const soundType = type === 'success' ? 'chip' : 'error';
    if (typeof AudioManager !== 'undefined') AudioManager.play(soundType);
  },

  rewardLap2Points(amount) {
    this.state.lap2Score += amount;
    this.state.gameData.score = (this.state.gameData.score || 0) + amount;
    
    if (this.state.domCache.scoreEl) {
      this.state.domCache.scoreEl.textContent = this.state.gameData.score;
    }

    const el = this.state.domCache.lap2Input;
    if (el) {
      const rect = el.getBoundingClientRect();
      const floater = document.createElement('div');
      floater.className = 'floating-point';
      floater.textContent = `+${amount}`;
      floater.style.left = `${rect.left + rect.width / 2}px`;
      floater.style.top = `${rect.top - 20}px`;
      document.body.appendChild(floater);
      setTimeout(() => floater.remove(), 1000);
    }
  },

  endFinalRecall() {
    const { domCache, gameData } = this.state;
    if (domCache.lap2Container) domCache.lap2Container.style.display = 'none';

    sharedState.save(gameData);
    if (typeof AudioManager !== 'undefined') AudioManager.play('success');

    if (typeof showModal === 'function') {
      showModal("Assessment Concluded", `You remembered ${this.state.lap2Identified.length} out of ${gameData.selectedWords.length} words under pressure. Stage Score: ${this.state.flashStageScore + this.state.lap2Score}.`);
    }

    setTimeout(() => {
      const modalOverlay = document.getElementById('modal-overlay');
      if (modalOverlay) modalOverlay.classList.add('hidden');
      
      this.showMissedWordsScreen();
    }, 2200);
  },

  showMissedWordsScreen() {
    const { gameData } = this.state;
    const allCorrectWords = gameData.selectedWords.map(w => w.toLowerCase());
    const missedWords = allCorrectWords.filter(w => !this.state.lap2Identified.includes(w));

    if (missedWords.length === 0) {
       this.finishStageTransition();
       return;
    }

    const missedWordsContainer = document.getElementById('missed-words-container');
    const missedWordsList = document.getElementById('missed-words-list');
    
    if (missedWordsContainer && missedWordsList) {
        missedWordsList.innerHTML = '';
        missedWords.forEach((w, index) => {
            const t = document.createElement('div');
            t.className = 'missed-word-tile';
            t.style.animationDelay = `${index * 0.1}s`;
            t.textContent = w;
            missedWordsList.appendChild(t);
        });
        missedWordsContainer.style.display = 'block';

        const continueBtn = document.getElementById('finish-stage-missed-btn');
        if (continueBtn) {
            continueBtn.onclick = () => {
                missedWordsContainer.style.display = 'none';
                this.finishStageTransition();
            };
        }
    } else {
        this.finishStageTransition();
    }
  },

  finishStageTransition() {
    sharedState.showStageScoreThen('05_stage3', 'Final Recall', this.state.lap2Score, () => {
      if (typeof window.navigateWithTransition === 'function') navigateWithTransition('06_stage4_meaning_exposure.html');
      else window.location.href = '06_stage4_meaning_exposure.html';
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Stage3Controller.init());
} else {
  Stage3Controller.init();
}
