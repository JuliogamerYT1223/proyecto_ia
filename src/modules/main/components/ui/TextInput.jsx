import { useState } from "react";

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
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const baseClass = `w-full px-4 py-2 border rounded text-gray-800 font-poppins ${
    error ? "border-red-500" : "border-gray-300"
  } ${isPassword ? "pr-10" : ""}`;

  return (
    <div className="relative">
      <label className="block mb-1 font-poppins text-[14px]">
        {label} <span className="text-red-900">*</span>
      </label>
      <input
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={baseClass}
      />

      {isPassword && (
        <button
          type="button"
          className="absolute top-9 right-3 text-gray-600 focus:outline-none"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          <i
            className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
          ></i>
        </button>
      )}

      {touched && error && <p className="text-sm text-red-600 mt-1 font-poppins">{error}</p>}
    </div>
  );
}

export default TextInput;
