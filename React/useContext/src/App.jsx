import Rreact from 'react'
import { ThemeProvider } from './ThemeContext'
import ThemeToggler from './ThemeToggler'
import './App.css'

function App() {
 

  return (
   <ThemeProvider>
    <ThemeToggler/>
   </ThemeProvider>
  ) 
}

export default App
