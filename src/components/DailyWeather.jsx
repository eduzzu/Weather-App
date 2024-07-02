import { Box, Typography } from "@mui/material";

const DailyWeather = ({ forecast }) => {
  console.log(forecast)
  return (
    <Box
      sx={{
        width: "85%",
        display: "flex",
        justifyContent: "space-between",
        color: "#ffffff",
        mt: "15%"
      }}
    >
      {forecast.map((day, index) => (
        <Box key={index} sx={{ textAlign: "center" }}>
          <Typography sx={{ fontFamily: "Montserrat", fontWeight: "bolder" }}>
            {new Date(day.dt * 1000).toLocaleDateString()}
          </Typography>
          <img
            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
            alt="Weather Icon"
            height={"30%"}
          />
          <Typography sx={{ fontFamily: "Montserrat", fontWeight: "bolder" }}>
            {day.weather[0].description.toUpperCase()}
          </Typography>
          <Typography sx={{ fontFamily: "Montserrat", fontWeight: "bolder" }}>
            {(day.main.temp - 273).toFixed(0)} °C
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default DailyWeather;
