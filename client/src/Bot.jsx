import React, { useState, useEffect } from 'react';
import RLAgent from './RLAgent'; // Import the RLAgent class

const Bot = () => {
    const [board, setBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]); // Board state setup for the game
    const [chaal, setChaal] = useState('Player'); // Determines whose turn it is - Bot or Player
    const [winner, setWinner] = useState(''); // Stores the winner of the game if any
    const [botDelay, setBotDelay] = useState(500); // Delay for Bot's move

    const rlAgent = new RLAgent(); // Create an instance of the RLAgent

    useEffect(() => {
        if (chaal === 'Bot' && winner === '') {
            const botMoveTimer = setTimeout(() => {
                makeBotMove();
            }, botDelay);
            return () => clearTimeout(botMoveTimer);
        }
    }, [chaal, winner, botDelay]);

    const makeBotMove = () => {
        // Bot logic to make a move
        const emptyCells = board.reduce((acc, cell, index) => {
            if (cell === 0) acc.push(index);
            return acc;
        }, []);
        // Use RLAgent to choose the best move
        let botMoveIndex;
        if (emptyCells.length > 0) {
            botMoveIndex = rlAgent.chooseMove(board);
        } else {
            // If no empty cells are available, choose a random move
            botMoveIndex = Math.floor(Math.random() * 9);
        }

        const newData = [...board];
        newData[botMoveIndex] = 2; // Bot's move should be 2
        setBoard(newData);
        checkWinner(newData);
        setChaal('Player'); // Change turn to Player
    };

    // Modify handleClick function to update RLAgent after each move
    const handleClick = (id) => {
        if (winner !== '' || board[id] !== 0) return; // Don't allow clicks if there's already a winner or it's not the current player's turn
        const newData = [...board];
        newData[id] = 2; // Player's move
        setBoard(newData);
        checkWinner(newData);
        setChaal('Bot'); // Change turn to Bot

        // Update RLAgent after each move
        rlAgent.updateQValue(board, id, newData, winner);
    };

    const checkWinner = (currentData) => {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (currentData[a] !== 0 && currentData[a] === currentData[b] && currentData[b] === currentData[c]) {
                if (currentData[a] === 1) {
                    setWinner('Bot');
                } else {
                    setWinner('Player');
                }
                return;
            }
        }

        if (!currentData.includes(0)) {
            setWinner('draw');
        }
    };

    const resetGame = () => {
        setBoard([1, 0, 0, 0, 0, 0, 0, 0, 0]);
        setChaal('Player');
        setWinner('');
    };

    return (
        <div className='w-full h-screen bg-slate-800 text-white'>
            <h1 className='text-5xl font-bold font-serif tracking-wider text-center pt-4'>Tic Tac Toe With Bot</h1>
            <div className='w-full h-10 flex items-center font-bold text-xl font-serif tracking-wide text-green-500 px-10 mt-2'>
                {!winner && (chaal === 'Bot' ? `Bot's Turn` : `Your's Turn`)}
                {winner && (winner === 'draw' ? `It's a draw!` : `Winner: ${winner}`)}
            </div>
            <div className='w-[90%] md:w-[70%] md:h-[70vh] relative h-[68vh] bg-slate-600 rounded-3xl mt-5 grid grid-cols-3 grid-rows-3 gap-3 overflow-hidden mx-auto '>
                {winner && (
                    <div className="bg-transparent w-[100%] h-full flex flex-col items-center justify-center absolute backdrop-blur-lg text-5xl text-center font-bold">
                        {winner === 'draw' ? `It's a draw!` : (winner === 'Bot' ? `Bot wins!` : `You win!`)}
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-3xl mt-4 text-3xl border border-white" onClick={resetGame}>Play Again</button>
                    </div>
                )}
                {board.map((value, index) => (
                    <div
                        key={index}
                        className={`bg-red-400 flex items-center justify-center text-8xl`}
                        id={index}
                        onClick={() => handleClick(index)}
                    >
                        {value === 1 ? 'X' : value === 2 ? 'O' : ''}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bot;
