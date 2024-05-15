export default function HourlyForecast({ currentDay }) {
  return (
    <ul className="grid grid-cols-6 gap-2">
      {currentDay.hours.map((hour, index) => {
        return (
          <li key={index} className="flex flex-col items-center">
            <span className="font-light text-sm">{hour.datetime.getHours() === currentDay.datetimeNow.getHours() ? "Now" : `${hour.datetime.getHours()}h`}</span>
            <div>
              <img
                src={hour.icon}
                alt=""
                className="flex w-full"
              />
            </div>
            <span>{hour.temp}°</span>
          </li>
        );
      })}
    </ul>
  );
}
