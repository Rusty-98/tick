import React, { useEffect, useMemo, useState } from 'react';
import { Link } from "react-router-dom"
import io from 'socket.io-client';

const Online = () => {
    const socket = useMemo(() => io("https://tic-tack.onrender.com/"), []);
    const [isPlayer, setIsPlayer] = useState(false);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [playerNum, setPlayerNum] = useState("");
    const [wait, setWait] = useState(true);
    const [winner, setWinner] = useState("");
    const [chaal, setChaal] = useState('1');
    const [board, setBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

    const handleJoin = () => {
        if (name === "" || code === "") {
            return;
        }
        setIsPlayer(true);
        const data = {
            name: name,
            code: code,
        };
        socket.emit("enter", data);
    };

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to server");
        });

        return () => {
            socket.off("connect");
        };
    }, [socket]);

    useEffect(() => {
        socket.on("entry", (data) => {
            alert(data);
        });
        socket.on('other', (data) => {
            alert(data);
            setWait(false);
        });

        return () => {
            socket.off('entry');
            socket.off('other');
        };
    }, [socket]);

    useEffect(() => {
        socket.on("player1", (data) => {
            alert(data);
            setPlayerNum("1");
        });
        socket.on("player2", (data) => {
            alert(data);
            setPlayerNum("2");
        });

        return () => {
            socket.off("player1");
            socket.off("player2");
        };
    }, [socket]);

    useEffect(() => {
        const tableHandler = (data) => {
            console.log(data.newData);
            setBoard(data.newData);
            setChaal(data.chaal);
            checkWinner(data.newData);
        };

        socket.on("turnR", tableHandler);

        return () => {
            socket.off("turnR", tableHandler);
        };
    }, []);

    const handleClick = (id) => {
        if (!winner && playerNum === chaal && board[id] === 0) {
            const newData = [...board];
            newData[id] = chaal === '1' ? 1 : 2;
            setBoard(newData);
            checkWinner(newData);
            const nextChaal = chaal === '1' ? '2' : '1';
            setChaal(nextChaal);
            socket.emit('turn', { newData, code, chaal: nextChaal });
        }
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
                setWinner(currentData[a].toString());
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
        <div className='w-full h-screen bg-slate-800 text-white relative'>
            <div className='w-full relative flex items-center'>
                <Link to={`/`}><button className='absolute top-[50%] -translate-y-[50%] left-7 text-xl border-2 border-white px-2 py-1 font-serif tracking-wide font-bold rounded-lg'>Back</button></Link>
                <h1 className='text-5xl font-bold mx-auto font-serif tracking-wider text-center pt-4'>Online Multiplayer</h1>
            </div>
            {!isPlayer && <div className='w-full h-screen absolute top-0 left-0 z-10 flex flex-col items-center justify-center bg-transparent backdrop-blur-xl'>
                <h1 className='font-bold text-2xl md:text-4xl tracking-wide -mt-10 mb-5'>Enter Your Name and Room Code</h1>
                <div className='w-[90%] md:w-[60%] h-[40%] md:h-[60%] border-4 border-emerald-400 rounded-2xl flex flex-col gap-6 items-center pt-5 '>
                    <input type="text" onChange={(e) => { setName(e.target.value) }} className='w-full h-16 bg-transparent text-white font-bold text-3xl tracking-wide px-5 focus:outline-0' placeholder='Your Name' />
                    <input type="text" onChange={(e) => { setCode(e.target.value) }} className='w-full h-16 bg-transparent text-white font-bold text-3xl tracking-wide px-5 focus:outline-0' placeholder='Room Code' />
                    <button className='w-[95%] h-16 bg-emerald-500 text-white font-bold text-3xl tracking-wide rounded-md' onClick={handleJoin}>Join</button>
                </div>
            </div>}
            <div className='w-full h-10 flex items-center font-bold text-xl font-serif tracking-wide text-green-500 px-10 mt-2'>
                {!winner && (chaal === playerNum ? `Your Turn` : `Opponent's Turn`)}
                {winner && (winner === 'draw' ? `It's a draw!` : `Winner is : Player ${winner}!`)}
            </div>
            <div className='w-[90%] md:w-[70%] md:h-[70vh] relative h-[68vh] bg-slate-600 rounded-3xl mt-5 grid grid-cols-3 grid-rows-3 gap-3 overflow-hidden mx-auto '>
                {winner && (
                    <div className="bg-transparent w-[100%] h-full flex flex-col items-center justify-center absolute backdrop-blur-lg text-5xl text-center font-bold">
                        {winner === 'draw' ? `It's a draw!` : `Player ${winner} wins!`}
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-3xl mt-4 text-3xl border border-white" onClick={resetGame}>Play Again</button>
                    </div>
                )}
                {board && board.map((value, index) => (
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

export default Online;
