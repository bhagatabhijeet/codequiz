//Quiz Object
let quiz = {
    questionSource: null,
    quizName:"",
    quizStat: {
        incorrectCount: 0,
        correctCount: 0,
        score: 0
    },
    timeleft: 0,
    initialTimeLeft: 0,

    //qPointer points to current Question
    qPointer: 0,
    setQuizName:function(name){
        this.quizName=name;
    },
    setQuestionSource: function (qObject) {
        this.questionSource = qObject;
        document.getElementById("quiz-start").addEventListener("click", startQuiz);
    },
    // setTimeLeft:function(n){
    //     this.timeleft=n;
    // },
    calculateInitialTimeLeft: function () {
        this.questionSource.forEach(element => {
            //15 Seconds for EASY
            if (element.difficulty.toUpperCase() === "EASY") {
                this.timeleft = this.timeleft + 5;
            }
            //25 Seconds for MEDIUM
            if (element.difficulty.toUpperCase() === "MEDIUM") {
                this.timeleft = this.timeleft + 15;
            }
            //45 Seconds for HARD
            if (element.difficulty.toUpperCase() === "HARD") {
                this.timeleft = this.timeleft + 25;
            }
            this.initialTimeLeft = this.timeleft;
        });
    }
}

//HTML ELEMENTS
let $quizContainer = document.querySelector(".quiz-container");
let $timer = document.querySelector(".timer");
let $ansOptions = document.getElementById("options");
let $scoreContainer = document.querySelector(".score-container");
let $clearHighScore = document.getElementById("clearHighScores")
let $scoreTable = document.getElementById("scoretable");

//Add every button  created to ansOptionsArray.
// This will be used to ** DISABLE ** buttons once the user clicks an answer.
// We do not want user to cheat so once answered disable all buttons.
let ansOptionsArray = [];
let quizTimerInterval;

function startQuiz() {
    //get the initial time left from the question source. 
    //The time left is different for different difficulty level.
    quiz.calculateInitialTimeLeft();

    prepareUI();
    quizTimer();
    displayQuestion();
    // alert(quiz.questionSource.length);
}

function prepareUI() {
    document.getElementById("quiz-start").style.display = "none";
    $quizContainer.style.display = "block";
    $timer.style.display = "block";
    $timer.innerText = quiz.timeleft;
}

function quizTimer() {
    quizTimerInterval = setInterval(() => {
        //Time left is more than 50% of total available time - GREEN
        if (quiz.timeleft > 0.5 * quiz.initialTimeLeft) {
            $timer.style.color = "green";
        }
        //Time left is more than 10%  bt less than 50% of total available time - ORANGE
        if (quiz.timeleft > 0.1 * quiz.initialTimeLeft && quiz.timeleft < 0.5 * quiz.initialTimeLeft) {
            $timer.style.color = "orange";
        }
        //Time left is less than 10% of total available time or last 10 seconds - Red
        if (quiz.timeleft < 0.1 * quiz.initialTimeLeft || quiz.timeleft <= 10) {
            $timer.style.color = "Red";
            $timer.style.border = "2px solid red";
        }

        $timer.innerText = quiz.timeleft;
        quiz.timeleft--;
        if (quiz.timeleft < 0) {
            clearInterval(quizTimerInterval);
            setTimeout(showScoreAndSaveForm, 2000, "timeout");
        }
    }, 1000);
}

function displayQuestion() {
    //HTML ELEMENTS
    let $qnum = document.getElementById("qnum");
    let $qtext = document.getElementById("qtext");
    let $qdifflevel = document.getElementById("dlevel");
    let $qcat = document.getElementById("category");

    $qnum.innerText = quiz.questionSource[quiz.qPointer].num + " of " + quiz.questionSource.length;
    $qtext.innerText = quiz.questionSource[quiz.qPointer].q;
    $qdifflevel.innerText = quiz.questionSource[quiz.qPointer].difficulty.toUpperCase();
    $qcat.innerText = quiz.questionSource[quiz.qPointer].category;

    //Prepare Answer Option Buttons
    buildAndDisplayOptions();
}


function buildAndDisplayOptions() {
    ansOptionsArray = [];

    //Clean old buttons
    cleanOldAnswerOptions($ansOptions);

    quiz.questionSource[quiz.qPointer].options.forEach(element => {

        // Create Answer button
        let $optBtn = document.createElement("button");

        // Add bootstrap classes to button
        $optBtn.classList.add("btn", "btn-md", "btn-block");

        // set each button's data-id attribute.
        // **** THIS IS IMPORTANT **** as data-id will be used to check correctness.
        $optBtn.setAttribute("data-id", element.id);
        $optBtn.innerText = element.optiontext;

        // This is where things are handled once user clicks an answer button;
        $optBtn.addEventListener("click", answerClicked);

        ansOptionsArray.push($optBtn);
        $ansOptions.appendChild($optBtn);
    });
}


function answerClicked() {
    let ansId = this.getAttribute("data-id");

    // Once an answer button is clicked, disable all buttons.
    ansOptionsArray.forEach(e => { e.disabled = true });

    // Answer will be checked. Scores adjusted and immiediate feedback below the question is provided.
    checkAnswer(ansId);


}

function cleanOldAnswerOptions() {
    while ($ansOptions.firstChild) {
        $ansOptions.removeChild($ansOptions.lastChild);
    }
}

function checkAnswer(ansId) {

    let $feedback = document.getElementById("feedback");

    $feedback.style.display = "block";
    if (ansId == quiz.questionSource[quiz.qPointer].correctOption) {
        quiz.quizStat.correctCount++;
        $feedback.style.color = "white";
        $feedback.innerHTML = "<i class='fa fa-check-circle' aria-hidden='true'>Correct</i>";
    }
    else {
        quiz.quizStat.incorrectCount++;
        //10 seconds subtracted for incorrect answer;
        quiz.timeleft = quiz.timeleft - 10;
        $feedback.style.color = "white";
        $feedback.innerHTML = "<i class='fa fa-times-circle-o' aria-hidden='true'>Incorrect</i>";
    }

    // $feedback.style.display="none";
    quiz.timeleft += 1;
    quiz.qPointer++;

    //Next Question
    if (quiz.timeleft <= 0) {
        $("#feedback").fadeOut(2000);
        setTimeout(showScoreAndSaveForm, 2000, "timeout");
    } else if (quiz.qPointer >= quiz.questionSource.length) {
        setTimeout(showScoreAndSaveForm, 2000, "completed");
    }
    else {
        $("#feedback").fadeOut(2000);
        quiz.timeleft += 1;

        //**** NEXT QUESTION *****/
        setTimeout(displayQuestion, 1500);

    }
}

function showScoreAndSaveForm(msg) {
    let $completionmessage = document.getElementById("completionmessage");
    let $scoremessage = document.getElementById("scoremessage");
    let $pointrules = document.getElementById("pointrules");
    let $submitBtn = document.getElementById("submit");

    clearInterval(quizTimerInterval);
    $timer.style.display = "none";
    $quizContainer.style.display = "none";
    $scoreContainer.style.display = "block";
    if (msg == "timeout") {
        $completionmessage.textContent = "Not all Questions Answered"
    }
    if (msg == "completed") {
        $completionmessage.textContent = "All Questions Answered"
    }
    //10 points for correct answer
    //-5 points for incorrect answer
    //-8 points for non attempted question.
    let unattempted = quiz.questionSource.length - (quiz.quizStat.correctCount + quiz.quizStat.incorrectCount)
    let score = quiz.quizStat.correctCount * 10 - quiz.quizStat.incorrectCount * 5 - unattempted * 8;
    $scoremessage.textContent = "Your Score is " + score;

    quiz.quizStat.score = score;

    $pointrules.innerText = "* 10 points for correct answer;" +
        "* -5 points for incorrect answer;" +
        "* -8 points for un-attempted question.";
    $submitBtn.addEventListener("click", submitScore);
}

function submitScore(e) {
    let $user = document.getElementById("initial").value;
    let cqScoresObj;
    //prevent defualt
    e.preventDefault();

    let cqScores = localStorage.getItem("cq"+ quiz.quizName);

    if (cqScores === null) {
        cqScoresObj =[{
            username: $user,
            score: quiz.quizStat.score,
            time: getDateTimeString()
        }];
        cqScores = JSON.stringify(cqScoresObj);
        localStorage.setItem("cq" + quiz.quizName, cqScores);
    }
    else {
        cqScoresObj = JSON.parse(cqScores);
        cqScoresObj.unshift({
            username: $user,
            score: quiz.quizStat.score,
            time: getDateTimeString()
        });
        cqScoresObj.sort(function (a, b) {
            return b.score - a.score;
        });
        cqScoresObj = cqScoresObj.slice(0, 10);
        cqScores = JSON.stringify(cqScoresObj);
        localStorage.setItem("cq" + quiz.quizName, cqScores);
    }


    // localStorage.setItem($user, quiz.quizStat.score);
    // alert($user + " submitting score");

    // $highscorecontainer = document.querySelector(".highscorecontainer");
    // $scoreContainer.display = "none";
    // $highscorecontainer.display = "block";
    showHighScore(cqScoresObj);
}

function getDateTimeString() {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;
    return dateTime;
}

function showHighScore(cqScoresObj) {
    $highscorecontainer = document.querySelector(".highscorecontainer");
    $scoreContainer.style.display = "none";
    $highscorecontainer.style.display = "block";

    let i = 1;
    cqScoresObj.forEach(e => {
        let row = $scoreTable.insertRow();
        let c0 = row.insertCell(0);
        c0.innerText = i++;
        let c1 = row.insertCell(1);
        c1.innerText = e.username;
        let c2 = row.insertCell(2);
        c2.innerText = e.score;
        let c3 = row.insertCell(3);
        c3.innerText = e.time;

    });

}

// function clearHighScores()
// {
//     localStorage.removeItem("cqscores");
//     $scoreTable.remove();
// }

$clearHighScore.addEventListener("click", function () {
    localStorage.removeItem("cq"+ quiz.quizName);
    $scoreTable.remove();


});



