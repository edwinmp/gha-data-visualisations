import React, { useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';

const Select = ({ label, onError, maxSelectedOptions, defaultValue, singleSelectOptions, ...props }) => {
  const [values, setValues] = useState(defaultValue);
  useEffect(() => {
    if (props.onChange) props.onChange(values);
    onError(); // reset error message
  }, [values]);

  const onChange = (_values) => {
    if (!_values.length) {
      setValues(defaultValue);

      return;
    }

    // handle options that should not be compared
    const singleSelectOptionIndex = _values.findIndex((item) =>
      singleSelectOptions.find((option) => option.value === item.value)
    );
    if (props.isMulti && _values.length > 1 && singleSelectOptionIndex !== -1) {
      setValues(singleSelectOptionIndex === 0 ? _values.slice(1) : [_values[singleSelectOptionIndex]]);

      return;
    }

    if (maxSelectedOptions && _values.length > maxSelectedOptions) {
      if (onError) {
        onError({
          type: 'maxSelectedOptions',
          message: `Only up to ${maxSelectedOptions} selections allowed`,
        });
      }

      return;
    }

    setValues(_values);
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
  singleSelectOptions: PropTypes.array,
  isMulti: PropTypes.bool,
};

Select.defaultProps = { maxSelectedOptions: 2 };

export default Select;
