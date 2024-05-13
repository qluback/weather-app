import { Button, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Card from "./components/Card";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  useEffect(() => {
    fetch(
      "http://api.weatherapi.com/v1/forecast.json?key=d22d0081a3db440b964164153241305&q=Paris&days=2&aqi=no&alerts=no"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      });
  }, []);

  return (
    <>
      {/* <header className="flex justify-between">
      <h1>Weather</h1>
      <div className="flex gap-4">
        <button>°C</button>
        <button>°F</button>
      </div>
    </header> */}
      {weatherData !== null && (
        <main>
          <section className="current-weather-container text-white px-8 py-4 h-2/5 rounded-b-3xl">
            <div className="flex justify-between items-center gap-2">
              <input
                type="text"
                className="flex-1 h-10 bg-transparent border-0"
                defaultValue={
                  weatherData !== null
                    ? `${weatherData.location.name}, ${weatherData.location.country}`
                    : ""
                }
              />
              <button
                type="button"
                className="h-10 w-10 flex justify-center items-center"
              >
                <FaMagnifyingGlass />
              </button>
            </div>
            <div className="flex">
              <div className="relative">
                <span className="text-7xl">{weatherData.current.temp_c}°</span>
                <span className="absolute bottom-0 w-full">
                  Feels like {weatherData.current.feelslike_c}°
                </span>
              </div>
              <div>
                <img
                  src={weatherData.current.condition.icon}
                  alt=""
                  className="flex w-40"
                />
                <span>{weatherData.current.condition.text}</span>
              </div>
            </div>
            <p>
              Température moyenne{" "}
              {weatherData.forecast.forecastday[0].day.avgtemp_c}°
            </p>
          </section>
          <section className="flex flex-col gap-4 p-4">
            <nav className="grid grid-cols-3 gap-4">
              <button className="bg-white text-center py-2 rounded-xl transition-all duration-300 hover:bg-[#E0B6FF] hover:text-[#2E004E]">
                Today
              </button>
              <button className="bg-white text-center py-2 rounded-xl transition-all duration-300 hover:bg-[#E0B6FF] hover:text-[#2E004E]">
                Tomorrow
              </button>
              <button className="bg-white text-center py-2 rounded-xl transition-all duration-300 hover:bg-[#E0B6FF] hover:text-[#2E004E]">
                10 days
              </button>
            </nav>
            <div className="grid grid-rows-2 grid-cols-2 gap-4">
              <Card title="Wind speed" value={`${weatherData.current.wind_kph}km/h`} />
              <Card title="Rain chance" value={`${weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%`} />
              <Card title="Pressure" value={`${weatherData.current.pressure_mb}hpa`} />
              <Card title="UV index" value={`${weatherData.current.uv}`} />
            </div>
          </section>
        </main>
      )}
    </>
  );
}
