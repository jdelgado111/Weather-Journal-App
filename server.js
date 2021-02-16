// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();


/* Middleware*/
// use body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));

// Callback to debug
function listening() {
    console.log("server running");
    console.log("running on localhost: " + port);
}

// Spin up the server
const port = 8000;
const server = app.listen(port, listening);


///GET route///
function getData(req, res) {
    res.send(projectData);
}

app.get('/getData', getData);


///POST Route///
function addData(req, res) {
    const newData = {
        temp: req.body.temp,
        date: req.body.date,
        content: req.body.content
    };

    projectData = newData;
    res.send(projectData);
    console.log(projectData);
}

app.post('/addData', addData);
