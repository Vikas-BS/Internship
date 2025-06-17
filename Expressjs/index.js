const express = require('express');
const app = express();
const PORT = 3000;

app.get('/',(req,res)=>{
    res.send('hello world');
})

app.get('/about' ,(req,res) =>{
    res.send('About Page');
})

app.get('/about/a' ,(req,res) =>{
    res.send('hello from a');
})

app.use(express.json());
app.post('/data' ,(req,res)=>{
    console.log(req.body);
    res.send('Data recived')
})

app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
})

app.listen(PORT , () =>{
    console.log('Server running at http://localhost:${PORT}');
})