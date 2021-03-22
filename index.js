const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); 
const path = require("path");
const db = require("./queries.js");

const app = express();

let corsOptions = {
    origin: "*",
    optionsSuccessStatus:200
}

app.set("port", (process.env.PORT || 3000));
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

app.use("/", express.static(__dirname + "/public"));
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/admin.html"));
});

app.get("/student", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/student.html"));
});

app.post("/questions", db.createAnswer);

app.put("/questions", db.updateAnswer);

app.get("/questions", db.getQuestions);

app.listen(app.get("port"), () => {
    console.log(`App running on port ${app.get("port")}.`)
});
