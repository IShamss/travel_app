// configuring the node local server
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.static('website'));

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'));

//the routes of the app

app.post('/add', (req, res) => {
	// let data = req.body;

	// projectData = {
	// 	temperature: data.main.temp,
	// 	date: data.date,
	// 	user: data.user
	// };
	// console.log(projectData);
	// res.send(projectData);

	newEntry = {
		temperature: req.body.main.temp,
		user: req.body.user,
		date: req.body.date
	};
	projectData = newEntry;
	console.log(projectData);
	res.send(projectData);
});
app.get('/all', (req, res) => {
	// console.log('this is the get route');
	console.log(projectData);
	res.send(projectData);
});

// Setup Server
app.listen(8081, () => {
	console.log('app running');
});
