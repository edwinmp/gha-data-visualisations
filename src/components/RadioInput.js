import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const RadioInput = ({ label, name, options, onChange }) => {
  const [value, setValue] = useState('');
  useEffect(() => {
    if (onChange) onChange(value);
  }, [value]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="radio-select labelled-data-selector--wrapper">
      <label>{label}</label>
      {options.map((option) => (
        <div key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            id={option.value}
            onChange={handleChange}
            checked={value === option.value}
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </div>
  );
};

RadioInput.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
};

export default RadioInput;
