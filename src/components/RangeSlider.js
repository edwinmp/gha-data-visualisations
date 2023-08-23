import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const RangeSlider = (props) => {
  const [value, setValue] = useState(props.min);
  useEffect(() => {
    if (props.onChange) props.onChange(value);
  }, [value]);

  const handleChange = (event) => {
    event.preventDefault();
    setValue(event.target.value);
  };

  return (
    <div className="range labelled-data-selector--wrapper">
      <label>
        <b>{props.label}</b>
      </label>
      <span>{props.labelLeft}</span>
      <input type="range" value={value} min={props.min} max={props.max} step={props.step} onChange={handleChange} />
      <span>{props.labelRight}</span>
    </div>
  );
};

RangeSlider.propTypes = {
  step: PropTypes.number,
  min: PropTypes.string,
  max: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  labelLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  labelRight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default RangeSlider;
