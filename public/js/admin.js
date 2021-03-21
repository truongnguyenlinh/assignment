class Question {
    constructor(id, ques, ans_one, ans_two, ans_three, ans_four, answer) {
        this.id = id
        this.ques = ques
        this.ans_one = ans_one
        this.ans_two = ans_two
        this.ans_three = ans_three
        this.ans_four = ans_four
        this.answer = answer
    }
}


class QuestionBank {
    constructor() {
        this.num_questions = 0;
        this.arr_questions = [];
    }
}


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("add").addEventListener("click", getInput)
})


getCorrectAnswer = () => {
    let ans = $(":radio[name='radio']").index($(":radio[name='radio']:checked"));
    console.log("Selected radio button index: " + ans)
    if (ans > 0) {
        return ans;
    }
    return -1;
}


getInput = () => {
    let correctAnswer = getCorrectAnswer();
    let questionInput = $(".input_question").val();
    let answerInput = $("#form_div .answer").map((_, el) => el.value).get();

    console.log(questionInput);
    console.log(answerInput);

}
