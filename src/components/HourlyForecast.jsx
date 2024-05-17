export default function HourlyForecast({ currentDay }) {
  return (
    <ul className="flex gap-2 overflow-auto">
      {currentDay.hours.map((hour, index) => {
        return (
          <li key={index} className="flex flex-col items-center flex-[0_0_4rem]">
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
