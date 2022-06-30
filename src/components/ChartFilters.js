import React from 'react';
import PropTypes from 'prop-types';

const ChartFilters = (props) => <div>{props.children}</div>;

ChartFilters.propTypes = {
  selectErrorMessage: PropTypes.string,
  children: PropTypes.node,
};

export default ChartFilters;
