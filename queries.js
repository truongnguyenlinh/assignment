const url = require("url");
const Pool = require('pg').Pool


const pool = new Pool({
    user: "linhtruong",
    host: "localhost",
    database: "assignment",
});

async function createQuestion(req, res) {
    const { id, ques, options } = req.body;
    try {
        let result = await pool.query("INSERT INTO questions (correct, ques) VALUES ($1, $2) RETURNING ques_id;", [options.answer, ques])
        console.log(result.rows[0].ques_id)
        return result.rows[0].ques_id;
    } catch (error) {
        throw error;
    }
}

async function createAnswer(req, res) {
    const { id, ques, options } = req.body;
    let ans_id = await createQuestion(req, res);
    console.log(ans_id);

    try {
        let result = pool.query("INSERT INTO answers(ans_id, options) VALUES ($1, $2), ($1, $3), ($1, $4), ($1, $5)", [ans_id, options.ans_one, options.ans_two, options.ans_three, options.ans_four]);
        return result;
    } catch(error) {
        throw error;
    }
}

const viewQuesAnsw = (req, res) => {

}

module.exports = {
    createAnswer
}