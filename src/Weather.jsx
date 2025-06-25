import React, { useState, useEffect } from 'react';

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

function Weather() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [city, setCity] = useState('nairobi')

  const fetchWeatherData = async(cityName) => {

    setLoading(true)
    const url = `${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`

    const response = await fetch(url)

    const data = await response.json()

    setWeatherData(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchWeatherData(city)
  }, [])

  // Log only when weatherData changes
  useEffect(() => {
    console.log(weatherData)
  }, [weatherData])

  const handleSubmit = (e) => {
    e.preventDefault()

    if(city.trim()){
      fetchWeatherData(city.trim())
    }
  }
  

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-300 via-green-300 to-blue-600'>
      <div className='max-w-md mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-white mb-2'>Weather App</h1>
          <p className='text-blue-100'>Get curent weather for any city</p>
        </div>

        {/* Search Form */}

        <form onSubmit={handleSubmit} className='mb-6'>
          <div className='flex gap-2'>
            <input
              type='text'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder='Enter city name...'
              className='flex-1 px-4 py-2 text-white font-extrabold rounded-lg bg-blue-300 border border-blue-200/20 focus:outline-none focus:ring-2 focus:ring-blue-200/30'
            />
            <button
              type='submit'
              className='px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200/30 cursor-pointer'
            >
              Search
            </button>
          </div>
        </form>

        {loading && (
          <div className="flex flex-col items-center justify-center py-10">
            {/* Spinner */}
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
            {/* Loader Text */}
            <p className="text-blue-800 font-semibold">Fetching weather data...</p>
          </div>
        )}

        {
          weatherData && (
            <div className='bg-white rounded-lg shadow-lg p-6'>
              <div className='text-center mb-6'>
                <h2 className='text-2xl font-bold text-gray-800'>
                  {weatherData.name}, {weatherData.sys.country}
                </h2>
                <p className='text-gray-600 capitalize'>{weatherData.weather[0].description}</p>
              </div>
              
              <div>
                <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description}
                className='mx-auto mb-2'
                />

                <div
                className='text-4xl font-bold text-gray-800 text-center mb-2'>{Math.round(weatherData.main.temp)}&deg;C
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6 text-center">
                  <div>
                    <div className="text-sm text-gray-500">Humidity</div>
                    <div className="text-lg font-semibold text-blue-800">{weatherData.main.humidity}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Clouds</div>
                    <div className="text-lg font-semibold text-blue-800">{weatherData.clouds.all}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Wind</div>
                    <div className="text-lg font-semibold text-blue-800">{weatherData.wind.speed} m/s</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Pressure</div>
                    <div className="text-lg font-semibold text-blue-800">{weatherData.main.pressure} hPa</div>
                  </div>
                </div>

              </div> 
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Weather

