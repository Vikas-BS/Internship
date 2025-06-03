import React, { Component } from "react";
import {evaluate} from "mathjs";
import "./App.css";
// Basic class based component
// class App extends Component {
//   render() {
//     return (
//       <>
//         <h1>Hello World!!</h1>
//       </>
//     );
//   }
// }
// export default App;

// Timer
// class App extends Component {
   
//         state ={
//             seconds :0,
//             isRunning :false,
//         }
//         intervalId = null;
    
//     startApp =() => {
//         if(!this.state.isRunning){
//             this.intervalId =setInterval(()=>{
//                 this.setState((prevState) =>({
//                     seconds : prevState.seconds +1,
//                 }));
//             } ,1000);
//             this.setState({isRunning:true})
//         }
//     };
//     stopApp =() =>{
//         clearInterval(this.intervalId);
//         this.setState({isRunning:false});
//     };
//     resetApp = () =>{
//         clearInterval(this.intervalId)
//         this.setState({seconds:0,isRunning:false});
//     };
//     componentWillUnmount (){
//         clearInterval(this.intervalId);

//     };
//     render () {
//         return(
            
//             <div style={{textAlign:"center",marginTop:"50px"}}>
//             <h1>Timer {this.state.seconds} seconds</h1>
//             <button onClick={this.startApp}>Start</button>
//             <button onClick={this.stopApp}>Stop</button>
//             <button onClick={this.resetApp}>Reset</button>
//             </div>
            
//         );

//     }

// }
// export default App



// Calculator

class App extends Component{
    state ={
        expression :"",
        result :""
    }
    handleClick = (value) => {
    this.setState((prevState) => ({
      expression: prevState.expression + value,
    }));
    };
    clear = () =>{
        this.setState({expression:"",result:""})
    };
    calculate = () =>{
        try{
            const result=evaluate(this.state.expression);
            this.setState({result:result.toString()});
        }catch(error){
            this.setState({result:"Error"});
        }
    }
    render(){
         const buttons = [
      "7", "8", "9", "/",
      "4", "5", "6", "*",
      "1", "2", "3", "-",
      "0", ".", "=", "+",
    ];
    return (
      <div className="calculator">
        <h2>Calculator</h2>
        <div className="display>">
          <div className="expression">{this.state.expression || "0"}</div>
          <div className="result">{this.state.result}</div>
        </div>
        <div className="buttons">
          <button onClick={this.clear} className="btn-clear">
            AC
          </button>
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => {
                if (btn === "=") {
                  this.calculate();
                } else {
                  this.handleClick(btn);
                }
              }}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    );
    }

}
export default App