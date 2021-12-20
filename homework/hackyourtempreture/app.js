import express from 'express';
import { keys } from "./sources/keys.js";
import fetch from 'node-fetch';

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.send('<h1>hello from backend to frontend!</h1>');
}
)

app.post('/weather', async (req, res) => {
  const cityName = req.body.cityName;
  if (cityName) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}`);
    const data = await response.json();
    if (data.cod === "404") {
      res.sendStatus(404)
    } else {
      const temperature = Math.floor(data.main.temp - 273.15);;
      res.send(`the tempreture in ${cityName} is ${temperature}`)
    }
  } else {
    res.send({ msg: "CityName is not found" });
  }
})

export default app;