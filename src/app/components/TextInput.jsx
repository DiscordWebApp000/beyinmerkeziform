const TextInput = ({ label, name, value, placeholder, onChange , type }) => {
    return (
      <div className="bg-white p-4 mb-6 rounded-md shadow-md">
        <h3 className="text-base mb-4 text-black">{label}</h3>
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="mt-1 p-2 w-full border-b-2 border-gray-300 focus:outline-none focus:border-green-500 text-gray-800 text-sm"
        />
      </div>
    );
  };
  
  export default TextInput;