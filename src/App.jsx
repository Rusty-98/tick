import './App.css'
import { Link } from "react-router-dom"

function App() {

  return (
    <>
      <div className='w-full h-[94vh] md:h-[95vh] bg-slate-800 text-white'>
        <h1 className='h-12 md:h-20 flex justify-center items-center font-bold font-madimiOne text-xl md:text-3xl tracking-wider'>Welcome to Game</h1>
        <h1 className='flex justify-center items-center font-bold font-lemon text-4xl md:text-6xl tracking-wider'>Tic Tac Toe</h1>
        <div className='w-[95%] md:w-[80%] h-[78%] md:h-[74%] mx-auto mt-5 md:mt-10 rounded-xl border-2 border-emerald-500 overflow-hidden p-2 justify-center items-center'>
          <div className='w-full px-5 md:px-10 text-3xl font-semibold flex items-center justify-between md:justify-start gap-5 mt-10'>
            <Link className='btn btn-gradient btn-glow w-full h-20 bg-red-400 rounded-[50px] flex items-center justify-center' to={`/bot`}><div className='text-3xl font-madimiOne tracking-wide'>Single Player</div></Link>
          </div>
          <div className='w-full px-5 md:px-10 text-3xl font-semibold flex items-center justify-between md:justify-start gap-5 mt-10'>
            <Link className='btn btn-gradient btn-glow w-full h-20 bg-red-400 rounded-[50px] flex items-center justify-center' to={`/online`}><div className='text-3xl font-madimiOne tracking-wide'>Multiplayer</div></Link>
          </div>
          <div className='w-full px-5 md:px-10 text-3xl font-semibold flex items-center justify-between md:justify-start gap-5 mt-10'>
            <Link className='btn btn-gradient btn-glow w-full h-20 bg-red-400 rounded-[50px] flex items-center justify-center' to={`/local`}><div className='text-3xl font-madimiOne tracking-wide'>Local Multiplayer</div></Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
