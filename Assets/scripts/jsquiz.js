
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
        correctOption: 2,
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







