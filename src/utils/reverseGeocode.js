const request = require('request');

const geocode = (latitude, logitude, callback) => {
    // const latitude = '-22.898786599999998'
    // const logitude = '-47.2014923'
    geocode.reverseGeocode('mapbox.places', latitude, logitude, function (err, geoData) {
        console.log(geoData);
    });
};