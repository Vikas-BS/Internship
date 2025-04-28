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

/* Garbage Collection and removeEventListeners
Event listeners are heavy as they form closures. 
So even when call stack is empty, EventListener won't free up memory allocated to count as it doesn't know when it may need count again. 
So we remove event listeners when we don't need them (garbage collected) onClick, onHover, onScroll all in a page can slow it down heavily.     */                                                                      