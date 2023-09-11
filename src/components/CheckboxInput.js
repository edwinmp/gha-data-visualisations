import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CheckboxInput = ({ label, onChange }) => {
  const [checkedYes, setCheckedYes] = useState(false)
  const [value, setValue] = useState('');

  useEffect(()=> {
    if (checkedYes) {
      setValue('yes');
    }
    else{
      setValue('')
    }
  }, [checkedYes])

  useEffect(() => {
    if (onChange) onChange(value);
  }, [value]);

  const handleChange = (event) => {
    if(event.target.name === 'yes'){
      setCheckedYes(!checkedYes)
    }
  };

  return (
    <div className="radio-select labelled-data-selector--wrapper">
      <label>{label}</label>
          <label htmlFor='yes'><input
            type="checkbox"
            name='yes'
            id='yes'
            onChange={handleChange}
            checked={checkedYes}
          /> Countries in protracted crisis</label>
    </div>
  );
};

CheckboxInput.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
};

export default CheckboxInput;
