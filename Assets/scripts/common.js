//Quiz Object
let quiz={
    questionSource:null,
    quizStat:{
        incorrectCount:0,
        correctCount:0 
    },
    timeleft:0,
    
    //qPointer points to current Question
    qPointer:0,
    setQuestionSource:function(qObject){
        this.questionSource=qObject;
        document.getElementById("quiz-start").addEventListener("click",startQuiz);
    },
    setTimeLeft:function(n){
        this.timeleft=n;
    },
    calculateInitialTimeLeft:function(){
        this.questionSource.forEach(element => {
            //15 Seconds for EASY
            if(element.difficulty.toUpperCase() === "EASY"){
                this.timeleft=this.timeleft + 10;
            }
            //25 Seconds for MEDIUM
            if(element.difficulty.toUpperCase() === "MEDIUM"){
                this.timeleft=this.timeleft + 25;
            }
            //45 Seconds for HARD
            if(element.difficulty.toUpperCase() === "HARD"){
                this.timeleft=this.timeleft + 45;
            }
        });
    }
}

//HTML ELEMENTS
let $quizContainer = document.querySelector(".quiz-container");
let $timer = document.querySelector(".timer");
let $ansOptions = document.getElementById("options"); 

//Add every button  created to ansOptionsArray.
// This will be used to ** DISABLE ** buttons once the user clicks an answer.
// We do not want user to cheat so once answered disable all buttons.
let ansOptionsArray=[];


function startQuiz(){
    //get the initial time left from the question source. 
    //The time left is different for different difficulty level.
    quiz.calculateInitialTimeLeft();

    prepareUI();
    quizTimer();
    displayQuestion();
    alert(quiz.questionSource.length);
}

function prepareUI(){
    document.getElementById("quiz-start").style.display = "none";
    $quizContainer.style.display = "block";
    $timer.style.display = "block";
    $timer.innerText=quiz.timeleft;
}

function quizTimer(){
        timerInterval = setInterval(() => {
        $timer.innerText=quiz.timeleft;
        quiz.timeleft--;
        quiz.timeleft < 0 ? clearInterval(timerInterval):0;
    }, 1000);
}

function displayQuestion() {
    //HTML ELEMENTS
    let $qnum = document.getElementById("qnum");
    let $qtext = document.getElementById("qtext");
    let $qdifflevel = document.getElementById("dlevel");
    let $qcat = document.getElementById("category");

    $qnum.innerText = quiz.questionSource[quiz.qPointer].num;
    $qtext.innerText = quiz.questionSource[quiz.qPointer].q;
    $qdifflevel.innerText = quiz.questionSource[quiz.qPointer].difficulty.toUpperCase();
    $qcat.innerText = quiz.questionSource[quiz.qPointer].category;
    
    //Prepare Answer Option Buttons
    buildAndDisplayOptions();
}


function buildAndDisplayOptions() {
    ansOptionsArray=[];    
        
    //Clean old buttons
    cleanOldAnswerOptions($ansOptions);
  
    quiz.questionSource[quiz.qPointer].options.forEach(element => {

        // Create Answer button
        let $optBtn =document.createElement("button"); 
        
        // Add bootstrap classes to button
        $optBtn.classList.add("btn","btn-md","btn-block");

        // set each button's data-id attribute. **** THIS IS IMPORTANT **** as data-id will be used to check correctness.
        $optBtn.setAttribute("data-id",element.id);
        $optBtn.innerText = element.optiontext;
        
        // This is where things are handled once user clicks an answer button;
        $optBtn.addEventListener("click",answerClicked);
        
        ansOptionsArray.push($optBtn);
        $ansOptions.appendChild($optBtn);
    });
}


function answerClicked(){
    let ansId=this.getAttribute("data-id");  
   
    // Once an answer button is clicked, disable all buttons.
    ansOptionsArray.forEach(e=>{e.disabled=true});

    // Answer will be checked. Scores adjusted and immiediate feedback below the question is provided.
    checkAnswer(ansId);

               
}

function cleanOldAnswerOptions(){        
    while($ansOptions.firstChild){
        $ansOptions.removeChild($ansOptions.lastChild);
    }
}

function checkAnswer(ansId){
     
    let $feedback=document.getElementById("feedback");
    
    $feedback.style.display="block";
    if(ansId == quiz.questionSource[quiz.qPointer].correctOption){ 
        quiz.quizStat.correctCount++;       
        $feedback.style.color="white";
        $feedback.innerHTML="<i class='fa fa-check-circle' aria-hidden='true'>Correct</i>";
    }
    else{   
        quiz.quizStat.incorrectCount++;     
        $feedback.style.color="white";
        $feedback.innerHTML="<i class='fa fa-times-circle-o' aria-hidden='true'>Incorrect</i>";
    }
    let t=0;
    
    // Wait for 1 second and start new question
    let feedbackdisplayInterval = setInterval(function(){
        t++;
        if(t >= 1)
        {
            clearInterval(feedbackdisplayInterval);
            $feedback.style.display="none";
            quiz.timeleft+=1;
            quiz.qPointer++;
    
            //Next Question
            displayQuestion() ;
            $("#feedback").fadeOut(1000);
        }
       
    },1000);    

}



