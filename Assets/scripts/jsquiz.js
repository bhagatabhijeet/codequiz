
let jsquiz = [
    {
        num: 1,
        q: "what's your name",
        options: [
            {
                id: 1,
                optiontext: "Abhijeet"
            }
        ],
        correctOption: 1
    },
    {
        num: 2,
        q: "Where does Abhijeet live",
        options: [
            {
                id: 1,
                optiontext: "Abhijeet"
            }
        ],
        correctOption: 1
    }

]

$(document).ready(function () {    
    $("#homepageimage").delay(500).animate({ left: "0%" }, 2000);
    $("#homepageimage").fadeOut();
    $(".screen").delay(800).animate({ width:"0" }, 3000);
    
    $('#readMeModalLong').modal();
});

let $qnum=document.getElementById("qnum");
$qnum.innerText=100;

// let $quizContainer = document.querySelector(".quiz-container");

// let questionDiv = document.createElement("div");
// //alert(jsquiz[0].num + jsquiz[0].q);
// questionDiv.textContent=jsquiz[0].num + jsquiz[0].q;
// $quizContainer.appendChild(questionDiv);
