const xhttp = new XMLHttpRequest();
let data;


document.addEventListener("DOMContentLoaded", () => {
    getQuestions();
});


setAttributes = (ele, attr) => {
    for (let key in attr) {
        ele.setAttribute(key, attr[key])
    }
}


verify = () => {
    let arrayNums = ["one", "two", "three", "four"]
    let selection = [];
    let correctAnswers = [];

    for (let i = 0; i < data.length; i++) {
        question = data[i];
        correctAnswers.push(question.correct);
    }

    for (let i = 1; i <= data.length; i++) {
        for (let j = 0; j < 4; j++) {
            if (document.getElementById("radio_id" + i + "x" + j).checked === true) {
                selection.push(j);
            }
        }
    }

    if (selection.length !== data.length) {
        console.log(selection);
        console.log(data);
        alert("Please answer all questions");
        return;
    }

    let correctTotal = 0;
    for (let i = 0; i < data.length; i++) {
        correctTextArea = document.getElementById("answer_id"+(i+1)+"x"+correctAnswers[i]);
        correctTextArea.classList.add("correctAnswer");
        if (selection[i] === correctAnswers[i]) {
            correctTotal += 1;
        } else {
            studentSelectionTextArea = document.getElementById("answer_id" + (i + 1) + "x" + selection[i]);
            studentSelectionTextArea.classList.add("wrongAnswer");
        }
    }
    alert("You answered " + correctTotal + "/" + data.length + " correctly.");
}


displayQuestion = (question, num) => {
    let questionArea = document.getElementById("quiz");
    let questionTitle = document.createElement("h4");
    let questionText = document.createElement("textarea");
    
    questionTitle.classList.add("question-number"); 
    questionText.classList.add("question-text", "textArea");
    questionText.disabled = true;
  
    questionTitle.innerHTML = "Question " + num;
    questionText.innerHTML = question.ques;

    let answersHeader = document.createElement("h6");
    answersHeader.innerHTML = "Answers *";

    questionArea.appendChild(questionTitle);
    questionArea.appendChild(questionText);
    questionArea.append(answersHeader);

    // create and add radio + answer box
    let arrayNums = ["one", "two", "three", "four"]
    for (let i = 0; i < arrayNums.length; i++) {
        if (question["ans_" + arrayNums[i]]) {
            let radio_name = "radio" + num;
            let radio_id = "radio_id" + num + "x" + i;
            const radio_button = document.createElement("input");
            setAttributes(radio_button, {
                type: "radio",
                name: radio_name,
                id: radio_id,
            });

            let answer_id = "answer_id" + num + "x" + i;
            const answer_text = document.createElement("input");
            setAttributes(answer_text, {type: "text", id: answer_id});
            answer_text.disabled = true;
            answer_text.classList.add("input");

            answer_text.value = question["ans_" + arrayNums[i]];

            questionArea.appendChild(document.createElement("br"));
            questionArea.appendChild(radio_button);
            questionArea.appendChild(answer_text);
        }
    }
}


getQuestions = () => {
    xhttp.open("GET", "/questions", true);
    xhttp.send();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            jsonObj = JSON.parse(xhttp.responseText);
            if (jsonObj === null) {
                alert("There is no quiz available.");
            } else {
                data = jsonObj;
                for (i = 0; i < jsonObj.length; i++) {
                    let question = jsonObj[i];
                    displayQuestion(question, i + 1);
                }
            }
        }
    }
}
