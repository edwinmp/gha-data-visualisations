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

  return <input type="range" value={value} min={props.min} max={props.max} step={props.step} onChange={handleChange} />;
};

RangeSlider.propTypes = {
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,
};

export default RangeSlider;
