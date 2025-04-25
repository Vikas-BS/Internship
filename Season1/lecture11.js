/*if we simply use the var function it holds the previous value and prints it for the rest of the code.
We use let here bcoz it has the block scope. */

/*function x(){
    for(let i=1;i<=5;i++){
        setTimeout(function(){
            console.log(i);
        },i * 1000)
    }
}
x();*/

/* if they ask u to use the var and print the numbers. */

function x(){
    for (var i=1;i<=10;i++){
        function close(x){
            setTimeout(function(){
                console.log(x);
            },x * 100)
        }
        close(i);
    }
}
x();

