import React from "react";

const RadioGroupWithOther = ({ 
  label, 
  name, 
  options, 
  selectedValue, 
  onChange, 
  placeholder = "Universitetin adını daxil edin", 
}) => {
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
        <label className="inline-flex items-center">
          <input
            type="radio"
            name={name}
            value="Diğer"
            checked={selectedValue && !options.includes(selectedValue)}
            onChange={() => onChange({ target: { name, value: "Diğer" } })}
            className="mr-2"
          />
          Diğər
        </label>
        {selectedValue && !options.includes(selectedValue) && (
          <input
            type="text"
            name={name}
            value={selectedValue === "Diğer" ? "" : selectedValue}
            onChange={(e) => onChange({ target: { name, value: e.target.value } })}
            placeholder={placeholder}
            className="mt-1 p-2 w-full border-b-2 border-gray-300 focus:outline-none focus:border-green-500 text-gray-800 text-sm"
          />
        )}
      </div>
    </div>
  );
};

export default RadioGroupWithOther;
