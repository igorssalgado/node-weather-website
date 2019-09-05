const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const sendWeatherLocationButton = document.querySelector('#current-location-weather')


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

sendWeatherLocationButton.addEventListener('click', (e) => {
    e.preventDefault();

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        
        const location = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude            
        }

        fetch("/current?coords=" + JSON.stringify(location)).then((response) => {
            response.json().then((data) => {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            });
        });
    });
});