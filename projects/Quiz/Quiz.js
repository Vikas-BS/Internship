// const questions =[
//     {
//         question:"What is the capital of Farance?",
//         options:["Paris","London","Rome","Berlin"],
//         answer:"Paris"
//     },
//     {
//         question: "Which planet is known as the Red Planet?",
//         options: ["Mars", "Venus", "Jupiter", "Saturn"],
//         answer: "Mars"
//     },
//     {
//         question: "Who wrote 'Hamlet'?",
//         options: ["Shakespeare", "Homer", "Dickens", "Austen"],
//         answer: "Shakespeare"
//     }

// ];

// let currentQuestion=0;
// let score=0;

// const question=document.getElementById("question");
// const options=document.getElementById("options");
// const feedback=document.getElementById("feedback");
// const scores=document.getElementById("score");


// function wait(ms){
//     return new Promise(resolve=>setTimeout(resolve,ms));

// }

// function showQuestion(){
//     feedback.textContent="";
//     const q = questions[currentQuestion];
//     question.textContent=q.question;
//     options.innerHTML="";

//     q.options.forEach(option =>{
//         const btn=document.createElement("button");
//         btn.textContent=option;
//         btn.onclick =() => handelAnswer(option);
//         options.appendChild(btn);
//     });

// }

// function handelAnswer(selected){
//     if(currentQuestion >= questions.length) return;
//     const correct = questions[currentQuestion].answer;
//     if( selected === correct){
//         feedback.textContent="Corrext!"
//         score ++;
//     }else{
//         feedback.textContent="Wrong!"
//     } 


//     Array.from(options.children).forEach(btn=>btn.disabled=true);
//     wait(2000).then(()=>{
//         currentQuestion++;
//         if(currentQuestion<questions.length){
//             showQuestion();
//         }else{
//             showScore();
//         }
//     });
// }

// function showScore(){
//     question.textContent="Quiz Completed";
//     options.innerHTML="";
//     feedback.textContent="";
//     scores.textContent=`Your Score ${score} / ${questions.length}`;

// }
// showQuestion();







// Using Axios

let questions =[]
let currentQuestion=0;
let score=0;

const question=document.getElementById("question");
const options=document.getElementById("options");
const feedback=document.getElementById("feedback");
const scores=document.getElementById("score");


function wait(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));

}

async function fetchQuestion(){
   try{
    const res=await axios.get('');
    question =res.data;
    showQuestion();
   }
   catch(error){
    question.textContent="Failed to load question";
    console.error(error);
   }

}

function showQuestion(){
    feedback.textContent="";
    const q = questions[currentQuestion];
    question.textContent=q.question;
    options.innerHTML="";

    q.options.forEach(option =>{
        const btn=document.createElement("button");
        btn.textContent=option;
        btn.onclick =() => handelAnswer(option);
        options.appendChild(btn);
    });

}

function handelAnswer(selected){
    if(currentQuestion >= questions.length) return;
    const correct = questions[currentQuestion].answer;
    if( selected === correct){
        feedback.textContent="Corrext!"
        score ++;
    }else{
        feedback.textContent="Wrong!"
    } 


    Array.from(options.children).forEach(btn=>btn.disabled=true);
    wait(2000).then(()=>{
        currentQuestion++;
        if(currentQuestion<questions.length){
            showQuestion();
        }else{
            showScore();
        }
    });
}

function showScore(){
    question.textContent="Quiz Completed";
    options.innerHTML="";
    feedback.textContent="";
    scores.textContent=`Your Score ${score} / ${questions.length}`;

}
fetchQuestion();

