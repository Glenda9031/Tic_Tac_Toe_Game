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

newGameButton.addEventListener("click", startGame);
newGameVsPlayer.addEventListener("click", startGameVsPlayer);
quitButton.addEventListener("click", quitGame);
quitTiedButton.addEventListener("click", quitGame);
nextRoundButton.addEventListener("click", nextRound);
nextRoundTiedButton.addEventListener("click", nextRound);
backButton.addEventListener("click", handleBackButton);
restartButton.addEventListener("click", restartGame);
window.addEventListener("resize", centerMainContent);

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

selectPlayerX.addEventListener('click', function() {
    playerDisplay.innerHTML = "You chose X.";
    playerDisplay.style.display = 'block';
    selectPlayerX.classList.add("light-background");
    selectPlayerCircle.classList.remove("light-background");
    iconXElement.className = "turnButton-color";
    turnButton.innerHTML = "";
    turnButton.appendChild(iconXElement);
    turnButton.innerHTML += " Turn";
    turnButton.style.color = "#a8bfc9";
    document.getElementById("player-one").innerHTML = "X (You)";
    document.getElementById("player-two").innerHTML = "O (CPU)";
});

selectPlayerCircle.addEventListener('click', function() {
    playerDisplay.innerHTML = "You chose O.";
    playerDisplay.style.display = 'block';
    selectPlayerX.classList.remove("light-background");
    selectPlayerCircle.classList.add("light-background");
    players.setAttribute (
        "class",
        "third-container pick-players players active player"
    );

    document.getElementById("player-two").innerHTML = "O (You";
    document.getElementById("player-one").innerHTML = "X (CPU)";
    aiPlayer(runAi);
});

function handleMouseOver() {
    if (players.classList.contains("active")) {
        this.style.backgroundImage = "url('./assets/icon-o-outline.svg')";
        this.backgroundRepeat = "no-repeat";
        this.backgroundPosition = "center";
    } else {
        this.style.backgroundImage = "url('./assets/icon-x-outline.svg')";
        this.backgroundRepeat = "no-repeat";
        this.backgroundPosition = "center";
    }
}

function checkScreenSize() {
    const isSmallScreen = window.innerWidth <= 600;

    if (isSmallScreen) {
        cellElements.forEach((element) => {
            element.removeEventListener("mouseover", handleMouseOver);
        });
    } else {
        cellElements.forEach((element) => {
            element.addEventListener("mouseover", handleMouseOver);
        });
    }
}

checkScreenSize();

window.addEventListener("resize", checkScreenSize);

cellElements.forEach((element) => {
    element.addEventListener("mouseout", handleMouseOut)
});

function handleMouseOut() {
    this.style = "none";
}

function startGame() {
    if (!playerButtonClicked) {
        alert("Player must chose a mark!");
    } else {
        selectBox.classList.add("hide");
        gameBoard.classList.remove("hide");
    }
}

function startGameVsPlayer() {
    newGameVsPlayerAlert.classList.add("show");
}

function handleBackButton() {
    newGameVsPlayerAlert.classList.remove("show");
}

function quitGame() {
    location.reload();
}

function handleTurnButton() {
    if (playerSign === "x-aiPlayer" || playerSign === "x-humanPlayer") {
        iconCircleElement.className = 'turnButton-color';
        turnButton.innerHTML = "";
        turnButton.appendChild(iconCircleElement);
        turnButton.innerHTML += " Turn";
        turnButton.style.color = "#a8bfc9";
    } else {
        iconXElement.className = 'turnButton-color';
        turnButton.innerHTML = "";
        turnButton.appendChild(iconXElement);
        turnButton.innerHTML += " Turn";
        turnButton.style.color = "#a8bfc9";
    }
}

function clickedBox(element) {
    if (players.classList.contains("players")) {
        playerSign = "circle-humanPlayer";
        element.classList.add("circle");
        players.classList.remove("active");
        element.setAttribute("id", playerSign);
        element.removeEventListener("mouseover", handleMouseOver);
    } else {
        playerSign = "x-humanPlayer";
        element.classList.add("x");
        element.setAttribute("id", playerSign);
        element.removeEventListener("mouseover", handleMouseOver);
    }
    handleTurnButton();
    selectWinner();
    gameBoard.style.pointerEvents = "none";

    let randomTimeDelay = Math.floor(Math.random() * 100) + 200;
    setTimeout(() => {
        aiPlayer(runAi);
    }, randomTimeDelay);
}

function aiPlayer() {
    let emptyBoxes = [];
    if (runAi) {
        playerSign = "circle-aiPlayer";
        for (let i = 0; i < cellElements.length; i++) {
            if (
                !cellElements[i].classList.contains("x") &&
                !cellElements[i].classList.contains("circle")
            ) {
                emptyBoxes.push(i);
            }
        }

        let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        if (emptyBoxes.length > 0) {
            if (players.classList.contains("player")) {
                playerSign = "x-aiPlayer";
                cellElements[randomBox].classList.add("x");
                cellElements[randomBox].setAttribute("id", playerSign);
                players.classList.add("active");
            } else {
                cellElements[randomBox].classList.add("circle");
                cellElements[randomBox].setAttribute("id", playerSign);
                players.classList.remove("active");
            }
            handleTurnButton();
            selectWinner();
        }
        cellElements[randomBox].style.pointerEvents = "none";
        gameBoard.style.pointerEvents = "auto";
    }
}

function restartGame() {
    restartGameMessage.classList.add("show");
    cancelRestartButton.addEventListener("click", () => {
        restartGameMessage.classList.remove("show");
    });
    confirmRestartButton.addEventListener("click", () => {
        restartGameMessage.classList.remove("show");
        playerXScore = 0;
        playerCircleScore = 0;
        tiesScore = 0;
        document.getElementById("playerXScore").innerHTML = `${playerXScore}`;
        document.getElementById("playerCircleScore").innerHTML = `${playerCircleScore}`;
        document.getElementById("tiesScore").innerHTML = `${tiesScore}`;
        nextRound();
    });
}

function nextRound() {
    runAi = true;
    gameEndMessage.classList.remove("show");
    restartGameMessage.classList.remove("show");
    gameTiedMessage.classList.remove("show");
    cellElements.forEach((element) => {
        element.removeAttribute("id");
        element.classList.remove("x", "circle");
        element.style.pointerEvents = "auto";
        element.addEventListener("click", () => {
            element.style.pointerEvents = "none";
        });
        element.addEventListener("mouseover", handleMouseOver);
        checkScreenSize();
    });
    if (playerSign === "circle-aiPlayer" || playerSign === "x-aiPlayer") {
        aiPlayer();
    }
    gameBoard.style.pointerEvents = "auto";
}

function updateScores(playerSign) {
    if (playerSign === "x-humanPlayer" || playerSign === "x-aiPlayer") {
        playerXScore++;
        iconXElement.className = "turnButton-color";
        turnButton.innerHTML = "";
        turnButton.appendChild(iconXElement);
        turnButton.innerHTML += " Turn";
        turnButton.style.color = "#a8bfc9";
        document.getElementById("playerXScore").innerHTML = `${playerXScore}`;
    } else {
        playerSign === "circle-humanPlayer" || playerSign === "circle-aiPlayer";
    } {
        playerCircleScore++;
        document.getElementById("playerCircleScore").innerHTML = `${playerCircleScore}`;
    }
    if (playerSign === "circle-aiPlayer") {
        iconXElement.className = "turnButton-color";
        turnButton.innerHTML = "";
        turnButton.appendChild(iconXElement);
        turnButton.innerHTML += " Turn";
        turnButton.style.color = "#a8bfc9";
    }
}

function getIdValue(className) {
    return document.querySelector(".box + className").id;
}

function checkIdSign(val1, val2, val3, sign) {
    if (
        getIdValue(val1) == sign &&
        getIdValue(val2) == sign &&
        getIdValue(val3) == sign
    ) {
        return true;
    }
}

function selectWinner() {
    if (
      checkIdSign(1, 2, 3, playerSign) ||
      checkIdSign(4, 5, 6, playerSign) ||
      checkIdSign(7, 8, 9, playerSign) ||
      checkIdSign(1, 4, 7, playerSign) ||
      checkIdSign(2, 5, 8, playerSign) ||
      checkIdSign(3, 6, 9, playerSign) ||
      checkIdSign(1, 5, 9, playerSign) ||
      checkIdSign(3, 5, 7, playerSign)
    ) {
      if (playerSign === "x-aiPlayer" || playerSign === "circle-aiPlayer") {
        headerSmall.innerHTML = "Oh no, you lost...";
      } else {
        headerSmall.innerHTML = "You won!";
      }
      if (playerSign === "x-humanPlayer" || playerSign === "x-aiPlayer") {
        iconXElement.classList.remove("turnButton-color");
        iconXElement.style.verticalAlign = "middle";
        headerLarge.innerHTML = "";
        headerLarge.appendChild(iconXElement);
        headerLarge.innerHTML += " takes the round";
        headerLarge.style.color = "#31c3bd";
      } else {
        iconCircleElement.classList.remove("turnButton-color");
        iconCircleElement.style.verticalAlign = "middle";
        headerLarge.innerHTML = "";
        headerLarge.appendChild(iconCircleElement);
        headerLarge.innerHTML += " takes the round";
        headerLarge.style.color = "#f2b137";
      }
  
      runAi = false;
      aiPlayer(runAi);
  
      setTimeout(() => {
        gameEndMessage.classList.add("show");
        gameEndMessage.style.pointerEvents = "auto";
        updateScores(playerSign);
      }, 700);
    } else {
      if (
        getIdValue(1) != "" &&
        getIdValue(2) != "" &&
        getIdValue(3) != "" &&
        getIdValue(4) != "" &&
        getIdValue(5) != "" &&
        getIdValue(6) != "" &&
        getIdValue(7) != "" &&
        getIdValue(8) != "" &&
        getIdValue(9) != ""
      ) {
        if (playerSign === "x-humanPlayer") {
        }
        runAi = false;
        aiPlayer(runAi);
  
        setTimeout(() => {
          gameTiedMessage.classList.add("show");
          gameTiedMessage.style.pointerEvents = "auto";
          headerLarge.style.color = "#A8BFC9";
          tiesScore++;
          document.getElementById("tiesScore").innerHTML = `${tiesScore}`;
          updateScores(playerSign);
        }, 700);
      }
    }
  }







