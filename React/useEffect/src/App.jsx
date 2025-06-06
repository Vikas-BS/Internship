import { useState , useEffect} from 'react'

import './App.css'

function App() {
  const [isonline , setisOnline] = useState(navigator.onLine)

  useEffect (() => {
    const handleOnline = () => setisOnline(true);
    const handleOffline = () => setisOnline(false);

    window.addEventListener("onlone",handleOnline);
    window.addEventListener("offline",handleOffline);

    return () =>{
      window.removeEventListener("online",handleOnline);
      window.removeEventListener("offline",handleOffline);

    }
  })



  return (
    <h2>{isonline ? "Online" : "Offline"}</h2>
   
  )
}

export default App
