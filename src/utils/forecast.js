const request = require('request');

const forecast = (longitude, latitude, callback) => {

    const url = 'https://api.darksky.net/forecast/53295cf6270e616f72bf4a2b3a7b42d6/' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude) + '?units=si';

    request({ url, json: true }, (error, { body }) => {
    
        if (error) {
            callback("Unable to connect to weather service!", undefined);
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            const temp = body.currently.temperature;
            const chance = body.currently.precipProbability;
            const tempLow = body.daily.data[0].temperatureLow;
            const tempHigh = body.daily.data[0].temperatureHigh;
        
            // console.log("MIN: %sC MAX: %sC", tempLow.toFixed(1), tempHigh.toFixed(1));
            // console.log("It is currently %s Celsius degrees out. There is %s% chance of rain.", temp, chance);

            callback(undefined, body.daily.data[0].summary 
            + ' MIN: ' + tempLow.toFixed(1) + 'C'
            + ' MAX: ' + tempHigh.toFixed(1) + 'C'
            + ' It is currently ' + temp + ' Celsius degrees out.'  
            + ' There is ' + chance + '% chance of rain. ');
        }
    });
}

module.exports = forecast;
