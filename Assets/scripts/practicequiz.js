
let pracquiz = [
    {
        num: 1,
        q: "1 + 11 + 111 = ___",
        options: [
            { id: 1, optiontext: "121" },
            { id: 2, optiontext: "111" },
            { id: 3, optiontext: "123" }
        ],
        correctOption: 3,
        difficulty: "easy",
        category: "Math"
    },
    {
        num: 2,
        q: "factorial of a number is ______",
        options: [
            { id: 1, optiontext: "The sum of all the factor of that number" },
            { id: 2, optiontext: "There is nothing called factorial of a number" },
            { id: 3, optiontext: "The factorial of a number is the product of all the integers from 1 to that number" },
            { id: 4, optiontext: "An editorial about facts about that number" },
            { id: 5, optiontext: "10 times that number" },
        ],
        correctOption: 3,
        difficulty: "medium",
        category: "Math"
    },
    {
        num: 3,
        q: "log 8 to the base 2 is _________ ",
        options: [
            { id: 1, optiontext: "3" },
            { id: 2, optiontext: "2" },
            { id: 3, optiontext: "1" },
            { id: 4, optiontext: "0" }
        ],
        correctOption: 1,
        difficulty: "medium",
        category: "Math"
    },
    {
        num: 4,
        q: "Sum of first N natural numbers is ____",
        options: [
            { id: 1, optiontext: "N + 1" },
            { id: 2, optiontext: "N * (N+1) / 2" },
            { id: 3, optiontext: "N" },
            { id: 4, optiontext: "N*N" }
        ],
        correctOption: 2,
        difficulty: "hard",
        category: "Math"
    }
]

quiz.setQuestionSource(pracquiz);
quiz.setQuizName("practice");

let pageNavbarTitleText = "Practice Quiz";

let quiReadMeTitleText="Practice Quiz - Read Me";

let quizReadMeHTML=`<ul>
<li><em>Code Quiz</em>'s <strong>Practice Quiz</strong> is a set of Practice questions to practice CQ quiz.</li>
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
    $("#homepageimage").delay(500).animate({ left: "0%" }, 2000);
    $("#homepageimage").fadeOut();
    $(".screen").delay(800).animate({ width:"0" }, 3000);

    let navBarTitle = document.getElementById("pageNavbarTitleText");
    navBarTitle.textContent=pageNavbarTitleText;
    
    var modal=$('#readMeModalLong');
    
    var mTitleText = modal.find("#readMeModalTitleText");
    mTitleText[0].textContent=quiReadMeTitleText;
    
    var mbody =modal.find(".modal-body");
    mbody[0].innerHTML=quizReadMeHTML;    
    $('#readMeModalLong').modal();    
});


