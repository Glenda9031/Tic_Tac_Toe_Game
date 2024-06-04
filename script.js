// Variables 

const selectBox = document.querySelector('.game-start-menu');
const selectPlayerX = document.querySelector('.icon-x');
const selectPlayerCircle = document.querySelector('.icon-circle');
const gameBoard = document.querySelector('#game-board');
const players = document.querySelectorAll('.pick-players');
const playerButtons = document.querySelectorAll('.pick-player-button');
const cellElements = document.querySelectorAll('#game-board-grid section span');
const gameEndMessage = document.querySelector('#game-end-message');
const restartGameMessage = document.querySelector('.restart-game-message');
const gameTiedMessage = document.querySelector('#game-tied-message');
const newGameVsPlayer = document.querySelector('#new-game-multiplayer');
const newGameVsPlayerAlert = document.querySelector('#new-game-vs-player-alert');
const backButton = document.querySelector('.back-button');
const restartButton = document.querySelector('.restart-button');
const quitButton = document.querySelector('.quit-button');
const quitTiedButton = document.querySelector('.quit-tied-button');
const cancelRestartButton = document.querySelector('.cancel-restart-button');
const confirmRestartButton = document.querySelector('.confirm-restart-button');
const nextRoundButton = document.querySelector('.next-round-button');
const nextRoundTiedButton = document.querySelector('.next-round-tied-button');
const playerDisplay = document.querySelector('#playerDisplay');
const newGameButton = document.querySelector('#new-game-solo');
const headerLarge = document.querySelector('.game-end-header-large');
const headerSmall = document.querySelector('.game-end-header-small');
const turnButton = document.querySelector('.turn-button');

let playerXScore = 0;
let playerCircleScore = 0;
let tiesScore = 0;
let playerButtonClicked = false;
let runAi = true;

// Init and Functions

function centerMainContent() {
    let centeredContent = document.querySelector('.body');
    let windowHeight = window.innerHeight;
    let contentHeight = centeredContent.offsetHeight;
    
    let marginTop = (windowHeight - contentHeight) / 2;

    centeredContent.style.marginTop = marginTop + 'px';
}
centerMainContent();

const iconX = new Image();
iconX.src = 'assets/icon-x.png';
iconX.alt = 'icon-x';

const iconXElement = document.createElement('img');
iconXElement.src = 'assets/icon-x.png';
iconXElement.alt = 'icon-x';
iconXElement.style.cssText = "";
iconXElement.style.verticalAlign = 'middle';
iconXElement.style.marginRight = '10px';

const iconCircle = new Image();
iconCircle.src = 'assets/icon-circle.png';
iconCircle.alt = 'icon-circle';

const iconCircleElement = document.createElement('img');
iconCircleElement.src = iconCircle.src;
iconCircleElement.alt = iconCircle.alt;
iconCircleElement.style.cssText = "";
iconCircleElement.style.verticalAlign = 'middle';
iconCircleElement.style.marginRight = '10px';

playerButtonClicked.forEach((button) => {
    button.addEventListener('click', function() {
        playerButtonClicked = true;
    });
});



// Event Listeners 

newGameButton.addEventListener('click', startGame);
newGameVsPlayer.addEventListener('click', startGameVsPlayer);
quitButton.addEventListener('click', quitGame);
quitTiedButton.addEventListener('click', quitGame);
nextRoundButton.addEventListener('click', nextRound);
nextRoundTiedButton.addEventListener('click', nextRound);
backButton.addEventListener('click', handleBackButton);
restartButton.addEventListener('click', restartGame);
window.addEventListener('resize', centerMainContent);

window.onload = () => {
    for (let i = 0; i < cellElements.length; i++) {
        cellElements[i].addEventListener('click', function() {
            clickedBox(this);
        });
        playerDisplay.style.display = 'none';
    }
}

