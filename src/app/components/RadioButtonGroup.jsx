// RadioGroup.jsx
const RadioButtonGroup = ({ label, name, options, selectedValue, onChange }) => {
    return (
      <div className="bg-white p-4 mb-6 rounded-md shadow-md">
        <h3 className="text-base mb-4 text-black">{label}</h3>
        <div className="flex flex-col gap-2 text-gray-700">
          {options.map((option, index) => (
            <label key={index} className="inline-flex items-center">
              <input
                type="radio"
                name={name}
                value={option}
                checked={selectedValue === option}
                onChange={onChange}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    );
  };
  
  export default RadioButtonGroup;
  