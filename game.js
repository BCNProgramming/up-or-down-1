"use strict";

class Game {
  constructor() {
    this.onGameOverCallback = null;
    this.score = 0;
    this.timeLeft = null;

    //   this.cards =;
    this.cards = null;
    this.step = null;
    this.maxStep = 10;
  }

  start() {
    this.gameMain = buildDom(`
    <main class="game container">
      <header>
        <div class="score">
          <span class="label">Score:</span>
          <span class="value"></span>
        </div>
        <div class="timer">
          <span class="label">Time left:</span>
          <span class="value"></span>
        </div>
      </header>
      <div class="deck">
        <div class="card current-card"></div>
        <div class="actions">
          <button disabled class="up">up</button>
          <button disabled class="down">down</button>
        </div>
        <div class="card next-card"></div>
      </div>
      <footer>
        <p>
          <span class="label">Step:</span>
          <span class="step-no"></span> / <span class="total-steps"></span>
        </p>
      </footer>
    </main>
  `);

    this.scoreElement = this.gameMain.querySelector(".score .value");
    this.timeLeftElement = this.gameMain.querySelector(".timer .value");

    this.currentCardElement = this.gameMain.querySelector(".current-card");
    this.nextCardElement = this.gameMain.querySelector(".next-card");

    this.buttonUp = this.gameMain.querySelector(".up");
    this.buttonDown = this.gameMain.querySelector(".down");

    this.stepNoElement = this.gameMain.querySelector(".step-no");
    this.totalStepsElement = this.gameMain.querySelector(".total-steps");

    document.body.appendChild(this.gameMain);

    this.showFirstCard();
  }

  getRandomCard(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  showFirstCard() {
    this.totalStepsElement.innerText = this.maxStep;

    this.step = 0;
    this.showCard();
    this.startTimer();
  }

  triggerTimeout() {
    this.score--;
    this.scoreElement.innerText = this.score;
    this.nextCard();
  }

  nextCard() {
    this.step++;

    if (this.step === this.maxStep) {
      this.onGameOverCallback();
    } else {
      this.showCard();
      this.startTimer();
    }
  }

  showCard() {
    //const _this=this;
    this.currentCard = this.getRandomCard(1, 10);
    this.currentCardElement.innerText = this.currentCard;
    this.nextCardElement.innerText = "?";

    this.stepNoElement.innerText = this.step + 1;

    this.handleClickUp = ()=> this.revealNumber(true);
    
    this.buttonUp.addEventListener("click", this.handleClickUp);
    this.buttonUp.removeAttribute("disabled");

    this.handleClickDown = ()=> this.revealNumber(false);
    
    this.buttonDown.addEventListener("click", this.handleClickDown);
    this.buttonDown.removeAttribute("disabled");
  }

  startTimer() {
    //const _this = this;
    this.timeLeft = 3;
    this.timeLeftElement.innerText = this.timeLeft;
    this.intervalId = setInterval(()=> {
      
      this.timeLeft--;
      this.timeLeftElement.innerText = this.timeLeft;

      if (this.timeLeft === 0) {
        clearInterval(this.intervalId);
        this.triggerTimeout();
      }
    }, 1000);
  }

  revealNumber(answerWasUp) {
    //const _this=this;
    clearInterval(this.intervalId);
    this.buttonUp.removeEventListener("click", this.handleClickUp);
    this.buttonUp.setAttribute("disabled", "disabled");
    this.buttonDown.removeEventListener("click", this.handleClickDown);
    this.buttonDown.setAttribute("disabled", "disabled");

    var currentCard = this.getRandomCard(1, 10);
    var nextCard = this.getRandomCard(1, 10);

    var className = "";

    if (answerWasUp && nextCard > currentCard) {
      this.score++;
      className = "correct";
    } else if (answerWasUp && nextCard < currentCard) {
      this.score--;
      className = "incorrect";
    } else if (!answerWasUp && nextCard < currentCard) {
      this.score++;
      className = "correct";
    } else if (!answerWasUp && nextCard > currentCard) {
      this.score--;
      className = "incorrect";
    } else {
      this.score--;
      className = "incorrect";
    }

    this.scoreElement.innerText = this.score;

    this.nextCardElement.classList.add(className);
    this.nextCardElement.innerText = nextCard;

    setTimeout(()=> {
      this.nextCardElement.classList.remove(className);
      this.nextCard();
    }, 2000);
  }

  onOver(callback) {
    this.onGameOverCallback = callback;
  }

  destroy() {
    this.gameMain.remove();
  }
}
