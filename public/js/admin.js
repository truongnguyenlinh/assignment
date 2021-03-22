const xhttp = new XMLHttpRequest();
let id_increment = 1;


class Question {
    constructor(id, ques, ans_one, ans_two, ans_three, ans_four, answer) {
        this.id = id
        this.ques = ques
        this.options = {
            ans_one,
            ans_two,
            ans_three,
            ans_four,
            answer
        }
    }
}


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("add").addEventListener("click", postInput);
    document.getElementById("save").addEventListener("click", putInput);
});


getCorrectAnswer = () => {
    let form = document.getElementById("form");
    let radioButtons = form.getElementsByClassName("radio_btn");
    let index = 0;
    for (let radio of radioButtons) {
        if (radio.checked) {
            return index;
        }
        index++;
    }
    return -1;
}


postInput = () => {
    let correctAnswer = getCorrectAnswer();

    if (correctAnswer < 0 || correctAnswer == undefined) {
        window.alert("Please enter the a correct answer!");
        return;
    }

    let questionInput = document.getElementsByClassName("input_question")[0].value;
    let answerInput = document.getElementsByClassName("answer");

    let question = new Question(
        id_increment, 
        questionInput,
        answerInput[0].value, 
        answerInput[1].value,
        answerInput[2].value, 
        answerInput[3].value, 
        correctAnswer
    );
    id_increment = id_increment + 1;

    xhttp.open("POST", "/questions", true);
    xhttp.responseType = "json";
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send(JSON.stringify(question));
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("test").innerHTML = "Sent!"
        } else {
            document.getElementById("test").innerHTML = "";
        }
    }
    document.getElementById("form").reset();
    window.alert("Question saved!");
    updateQuestionForm(question);
}


updateQuestionForm = (question) => {
    let textArea = document.getElementById("question_update");
    let radioButtons = document.getElementsByClassName("radio_btn_update");
    let answerInputs = document.getElementsByClassName("answer_update");

    for (let i = 0; i < radioButtons.length; i++) {
        if (i == question.options.answer) {
            document.getElementById("ans_" + i).checked = true;
        }
    }
    textArea.value = question.ques;
    answerInputs[0].value = question.options.ans_one;
    answerInputs[1].value = question.options.ans_two;
    answerInputs[2].value = question.options.ans_three;
    answerInputs[3].value = question.options.ans_four;
}


getAnswerUpdate = () => {
    let form = document.getElementById("form_update");
    let radioButtons = form.getElementsByClassName("radio_btn_update");
    let index = 0;
    for (let radio of radioButtons) {
        if (radio.checked) {
            return index;
        }
        index++;
    }
    return -1;
}


putInput = () => {
    let correctAnswer = getCorrectAnswerUpdate();

    if (correctAnswer < 0 || correctAnswer == undefined) {
        window.alert("Please enter the a correct answer!");
        return;
    }

    let questionInput = document.getElementsByClassName("input_question_update")[0].value;
    let answerInput = document.getElementsByClassName("answer_update");

    let question = new Question(
        id_increment, 
        questionInput,
        answerInput[0].value, 
        answerInput[1].value,
        answerInput[2].value, 
        answerInput[3].value, 
        correctAnswer
    );

    xhttp.open("PUT", "/questions", true);
    xhttp.responseType = "json";
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send(JSON.stringify(question));
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("test2").innerHTML = "Updated!"
        } else {
            document.getElementById("test2").innerHTML = "";
        }
    }
    window.alert("Question saved!");
}
