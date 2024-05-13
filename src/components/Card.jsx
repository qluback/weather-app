import { FaWind } from "react-icons/fa6";

export default function Card({title, value}) {
  return (
    <div className="flex items-center gap-2 p-3 bg-[#D0BCFF4D] rounded-xl">
      <div className="h-10 w-10 flex justify-center items-center bg-white rounded-full">
        <FaWind />
      </div>
      <div className="flex flex-col">
        <span>{title}</span>
        <span>{value}</span>
      </div>
    </div>
  );
}
