 // select all elements
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
//var qImg = document.getElementById("qImg");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var progress = document.getElementById("progress");
var scoreDiv = document.getElementById("scoreContainer");

// create our questions //let
var questions = [
    {
        question : "Which of these describes Javascript?",
        choiceA : "code",
        choiceB : "data",
        choiceC : "markup",
        correct : "A"
    },{
        question : "Which is a difference between Java and Javascript ?",
        choiceA : "Syntax",
        choiceB : "Design",
        choiceC : "libraries",
        correct : "B"
    },{
        question : "For loops iterate over which of these?",
        choiceA : "Values",
        choiceB : "Objects",
        choiceC : "Property Names",
        correct : "C"
    },{
        question : "NaN is...",
        choiceA : "a positive number",
        choiceB : "a negative number",
        choiceC : "neither positive or negative",
        correct : "C"
    },{
       question : "Which is NOT a debugging tool for JS?",
       choiceA : "console.log",
       choiceB : ".inspect()",
       choiceC : "alert",
       correct : "B"
  }
];

// create some variables

var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var count = 0;
var questionTime = 10; // 10s
var gaugeWidth = 150; // 150px
var gaugeUnit = gaugeWidth / questionTime;
var TIMER;
var score = 0;

// render a question //per stack overflow
function renderQuestion(){
    var q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    //Img.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(var qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// got from StackOverflow and YouTube - I dont under stand what this hex code

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    var scorePerCent = Math.round(100 * score/questions.length);
    
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}
