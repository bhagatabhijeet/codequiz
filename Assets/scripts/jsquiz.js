
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
        correctOption: 1
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

//qPointer points to question in Quiz Object.
let qPointer = 0;

document.getElementById("quiz-start").addEventListener("click", function () {
    document.getElementById("quiz-start").style.display = "none";
    $quizContainer.style.display = "block";
    // timeleft = (jsquiz.length * 20);
    // timerInterval = setInterval(() => {
    //     $timer.innerText=timeleft;
    //     timeleft--;
    //     timeleft <0 ? clearInterval(timerInterval):0;
    // }, 1000);

    $timer.style.display = "block";
    displayQuestion(qPointer);
});

function displayQuestion(qId) {
    //HTML ELEMENTS
    let $qnum = document.getElementById("qnum");
    let $qtext = document.getElementById("qtext");
    let $qdifflevel = document.getElementById("dlevel");
    let $qcat = document.getElementById("category");

    $qnum.innerText = jsquiz[qPointer].num;
    $qtext.innerText = jsquiz[qPointer].q;
    $qdifflevel.innerText = jsquiz[qPointer].difficulty.toUpperCase();
    $qcat.innerText = jsquiz[qPointer].category;
    buildOptions(qPointer);
}

function buildOptions(qId) {
    let $ansOptions = document.getElementById("options");
    // let $li = document.createElement("li");
    while($ansOptions.firstElementChild){
        $ansOptions.removeChild($ansOptions.lastChild);
    }
    jsquiz[qId].options.forEach(element => {
        let $optBtn =document.createElement("button");        
        $optBtn.classList.add("btn","btn-primary","btn-md","btn-block");
        $optBtn.innerText = element.optiontext;
        $optBtn.addEventListener()
        // $li.appendChild($optBtn);
        $ansOptions.appendChild($optBtn);
    });

}

