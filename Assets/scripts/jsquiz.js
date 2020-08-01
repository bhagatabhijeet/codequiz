
let jsquiz = [
    {
        num: 1,
        q: "what's your name",
        options: [
            { id: 1, optiontext: "Abhijeet" },
            { id: 2, optiontext: "Aaroh" },
            { id: 3, optiontext: "Roheeni" }
        ],
        correctOption: 1,
        difficulty: "easy",
        category: "Meta Information"
    },
    {
        num: 2,
        q: "GIVEN I am taking a code quiz  WHEN I click the start button  THEN a timer starts and I am presented with a question  WHEN I answer a question",
        options: [
            {
                id: 1,
                optiontext: "Abhijeet"
            }
        ],
        correctOption: 1,
        difficulty: "hard",
        category: "Meta"
    }

]

// $(document).ready(function () {    
//     $("#homepageimage").delay(500).animate({ left: "0%" }, 2000);
//     $("#homepageimage").fadeOut();
//     $(".screen").delay(800).animate({ width:"0" }, 3000);

//     $('#readMeModalLong').modal();
// });

//HTML ELEMENTS
let $quizContainer = document.querySelector(".quiz-container");


//TIMER
let $timer = document.querySelector(".timer");
let timercontrol, timeleft, timerInterval;

//Score
let correctCount = 0;
let incorrectCount = 0;

quiz.setQuestionSource(jsquiz);



// document.getElementById("quiz-start").addEventListener("click", function () {
//     document.getElementById("quiz-start").style.display = "none";
//     $quizContainer.style.display = "block";
//     //qPointer points to question in Quiz Object.
//     let qPointer = 0;
//     timeleft = (jsquiz.length * 20);
    
//     $timer.style.display = "block";
//     $timer.innerText=timeleft;

//     //Start timer count down.
//     timerInterval = setInterval(() => {
//         $timer.innerText=timeleft;
//         timeleft--;
//         timeleft <0 ? clearInterval(timerInterval):0;
//     }, 1000);

//     //Display First Question - see qPointer==0;
//     displayQuestion(qPointer);
// });

function displayQuestion(qPointer) {
    //HTML ELEMENTS
    let $qnum = document.getElementById("qnum");
    let $qtext = document.getElementById("qtext");
    let $qdifflevel = document.getElementById("dlevel");
    let $qcat = document.getElementById("category");

    $qnum.innerText = jsquiz[qPointer].num;
    $qtext.innerText = jsquiz[qPointer].q;
    $qdifflevel.innerText = jsquiz[qPointer].difficulty.toUpperCase();
    $qcat.innerText = jsquiz[qPointer].category;
    
    //Prepare Answer Option Buttons
    buildAndDisplayOptions(qPointer);
}

function buildAndDisplayOptions(qPointer) {
    let $ansOptions = document.getElementById("options");
    let ansOptionsArray=[];
    
    cleanOldAnswerOptions($ansOptions);

    // while($ansOptions.firstChild){
    //     $ansOptions.removeChild($ansOptions.lastChild);
    // }
    jsquiz[qPointer].options.forEach(element => {
        let $optBtn =document.createElement("button");        
        $optBtn.classList.add("btn","btn-md","btn-block");
        $optBtn.setAttribute("data-id",element.id);
        $optBtn.innerText = element.optiontext;
        $optBtn.addEventListener("click",function(){
            let ansId=this.getAttribute("data-id");                        
            
            let $feedback=document.getElementById("feedback");
            

            ansOptionsArray.forEach(e=>{e.disabled=true});

            $feedback.style.display="block";
            let t=0;
            
            let feedbackdisplayInterval = setInterval(function(){
                t++;
                if(t >= 1)
                {
                    clearInterval(feedbackdisplayInterval);
                    $feedback.style.display="none";
                    timeleft+=1;
                    qPointer++;
            
                    displayQuestion(qPointer) ;
                    $("#feedback").fadeOut(1000);
                }
               
            },1000);
            
     
            if(ansId == jsquiz[qPointer].correctOption){
                // $feedback.style.color="#19613e";
                $feedback.style.color="white";
                $feedback.innerHTML="<i class='fa fa-check-circle' aria-hidden='true'>Correct</i>";
            }
            else{
                // $feedback.style.color="#e0422a";
                $feedback.style.color="white";
                $feedback.innerHTML="<i class='fa fa-times-circle-o' aria-hidden='true'>Incorrect</i>";
            }
                   
        });
        // $li.appendChild($optBtn);
        ansOptionsArray.push($optBtn);
        $ansOptions.appendChild($optBtn);
    });
}

function cleanOldAnswerOptions(ansOptionDiv){
    let $ansOptions = document.getElementById("options");
        
    while(ansOptionDiv.firstChild){
        ansOptionDiv.removeChild(ansOptionDiv.lastChild);
    }
}

