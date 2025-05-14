const express = require('express');
const path = require('path');
const fs = require('fs');
const appli = express();
const port = 8000;

// EXPRESS SPECIFIC STUFF
appli.use('/static', express.static('static'));

appli.use(express.urlencoded())
// use urlencoded to parse to form data. It helps to bring from data to express

// PUG SPECIFIC STUFF
appli.set('view engine', 'pug');

appli.set('views', path.join(__dirname, 'views'));

// ENDPOINTS
appli.get('/', (req, res) => {
    const params = {};
    res.status(200).render('home.pug', params);
}); 

appli.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render('contact.pug', params);
}); 

// STARTING THE SERVER
appli.listen(port, () => {
    console.log(`Application started successfully on port ${port}`)
});
