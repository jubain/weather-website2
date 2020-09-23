const axios = require('axios');
const geocode = (address, callback) => {
    const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoianViZWVuIiwiYSI6ImNrZjhpdGUydzA1OHMydW81MDd0eXk4NmsifQ.UAJFYkYLlfHDhZac9ZSSCg&limit=1';
    axios.get(url2)
        .then((response) => {
            if (response.data.features.length === 0) {
                callback('Unable to find the location', undefined)
            } else {
                callback(undefined, {
                    latitude: response.data.features[0].center[0],
                    longitude: response.data.features[0].center[1],
                    location: response.data.features[0].place_name
                })
            }
        })
        .catch((error) => {
            callback(error, undefined);

        })

}

module.exports = geocode;