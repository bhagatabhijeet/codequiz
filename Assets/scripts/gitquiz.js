// questionSource Object
let gitquiz = [
    {
        num: 1,
        q: "Which command is used to show limited number of commits?",
        options: [
            { id: 1, optiontext: "git fetch <remote>" },
            { id: 2, optiontext: "git log -n <limit>" },
            { id: 3, optiontext: "git config <limit>" },
            { id: 4, optiontext: "git status" }
        ],
        correctOption: 2,
        difficulty: "easy",
        category: "GIT History"
    },
    {
        num: 2,
        q: "which command defines the author and email to be used for all commits by current user?",
        options: [
            { id: 1, optiontext: "git clean -f <path>" },
            { id: 2, optiontext: "git merge" },
            { id: 3, optiontext: "git config --global user.email <email>" },
            { id: 4, optiontext: "git config --amend" },                       
        ],
        correctOption: 3,
        difficulty: "medium",
        category: "GIT Config"
    },
    {
        num: 3,
        q: "___ command is used to get commit history overview.",
        options: [
            { id: 1, optiontext: "git log --oneline" },
            { id: 2, optiontext: "git log --overview" },
            { id: 3, optiontext: "git reset --hard" },
            { id: 4, optiontext: "git rebase <base>" }
        ],
        correctOption: 1,
        difficulty: "medium",
        category: "GIT History"
    },
    {
        num: 4,
        q: "___ removes untracked files from your working directory",
        options: [
            { id: 1, optiontext: "git commit" },
            { id: 2, optiontext: "git delete" },
            { id: 3, optiontext: "git clean" },
            { id: 4, optiontext: "git reset" }
        ],
        correctOption: 3,
        difficulty: "medium",
        category: "GIT Porcelain Command"
    },
    {
        num: 5,
        q: "which of the following command line environment is used to interact with GIT?",
        options: [
            { id: 1, optiontext: "GitHub"},
            { id: 2, optiontext: "Git Bash" },
            { id: 3, optiontext: "Git Lab" },
            { id: 4, optiontext: "Git Boot" }
        ],
        correctOption: 2,
        difficulty: "easy",
        category: "Meta Information"
    },
    {
        num: 6,
        q: "Which of the following is NOT a valid reference in Git Repository",
        options: [
            { id: 1, optiontext: "Branch" },
            { id: 2, optiontext: "Body" },
            { id: 3, optiontext: "Commit" },
            { id: 4, optiontext: "Head" }
        ],
        correctOption: 2,
        difficulty: "hard",
        category: "GIT Internals"
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


