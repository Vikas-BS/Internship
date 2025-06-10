import React from "react";

const ThemeToggle = ({theme , setTheme}) =>{
    const toggleTheme = () =>{
        setTheme(theme === 'light' ?  'dark' :'light');
        localStorage.setItem('theme' , theme === 'light' ? 'dark' : 'light');
    }

    return(
        <button 
        onClick={toggleTheme}
        className="px-3 py-1 border rounded text-sm font-medium">
            {theme === 'light' ? '🌙'  : '🌞'}
        </button>
    )
}
export default ThemeToggle;