const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicnBpbGxhciIsImEiOiJjazNxZG9qa2EwMGptM2VtbmdxdGR0dXFhIn0.yr37nnt5f9f2Y0ZMsAWxTw&limit=1'

    request({url, json: true}, (error, {statusCode, body}) => {
        if (error && error.code == 'ENOTFOUND') {
            callback('Error - there is an issue with your network connection.', undefined)
        } else if (error) {
            callback('Error - there is an issue gecode process.', undefined)
        } else {
            switch (statusCode) {
                case 200:
                    if (body.features.length === 0) {
                        callback('Not able to retrieve the location specified.', undefined)
                    }
                    else {
                        callback(undefined, {
                            latitude: body.features[0].center[1],
                            longitude: body.features[0].center[0],
                            location: body.features[0].place_name
                        })
                    }
                    break
                default:
                    callback(body.error, undefined)
            }
        }
    })
} 

module.exports = geocode