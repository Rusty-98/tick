class RLAgent {
    constructor() {
        // Define Q-table to store Q-values
        this.qTable = {};
        // Define hyperparameters
        this.alpha = 0.1; // Learning rate
        this.gamma = 0.9; // Discount factor
        // Initialize Q-values for all possible states and actions
        this.initializeQTable();
    }

    initializeQTable() {
        // Loop through all possible board states (3^9 = 19683 states for Tic Tac Toe)
        for (let i = 0; i < 19683; i++) {
            // Convert state index to base 3 (0 represents an empty cell, 1 represents player's mark, 2 represents bot's mark)
            const state = i.toString(3).padStart(9, '0');
            // Initialize Q-values for all possible actions (empty cells)
            this.qTable[state] = Array(9).fill(0);
        }
    }

    chooseMove(board) {
        const state = this.boardToState(board);
        const qValues = this.qTable[state];
        // Choose the action (move) with the highest Q-value
        const action = qValues.indexOf(Math.max(...qValues));
        return action;
    }

    updateQValue(prevBoard, action, newBoard, winner) {
        const prevState = this.boardToState(prevBoard);
        const newState = this.boardToState(newBoard);
        const reward = this.calculateReward(winner);
        // Update Q-value using Q-learning formula
        this.qTable[prevState][action] += this.alpha * (reward + this.gamma * Math.max(...this.qTable[newState]) - this.qTable[prevState][action]);
    }

    boardToState(board) {
        // Convert the board configuration to a state representation
        return board.map(cell => cell.toString()).join('');
    }

    calculateReward(winner) {
        // Assign rewards based on the game outcome
        if (winner === 'Bot') {
            return 1; // Bot wins
        } else if (winner === 'Player') {
            return -1; // Player wins
        } else {
            return 0; // Draw
        }
    }
}

export default RLAgent;
