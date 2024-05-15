export default function HourlyRainChance({ currentDay }) {
  return (
    <ul className="flex flex-col">
      {currentDay.hours.map((hour, index) => {
        let cssClassesBarFilled = `bg-[#8A20D5] h-4 rounded-full w-[${hour.rainChance}%]`;

        return (
          <li key={index} className="flex items-center">
            <span className="w-2/12">{`${hour.datetime.getHours()}h`}</span>
            <div className="bg-[#FAEDFF] flex-1 h-4 rounded-full">
              <div className={cssClassesBarFilled}></div>
            </div>
            <span className="w-2/12 text-right">{hour.rainChance}%</span>
          </li>
        );
      })}
    </ul>
  );
}
