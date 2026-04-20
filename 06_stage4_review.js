// =====================================================================
// FILE: 06_stage4_review.js (Definition Reconstruction Phase)
// =====================================================================
// This is the stage where we give the user the target word, and we show the scientific
// definition below it, BUT we hide 3 or 4 important keywords inside the definition!
// The player has to physically type the missing pieces of the definition back into place.

const Stage4Controller = {
  // 1. Centralized State Storage
  state: {
    gameData: null,
    testSequence: [],
    testIndex: 0,
    round4Score: 0,
    domCache: {} // Store elements here for safety and speed
  },

  // 2. Entry Point
  init() {
    if (typeof initModal === 'function') initModal();
    
    this.state.gameData = sharedState.load();
    sharedState.startTimer();
    sharedState.updateTimerUI();

    // Kick player out if they came here without words
    if (!this.state.gameData.selectedWords || this.state.gameData.selectedWords.length === 0) {
      window.location.href = '00_login.html';
      return;
    }

    this.cacheDOM();
    this.prepareData();
    this.attachListeners();
    this.startTestPhase();
  },

  // Safely find and store all the HTML elements we plan to use.
  cacheDOM() {
    this.state.domCache = {
      loadingContainer: document.getElementById('loading-container'),
      testContainer: document.getElementById('test-container'),
      scoreboard: document.getElementById('scoreboard'),
      currentScoreText: document.getElementById('current-score'),
      testWordText: document.getElementById('test-word'),
      testProgressText: document.getElementById('test-progress'),
      testMeaningContainer: document.getElementById('test-meaning-container'),
      submitBtn: document.getElementById('submit-btn'),
      skipBtn: document.getElementById('skip-btn'),
      testFeedback: document.getElementById('test-feedback')
    };
  },

  // Ensures all definitions exist and prepares the shuffle sequence
  prepareData() {
    if (!this.state.gameData.meanings) this.state.gameData.meanings = {};

    // Ensure all selected words have their definitions fetched
    this.state.gameData.selectedWords.forEach(word => {
      if (!this.state.gameData.meanings[word]) {
        this.state.gameData.meanings[word] = DictionaryLogic.fetchMeaning(word);
      }
    });

    sharedState.save(this.state.gameData);

    // Shuffle the testing order
    this.state.testSequence = [...this.state.gameData.selectedWords].sort(() => 0.5 - Math.random());
  },

  // Wires up all buttons
  attachListeners() {
    if (this.state.domCache.submitBtn) {
      // The fat arrow function `() =>` ensures `this` continues to point to the Controller
      this.state.domCache.submitBtn.addEventListener('click', () => this.processValidation());
    }
    
    if (this.state.domCache.skipBtn) {
      this.state.domCache.skipBtn.addEventListener('click', () => this.skipWord());
    }

    // Developer Hack Code (Alt+P)
    document.addEventListener('keydown', (e) => this.handleDevHack(e));
  },

  startTestPhase() {
    const { domCache, gameData } = this.state;
    if (domCache.loadingContainer) domCache.loadingContainer.style.display = 'none';
    if (domCache.scoreboard) domCache.scoreboard.style.display = 'block';
    if (domCache.currentScoreText) domCache.currentScoreText.textContent = gameData.score || 0;
    
    if (domCache.testContainer) domCache.testContainer.style.display = 'block';

    this.renderCurrentQuestion();
  },

  renderCurrentQuestion() {
    const { domCache, testSequence, testIndex, gameData } = this.state;
    const currentWord = testSequence[testIndex];

    if (domCache.testWordText) domCache.testWordText.textContent = currentWord;
    if (domCache.testProgressText) domCache.testProgressText.textContent = `${testIndex + 1}/${testSequence.length}`;

    // Strip HTML from definitions safely
    const rawMeaning = gameData.meanings[currentWord] || "";
    const plainMeaning = rawMeaning.replace(/<\/?[^>]+(>|$)/g, "");

    const tokens = plainMeaning.split(/(\b[\w'-]+\b)/); 
    let validIndices = [];

    // Find words eligible to be blanked out
    tokens.forEach((t, i) => {
      if (t.length > 3 && /^[a-zA-Z]+$/.test(t) && t.toLowerCase() !== currentWord.toLowerCase()) {
        validIndices.push(i);
      }
    });

    // Erase ~30% of valid words (min 2, max 4)
    const targetMasks = Math.min(4, Math.max(2, Math.floor(validIndices.length * 0.3)));
    const selectedIndices = validIndices.sort(() => 0.5 - Math.random()).slice(0, targetMasks);

    const escapeHTML = (str) => {
      return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
      }[tag] || tag));
    };

    // Build the sentence HTML
    let html = '';
    tokens.forEach((t, i) => {
      if (selectedIndices.includes(i)) {
        html += `<input type="text" class="meaning-input" data-ans="${escapeHTML(t.toLowerCase())}" autocomplete="off" style="width: ${Math.max(6, t.length * 1.2)}em;">`;
      } else {
        html += escapeHTML(t);
      }
    });

    if (domCache.testMeaningContainer) domCache.testMeaningContainer.innerHTML = html;

    // Reset Buttons and Error states
    if (domCache.submitBtn) {
      domCache.submitBtn.textContent = "Submit Findings";
      domCache.submitBtn.disabled = false;
    }
    if (domCache.skipBtn) domCache.skipBtn.disabled = false;
    
    if (domCache.testFeedback) {
      domCache.testFeedback.textContent = '';
      domCache.testFeedback.className = 'feedback';
    }

    // Auto-focus first input
    const firstInput = document.querySelector('.meaning-input');
    if (firstInput) firstInput.focus();
  },

  processValidation() {
    const { domCache } = this.state;

    // If button already says "Next", triggering it goes to next step
    if (domCache.submitBtn && domCache.submitBtn.textContent === "Next Definition") {
      this.nextWord();
      return;
    }

    const inputs = document.querySelectorAll('.meaning-input');
    let allCorrect = true;
    let hasEmpty = false;

    inputs.forEach(inp => {
      const userVal = inp.value.trim().toLowerCase();
      const correctVal = inp.dataset.ans.toLowerCase();
      inp.classList.remove('wrong', 'correct');

      if (userVal === '') {
        hasEmpty = true;
        allCorrect = false;
      } else if (userVal === correctVal) {
        inp.classList.add('correct');
        inp.disabled = true;
      } else {
        inp.classList.add('wrong');
        allCorrect = false;
      }
    });

    if (hasEmpty && !allCorrect) {
      this.triggerFeedback("Please fill in all blanks.", 'error');
      return;
    }

    if (allCorrect) {
      this.triggerFeedback("Masterful interpretation!", 'success');
      this.state.round4Score += 5;
      this.rewardPoints(5);

      if (domCache.skipBtn) domCache.skipBtn.disabled = true;
      if (domCache.submitBtn) domCache.submitBtn.textContent = "Next Definition";
    } else {
      this.triggerFeedback("There are errors in your transcription. Review and try again.", 'error');
    }
  },

  skipWord() {
    const { domCache } = this.state;
    const inputs = document.querySelectorAll('.meaning-input');
    
    inputs.forEach(inp => {
      inp.value = inp.dataset.ans;
      inp.classList.add('wrong');
      inp.disabled = true;
    });

    this.triggerFeedback("Skipped. Revealing transcription.", 'error');
    
    if (domCache.skipBtn) domCache.skipBtn.disabled = true;
    if (domCache.submitBtn) domCache.submitBtn.textContent = "Next Definition";
  },

  triggerFeedback(message, type) {
    const { domCache } = this.state;
    if (domCache.testFeedback) {
      domCache.testFeedback.textContent = message;
      domCache.testFeedback.className = `feedback ${type}`;
    }
    if (typeof AudioManager !== 'undefined') AudioManager.play(type);
  },

  rewardPoints(amount) {
    this.state.gameData.score += amount;
    if (this.state.domCache.currentScoreText) {
      this.state.domCache.currentScoreText.textContent = this.state.gameData.score;
    }

    const btn = this.state.domCache.submitBtn;
    if (!btn) return;
    
    const rect = btn.getBoundingClientRect();
    const floater = document.createElement('div');
    floater.className = 'floating-point';
    floater.textContent = `+${amount}`;
    floater.style.left = `${rect.left + rect.width / 2}px`;
    floater.style.top = `${rect.top - 20}px`;
    document.body.appendChild(floater);
    
    setTimeout(() => floater.remove(), 1000);
  },

  nextWord() {
    this.state.testIndex++;
    if (this.state.testIndex < this.state.testSequence.length) {
      this.renderCurrentQuestion();
    } else {
      this.finishGame();
    }
  },

  finishGame() {
    sharedState.save(this.state.gameData);
    if (typeof AudioManager !== 'undefined') AudioManager.play('success');

    sharedState.showStageScoreThen('round4', 'Round 5', this.state.round4Score, () => {
      if (typeof window.navigateWithTransition === 'function') {
        navigateWithTransition('09_stage7_boss_phase.html');
      } else {
        window.location.href = '09_stage7_boss_phase.html';
      }
    });
  },

  handleDevHack(e) {
    if (e.key.toLowerCase() === 'p' && e.altKey) {
      e.preventDefault();
      if (this.state.domCache.testContainer && this.state.domCache.testContainer.style.display !== 'none') {
        const inputs = document.querySelectorAll('.meaning-input');
        inputs.forEach(inp => inp.value = inp.dataset.ans);
        if (this.state.domCache.submitBtn) this.state.domCache.submitBtn.click();
      }
    }
  }
};

// Auto-start properly when the DOM is fully loaded to prevent element missing errors
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Stage4Controller.init());
} else {
  Stage4Controller.init();
}
