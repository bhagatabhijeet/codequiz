// questionSource Object
let gitquiz = [
    {
        num: 1,
        q: "When a user views a page containing a JavaScript program, which machine actually executes the script?",
        options: [
            { id: 1, optiontext: "The User's machine running a Web browser" },
            { id: 2, optiontext: "The Web server" },
            { id: 3, optiontext: "A central machine deep within Netscape's corporate offices" },
            { id: 4, optiontext: "None of above" }
        ],
        correctOption: 1,
        difficulty: "easy",
        category: "Meta Information"
    },
    {
        num: 2,
        q: "which of the following is NOT a valid JavaScript variable name",
        options: [
            { id: 1, optiontext: "_firstName" },
            { id: 2, optiontext: "$lastName" },
            { id: 3, optiontext: "I" },
            { id: 4, optiontext: "Name2" },
            { id: 5, optiontext: "2Name" },            
        ],
        correctOption: 5,
        difficulty: "medium",
        category: "Language Basics"
    },
    {
        num: 3,
        q: "What is the correct JavaScript syntax to write 'Hello World' to HTML?",
        options: [
            { id: 1, optiontext: "System.out.prinln('Hello World);" },
            { id: 2, optiontext: "println('Hello World);" },
            { id: 3, optiontext: "document.write('Hello World);" },
            { id: 4, optiontext: "console.log(('Hello World);" }
        ],
        correctOption: 3,
        difficulty: "medium",
        category: "Language Basics"
    },
    {
        num: 4,
        q: "What is correct syntax to refer to external scirpt file named abc.js?",
        options: [
            { id: 1, optiontext: "<script href='abc.js'>" },
            { id: 2, optiontext: "<script name='abc.js'>" },
            { id: 3, optiontext: "<script src='abc.js'>" },
            { id: 4, optiontext: "None of the above" }
        ],
        correctOption: 3,
        difficulty: "medium",
        category: "Language Basics"
    },
    {
        num: 5,
        q: "JavaScript is interpreted by ________",
        options: [
            { id: 1, optiontext: "Object" },
            { id: 2, optiontext: "Server" },
            { id: 3, optiontext: "JavaScript is not interpreted" },
            { id: 4, optiontext: "Client" }
        ],
        correctOption: 4,
        difficulty: "medium",
        category: "Language Basics"
    },
    {
        num: 6,
        q: "The ___ method of Array adds and/or remove elements",
        options: [
            { id: 1, optiontext: "Splice" },
            { id: 2, optiontext: "Shift" },
            { id: 3, optiontext: "Reverse" },
            { id: 4, optiontext: "Slice" }
        ],
        correctOption: 1,
        difficulty: "hard",
        category: "Array Object"
    },
    {
        num: 7,
        q: "let I=1;let A=0; A=I++; what is final value of A and I",
        options: [
            { id: 1, optiontext: "A is 2 and I is 2" },
            { id: 2, optiontext: "A is 1 and I is 2" },
            { id: 3, optiontext: "A is 1 and I is 1" },            
        ],
        correctOption: 2,
        difficulty: "hard",
        category: "Operators"
    },
    {
        num: 8,
        q: "In JavaScrip functions can be nested",
        options: [
            { id: 1, optiontext: "False" },
            { id: 2, optiontext: "True" },                       
        ],
        correctOption: 2,
        difficulty: "hard",
        category: "Functions"
    },
    {
        num: 9,
        q: "x=4+'4'; // What is value of x",
        options: [
            { id: 1, optiontext: "8" },
            { id: 2, optiontext: "Error" }, 
            { id: 3, optiontext: "'44'" },                         
        ],
        correctOption: 3,
        difficulty: "medium",
        category: "Type Coercion"
    },
    {
        num: 10,
        q: "The ++ operator after variable name is called",
        options: [
            { id: 1, optiontext: "Add 2 Times Operator" },
            { id: 2, optiontext: "Post Increment" }, 
            { id: 3, optiontext: "Extra Add Operator" },                         
        ],
        correctOption: 2,
        difficulty: "easy",
        category: "Operators"
    }
]

// *** Set questionSource here ***
quiz.setQuestionSource(gitquiz);

// *** Set the quizName here ***
quiz.setQuizName("gitquiz");

//* Set the quiz pages title here*/
let pageNavbarTitleText = "GIT Quiz";

// The modal readme dialog is shown at the start of quiz
// set the modal title here
let quiReadMeTitleText="GIT Quiz - Read Me";

//set the modal html here
let quizReadMeHTML=`<ul>
<li><em>Code Quiz</em>'s <strong>GIT Quiz</strong> is a set of GIT basic to
    intermediate level multiple choice questions.</li>
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
<li>You may want to take our <em style="color:#fc8282"><a href="index.html">Practice Quiz</a></em> 
to get comfortable,before attempting real quiz.</li>
</ul>`

//****** don't touch the following function. it is used to load animation at the start of quiz page *****/

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


