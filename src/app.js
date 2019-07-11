const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static diretory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather', 
        name: 'Igor S'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me', 
        name: 'Igor S'
    });
});

app.get('/help', (req, res) => {
    res.render('help' , {
        title: 'Help',
        helpMsg: 'Helpful message.',
        name: 'Igor S'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'you must provide an address!'
        });
    };

    const address = req.query.address;

    geocode(address, (error, { latitude, longitude, location } = {}) => { // = {} is the empty default object 
        if(error){ 
            return res.send({ error });
        };
    
        forecast( latitude, longitude, (error, forecastData) => {     // order: lat, long
            if(error){
                return res.send({ error });
            };

            res.send({
                location,
                forecast: forecastData,
                address: address
            });
        });
    });

 
});

// app.get('/products', (req, res) => {
//     if (!req.query.search)  {
//         return res.send({
//             error: 'You must provide a search term!'
//         });
//     };
    
//     console.log(req.query.search);
//     res.send({
//         products: []
//     });
// });

app.get('/help/*', (req, res) => {
    res.render('404' ,{
        title: '404',
        error: 'Help article not found',
        name: 'Igor S'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found',
        name: 'Igor S'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});