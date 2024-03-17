import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"

const Soon = () => {
    const [dots, setDots] = useState('.');
    const [dotCount, setDotCount] = useState(1);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDots(prev => prev + '.');
            setDotCount(prev => prev + 1);
        }, 500);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (dotCount > 2) {
            setTimeout(() => {
                setDots('.');
                setDotCount(1);
            }, 500);
        }
    }, [dotCount]);

    return (
        <div className='w-full h-[90vh] md:h-[95vh] bg-slate-800 text-white'>
            <div className='w-full text-xl md:text-3xl tracking-wide font-bold font-madimiOne h-12 md:h-20 flex items-center justify-center'>
                Its a apology that
            </div>
            <div className='w-full text-4xl md:text-6xl tracking-wide font-bold font-madimiOne h-12 md:h-20 flex items-center justify-center'>
                we are working on it
            </div>
            <h1 className='text-3xl text-center mt-20 font-lemon font-bold tracking-wider'>
                Coming Soon {dots}
            </h1>
            <div className="relative left-[50%] -translate-x-[50%] mt-12 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xl font-bold font-lemon tracking-wider text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                <Link to="/" className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
                    Home
                </Link>
            </div>
        </div>
    );
};

export default Soon;
