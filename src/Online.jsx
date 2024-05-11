import React, { useEffect, useMemo, useState } from 'react';
import { Link } from "react-router-dom"
import io from 'socket.io-client';
import { MdContentCopy } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';

const Online = () => {
    const socket = useMemo(() => io("https://tic-tack.onrender.com"), []);
    const [isPlayer, setIsPlayer] = useState(false);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [playerNum, setPlayerNum] = useState("");
    const [wait, setWait] = useState(true);
    const [winner, setWinner] = useState("");
    const [chaal, setChaal] = useState('1');
    const [board, setBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [gcode, setGcode] = useState('- - - - - -');
    const [copied, setCopied] = useState(false); // State to track if code is copied
    const [rule, setRule] = useState(false);

    const copy = () => toast.success('Copied!')
    const codeError = () => toast.error('Wrong code format!')
    const nameError = () => toast.error('Please enter a name!')
    const playerJoin = () => toast.success('Player Joined!')
    const playerone = () => toast("You are Player 1")
    const playertwo = () => toast("You are Player 2")


    const handleJoin = () => {
        if (code === "" || !(/^\d{6}$/.test(code))) {
            // alert("Please enter a 6-digit room code.");
            codeError();
            return;
        }

        if (name === "") {
            // alert("Please enter Name.");
            nameError();
            return;
        }
        setIsPlayer(true);
        const data = {
            name: name,
            code: code,
        };
        socket.emit("enter", data);
    };

    const generateCode = () => {
        const newCode = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit number
        setGcode(newCode.toString());
        setCopied(false); // Reset copied state when generating new code
    };

    const copyCodeToClipboard = () => {
        navigator.clipboard.writeText(gcode);
        // alert('Code copied to clipboard!');
        setCopied(true); // Set copied state to true after copying
        copy();
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
            // alert(data);
            // console.log(data)
        });
        socket.on('other', (data) => {
            // alert(data);
            playerJoin();
            // console.log(data)
            setWait(false);
        });

        return () => {
            socket.off('entry');
            socket.off('other');
        };
    }, [socket]);

    useEffect(() => {
        socket.on("player1", (data) => {
            // alert(data);
            playerone();
            setPlayerNum("1");
        });
        socket.on("player2", (data) => {
            // alert(data);
            playertwo();
            setWait(false);
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

    useEffect(() => {
        socket.on('playerLeft', () => {
            alert('The other player has left the game. 😔');
            // Redirect to the home page
            window.location.href = '/';
        });

        return () => {
            socket.off('playerLeft');
        };
    }, [socket]);

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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleJoin();
        }
    };

    const handleRule = () => {
        setRule(!rule);
    }

    return (
        <div className='w-full h-[94vh] md:h-[95vh] bg-[#131226] text-white relative'>
            <div className='w-full h-16 md:h-20 relative flex items-center'>
                <Link to={`/`}><button className='absolute top-[50%] -translate-y-[50%] left-1 md:left-7 md:text-xl text-lg border-2 border-white px-1 md:px-2 py-1 font-lemon tracking-wide font-bold rounded-lg mt-2'>Back</button></Link>
                <h1 className='text-2xl md:text-5xl font-bold mx-auto font-madimiOne tracking-wider text-center pt-2'>Online Multiplayer</h1>
            </div>
            {!isPlayer && <div className='w-full h-[94vh] md:h-[95vh] absolute top-0 left-0 z-10 flex flex-col items-center justify-center bg-transparent backdrop-blur-xl'>
                <h1 className='font-bold text-2xl md:text-4xl tracking-wide -mt-10 mb-5 font-madimiOne'>Enter Your Name and Room Code</h1>
                <div className='w-[90%] md:w-[60%] h-[40%] md:h-[60%] border-4 border-emerald-400 rounded-2xl flex flex-col gap-6 items-center pt-5 '>
                    <input type="text" onKeyPress={handleKeyPress} onChange={(e) => { setName(e.target.value) }} className='w-full h-16 bg-transparent text-white font-bold text-3xl tracking-wide px-5 focus:outline-0 font-lemon' placeholder='Your Name' />
                    <input type="text" onKeyPress={handleKeyPress} onChange={(e) => { setCode(e.target.value) }} className='w-full h-16 bg-transparent text-white font-bold text-3xl tracking-wide px-5 focus:outline-0 font-lemon' placeholder='Room Code' />
                    <button className='w-[95%] h-16 bg-emerald-500 text-white font-bold text-3xl tracking-wide rounded-md font-lemon' onClick={handleJoin}>Join</button>
                </div>
                <div className='w-[90%] md:w-[60%] h-20 mt-5 flex items-center'>
                    <button className="text-white font-lemon font-bold tracking-wider bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 rounded-lg text-sm md:text-xl px-5 py-2.5 text-center me-2 mb-2" onClick={generateCode}>Generate Code</button>
                    <h1 className='font-lemon font-bold tracking-wider text-lg md:text-2xl'>: {gcode} </h1>
                    {gcode !== '- - - - - -' && <button className={`ml-4 text-lg md:text-xl ${copied && 'bg-green-400'} p-1 md:p-2 rounded-full`} onClick={copyCodeToClipboard}>{<MdContentCopy />}</button>}
                </div>
                <div className='absolute top-5 right-5 h-[50px] w-[50px] border-4 border-purple-500 flex items-center justify-center rounded-full cursor-pointer text-xl md:text-2xl font-lemon' onClick={handleRule} >{rule ? 'X' : '?'}</div>
                {rule && <div className='w-[95%] md:w-[80%] h-[80%] md:h-[85%] bg-orange-500 absolute rounded-2xl shadow-md shadow-white'>
                    <h1 className='text-3xl md:text-5xl text-center font-madimiOne tracking-wider mt-4'>Rule to Play</h1>
                    <p className='text-lg md:text-3xl font-lemon tracking-wide px-5 md:px-10 mt-5 md:mt-20 mb-4 md:mb-10'>1. Enter your name and room code to join the game.</p>
                    <p className='text-lg md:text-3xl font-lemon tracking-wide px-5 md:px-10 mt-3 mb-4 md:mb-10'>2. Share the room code with your friend to join the game.</p>
                    <p className='text-lg md:text-3xl font-lemon tracking-wide px-5 md:px-10 mt-3 mb-4 md:mb-10'>3. The game will start when both players have joined the room.</p>
                    <p className='text-lg md:text-3xl font-lemon tracking-wide px-5 md:px-10 mt-3 mb-4 md:mb-10'>4. The game will end when a player wins or the game is a draw.</p>
                    <p className='text-lg md:text-3xl font-lemon tracking-wide px-5 md:px-10 mt-3 mb-4 md:mb-10'>5. The game will end if any player leaves the game.</p>
                    <p className='text-lg md:text-3xl font-lemon tracking-wide px-5 md:px-10 mt-3 mb-4 md:mb-10 text-black'>6. The code should be of 6 digits and you can generate or enter any.</p>
                </div>}
                <Toaster />
            </div>}
            <div className='w-full h-10 flex items-center font-bold text-xl font-lemon tracking-wide text-green-500 px-10 mt-10 md:mt-2'>
                {wait && `Waiting for another player to join...`}
                {!winner && !wait && (chaal === playerNum ? `Your Turn` : `Opponent's Turn`)}
                {winner && (winner === 'draw' ? `It's a draw!` : `Winner is : Player ${winner}!`)}
            </div>
            <div className='w-[90%] md:w-[70%] md:h-[70vh] relative h-[65vh] bg-slate-600 rounded-3xl mt-5 grid grid-cols-3 grid-rows-3 gap-3 overflow-hidden mx-auto '>
                {wait && isPlayer && <div className='w-full h-full absolute backdrop-blur-md'>
                    <img src="/load.svg" alt="" className='w-[80%] h-[80%] mx-auto' />
                </div>}
                {winner && (
                    <div className="bg-transparent w-[100%] h-full flex flex-col items-center justify-center absolute backdrop-blur-lg text-4xl md:text-5xl text-center font-bold font-lemon">
                        {winner === 'draw' ? `It's a draw!` : `Player ${winner} wins!`}
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-3xl mt-4 text-3xl border border-white" onClick={resetGame}>Play Again</button>
                    </div>
                )}
                {board && board.map((value, index) => (
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
            <Toaster />
        </div>
    );
};

export default Online;
