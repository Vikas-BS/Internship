import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const ThemeToggler = () =>{
    const {theme , toggleTheme} = useContext(ThemeContext);
    const style = {
    backgroundColor: theme === "light" ? "#fff" : "#333",
    color: theme === "light" ? "#000" : "#fff",
    padding: "20px",
    textAlign: "center",
    borderRadius: "8px"
  };
  return(
    <div style={{style}}>
        <h1>{theme === "light" ? "lightmode" : "darkmode"}</h1>
        <button onClick={toggleTheme}>Switch to {theme === "light" ? "dark" : "light"}</button>
    </div>
  )
}
export default ThemeToggler