function FormMessage({ show, success, message }) {
  if (!show) return null;

  return (
    <div
      className={`mb-8 text-[15px] text-center py-2 px-4 rounded transition-all duration-300 ease-in-out ${
        success ? "bg-green-800 text-white" : "bg-red-800 text-white"
      }`}
    >
      {message}
    </div>
  );
}

export default FormMessage;
