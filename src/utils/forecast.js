const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/67c7fcc8b3873ca47ed82938a399da00/" + latitude + ',' + longitude + "?exclude=minutely,hourly,alerts,flags&units=si"

    request({url, json: true}, (error, {statusCode, body}) => {
        if (error && error.code == 'ENOTFOUND') {
            callback('Error - there is an issue with your network connection.', undefined)
        } else {
            switch (statusCode) {
                case 200:
                    const current = body.currently
                    callback(undefined, {
                        temperature: current.temperature,
                        precipProbability: current.precipProbability
                    })
                    break
                default:
                    console.log(body.error, undefined)
            }
             
        }
    })
}

module.exports = forecast