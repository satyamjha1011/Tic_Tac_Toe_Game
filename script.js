let currentPlayer = 'X'; // Player X starts
let board = ['', '', '', '', '', '', '', '', '']; // Board array to keep track of moves
let gameActive = false; // Flag to track if the game is still ongoing
let playerXName = '';
let playerOName = '';

// Get elements
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status-text');
const resetButton = document.getElementById('reset-btn');
const startGameButton = document.getElementById('start-game-btn');
const playerXInput = document.getElementById('player-x-name');
const playerOInput = document.getElementById('player-o-name');

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
            statusText.textContent = `${currentPlayer === 'X' ? playerXName : playerOName} Wins!`;
            return;
        }
    }

    // Check for draw
    if (!board.includes('')) {
        gameActive = false; // Game over
        statusText.textContent = 'It\'s a Draw!';
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

    // Hide name input fields and show the game board
    document.querySelector('.player-names').style.display = 'none';
    document.querySelector('.game-board').style.display = 'block';
    document.querySelector('.status').style.display = 'block';

    // Set the initial status
    statusText.textContent = `${playerXName}'s Turn`;
    gameActive = true;
});



