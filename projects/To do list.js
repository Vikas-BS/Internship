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

    const deletebutton=document.createElement("button");
    deletebutton.textContent="Delete";
    deletebutton.onclick = () =>{
        li.remove();
    }

    li.appendChild(span);
    li.appendChild(donebutton);
    li.appendChild(editbutton);
    li.appendChild(deletebutton);

    document.getElementById("tasklist").appendChild(li);
    input.value=" ";
}