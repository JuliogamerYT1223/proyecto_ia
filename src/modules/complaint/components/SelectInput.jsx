function SelectInput({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  options,
}) {
  const baseClass = `w-full px-4 py-2 border rounded text-gray-800 font-poppins ${
    error ? "border-red-500" : "border-gray-300"
  }`;

  return (
    <div>
      <label className="block mb-1">
        {label} <span className="text-red-900">*</span>
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={baseClass}
      >
        <option value="">-- Seleccionar --</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {touched && error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}

export default SelectInput;
