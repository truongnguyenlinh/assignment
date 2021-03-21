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
    document.getElementById("add").addEventListener("click", postInput)
})


getCorrectAnswer = () => {
    let ans = $(":radio[name='radio']").index($(":radio[name='radio']:checked"));
    if (ans >= 0) {
        return ans;
    }
    return -1;
}


postInput = () => {
    let correctAnswer = getCorrectAnswer();
    let questionInput = $(".input_question").val();
    let answerInput = $("#form_div .answer").map((_, el) => el.value).get();

    let question = new Question(
        id_increment, 
        questionInput,answerInput[0], 
        answerInput[1],
        answerInput[2], 
        answerInput[3], 
        correctAnswer
    );
    id_increment = id_increment + 1;

    xhttp.open("POST", "/questions_post", true);
    xhttp.responseType = "json";
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader("Content-Type", "application/json");

    console.log(JSON.stringify(question));

    xhttp.send(JSON.stringify(question));
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("test").innerHTML = "Sent"
        } else {
            document.getElementById("test").innerHTML = "";
        }
    }
}
