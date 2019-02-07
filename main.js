'use strict';

 const buildDom = (html)=> {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.children[0];
};

const main = ()=>{


    let splashMain;
    let gameOverMain;

    let game; // instance of the Game
    
    // --- splash

    const buildSplash = ()=> {

        // create HTML
        splashMain = buildDom(`
            <main>
                <h1>Up and Down</h1>
                <button>Start</button>
            </main>
        `)
        
        document.body.appendChild(splashMain);

        const button = splashMain.querySelector('button');
        button.addEventListener('click', startGame)

    }

        // remove the splash to pass to the start of the game
    const destroySplash = ()=>{
        splashMain.remove();
    }


    // --- game 

    const startGame = ()=> {
        destroySplash();
        destroyGameOver();

        game = new Game();
        game.start();
        game.onOver(()=> gameOver(game.score));

    };

    const destroyGame = () => {
        game.destroy();
    };

    // --- game-over


    const gameOver = (score)=> {
        destroyGame();
        buildGameOver(score);
    };

    const buildGameOver= (score)=> {
        
        // create HTML
        gameOverMain = buildDom(`
            <main>
                <h1>Game Over</h1>
                <p>Your score : <span></span></p>
                <button>Restart</button>
            </main>
        `)

        const button = gameOverMain.querySelector('button');
        button.addEventListener('click', startGame);

        const span = gameOverMain.querySelector('span');
        span.innerText = score;


        document.body.appendChild(gameOverMain);
    };

    const destroyGameOver= ()=>{
        if (gameOverMain) {
            gameOverMain.remove();
        }
    }

    

    // --- initialize



    buildSplash();
};

window.addEventListener('load', main());