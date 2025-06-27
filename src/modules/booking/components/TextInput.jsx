function TextInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
}) {
  const baseClass = `w-full px-4 py-2 border rounded text-gray-800 font-poppins ${
    error ? "border-red-500" : "border-gray-300"
  }`;

  return (
    <div>
      <label className="block mb-1">
        {label} <span className="text-red-900">*</span>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={baseClass}
      />
      {touched && error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}

export default TextInput;
