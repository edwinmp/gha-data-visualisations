import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const yearProgressMapping = [
  { year: '2018', progress: 0 },
  { year: '2019', progress: 25 },
  { year: '2020', progress: 50 },
  { year: '2021', progress: 75 },
  { year: '2022', progress: 100 },
];
const RangeSlider = (props) => {
  const [value, setValue] = useState(props.defaultValue ? props.defaultValue : props.min);
  useEffect(() => {
    if (props.onChange) props.onChange(value);
  }, [value]);

  const handleChange = (event) => {
    event.preventDefault();
    const sliderEl = document.querySelector(`#${props.name}`);

    let progress;
    if (props.incremental) {
      if (props.name === 'years') {
        progress = yearProgressMapping.find((item) => item.year === event.target.value).progress;
      } else {
        progress = (Number(event.target.value) / Number(sliderEl.max)) * 100;
      }
      sliderEl.style.background = `linear-gradient(to right, #cb5730 ${progress}%, #ccc ${progress}%)`;
    }

    setValue(event.target.value);
  };

  return (
    <div className={`range labelled-data-selector--wrapper ${props.className}`}>
      <label>
        <b>{props.label}</b>
      </label>
      <input
        type="range"
        id={props.name}
        value={value}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={handleChange}
      />
      <div className="slider-ticks">
        {props.dataList.map((item) => (
          <span key={item}>
            {' '}
            <label>{item}</label>
          </span>
        ))}
      </div>
    </div>
  );
};

RangeSlider.propTypes = {
  step: PropTypes.number,
  min: PropTypes.string,
  max: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  dataList: PropTypes.array,
  name: PropTypes.string,
  incremental: PropTypes.bool,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
};

export default RangeSlider;
