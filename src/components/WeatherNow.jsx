import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import CompressOutlinedIcon from "@mui/icons-material/CompressOutlined";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import mainImage from "../public/assets/mainImage.jpg";
import cloudyImage from "../public/assets/cloudy.jpg";
import sunnyImage from "../public/assets/sun.jpg";
import rainImage from "../public/assets/rain.jpg";
import snowImage from "../public/assets/snowImage.jpg";
import DailyWeather from "./DailyWeather";
import HourlyWeather from "./HourlyWeather";

const WeatherNow = () => {
  const [weatherNow, setWeatherNow] = useState(null);
  const [dailyWeather, setDailyWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState(null);
  const [currentShow, setCurrentShow] = useState("daily");
  const [city, setCity] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(mainImage);

  const getWeather = async () => {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const weatherData = await weatherResponse.json();
    setWeatherNow(weatherData);

    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const forecastData = await forecastResponse.json();
    const twelveOClockWeatherList = forecastData.list.filter((item) =>
      item.dt_txt.includes("12:00:00")
    );
    if (twelveOClockWeatherList.length > 0) {
      setDailyWeather(twelveOClockWeatherList);
    }
    const hourlyForecastData = {
      ...forecastData,
      list: forecastData.list.slice(0, 7),
    };

    setHourlyWeather(hourlyForecastData);

    if (weatherData.weather[0].description.includes("clouds")) {
      setBackgroundImage(cloudyImage);
    } else if (weatherData.weather[0].description.includes("clear sky")) {
      setBackgroundImage(sunnyImage);
    } else if (weatherData.weather[0].description.includes("rain")) {
      setBackgroundImage(rainImage);
    } else if (weatherData.weather[0].description.includes("snow")) {
      setBackgroundImage(snowImage);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    getWeather();
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleSearch}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          top: "3%",
          height: "15%",
        }}
      >
        <input
          type="text"
          className="cityInput"
          placeholder="Enter a city name..."
          value={city}
          onChange={(event) => setCity(event.target.value)}
          style={{
            borderRadius: "20px",
            width: "30%",
            height: "30%",
            paddingLeft: "1%",
            backgroundColor: "transparent",
            color: "white",
            fontWeight: "bolder",
          }}
        />
      </form>
      <Box
        sx={{
          width: "80%",
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
          top: "10%",
        }}
      >
        {weatherNow && (
          <>
            <Box
              sx={{
                width: "45%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                color: "#ffffff",
              }}
            >
              {weatherNow.weather[0].icon && (
                <img
                  src={`http://openweathermap.org/img/wn/${weatherNow.weather[0].icon}.png`}
                  alt="Weather Icon"
                  height={"30%"}
                />
              )}
              <Typography
                sx={{ fontFamily: "Montserrat", mb: 2, fontWeight: "bolder" }}
              >
                {weatherNow.weather[0].description.toUpperCase()}
              </Typography>
              <Typography
                sx={{ fontFamily: "Montserrat", mb: 2, fontWeight: "bolder" }}
              >
                {weatherNow.name}, {weatherNow.sys.country}
              </Typography>
              <Typography
                sx={{ fontFamily: "Montserrat", mb: 2, fontWeight: "bolder" }}
              >
                {(weatherNow.main.temp - 273).toFixed(0)} °C
              </Typography>
              <Typography
                sx={{ fontFamily: "Montserrat", mb: 2, fontWeight: "bolder" }}
              >
                <span style={{ color: "red" }}>
                  {(weatherNow.main.temp_max - 273).toFixed(0)} °C &nbsp;
                </span>
                <span style={{ color: "#90e0ef" }}>
                  {(weatherNow.main.temp_min - 273).toFixed(0)} °C
                </span>
              </Typography>
            </Box>

            <Box
              sx={{
                width: "45%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                color: "#ffffff",
                top: "50%",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  fontWeight: "bold",
                }}
              >
                <WaterDropOutlinedIcon /> Humidity
              </Typography>
              <Typography
                sx={{ fontFamily: "Montserrat", mb: 2, fontWeight: "bold" }}
              >
                {weatherNow.main.humidity}%
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  fontWeight: "bold",
                }}
              >
                <DeviceThermostatOutlinedIcon /> Feels like
              </Typography>
              <Typography
                sx={{ fontFamily: "Montserrat", mb: 2, fontWeight: "bold" }}
              >
                {(weatherNow.main.feels_like - 273).toFixed(0)} °C
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  fontWeight: "bold",
                }}
              >
                <AirOutlinedIcon /> Wind Speed
              </Typography>
              <Typography
                sx={{ fontFamily: "Montserrat", mb: 2, fontWeight: "bold" }}
              >
                {weatherNow.wind.speed} km/h
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  fontWeight: "bold",
                }}
              >
                <CompressOutlinedIcon /> Pressure
              </Typography>
              <Typography
                sx={{ fontFamily: "Montserrat", mb: 2, fontWeight: "bold" }}
              >
                {weatherNow.main.pressure} hPa
              </Typography>
            </Box>
          </>
        )}
      </Box>
      {dailyWeather || hourlyWeather ? (
        <Box
          sx={{
            mt: "10%",
            position: "relative",
            left: "-35%",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              sx={{
                color: "white",
                fontFamily: "Montserrat",
                border: "1px solid gray",
                width: "70%",
                color: currentShow === "daily" ? "black" : "white",
                backgroundColor:
                  currentShow === "daily" ? "white" : "transparent",
                "&:hover": {
                  backgroundColor:
                    currentShow === "daily" ? "white" : "transparent",
                  color: currentShow === "daily" ? "black" : "white",
                },
              }}
              onClick={() => setCurrentShow("daily")}
            >
              Daily
            </Button>
            <Button
              sx={{
                color: "white",
                fontFamily: "Montserrat",
                border: "1px solid gray",
                width: "80%",
                color: currentShow === "hourly" ? "black" : "white",
                backgroundColor:
                  currentShow === "hourly" ? "white" : "transparent",
                "&:hover": {
                  backgroundColor: currentShow === "hourly" ? "white" : "transparent",
                  color: currentShow === "hourly" ? "black" : "white",
                },
              }}
              onClick={() => setCurrentShow("hourly")}
            >
              Hourly
            </Button>
          </Box>
        </Box>
      ) : null}
      {currentShow === "daily" && dailyWeather && (
        <DailyWeather forecast={dailyWeather} />
      )}
      {currentShow === "hourly" && hourlyWeather && (
        <HourlyWeather hourlyForecast={hourlyWeather} />
      )}
    </Box>
  );
};

export default WeatherNow;
