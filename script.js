let currentPlayer = 'X'; // Player X starts
let board = ['', '', '', '', '', '', '', '', '']; // Board array to keep track of moves
let gameActive = false; // Flag to track if the game is still ongoing
let playerXName = '';
let playerOName = '';
let playerXScore = 0;
let playerOScore = 0;

// Get elements
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status-text');
const resetButton = document.getElementById('reset-btn');
const startGameButton = document.getElementById('start-game-btn');
const playerXInput = document.getElementById('player-x-name');
const playerOInput = document.getElementById('player-o-name');
const scoreboard = document.querySelector('.scoreboard');
const gameEndButton = document.getElementById('game-end-btn');
const playerXScoreText = document.getElementById('player-x-score');
const playerOScoreText = document.getElementById('player-o-score');

// Check for win condition
const checkWin = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    // Loop through each winning pattern
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false; // Game over
            if (currentPlayer === 'X') {
                playerXScore++; // Player X wins
                playerXScoreText.textContent = `${playerXName}: ${playerXScore}`;
                playerXScoreText.classList.add('highlight');
                statusText.innerHTML = `<span class="highlight-winner">${playerXName}</span> Wins!`;
            } else {
                playerOScore++; // Player O wins
                playerOScoreText.textContent = `${playerOName}: ${playerOScore}`;
                playerOScoreText.classList.add('highlight');
                statusText.innerHTML = `<span class="highlight-winner">${playerOName}</span> Wins!`;
            }
            gameEndButton.style.display = 'inline-block'; // Show Game End button
            return;
        }
    }

    // Check for draw
    if (!board.includes('')) {
        gameActive = false; // Game over
        statusText.textContent = 'It\'s a Draw!';
        gameEndButton.style.display = 'inline-block'; // Show Game End button
    }
};

// Handle cell click event
const handleCellClick = (index) => {
    if (gameActive && !board[index]) {
        // Mark the cell with the current player's symbol
        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        checkWin();
        if (gameActive) {
            // Switch player turn
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusText.textContent = `${currentPlayer === 'X' ? playerXName : playerOName}'s Turn`;
        }
    }
};

// Add click event listeners to cells
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

// Reset the game
resetButton.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', '']; // Reset board
    gameActive = true;
    currentPlayer = 'X'; // Start with Player X
    cells.forEach(cell => cell.textContent = ''); // Clear all cells
    statusText.textContent = `${playerXName}'s Turn`; // Reset turn to Player X
    gameEndButton.style.display = 'none'; // Hide the Game End button

    // Remove highlights from previous winner's name and score
    playerXScoreText.classList.remove('highlight');
    playerOScoreText.classList.remove('highlight');
    statusText.classList.remove('highlight-winner');
});

// Start game with player names
startGameButton.addEventListener('click', () => {
    playerXName = playerXInput.value.trim();
    playerOName = playerOInput.value.trim();

    // Validate player names
    if (playerXName === '' || playerOName === '') {
        alert('Please enter both player names!');
        return;
    }

    // Hide name input fields and show the game board and scoreboard
    document.querySelector('.player-names').style.display = 'none';
    scoreboard.style.display = 'block';
    document.querySelector('.game-board').style.display = 'block';
    document.querySelector('.status').style.display = 'block';

    // Set the initial status
    statusText.textContent = `${playerXName}'s Turn`;
    gameActive = true;

    // Show both Reset and End Game buttons
    resetButton.style.display = 'inline-block';
    gameEndButton.style.display = 'inline-block';
});

// End the game and return to the start screen
gameEndButton.addEventListener('click', () => {
    // Reset game and show player name input section again
    document.querySelector('.player-names').style.display = 'block';
    scoreboard.style.display = 'none';
    document.querySelector('.game-board').style.display = 'none';
    document.querySelector('.status').style.display = 'none';
    resetButton.style.display = 'none';
    gameEndButton.style.display = 'none';
    
    // Clear previous names and scores
    playerXName = '';
    playerOName = '';
    playerXScore = 0;
    playerOScore = 0;
    playerXScoreText.textContent = `Player X: 0`;
    playerOScoreText.textContent = `Player O: 0`;
    statusText.textContent = 'Enter player names and start the game';
});
