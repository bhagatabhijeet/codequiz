
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
        q: "Aaroh's Mom's Name is ______",
        options: [
            { id: 1, optiontext: "Ronini" },
            { id: 2, optiontext: "Romini" },
            { id: 3, optiontext: "Rukmini" },
            { id: 4, optiontext: "Rulamini" },
            { id: 5, optiontext: "Roheeni" },
            { id: 6, optiontext: "Rodini" }
        ],
        correctOption: 5,
        difficulty: "hard",
        category: "Meta"
    },
    {
        num: 3,
        q: "Aaroh's full name is ",
        options: [
            { id: 1, optiontext: "Aaroh N Bhagat" },
            { id: 2, optiontext: "Aaroh A Bhagat" },
            { id: 3, optiontext: "Aaroh M Bhagat" },
            { id: 4, optiontext: "Aaroh E" }
        ],
        correctOption: 2,
        difficulty: "hard",
        category: "Personal"
    },
    {
        num: 4,
        q: "Aaroh's School is ____",
        options: [
            { id: 1, optiontext: "Faloon Middle School" },
            { id: 2, optiontext: "Saloon High" },
            { id: 3, optiontext: "Aaroh Elementry" },
            { id: 4, optiontext: "Fallon Middle School" }
        ],
        correctOption: 4,
        difficulty: "hard",
        category: "Personal"
    }



]

let quiReadMeTitleText="JavaScript Quiz - Read Me"

let quizReadMeHTML=`<ul>
<li><em>Code Quiz</em>'s <strong>JavaScript Quiz</strong> is a set of JavaScript basic to
    intermediate level questions.</li>
<li>You are presented with multiple options for an answer.</li>
<li>You have to finish the quiz within alloted time.</li>                        
<li>The timer will start ticking as soon as you click the <em>'Start Quiz'</em> button.</li>
<li>After selecting an option, we'll immidiately show if your answer was correct or incorrect.</li>
<li>For every wrong answer, 10 seconds is subtracted from your available time.</li>
<li>The quiz is over when you have answered all questions, or you run out of time.</li>
<li>
Scores are calulated using following rules :
<ul>
    <li>10 points for correct answer</li>
    <li>-5 points for incorrect answer</li>
    <li>-8 points for un-attempted question</li>
</ul>
</li>
<li>You'll be presented with your final score summary and option to save your score.</li>
</ul>`



$(document).ready(function () {    
    // $modal = document.querySelector(".modal-body");
    // $modal.innerHtml = "a";
    $("#homepageimage").delay(500).animate({ left: "0%" }, 2000);
    $("#homepageimage").fadeOut();
    $(".screen").delay(800).animate({ width:"0" }, 3000);

    let navBarTitle = document.getElementById("pageNavbarTitleText");
    navBarTitle.textContent="JavaScript Quiz+++";
    
    var modal=$('#readMeModalLong');
    
    var mTitleText = modal.find("#readMeModalTitleText");
    mTitleText[0].textContent=quiReadMeTitleText;
    
    var mbody =modal.find(".modal-body");
    mbody[0].innerHTML=quizReadMeHTML;
    // alert(mbody.innerHtml);
    $('#readMeModalLong').modal();
    // document.getElementByClass("modal-body").innerHTML = "<p>some text</p>";
    // $modal = document.querySelector(".modal-body");
    // $modal.innerHtml = "a";
});

//HTML ELEMENTS
// let $quizContainer = document.querySelector(".quiz-container");


//TIMER
// let $timer = document.querySelector(".timer");
// let timercontrol, timeleft, timerInterval;

//Score
// let correctCount = 0;
// let incorrectCount = 0;

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







