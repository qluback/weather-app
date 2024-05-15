export default function ButtonTab({ label, isActive, onSelectTab }) {
  let cssClasses = "text-center py-2 rounded-xl transition-all duration-300"

  if (isActive) {
    cssClasses += " bg-[#E0B6FF]"
  } else {
    cssClasses += " bg-white hover:bg-[#D0BCFF4D] hover:text-[#2E004E]"
  }

  return (
    <button
      className={cssClasses}
      onClick={onSelectTab}
    >
      {label}
    </button>
  );
}
