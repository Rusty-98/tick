import React, { useState, useEffect } from 'react';

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
        <div className='w-full h-screen bg-slate-800 text-white flex items-center justify-center'>
            <h1 className='text-6xl font-bold tracking-wider font-serif'>
                Coming Soon {dots}
            </h1>
        </div>
    );
};

export default Soon;
