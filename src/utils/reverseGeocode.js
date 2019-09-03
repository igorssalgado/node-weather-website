const geo = require('mapbox-geocoding')

    geo.reverseGeocode('mapbox.places', '-22.898786599999998', '-47.2014923', function (err, geoData) {
        console.log(' ' + geoData);
    });

// mapbox api token: pk.eyJ1Ijoicm9naS0iLCJhIjoiY2p4a3J5M2JjMWYwZzNvcW5idGpvMDZ0ZyJ9