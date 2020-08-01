
let quiz={
    questionSource:null,
    quizStat:{
        incorrectCount:0,
        correctCount:0 
    },
    setQuestionSource:function(qObject){
        this.questionSource=qObject;
        document.getElementById("quiz-start").addEventListener("click",startQuiz);
    }
}



function startQuiz(){
    alert(quiz.questionSource.length);
}