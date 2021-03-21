const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "assignment",
    password: "123456",
    port: 3000,
});


// const client = new Client({
//     user: "postgres",
//     host: "localhost",
//     database: "assignment",
//     password: "123456",
//     port: process.env.PORT || 5432,
// });
// client
//     .connect()
//     .then(() => console.log("Connected"))
//     .catch(err => console.error("Connection error", err.stack));

// client.query("CREATE TABLE ques_ans(id SERIAL PRIMARY KEY, question_num INTEGER, answer_num INTEGER);");
// client.query("CREATE TABLE answers(id SERIAL PRIMARY KEY, );")

   