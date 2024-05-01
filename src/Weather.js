import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Search, MapPin, Wind } from "react-feather";
import dateFormat from "dateformat";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Weather.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [backgroundImage, setBackgroundImage] = useState("");

  const getWeatherbyCity = async () => {
    setTimeout(() => {
      const randomTemp = Math.floor(Math.random() * 40) - 10; // Random temperature between -10°C to 30°C
      const randomFeelsLike = Math.floor(Math.random() * 40) - 10; // Random feels like temperature between -10°C to 30°C
      const randomWindSpeed = Math.floor(Math.random() * 30); // Random wind speed between 0 knots to 30 knots
      const randomWindDeg = Math.floor(Math.random() * 360); // Random wind direction between 0° to 360°
      const randomHumidity = Math.floor(Math.random() * 100); // Random humidity between 0% to 100%
      const randomIndex = Math.floor(Math.random() * 4);

      let newBackgroundImage;
      switch (randomIndex) {
        case 0:
          newBackgroundImage = "Assets/night.png";
          break;
        case 1:
          newBackgroundImage = "Assets/cloud.png";
          break;
        case 2:
          newBackgroundImage = "Assets/snow.png";
          break;
        case 3:
          newBackgroundImage = "Assets/sun.png";
          break;
        default:
          newBackgroundImage = "";
      }

      setBackgroundImage(newBackgroundImage);

      setWeather({
        name: city,
        sys: { country: "Random" }, // set country as 'Random'
        weather: [{ description: " Weather" }], // Dummy weather description
        main: {
          temp: randomTemp,
          feels_like: randomFeelsLike,
          humidity: randomHumidity,
        }, // Random temperature, feels like temperature, and humidity
        wind: { speed: randomWindSpeed, deg: randomWindDeg }, // Random wind speed and direction
      });
      setCity("");
    }, 1000); //  loading time
  };

  const renderDate = () => {
    let now = new Date();
    return dateFormat(now, "dddd, mmmm dS, h:MM TT");
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Container>
        <h1 className="text-center mt-3 mb-5" style={{ fontWeight: "bold" }}>
          Weather App
        </h1>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Form>
              <Form.Group controlId="formCity">
                <Form.Control
                  type="text"
                  placeholder="Enter City Name"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                block
                onClick={() => {
                  if (city.trim() !== "") {
                    getWeatherbyCity();
                  }
                }}
              >
                <Search />
              </Button>
            </Form>
          </Col>
        </Row>

        {weather && weather.weather && (
          <Row className="justify-content-center mt-5">
            <Col xs={12} md={9}>
              <div className="content">
                <div className="location d-flex">
                  <MapPin />
                  <h2>
                    {weather.name} <span>({weather.sys.country})</span>
                  </h2>
                </div>
                <p className="datetext">{renderDate()}</p>

                <div className="weatherdesc d-flex flex-c">
                  <h3>{weather.weather[0].description}</h3>
                </div>

                <div className="tempstats d-flex flex-c">
                  <h1>
                    {weather.main.temp} <span>&deg;C</span>
                  </h1>
                  <h3>
                    Feels Like {weather.main.feels_like} <span>&deg;C</span>
                  </h3>
                  <h3>
                    Humidity {weather.main.humidity} <span>%</span>
                  </h3>
                </div>

                <div className="windstats d-flex">
                  <Wind />
                  <h3>
                    Wind is {weather.wind.speed} Knots in {weather.wind.deg}
                    &deg;
                  </h3>
                </div>
              </div>
            </Col>
          </Row>
        )}

        {!weather.weather && (
          <Row className="justify-content-center mt-5">
            <Col xs={12} md={6}>
              <div className="content">
                <h4>No Data found !</h4>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default App;
