// Simple Calculator

// function calculator(a,b,operation){
//      a = parseFloat(prompt("enter the number:"));
//      b = parseFloat(prompt("Enter the number"));
//      operation= prompt("Enter the operation need to be done : +,-,*,/,");

//     let result;

//     switch(operation){

//         case "+":
//             result = a+b;
//             break;
//         case "-":
//             result =a-b;
//             break;    
//         case "/":
//             result =a/b;
//             break;
//         case "*":
//             result =a*b;
//             break;  
            
//         default:
//             result ="Invalid operation"      
//     }

//     alert(`Result: ${result}`);
// }    

// calculator();



// To DO List


function addtask(){
    const input= document.getElementById("Taskinput");
    const taskText =input.value.trim();
    if (taskText ==="") return alert("Enter the task");

    const li =document.createElement("button");

    const span=document.createElement("span");
    span.textContent= taskText;


    const donebutton=document.createElement("button");
    donebutton.textContent="✓";
    donebutton.onclick =() =>{
        span.classList.toggle("done");

    }

    const editbutton=document.createElement("button");
    editbutton.textContent="Edit";
    editbutton.onclick=() =>{
        const newtask=prompt("Edit your task:",span.textContent)
        if(newtask !== null && newtask.trim() !== " "){
            span.textContent= newtask.trim();
        }
    }

    const deletebutto=document.createElement("button");
    deletebutto.textContent="Delete";
    deletebutto.onclick = () =>{
        li.remove();
    }

    li.appendChild(span);
    li.appendChild(donebutton);
    li.appendChild(editbutton);
    li.appendChild(deletebutto);

    document.getElementById("tasklist").appendChild(li);
    input.value=" ";
}