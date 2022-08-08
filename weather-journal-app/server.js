// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

const server = app.listen(port, listening);

// Callback function to debug
function listening() {
    console.log(`server is running on port: ${port}`);
}

// Initialize all route with a callback function
app.get('/all', getData);

// Callback function to complete GET '/all'
function getData(req, res) {
    //console.log(req);
    console.log('GET is working');
    res.send(projectData);
}

// Post Route
app.post('/add-data', addData);

function addData(req, res) {
    const data = {
        temperature: req.body.temp,
        date: req.body.date,
        userResponse: req.body.content,
    }
    projectData.push(data);

    console.log(req.body);
    console.log("..............");
    console.log(data);
    console.log("..............");
    console.log(projectData);
}