const express = require('express');
const app = express();
const PORT = 3000;

let tasks =[];
let currentId =1;
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello ppl');
})

app.get('tasks' ,(req,res)=>{
    res.json(tasks);
})

app.post('/tasks',(req,res)=>{
    const{title,completed=false} =req.body;
    const newTask = {id: currentId++,title,completed};
    tasks.push(newTask);
    res.status(201).json(newTask);
})

app.get('tasks/:id' ,(req,res)=>{
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if(!task) return res.status(404).json({error:'Task not found'});
    res.json(task);
    })

app.put('tasks/:id' ,(req,res)=>{
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if(!task) return res.status(404).json({error:'Task not found'});
    
    const {title,completed} = req.body;
    if(title !== undefined) task.title =title;
    if(completed !== undefined) task.completed=completed;
    res.json(task)
    })

app.delete('tasks/:id' , (req,res)=>{
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if(taskIndex == -1) return res.status(404).json({error:'Task not found'});
    const deleted = tasks.splice(taskIndex,1);
    res.json({message:'Task deleted' , task:deleted[0]})
})    



app.listen(PORT , ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})