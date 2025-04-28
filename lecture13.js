// Function statement or Function decleration

function a(){
    console.log("a called");
}
a();

// Function expression

var b=function(){
    console.log("b called");
}
b();

// Anonymus function, A function without a name

// Named function expression 

var c= function x(){
    console.log("c called");
}
c();
//x();  //reference error : x is not defined (because it can not be accessed in global scope). 

// First class function. Ability to be used like value. We can pass a function inside a function as a argument.

var d=function(parameter1){
    console.log(parameter1);
}
function e(){}
d(e);
