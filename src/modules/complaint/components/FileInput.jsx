function FileInput({ name, onChange, refProp }) {
  return (
    <div>
      <label className="block mb-1">Archivos adjuntos (opcional)</label>
      <input
        ref={refProp}
        type="file"
        name={name}
        accept="image/*,.pdf"
        onChange={onChange}
        className="file-input w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded file:bg-white file:text-black hover:file:bg-gray-100"
      />
    </div>
  );
}

export default FileInput;
