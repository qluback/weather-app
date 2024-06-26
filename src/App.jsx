import { useEffect } from "react";
import { useState } from "react";
import {
  FaArrowUpLong,
  FaClock,
  FaCloudShowersHeavy,
  FaDroplet,
  FaMagnifyingGlass,
  FaSun,
  FaWater,
  FaWind,
} from "react-icons/fa6";
import SmallCard from "./components/SmallCard";
import LargeCard from "./components/LargeCard";
import HourlyForecast from "./components/HourlyForecast";
import HourlyRainChance from "./components/HourlyRainChance";
import ButtonTab from "./components/ButtonTab";
import { WEATHER_DATA } from "./data/weather-data";

export default function App() {
  const tabs = ["Today", "Tomorrow", "10 days"];
  const [weatherData, setWeatherData] = useState(null);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // useEffect(() => {
  //   fetch(
  //     "http://api.weatherapi.com/v1/forecast.json?key=d22d0081a3db440b964164153241305&q=Paris&days=10&aqi=no&alerts=no"
  //   )
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setWeatherData(data);
  //     });
  // }, []);

  useEffect(() => {
    setWeatherData(WEATHER_DATA[Math.floor(Math.random() * 7)]);
  }, [])

  function getDayFormattedData() {
    const now = new Date();
    let hoursArray = [];
    const dayIndex = activeTab === "Today" ? 0 : 1;
    weatherData.forecast.forecastday[dayIndex].hour.forEach((hour) => {
      const date = new Date(hour.time);
      if (dayIndex || date.getHours() >= now.getHours()) {
        hoursArray.push({
          temp: hour.temp_c.toFixed(),
          icon: hour.condition.icon,
          datetime: date,
          rainChance: hour.chance_of_rain.toString(),
        });
      }
    });

    return {
      datetimeNow: now,
      windSpeed: weatherData.forecast.forecastday[dayIndex].day.avgvis_km.toFixed(),
      rainChance: weatherData.forecast.forecastday[dayIndex].day.daily_chance_of_rain,
      pressure: weatherData.current.pressure_mb.toFixed(),
      uv: weatherData.forecast.forecastday[dayIndex].day.uv,
      hours: hoursArray,
    };
  }

  let activeDay = null;
  if (weatherData !== null ) {
    activeDay = getDayFormattedData();
  }

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
          <section className="current-weather-container flex flex-col justify-between text-white px-8 py-4 h-96 rounded-b-3xl">
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
            <div className="flex justify-between items-end">
              <div className="relative">
                <span className="text-9xl">
                  {weatherData.current.temp_c.toFixed()}°
                </span>
                <span className="w-full whitespace-nowrap ml-[-40px]">
                  Feels like {weatherData.current.feelslike_c.toFixed()}°
                </span>
              </div>
              <div className="flex justify-end relative w-28 pt-28 mb-[13px]">
                <img
                  src={weatherData.current.condition.icon}
                  alt=""
                  className="flex w-full absolute top-0 left-4"
                />
                <span className="text-right">
                  {weatherData.current.condition.text}
                </span>
              </div>
            </div>
            <p>
              Température moyenne{" "}
              {weatherData.forecast.forecastday[0].day.avgtemp_c.toFixed()}°
            </p>
          </section>
          <section className="flex flex-col gap-4 p-4">
            <nav className="grid grid-cols-3 gap-4">
              {tabs.map(tab => (
                <ButtonTab
                  key={tab}
                  label={tab}
                  isActive={activeTab === tab}
                  onSelectTab={() => setActiveTab(tab)}
                />
              ))}
              {/* <ButtonTab
                label="Tomorrow"
                isActive={activeTab === "Tomorrow"}
                onSelectTab={() => setActiveTab("Tomorrow")}
              />
              <ButtonTab
                label="10 days"
                isActive={activeTab === "10 days"}
                onSelectTab={() => setActiveTab("10 days")}
              /> */}
            </nav>
            <div className="grid grid-cols-2 gap-4">
              <SmallCard
                title="Wind speed"
                icon={<FaWind />}
                value={`${activeDay.windSpeed}km/h`}
              />
              <SmallCard
                title="Rain chance"
                icon={<FaCloudShowersHeavy />}
                value={`${activeDay.rainChance}%`}
              />
              <SmallCard
                title="Pressure"
                icon={<FaWater />}
                value={`${activeDay.pressure} Hpa`}
              />
              <SmallCard
                title="UV index"
                icon={<FaSun />}
                value={`${activeDay.uv}`}
              />
            </div>
            <LargeCard title="Hourly forecast" icon={<FaClock />}>
              <HourlyForecast currentDay={getDayFormattedData()} />
            </LargeCard>
            <LargeCard title="Chance of rain" icon={<FaCloudShowersHeavy />}>
              <HourlyRainChance currentDay={getDayFormattedData()} />
            </LargeCard>
            <div className="grid grid-cols-2 gap-4">
              <SmallCard
                title="Humidité"
                icon={<FaDroplet />}
                value={`${weatherData.current.humidity}%`}
              />
              <SmallCard
                title="Wind direction"
                icon={<FaArrowUpLong />}
                rotateIconDegree={weatherData.current.wind_degree.toString()}
                value={`${weatherData.current.wind_degree}°`}
              />
            </div>
          </section>
        </main>
      )}
    </>
  );
}
