//Quiz Object
/**
 * This it the main object that holds quiz stats, question source, current question pointer and time left.
 */
let quiz = {
    /**
     * questionSource will be set by quiz JavaScript files. questionSource will be Array of question Objects.
     * ****************   questionSource example    ****************
     * let pracquiz = [
     * {
     *   num: 1,
     *   q: "1 + 11 + 111 = ___",
     *   options: [
     *       { id: 1, optiontext: "121" },
     *       { id: 2, optiontext: "111" },
     *       { id: 3, optiontext: "123" }
     *   ],
     *   correctOption: 3,
     *   difficulty: "easy",
     *   category: "Math"
     * }
     * ]
     * *************************************************************
     */
    questionSource: null,
    //quzName property is used for storing the score in localStorage
    quizName:"",
    
    //quizStat property is used to maintain the quiz Statistics. Its an object of stats counter.
    quizStat: {
        incorrectCount: 0,
        correctCount: 0,
        score: 0
    },

    //timeleft property for quizTimer
    timeleft: 0,

    //initialTimeleft is calculated dynamically based on difficulty level of question
    //like 15 seconds for EASY, 25 seconds for MEDIUM and 45 seconds for HARD.
    initialTimeLeft: 0,

    //qPointer points to ** CURRENT QUESTION **
    qPointer: 0,

    //method called by quiz JavaScipts to set the name of quiz. The name is used to store score in local storage
    setQuizName:function(name){
        this.quizName=name;
    },

    //method called by quiz JavaScipts to set the questionSource of quiz.
    setQuestionSource: function (qObject) {
        this.questionSource = qObject;
        document.getElementById("quiz-start").addEventListener("click", startQuiz);
    },

    //method to calculate initial time left for the quiz
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

/** 
 * Add every button  created to ansOptionsArray.
 * This will be used to ** DISABLE ** buttons once the user clicks an answer.
 * We do not want user to cheat  :) so once answered disable all buttons.
 */
let ansOptionsArray = [];
let quizTimerInterval;


/**
 * startQuiz is the main function which triggers the quiz.
 * startQuiz is called upon clicking the 'Start Quiz' button.
 */

function startQuiz() {
    //get the initial time left from the question source. 
    //The time left is different for different difficulty level.
    quiz.calculateInitialTimeLeft();

    prepareUI();
    quizTimer();
    displayQuestion();    
}

/**
 * perpareUI hides the 'Start Quiz' button and displays the quiz-container.
 */

function prepareUI() {
    document.getElementById("quiz-start").style.display = "none";
    $quizContainer.style.display = "block";
    $timer.style.display = "block";
    $timer.innerText = quiz.timeleft;
}

/**
 * quizTimer is a function to set the quizTimer interval and show visual indicators for timer
 * like the timer color is green initially but as the time left becomes less the color changes to 
 * orange and finally a red border around the timer is set if the time left is less than 10% or 10sec.
 */

function quizTimer() {
    quizTimerInterval = setInterval(() => {
        // Time left is more than 50% of total available time - GREEN
        if (quiz.timeleft > 0.5 * quiz.initialTimeLeft) {
            $timer.style.color = "green";
        }
        // Time left is more than 10%  bt less than 50% of total available time - ORANGE
        if (quiz.timeleft > 0.1 * quiz.initialTimeLeft && quiz.timeleft < 0.5 * quiz.initialTimeLeft) {
            $timer.style.color = "orange";
        }
        // Time left is less than 10% of total available time or last 10 seconds - Red
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

/**
 * displayQuestion will prpare UI , display question and will give call to a function to build 
 * answer option buttons.
 */

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

    // Prepare Answer Option Buttons
    buildAndDisplayOptions();
}

/**
 * buildAndDisplayOptions is a function to dynamically add option buttons below the questions.
 * the option buttons' text is fetched from the questionSource onject
 */

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

// A function to call when a user clicks the answer option.
function answerClicked() {
    let ansId = this.getAttribute("data-id");

    // Once an answer button is clicked, disable all buttons.
    ansOptionsArray.forEach(e => { e.disabled = true });

    // Answer will be checked. Scores adjusted and immiediate feedback below the question is provided.
    checkAnswer(ansId);


}

// remove buttons which were dynamically added earlier.
function cleanOldAnswerOptions() {
    while ($ansOptions.firstChild) {
        $ansOptions.removeChild($ansOptions.lastChild);
    }
}

/**
 * checkAnswer is used to check the answer, add quizStats and show quick feedback
 * if the user has answered this function will be used to move to next question.
 * Also if all the questions have been answered or no time is left this function will call the saveScore form
 */
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
        //10 seconds SUBTRACTED for incorrect answer;
        quiz.timeleft = quiz.timeleft - 10;
        $feedback.style.color = "white";
        $feedback.innerHTML = "<i class='fa fa-times-circle-o' aria-hidden='true'>Incorrect</i>";
    }
    
    quiz.timeleft += 1;

    // progress the qPointer by 1
    quiz.qPointer++;


    if (quiz.timeleft <= 0) {
        $("#feedback").fadeOut(2000);
        setTimeout(showScoreAndSaveForm, 2000, "timeout");
    } else if (quiz.qPointer >= quiz.questionSource.length) {
        setTimeout(showScoreAndSaveForm, 2000, "completed");
    }
    else {
        $("#feedback").fadeOut(2000);
        quiz.timeleft += 1;

        // **** NEXT QUESTION *****/
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
    /**
     * score calculation rules
     * 10 points for correct answer
     * -5 points for incorrect answer
     * -8 points for non attempted question.
     */
    
    let unattempted = quiz.questionSource.length - (quiz.quizStat.correctCount + quiz.quizStat.incorrectCount)
    let score = quiz.quizStat.correctCount * 10 - quiz.quizStat.incorrectCount * 5 - unattempted * 8;
    $scoremessage.textContent = "Your Score is " + score;

    quiz.quizStat.score = score;

    $pointrules.innerText = "* 10 points for correct answer;" +
        "* -5 points for incorrect answer;" +
        "* -8 points for un-attempted question.";
    $submitBtn.addEventListener("click", submitScore);
}

/**
 * submitScore function is used to submit userScore to localStorage
 * The scores are stored as a Stringified score object
 * for every quiz a local Storage object with name "cq" + quiz.quizName is created
 * The scores object is an Array of object
 * The object properties are username,score,time.
 */

function submitScore(e) {
    let $user = document.getElementById("initial").value;
    let cqScoresObj;
    //prevent defualt
    e.preventDefault();

    // get localStorage item
    let cqScores = localStorage.getItem("cq"+ quiz.quizName);

    // if the localStorgae item does not exist then create a new item and set it.
    if (cqScores === null) {
        cqScoresObj =[{
            username: $user,
            score: quiz.quizStat.score,
            time: getDateTimeString()
        }];
        cqScores = JSON.stringify(cqScoresObj);
        localStorage.setItem("cq" + quiz.quizName, cqScores);
    }
    // if the item exists then add score to the object(use array unshift)
    // ** SORT and SLICE the array to only 10 to show 10 high scores
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

    showHighScore(cqScoresObj);
}


// utility function to quicly generate DateTime string.
function getDateTimeString() {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;
    return dateTime;
}

// showHighscore function displays the scores in tabular format
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

// Event handler for 'Clear High Score' button.
$clearHighScore.addEventListener("click", function () {
    localStorage.removeItem("cq"+ quiz.quizName);
    $scoreTable.remove();


});



