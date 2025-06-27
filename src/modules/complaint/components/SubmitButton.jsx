function SubmitButton({ disabled, loading }) {
  return (
    <div className="text-left">
      <button
        type="submit"
        className={`bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-6 rounded transition cursor-pointer ${
          disabled && "opacity-50 cursor-not-allowed"
        }`}
        disabled={disabled}
      >
        {loading ? "Enviando..." : "Enviar Reclamo"}
      </button>
    </div>
  );
}

export default SubmitButton;
