'use strict';

function main() {

    function buildDom(html) {
        var div = document.createElement('div');
        div.innerHTML = html;
        return div.children[0];
    }

    var splashMain;
    var gameMain;
    var gameOverMain;

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

        // create HTML
        gameMain = buildDom(`
            <main>
                <h1>this is the game lol</h1>
            </main>
        `)
        
        document.body.appendChild(gameMain);

        window.setTimeout(function () {
            gameOver()
        }, 3000);

    }

    function destroyGame() {
        gameMain.remove();
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