import './App.css'
import { Link } from "react-router-dom"

function App() {

  return (
    <>
      <div className='w-full h-screen bg-slate-800 text-white'>
        <h1 className='h-20 flex justify-center items-center font-serif font-bold text-5xl tracking-wide'>First Page</h1>
        <div className='w-[80%] h-[80%] mx-auto mt-10 rounded-xl border-2 border-emerald-500 overflow-hidden p-2'>
          <div className='w-full px-10 text-3xl font-semibold flex items-center gap-5 mt-10'>
            Play Online Multiplayer : <Link to={`/online`}><button className='border-2 border-white px-4 p-1 rounded-xl text-xl tracking-wide'>Play</button></Link>
          </div>
          <div className='w-full px-10 text-3xl font-semibold flex items-center gap-5 mt-10'>
            Play with Bot : <Link to={`/bot`}><button className='border-2 border-white px-4 p-1 rounded-xl text-xl tracking-wide'>Play</button></Link>
          </div>
          <div className='w-full px-10 text-3xl font-semibold flex items-center gap-5 mt-10'>
            Play Locally : <Link to={`/local`}><button className='border-2 border-white px-4 p-1 rounded-xl text-xl tracking-wide'>Play</button></Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
