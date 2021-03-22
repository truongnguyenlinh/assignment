const url = require("url");
const Pool = require('pg').Pool;


const pool = new Pool({
    user: "linhtruong",
    host: "localhost",
    database: "assignment",
});


async function createAnswer(req, res) {
    const { id, ques, options } = req.body;

    try {
        let questionResult = await pool.query("INSERT INTO questions (correct, ques) VALUES ($1, $2) RETURNING ques_id;", [options.answer, ques])
        let id = questionResult.rows[0].ques_id;

        await pool.query("INSERT INTO answers(id, ans_one, ans_two, ans_three, ans_four) VALUES ($1, $2, $3, $4, $5)", [id, options.ans_one, options.ans_two, options.ans_three, options.ans_four]);
        await pool.query("INSERT INTO ques_ans(question_id, options_id) VALUES ($1, $1)", [id]);
    } catch(error) {
        throw error;
    }
}


async function updateAnswer(req, res) {
    const { id, ques, options } = req.body;
    let drop = "drop table if exists bridge_id;"
    let dropAnswerMax = "drop table if exists answers_key;"
    let bridgeId = "select max(ques_ans_id) into bridge_id from ques_ans;" // table created with max as column, bridge_id as table
    let query = "select qa.question_id into answers_key from ques_ans qa join bridge_id bi on qa.ques_ans_id = bi.max;" 

    try {
        await pool.query(drop);
        await pool.query(dropAnswerMax);
        await pool.query(bridgeId)
        await pool.query(query)
        await pool.query("update answers set ans_one=($1), ans_two=($2), ans_three=($3), ans_four=($4) from answers_key where answers.id = answers_key.question_id;", 
            [options.ans_one, options.ans_two, options.ans_three, options.ans_four])
        await pool.query("update questions set ques=($1), correct=($2) from answers_key where questions.ques_id = answers_key.question_id;", [ques, options.answer])
    } catch(error) {
        throw error;
    }
}


async function getQuestions(req, res) {
    let quesAnsTable = "select q.ques, q.correct, a.ans_one, a.ans_two, a.ans_three, a.ans_four from answers a join questions q on a.id = q.ques_id;"

    try {
        await pool.query(quesAnsTable, (error, results) => {
            let question3 = results.rows;
            res.end(JSON.stringify(question3));
        });

    } catch(error) {
        throw error;
    }
}


module.exports = {
    createAnswer,
    updateAnswer,
    getQuestions
}