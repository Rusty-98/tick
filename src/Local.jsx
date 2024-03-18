import React, { useState } from 'react'
import { Link } from "react-router-dom"

const Local = () => {

    const [board, setBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]); // Board state setup for the game
    const [chaal, setChaal] = useState('1');  // Determines whose turn it is - Player 1 or 2
    const [winner, setWinner] = useState(''); // Stores the winner of the game if any

    const handleClick = (id) => {
        if (winner !== '' || board[id] !== 0) return; // Don't allow clicks if there's already a winner or it's not the current player's turn
        const newData = [...board];
        newData[id] = chaal === '1' ? 1 : 2; // Player 1 move
        setBoard(newData);
        checkWinner(newData);
        setChaal(chaal === '1' ? '2' : '1'); // Change turn to Player 2 if player 1 is the current
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
                    setWinner("1");
                } else {
                    setWinner('2');
                }
                return;
            }
        }

        if (!currentData.includes(0)) {
            setWinner('draw');
        }
    };

    const resetGame = () => {
        setBoard([0, 0, 0, 0, 0, 0, 0, 0, 0]);
        setChaal('1');
        setWinner('');
    };

    return (
        <div className='w-full h-[94vh] bg-slate-800 text-white'>
            <div className='w-full relative flex items-center'>
                <Link to={`/`}><button className='absolute top-[50%] -translate-y-[50%] left-2 md:left-7 text-xl border-2 border-white px-2 py-1 mt-2 font-lemon tracking-wide font-bold rounded-lg'>Back</button></Link>
                <h1 className='text-4xl md:text-5xl font-bold mx-auto tracking-wider text-center pt-4 font-madimiOne'>Tic Tac Toe</h1>
            </div>
            <div className='w-full h-10 flex items-center font-bold text-xl font-lemon tracking-wide text-green-500 px-10 mt-2'>
                {!winner && (chaal === '1' ? `Player 1 Turn` : `Player 2 Turn`)}
                {winner && (winner === 'draw' ? `It's a draw!` : `Winner: Player ${chaal === '2' ? 1 : 2} !`)}
            </div>
            <div className='w-[90%] md:w-[70%] md:h-[70vh] relative h-[68vh] bg-slate-600 rounded-3xl mt-5 grid grid-cols-3 grid-rows-3 gap-3 overflow-hidden mx-auto '>
                {winner && (
                    <div className="bg-transparent w-[100%] h-full flex flex-col items-center justify-center absolute backdrop-blur-lg text-4xl md:text-5xl text-center font-bold font-lemon">
                        {winner === 'draw' ? `It's a draw!` : (winner === '1' ? `Player 1 wins!` : `Player 2 wins!`)}
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
    )
}

export default Local