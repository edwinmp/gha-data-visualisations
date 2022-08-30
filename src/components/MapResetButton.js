import React from 'react';
import PropTypes from 'prop-types';

const MapResetButton = (props) => (
  <button className="reset-button" onClick={props.onReset}>
    Reset
  </button>
);

MapResetButton.propTypes = {
  onReset: PropTypes.func,
};

export default MapResetButton;
