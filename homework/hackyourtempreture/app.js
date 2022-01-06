import express from 'express';
import { keys } from "./sources/keys.js";
import fetch from 'node-fetch';
import { engine } from "express-handlebars";

const app = express();


app.engine("handlebars", engine());
app.set("view engine", "handlebars");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.render('index');
}
)

app.post('/weather', async (req, res) => {
  const cityName = req.body.cityName;
  if (cityName) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${keys.API_KEY}`);
    const data = await response.json();
    if (data.cod === "404") {
      res.sendStatus(404)
    } else {
      const temperature = data.main.temp;
      res.render('index', { weatherText: `The temperature in ${cityName} is ${temperature} °C` })
    }
  } else {
    res.send({ msg: "CityName is not found" });
  }
})

export default app;