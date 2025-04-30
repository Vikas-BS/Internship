function calculator(a,b,operation){
     a = parseFloat(prompt("enter the number:"));
     b = parseFloat(prompt("Enter the number"));
     operation= prompt("Enter the operation need to be done : +,-,*,/,");

    let result;

    switch(operation){

        case "+":
            result = a+b;
            break;
        case "-":
            result =a-b;
            break;    
        case "/":
            result =a/b;
            break;
        case "*":
            result =a*b;
            break;  
            
        default:
            result ="Invalid operation"      
    }

    alert(`Result: ${result}`);
}    

calculator();
