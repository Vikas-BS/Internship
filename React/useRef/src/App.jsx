import { useState,useRef } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const timeRef = useRef(null);

  const startTimer = () => {
    if(timeRef.current !== null) return;

    timeRef.current = setInterval(()=>{
      setCount((prev) => prev +1);
    },1000)
  }

  const stopTimer = ()=>{
    clearInterval(timeRef.current);
    timeRef.current=null;
  }

  const resetTimer =()=>{
    clearInterval(timeRef.current);
    timeRef.current=null;
    setCount(0)
  }
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h1>Stopper Watch {count}</h1>
        <button onClick={startTimer}>Start Timer</button>
        <button onClick={stopTimer} style={{ margin: "0 10px" }}>Stop Timer </button>
        <button onClick={resetTimer}>Reset Timer</button>
        </div>
    </>
  )
}

export default App
