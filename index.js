import express from "express";
import bodyParser from "body-parser";

/*
In terminal, type in the command "npm i" to install all the neccesary packages (you only need to do this once, unless I added in new packages)
Type in the command "nodemon index.ejs" to host the web server locally
Then open any browser, on the search bar type "http://localhost:3000/" and hit enter
You will be connected to the website
When you made changes and want to see it, simply hit refresh on the page
*/

/*
In the views folder, there are EJS (Embedded Javascript Templating) files
They are basically HTML files but allows you to insert Javascript code within it
In this project we'll use EJS to reuse the header and footer, that way we don't need to make the changes three times
The header and footer EJS files are in the partials folder of views
Just think of the EJS files as HTML files for now
*/

/*
In the public folder, that's where the static files are located (CSS and client-side Javascript)
*/

/*
I have created two seperate branch for the two of us already
One is named "bote" for me and one is named "zhicheng" for you
Type in the command git branch to see all the branches and the one you're on
When you want to push the changes to the remote repository don't forget to use -u, this is very important 
*/

const app = express();
const port = 3000;

app.use(express.static("public"))

app.get("/", function (req, res) {
    res.render("index.ejs");
});

app.listen(port, function () {
    console.log(`The server is up and running at port ${port}.`);
});