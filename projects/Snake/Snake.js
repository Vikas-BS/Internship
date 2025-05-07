const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColour = "brown";
const snakeBorder = "black";
const foodColor ="red ";
const unitsize = 25;
let running = false;
let xVelocity = unitsize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake=[
    {x:unitsize* 4, y:0},
    {x:unitsize* 3, y:0},
    {x:unitsize* 2, y:0},
    {x:unitsize* 1, y:0},
    {x:0, y:0}
];

window.addEventListener("keydown",changeDirection);
resetBtn.addEventListener("click",resetGame);

gameStart();


function gameStart(){
    running=true;
    scoreText.textContent=score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameover();
            nextTick();
        },200);
    }
    else{
        displayGameover();
    }

};
function clearBoard(){
    ctx.fillStyle= boardBackground;
    ctx.fillRect(0,0,gameWidth,gameHeight);
};
function createFood(){
    function randomFood(min,max){
        const randNum = Math.round((Math.random()*(max-min)+min)/unitsize)*unitsize;
        return randNum;
    }
    foodX = randomFood(0,gameWidth-unitsize);
    foodY = randomFood(0,gameWidth-unitsize);
};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX,foodY,unitsize,unitsize);
}
function moveSnake(){
    const head={x:snake[0].x + xVelocity,
                y:snake[0].y + yVelocity};
    snake.unshift(head);
    if(snake[0].x == foodX && snake[0].y == foodY){
        score += 1;
        scoreText.textContent=score;
        createFood();
    } 
    else{
        snake.pop();
    }           
};
function drawSnake(){
    ctx.fillStyle = snakeColour;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart=>{
        ctx.fillRect(snakePart.x, snakePart.y, unitsize,unitsize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitsize,unitsize);
    })
};
function changeDirection(event){
    const keyPressed =event.keyCode;
    const LEFT = 37;
    const UP= 38
    const RIGHT = 39;
    const DOWN = 40;
    

    const goingUP = (yVelocity == -unitsize);
    const goingDOWN = (yVelocity == unitsize);
    const goingRIGHT = (xVelocity == unitsize);
    const goingLEFT = (xVelocity == -unitsize);

    switch(true){
        case(keyPressed == LEFT && !goingRIGHT):
            xVelocity = -unitsize;
            yVelocity = 0;
            break;
        case(keyPressed == UP && !goingDOWN):
            xVelocity = 0;
            yVelocity = -unitsize;
            break;

        case(keyPressed == RIGHT && !goingLEFT):
            xVelocity = unitsize;
            yVelocity = 0;
            break; 
            
        case(keyPressed == DOWN && !goingUP):
            xVelocity = 0;
            yVelocity = unitsize;
            break;    
    }

};
function checkGameover(){
    switch(true){
        case(snake[0].x<0):
            running = false;
            break;
        case(snake[0].x>=gameWidth):
            running = false;
            break; 
        case(snake[0].y<0):
            running = false;
            break;
        case(snake[0].y>=gameHeight):
            running = false;
            break;           
    }
    for(let i=1;i<snake.length;i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y ){
            running=false;
        }
    }
};
function displayGameover(){
    ctx.font ="50px MV Boli";
    ctx.fillStyle="black";
    ctx.textAlign="center";
    ctx.fillText("GAME OVER!",gameWidth/2,gameHeight/2);
    running=false;
};
function resetGame(){
    score =0;
    xVelocity =unitsize;
    yVelocity= 0;
    snake=[
        {x:unitsize* 4, y:0},
        {x:unitsize* 3, y:0},
        {x:unitsize* 2, y:0},
        {x:unitsize* 1, y:0},
        {x:0, y:0}
    ];
    gameStart();
};


