// server.js

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('currentYear', () => {
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = (`${now}, Method: ${req.method}, URL: ${req.url}`);
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
	  if (err) console.log('There was an error: ', error);
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// 	next();
// });


app.use(express.static(__dirname + '/public'));

// Redirects to different web pages
app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home',
		welcomeMessage: 'Welcome to this Website'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About'
	});
});

app.get('/contact-us', (req, res) => {
	res.send('Contact Us Page');
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Bad HTTP Request'
	});
});


app.listen(3000, () => {
	console.log('Connected to server');
});