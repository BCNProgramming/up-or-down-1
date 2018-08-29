'use strict';

function Game() {
    var self = this;
    self.onGameOverCallback = null;
    self.score = 0;
    self.timeLeft = null;
    self.cards = [1,2,5,7,8,13,6,12,3,11,4,10,9];
    self.step = null;
}

Game.prototype.start = function () {

    var self = this;

    self.gameMain = buildDom(`
        <main class="game">
            <header>
            <div class="score">
                <span class="label">Score :</span>
                <span class="value"></span>
            </div>
            <div class="timer">
                <span class="label">Time Left :</span>
                <span class="value"></span>
            </div>
            </header>
            <div class="deck">
            <div class="current-card"></div>
            <div class="actions">
                <button class="up disabled">up</button>
                <button class="down disabled">down</button>
            </div>
            <div class="next-card"></div>
            </div>
            <footer>
            <p>
                <span class="label"> Step :</span>
                <span class="step-no">1</span> / <span class="total-steps">51</span>
            </p>
            </footer>
        </main>
    `);

    self.timeLeftElement = self.gameMain.querySelector('.timer .value');
    self.scoreElement = self.gameMain.querySelector('.score .value');
    
    self.currentCardElement = self.gameMain.querySelector('.current-card');
    self.nextCardElement = self.gameMain.querySelector('.next-card');

    self.buttonUp = self.gameMain.querySelector('.up');
    self.buttonDown = self.gameMain.querySelector('.down');

    self.stepNoElement = self.gameMain.querySelector('.step-no');
    self.totalStepElement = self.gameMain.querySelector('.total-steps');

    document.body.appendChild(self.gameMain);


    self.showFirstCard();
}

Game.prototype.showFirstCard = function() {
    var self = this;

    self.totalStepElement.innerText = 
    
    self.step = 0;
    self.showCard();
    self.startTime();
};

Game.prototype.triggerTimeOut = function() {
    var self = this;

    self.score--;
    self.scoreElement.innerText = self.score;
    self.nextCard();
};

Game.prototype.nextCard = function() {
    var self = this;

    self.step++;
    if (self.step === self.cards.length -1) {
        self.onGameOverCallback();
    } else {

        self.showCard();
        self.startTime();
    }
};

Game.prototype.showCard = function() {
    var self = this;
    
    var currentCard = self.cards[self.step];
    self.currentCardElement.innerText = currentCard;
    self.nextCardElement.innerText = '?';

    self.handleClik = function() {
        self.revealNumber(true);
    };
    self.buttonUp.addEventListener('click', handleClik);
    self.buttonUp.removeAttribute('disabled');

    self.handleClik = function() {
        self.revealNumber(false);
    };
    self.buttonDown.addEventListener('click', handleClik);
    self.buttonDown.removeAttribute('disabled');
};

Game.prototype.startTime = function() {
    var self = this;
    
    self.timeLeft = 3;
    self.timeLeftElement.innerText = self.timeLeft;
    self.intervalId = window.setInterval(function() {
        self.timeLeft--;
        self.timeLeftElement.innerText = self.timeLeft;

        if (self.timeLeft === 0) {
            clearInterval(self.intervalId);
            self.triggerTimeOut();
        }
    }, 1000);
};

Game.prototype.revealNumber = function(answerWasUp) {
    var self = this;

    clearInterval(self.intervalId);

    self.buttonUp.removeEventListener('click', handleClik);
    self.buttonUp.addAttribute('disabled', 'disabled'); 
    self.buttonDown.removeEventListener('click', handleClik); 
    self.buttonDown.addAttribute('disabled', 'disabled') 
 

    var currentCard = self.cards[self.step];
    var nextCard = self.cards[self.step + 1];

    var className = '';

    if (answerWasUp && nextCard > currentCard) {
        self.score++;
        className = 'correct';
    } else if (answerWasUp && nextCard < currentCard) {
        self.score--;
        className = 'incorrect';
    } else if (!answerWasUp && nextCard < currentCard) {
        self.score++;
        className = 'correct';
    } else if (!answerWasUp && nextCard > currentCard) {
        self.score++;
        className = 'incorrect';
    }

    self.scoreElement.innerText = self.score;

    self.nextCardElement.classList.add(className);
    self.nextCardElement.innerText = nextCard;
    
}


Game.prototype.onOver = function(callback) {
    var self = this;
    self.onGameOverCallback = callback;
};

Game.prototype.destroy = function() {
    var self = this;
    self.gameMain.remove();
};