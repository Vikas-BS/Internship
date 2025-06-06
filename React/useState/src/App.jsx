import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [initial , setInitial] = useState("")

  const increase = () => setCount(count + 1) 
  const decrease = () => {
    if(count>0){
      setCount(count -1)
    }
  }
  const reset = () => setCount(0)

  const setStart = () =>{
    const parsed = parseInt(initial);
    if(!isNaN(parsed)){
      setCount(parsed);
      setInitial("")
    }
  }
    
  

  return (
    <div style={{ padding: "10px", textAlign: "center" }} >
      <h1>Counter: {count}</h1>

      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
      <button onClick={reset}>Reset</button>

      <div style={{ marginTop: "20px" }}>
        <input 
        type='number'
        placeholder='Set the initialvalue'
        value={initial}
        onChange={(e) => setInitial(e.target.value)}
        />
        <button onClick={setStart}>Set Counter</button>
      </div>
    </div>
  )
}

export default App
