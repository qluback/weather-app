export default function LargeCard({ title, icon, children }) {
  return (
    <div className="flex flex-col gap-4 p-3 bg-[#D0BCFF4D] rounded-xl">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 flex justify-center items-center bg-white rounded-full">
          {icon}
        </div>
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}
