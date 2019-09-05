const request = require('request');

const reverseGeocode = (longitude, latitude, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude) + '.json?access_token=pk.eyJ1IjoiaWdvcnNzYWxnYWRvIiwiYSI6ImNrMDczeHE2MzQ3eWQzYm1qMnRzcmM3bjUifQ.-slztOca_2phP8IIVYc1wA';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Geo Code service!', undefined);
        } else if (body.features.length === 0) {
            callback('Please check the location. Try another search.', undefined)
        } else {
            callback(undefined, {
                city: body.features[0].place_name
            })
        }
    });
};

module.exports = reverseGeocode;