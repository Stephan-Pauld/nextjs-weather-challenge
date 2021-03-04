import axios from 'axios';
require('dotenv').config();


// is this propper or ok to do? chaining together axios requests like this?
export default async(req, res) => {
  const getIp = `https://api.ipify.org?format=json`
  const ip = await axios.get(getIp)

  const getLocation = `http://api.ipstack.com/${ip.data.ip}?access_key=${process.env.IP_STACK}`

  const location = await axios.get(getLocation)

  const getWeather = `http://api.openweathermap.org/data/2.5/weather?q=${location.data.city}&units=metric&appid=${process.env.WM_KEY}`
  console.log(getWeather);
  const weatherData = await axios.get(getWeather)

  res.status(200).json({ data:weatherData.data})
}
