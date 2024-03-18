import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Sbot = () => {
    const [board, setBoard] = useState([1, 0, 0, 0, 0, 0, 0, 0, 0]); // Board state setup for the game
    const [chaal, setChaal] = useState('Player');  // Determines whose turn it is - Bot or Player
    const [winner, setWinner] = useState(''); // Stores the winner of the game if any
    const [botDelay, setBotDelay] = useState(500); // Delay for Bot's move

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
        const winningCombinations = [
            [0, 1, 2], [1, 2, 0], [0, 2, 1],
            [3, 4, 5], [4, 5, 3], [3, 5, 4],
            [6, 7, 8], [7, 8, 6], [6, 8, 7],
            [0, 3, 6], [3, 6, 0], [0, 6, 3],
            [1, 4, 7], [4, 7, 1], [1, 7, 4],
            [2, 5, 8], [5, 8, 2], [2, 8, 5],
            [0, 4, 8], [4, 8, 0], [0, 8, 4],
            [2, 4, 6], [4, 6, 2], [2, 6, 4]
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] === 1 && board[b] === 1 && board[c] === 0) {
                const newData = [...board];
                newData[c] = 1; // Bot's move
                setBoard(newData);
                checkWinner(newData);
                setChaal('Player'); // Change turn to Player
                return;
            }
        }
        const emptyCells = board.reduce((acc, cell, index) => {
            if (cell === 0) acc.push(index);
            return acc;
        }, []);


        //first condition
        if (board[3] === 2 && board[4] === 0 && board[1] === 0 && board[2] === 0 && board[6] === 0 && board[7] === 0 && board[8] === 0) {
            const newData = [...board];
            newData[4] = 1; // Bot's move
            setBoard(newData);
            checkWinner(newData);
            setChaal('Player'); // Change turn to Player
            return;

        }

        if (board[1] === 2 && board[4] === 0 && board[3] === 0 && board[2] === 0 && board[6] === 0 && board[7] === 0 && board[8] === 0) {
            const newData = [...board];
            newData[4] = 1; // Bot's move
            setBoard(newData);
            checkWinner(newData);
            setChaal('Player'); // Change turn to Player
            return;
        }

        if (board[4] === 1 && board[8] === 0) {
            const newData = [...board];
            newData[8] = 1; // Bot's move
            setBoard(newData);
            checkWinner(newData);
            setChaal('Player'); // Change turn to Player
            return;
        }

        if (board[4] === 1 && board[8] === 2 && board[3] === 0 && board[6] === 0) {
            const newData = [...board];
            newData[6] = 1; // Bot's move
            setBoard(newData);
            checkWinner(newData);
            setChaal('Player'); // Change turn to Player
            return;
        }

        if (board[4] === 1 && board[8] === 2 && board[1] === 0 && board[2] === 0) {
            const newData = [...board];
            newData[2] = 1; // Bot's move
            setBoard(newData);
            checkWinner(newData);
            setChaal('Player'); // Change turn to Player
            return;
        }

        if (board[6] === 2 && board[8] === 0) {
            const newData = [...board];
            newData[8] = 1; // Bot's move
            setBoard(newData);
            checkWinner(newData);
            setChaal('Player'); // Change turn to Player
            return;
        }

        if (board[6] === 2 && board[8] === 1 && board[4] === 2 && board[2] === 0) {
            const newData = [...board];
            newData[2] = 1; // Bot's move
            setBoard(newData);
            checkWinner(newData);
            setChaal('Player'); // Change turn to Player
            return;
        }

        if (board[2] === 2 && board[8] === 0) {
            const newData = [...board];
            newData[8] = 1; // Bot's move
            setBoard(newData);
            checkWinner(newData);
            setChaal('Player'); // Change turn to Player
            return;
        }

        if (board[0] === 1 && board[2] === 2 && board[8] === 1 && board[4] === 2 && board[6] === 0 && board[3] === 0 && board[5] === 0 && board[7] === 0) {
            const newData = [...board];
            newData[6] = 1; // Bot's move
            setBoard(newData);
            checkWinner(newData);
            setChaal('Player'); // Change turn to Player
            return;
        }

        if (board[0] === 1 && board[8] === 2 && (board[6] === 0 || board[2] === 0) && board[4] === 0 && board[1] === 0 && board[3] === 0 && board[5] === 0 && board[7] === 0) {
            const newData = [...board];
            const randomIndex = Math.random() < 0.5 ? 6 : 2; // Randomly choose between 6 or 2
            newData[randomIndex] = 1; // Bot's move
            setBoard(newData);
            checkWinner(newData);
            setChaal('Player'); // Change turn to Player
            return;
        }

        //critical conditions

        if (board[0] === 1 && board[8] === 2 && board[2] === 1 && board[1] === 2 && board[6] === 0 && board[3] === 0 && board[4] === 0 && board[5] === 0 && board[7] === 0) {
            const newData = [...board];
            newData[6] = 1; // Bot's move
            setBoard(newData);
            checkWinner(newData);
            setChaal('Player'); // Change turn to Player
            return;
        }

        //critical conditions

        if (board[0] === 1 && board[8] === 2 && board[6] === 1 && board[3] === 2 && board[2] === 0 && board[1] === 0 && board[4] === 0 && board[5] === 0 && board[7] === 0) {
            const newData = [...board];
            newData[2] = 1; // Bot's move
            setBoard(newData);
            checkWinner(newData);
            setChaal('Player'); // Change turn to Player
            return;
        }

        // uper wale ke baad ki challe hai ye
        if (board[1] === 2 && board[4] === 1 && board[8] === 0) {
            const newData = [...board];
            newData[8] = 1; // Bot's move
            setBoard(newData);
            checkWinner(newData);
            setChaal('Player'); // Change turn to Player
            return;

        }

        // condition one ko block per
        if (board[1] === 2 && board[4] === 1 && board[8] === 2 && board[6] === 0) {
            const newData = [...board];
            newData[6] = 1; // Bot's move
            setBoard(newData);
            checkWinner(newData);
            setChaal('Player'); // Change turn to Player
            return;
        }

        if ((board[8] === 2) && board[6] === 0) {
            const newData = [...board];
            newData[6] = 1; // Bot's move
            setBoard(newData);
            checkWinner(newData);
            setChaal('Player'); // Change turn to Player
            return;
        }

        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const botMoveIndex = emptyCells[randomIndex];

        const newData = [...board];
        newData[botMoveIndex] = 1; // Bot's move
        setBoard(newData);
        checkWinner(newData);
        setChaal('Player'); // Change turn to Player
    };

    const handleClick = (id) => {
        if (winner !== '' || board[id] !== 0) return; // Don't allow clicks if there's already a winner or it's not the current player's turn
        const newData = [...board];
        newData[id] = 2; // Player's move
        setBoard(newData);
        checkWinner(newData);
        setChaal('Bot'); // Change turn to Bot
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
        <div className='w-full h-[94vh] md:h-[95vh] bg-[#131226] text-white'>
            <h1 className='text-4xl md:text-5xl font-bold font-madimiOne tracking-wider text-center pt-4'>Tic Tac Toe With Bot</h1>
            <div className='w-full h-10 flex items-center justify-between font-bold text-xl font-lemon tracking-wide text-green-500 px-10 mt-5 md:mt-4'>
                <Link to={"/"} className='text-white border-2 text-lg md:text-xl border-white px-1 md:px-2 py-1 font-lemon tracking-wide font-bold rounded-lg'>Back</Link>
                {!winner && (chaal === 'Bot' ? `Bot's Turn` : `Your's Turn`)}
                {winner && (winner === 'draw' ? `It's a draw!` : `Winner: ${winner}`)}
            </div>
            <div className='w-[90%] md:w-[70%] md:h-[70vh] relative h-[68vh] bg-slate-600 rounded-3xl mt-5 grid grid-cols-3 grid-rows-3 gap-3 overflow-hidden mx-auto '>
                {winner && (
                    <div className="bg-transparent w-[100%] h-full flex flex-col items-center justify-center absolute backdrop-blur-lg text-5xl text-center font-bold font-madimiOne">
                        {winner === 'draw' ? `It's a draw!` : (winner === 'Bot' ? `Bot wins!` : `You win!`)}
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-3xl mt-4 text-3xl border border-white" onClick={resetGame}>Play Again</button>
                    </div>
                )}
                {board.map((value, index) => (
                    <div
                        key={index}
                        className={`bg-red-400 flex items-center justify-center text-8xl font-lemon`}
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

export default Sbot;
