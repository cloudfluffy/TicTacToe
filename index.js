import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let isStartingPage = true;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/play", function (req, res) {
    isStartingPage = false;
    console.log(req.body);
    res.render("normal_grid.ejs", { "isStartingPage": isStartingPage });
});

app.get("/", function (req, res) {
    isStartingPage = true;
    res.render("index.ejs", { "isStartingPage": isStartingPage });
});

app.listen(port, function () {
    console.log(`The server is up and running at port ${port}.`);
});