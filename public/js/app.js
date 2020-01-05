const weatherForm      = document.querySelector('form')
const search           = document.querySelector('input')
const location_message = document.querySelector('p#location')
const temperature      = document.querySelector('#temperature')
const rainfallprob     = document.querySelector('#rainfallprob')
const forecast_data    = document.querySelector('#forecast-data')
const error_message    = document.querySelector('#error-message')
const loading_message  = document.querySelector('#loading-message')

location_message.textContent = ''
temperature.textContent  = ''
rainfallprob.textContent = ''
forecast_data.style.display   = "none"
error_message.style.display   = "none"
loading_message.style.display = "none"

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    loading_message.style.display = "block"
    error_message.style.display   = "none"
    forecast_data.style.display   = "none"

    const location = search.value
    fetch('/weather?location=' + location).then((response) => {
        response.json().then(({error, location, forecast}) => {
            if (error) {
                loading_message.style.display = "none"

                error_message.textContent   = error
                error_message.style.display = "block"
            }
            else {
                loading_message.style.display = "none"

                location_message.textContent = location
                temperature.textContent  = forecast.temperature
                rainfallprob.textContent = ( forecast.precipProbability * 100 ).toFixed(2) + ' %'
                forecast_data.style.display = "block"
            }
        })
    })
})