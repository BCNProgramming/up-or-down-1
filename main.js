'use strict';

function buildDom(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.children[0];
}

function main() {


    var splashMain;
    var gameOverMain;

    var game; // instance of the Game

    function buildSplash() {

        // --- splash

        // create HTML
        splashMain = buildDom(`
            <main>
                <h1>Up and Down</h1>
                <button>Start</button>
            </main>
        `)
        
        document.body.appendChild(splashMain);

        var button = splashMain.querySelector('button');
        button.addEventListener('click', startGame)

    }

        // remove the splash to pass to the start of the game
    function destroySplash() {
        splashMain.remove();
    }


    // --- game 

    function startGame() {
        destroySplash();
        destroyGameOver();


        // temporary!!! move to Game.js
        game = new Game ();
        game.start();
        game.onOver(function () {
            gameOver();
        })
        

        

    }

    function destroyGame() {
        game.destroy();
    }

    // --- game-over


    function gameOver() {
        destroyGame();
        buildGameOver();
    }

    function buildGameOver() {

        // todo score
        var score = 99;
        
        // create HTML
        gameOverMain = buildDom(`
            <main>
                <h1>Game Over</h1>
                <p>Your score : ` + score + ` </p>
                <button>Restart</button>
            </main>
        `)

        var button = gameOverMain.querySelector('button');
        button.addEventListener('click', startGame);


        document.body.appendChild(gameOverMain);

    }

    function destroyGameOver() {
        if (gameOverMain) {
            gameOverMain.remove();
        }
    }

    

    // --- initialize



    buildSplash();
};

window.addEventListener('load', main());