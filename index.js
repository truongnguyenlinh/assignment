const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Pool = require("pg").Pool; 
const path = require("path");
const url = require("url");

const app = express();

let corsOptions = {
    origin: "*",
    optionsSuccessStatus:200
}

app.set("port", (process.env.PORT||3000));
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

app.use("/", express.static(__dirname + '/public'));
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

app.listen(app.get("port"), () => {
    console.log(`App running on port ${app.get("port")}.`)
});
