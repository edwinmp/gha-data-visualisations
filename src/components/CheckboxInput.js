import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CheckboxInput = ({ label, onChange }) => {
  const [checkedYes, setCheckedYes] = useState(false)
  const [checkedNo, setCheckedNo] = useState(false)
  const [value, setValue] = useState('');

  useEffect(()=> {
    if (checkedYes) {
      setValue('yes');
    }
    else if(checkedNo){
      setValue('no')
    } else{
      setValue('')
    }
  }, [checkedNo, checkedYes])

  useEffect(() => {
    if (onChange) onChange(value);
  }, [value]);

  const handleChange = (event) => {
    if(event.target.name === 'yes'){
      setCheckedYes(!checkedYes)
      setCheckedNo(false);
    }
    if(event.target.name === 'no'){
      setCheckedNo(!checkedNo)
      setCheckedYes(false);
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
            disabled={checkedNo}
          /> Protracted crisis</label>
          <label htmlFor='no'><input
            type="checkbox"
            name='no'
            id='no'
            onChange={handleChange}
            checked={checkedNo}
            disabled={checkedYes}
          /> No crisis</label>
    </div>
  );
};

CheckboxInput.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
};

export default CheckboxInput;
