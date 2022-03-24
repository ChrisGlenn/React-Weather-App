import React,{useState} from 'react'
import axios from 'axios'

function App() {
  const [data,setData] = useState({}) // weather data
  const [location,setLocation] = useState('') // weather location
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=99ab07035a26d0e11cff9bb898af3007` // api url

  const searchLocation = (event) => {
    // once the user types in a location and hits the enter key, the api will get the correct weather
    // for the location entered and return it into 'data' as a JSON object which can then be used to grab
    // information from such as the temp or wind speed
    if (event.key === 'Enter'){
      axios.get(url).then((response) => {
        setData(response.data) // set data to response.data
        console.log(response.data) // console log data
      })
      setLocation('') // reset the serach bar text
    }
  }


  return (
    <div className="app">
      <div className="search">
        <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location...'
        type="text"/>
      </div>
      <div className='container'>
        {/* top section */}
        <div className='top'>
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {/* bottom section */}
        {/* hide if the user hasn't entered in a locatio yet */}
        {data.name != undefined &&
          <div className='bottom'>
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>feels like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}</p> : null}
              <p>humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>wind speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
