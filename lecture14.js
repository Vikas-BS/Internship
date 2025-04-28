/* Callback function
It gives access to the asynchronous world in the synchronous world */
setTimeout(function(){
    console.log("time");
},5000);
function x(y){
    console.log("x");
    y();

}
x(function y(){
    console.log("y");
    
});
/* All the 3 functions are executed through the call stack, 
 if any operation block the call stack it is called blocking the main thread. */


// Event Listener
let count=0;

 document.getElementById("clickMe").addEventListener("click", function(){
 console.log("Button clicked",++count)});