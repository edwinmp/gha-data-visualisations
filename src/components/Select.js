import React, { useState } from 'react';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';

const Select = ({ label, onError, maxSelectedOptions, ...props }) => {
  const [values, setValues] = useState(props.defaultValue);
  const onChange = (_values) => {
    if (maxSelectedOptions && _values.length > maxSelectedOptions) {
      if (onError) {
        onError({
          type: 'maxSelectedOptions',
          message: `Only up to ${maxSelectedOptions} selections allowed`,
        });
      }
    } else {
      setValues(_values);
      if (props.onChange) props.onChange(_values);
      onError(); // reset error message
    }
  };

  return (
    <div className="labelled-data-selector--wrapper">
      <label>
        <b>{label}</b>
      </label>
      <ReactSelect {...props} value={values} onChange={onChange} />
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  maxSelectedOptions: PropTypes.number,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  defaultValue: PropTypes.array,
};

Select.defaultProps = { maxSelectedOptions: 2 };

export default Select;
