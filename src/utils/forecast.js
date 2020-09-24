const axios = require('axios');

const forecast = (location, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5ca92502d42e79989d4be3ebceb2e964&query=' + location + '&units=m';
    axios.get(url)
        .then((response) => {
            if (response.data.request.query.length === 0) {
                callback('Unable to find the location', undefined)
            } else {
                callback(undefined,
                    `The temperature of our region ${response.data.current.temperature} and the time is your zone ${response.data.current.observation_time}`
                )
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

module.exports = forecast;