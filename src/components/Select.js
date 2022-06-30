import React from 'react';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';

const Select = ({ label, ...props }) => (
  <div className="labelled-data-selector--wrapper">
    <label>
      <b>{label}</b>
    </label>
    <ReactSelect {...props} />
  </div>
);

Select.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
};

export default Select;
