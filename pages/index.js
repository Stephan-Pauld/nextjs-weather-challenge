import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';

export default function Home() {
  
  // using useState because of this single page I would probably use redux if I needed this data elsewhere.
  const [uom, setUom] = useState('metric');
  const [weather, setWeather] = useState({
    city: '',
    temps: {},
    wind: {},
  })

  // we do a call to our OWN api that grabs a bunch of data for weather and our IP
  useEffect(() => {
    let weatherToGrab = 'metricWeather';

    if(uom === 'imperial') {
      weatherToGrab = 'imperialWeather'
    }
    axios.get(`/api/${weatherToGrab}`)
    .then(res =>{
      console.log(res);
      setWeather(prev => ({
        ...prev,
        city: res.data.data.name,
        temps: res.data.data.main,
        wind: res.data.data.wind,
      }))
    })
    .catch(err => {

    })

  }, [uom])

  // just setting if we want imperial or metric
  const changeUom = (measurement) => {
    setUom(measurement)
  }

  if (weather.city) {
    return (
      <div>
        <Head>
          <title>
            Weather Locator
          </title>
        </Head>
        <button onClick={() => changeUom("metric")}>Celcius</button>
        <button onClick={() => changeUom("imperial")}>Fahrenheit</button>
        <h1>Weather In {weather.city}</h1>
        <h2>The tempature outside is {weather.temps.temp}{uom === "metric" ? 'C' : 'F'}</h2>
        <h2>Feels Like {weather.temps.feels_like}{uom === "metric" ? 'C' : 'F'}</h2>
        <h2>Todays High: {weather.temps.temp_max}{uom === "metric" ? 'C' : 'F'}</h2>
        <h2>Todays Low: {weather.temps.temp_min}{uom === "metric" ? 'C' : 'F'}</h2>
      </div>
    )
  } else {
    return (
      <h1>Gathering Weather Data....</h1>
    )
  }

}
