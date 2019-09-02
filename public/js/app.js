const geocode = require('../../src/utils/geocode')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const sendLocationButton = document.querySelector('#current-location-weather')

// messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            };
        });
    });
});

sendLocationButton.addEventListener('click', () => {
    // sendLocationButton.setAttribute('disabled', 'disabled');

    console.log('clickedd')
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }

        const test = geocode(location, callback);
       console.log(test)
        fetch('/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error;
                    messageTwo.textContent = '';
                } else {
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                };
            });
            console.log(location)
        });

    });
});


