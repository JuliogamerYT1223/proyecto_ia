export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`font-poppins btn bg-red-900 text-white border-none hover:bg-red-800 transition shadow-none text-[15px] ${className}`}
    >
      {children}
    </button>
  );
}
