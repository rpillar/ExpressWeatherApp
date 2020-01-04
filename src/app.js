const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const staticFolder = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(staticFolder))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Search our database for help / possible solutions.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        res.statusCode = 400
        return res.send ({
            error: 'No location data has been supplied.'
        })
    }

    geocode(req.query.location, (error, { latitude, longitude, location } = {}) => {
        if ( error ) {
            res.statusCode = 400
            return res.send({error})
        }

        forecast(latitude, longitude, (f_error, f_data) => {
            if ( error ) {
                res.statusCode = 400
                return res.send({error})
            }

            res.send({
                location: location, 
                forecast: f_data
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article cannot be found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found'
    })
})

app.listen(3030, () => {
    console.log('Server has been started on port :3030')
})