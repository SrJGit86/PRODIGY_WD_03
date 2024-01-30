const statusDisplay = document.querySelector('.game-status');
const start_btn = document.getElementById('start-game');
const front_page = document.getElementById('front');
const gamePage = document.getElementById('game-page');
const celebrate = document.querySelector('.celebration');
const player_first = document.getElementById('playerFirst');
const player_sec = document.getElementById('playerSecond');
let currentPlayerName = "";
celebrate.style.display = 'none';
gamePage.style.display = 'none';



let gameActive = true;
let currentPlayer = "X";
console.log(currentPlayerName);
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayerName} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayerName}'s turn`;

start_btn.addEventListener('click', () => {
    front_page.style.display = 'none';
    gamePage.style.display = 'block';
    currentPlayerName = player_first.value;
    statusDisplay.innerHTML = currentPlayerTurn();
})



const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    currentPlayerName = currentPlayerName === player_first.value ? player_sec.value : player_first.value;
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultProcess() {

    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '')
            continue;
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        celebrate.style.display = 'block';
        gameActive = false;
        return;
    }

    const roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {


    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    if (gameState[clickedCellIndex] !== "" || !gameActive)
        return;

    handleCellPlayed(clickedCell, clickedCellIndex);

    handleResultProcess();
}

function handleRestartGame() {
    celebrate.style.display = 'none';
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);