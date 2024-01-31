function Input({ name, label, error, type, value, onChange, isSubmitted }) {
  // Clases base que no cambian
  const baseInputClass = "text-xs rounded-lg block w-full p-2.5";

  // Clases que dependen de si hay error o no y si el formulario ha sido enviado
  const inputClass = isSubmitted
    ? (error
        ? "border border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"
        : "border border-green-300 text-green-900 focus:ring-green-500 focus:border-green-500 dark:bg-green-100 dark:border-green-400")
    : "border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500";

  const messageClass = `mt-2 text-sm ${isSubmitted ? (error ? 'text-red-600' : 'text-green-600') : 'text-gray-600'}`;

  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className={`block mb-2 text-sm font-medium ${isSubmitted ? (error ? 'text-red-700 dark:text-red-500' : 'text-green-700 dark:text-green-500') : 'text-gray-700'}`}
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className={`${baseInputClass} ${inputClass}`}
        value={value}
        onChange={onChange}
        placeholder={label}
      />
      {isSubmitted && (
        <p className={messageClass}>
          {error ? error : 'Campo completado correctamente'}
        </p>
      )}
    </div>
  );
}

export default Input;
