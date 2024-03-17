import './App.css'
import { Link } from "react-router-dom"

function App() {

  return (
    <>
      <div className='w-full h-screen bg-slate-800 text-white'>
        <h1 className='h-20 flex justify-center items-center font-serif font-bold text-3xl md:text-5xl tracking-wide'>Welcome to Game</h1>
        <div className='w-[95%] md:w-[80%] h-[78%] md:h-[75%] mx-auto mt-5 md:mt-10 rounded-xl border-2 border-emerald-500 overflow-hidden p-2 justify-center items-center'>
          <div className='w-full px-5 md:px-10 text-3xl font-semibold flex items-center justify-between md:justify-start gap-5 mt-10'>
            Play Online : <Link to={`/online`}><button className='border-2 border-white px-4 p-1 rounded-xl text-xl tracking-wide'>Play</button></Link>
          </div>
          <div className='w-full px-5 md:px-10 text-3xl font-semibold flex items-center justify-between md:justify-start gap-5 mt-10'>
            Play with Bot : <Link to={`/bot`}><button className='border-2 border-white px-4 p-1 rounded-xl text-xl tracking-wide'>Play</button></Link>
          </div>
          <div className='w-full px-5 md:px-10 text-3xl font-semibold flex items-center justify-between md:justify-start gap-5 mt-10'>
            Play Locally : <Link to={`/local`}><button className='border-2 border-white px-4 p-1 rounded-xl text-xl tracking-wide'>Play</button></Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
