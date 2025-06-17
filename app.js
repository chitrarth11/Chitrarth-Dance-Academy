const express = require('express');
const path = require('path');
const appli = express();
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');
require('dotenv').config();

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
}


//MONGOOSE SCHEMA
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    phone: String,
    email: String,
    query: String
});

const Contact = mongoose.model('Contact', contactSchema);


// EXPRESS SPECIFIC STUFF
appli.use('/static', express.static('static'));

appli.use(express.urlencoded())


// PUG SPECIFIC STUFF
appli.set('view engine', 'pug');

appli.set('views', path.join(__dirname, 'views'));


// ENDPOINTS
appli.get('/', (req, res) => {
    const params = {};
    res.status(200).render('home.pug', params);
});

appli.get('/about', (req, res) => {
    const params = {};
    res.status(200).render('about.pug', params);
});

appli.get('/contact', (req, res) => {
    const submitted = req.query.submitted === 'true';
    const error = req.query.error === 'true';
    res.status(200).render('contact.pug', {
        message1: submitted ? 'Form submitted successfully!' : null,
        message2: error ? 'Something went wrong. Please try again.' : null
    });
});

appli.post('/contact', (req, res) => {
    let myData = new Contact(req.body);
    myData.save()
        .then(() => {
            res.redirect('/contact?submitted=true');
        })
        .catch(() => {
            res.redirect('/contact?error=true');
        });
});


// STARTING THE SERVER
appli.listen(port, () => {
    console.log(`Application started successfully on port ${port}`)
});
