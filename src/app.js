const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 5500;
// Define path for express config
const publicdir = path.join(__dirname, '../public');
const viewspath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewspath);
hbs.registerPartials(partialPath);

// Setup static directories to serve
app.use(express.static(publicdir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jubeen'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Jubeen Amatya"
    })
});
app.get('/help', (req, res) => {

    res.render('help', {
        title: "Help",
        help: "This is some helpful text"
    })
});

//API
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'must provide address'
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error });
        }
        forecast(data.location, (error, forecastdata) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                latitude: data.longitude,
                longitude: data.latitude,
                location: data.location,
                country: forecastdata
            })
        });
    });
});




app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jubeen Amatya',
        errorMessage: 'Help article not found'
    })
});

//404 
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jubeen Amatya',
        errorMessage: 'Page not found'
    })
});
// port
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});