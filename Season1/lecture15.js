/* Event loop 
The Js engine has the 3 main parts
Call Stack
Web APIs
Callback

the job of the event loop is to check the call stack is empty or not. */

console.log("start");

setTimeout(function cb(){  // callback queue
    console.log("timer");
},2000);

console.log("end"); 


console.log("Start");
setTimeout(function cbT() {  // callback queue
  console.log("CB Timeout");
}, 5000);
fetch("https://api.github.com/users/alok722").then(function cbF() {  //Microtask queue (it has the 1st priority when compared to call satck.)
    console.log("CB Netflix");
}); 
console.log("End");