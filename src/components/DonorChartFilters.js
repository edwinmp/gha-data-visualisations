import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ChartFilters from './ChartFilters';
import Select from './Select';

const DonorChartFilters = ({ defaultDonor, onSelectDonor, ...props }) => {
  const [donors, setDonors] = useState(props.donors);
  const [dataType, setDataType] = useState(props.defaultDataType);

  useEffect(() => {
    setDonors(props.donors);
  }, [props.donors]);

  const onSelectDataType = (item) => {
    setDataType(item ? item.value : props.defaultDataType);
    if (props.onSelectDataType) {
      props.onSelectDataType(item ? item.value : props.defaultDataType);
    }
  };

  return (
    <ChartFilters selectErrorMessage={props.donorSelectErrorMessage}>
      <Select
        label="Select up to two donors"
        options={donors.map((donor) => ({ value: donor, label: donor, isCloseable: true }))}
        defaultValue={[{ value: defaultDonor, label: defaultDonor, isCloseable: true }]}
        isMulti
        onChange={onSelectDonor}
        css={{ minWidth: '200px' }}
        classNamePrefix="donors-select"
        isClearable={false}
      />
      <Select
        label="Display data as"
        options={['Volumes', 'Proportions', '%GNI'].map((item) => ({ value: item, label: item }))}
        defaultValue={[{ value: dataType, label: dataType }]}
        value={dataType}
        onChange={onSelectDataType}
        css={{ minWidth: '150px' }}
        classNamePrefix="donors-display-data-as"
      />
    </ChartFilters>
  );
};

DonorChartFilters.propTypes = {
  donors: PropTypes.array,
  donorSelectErrorMessage: PropTypes.string,
  onSelectDonor: PropTypes.func,
  onSelectDataType: PropTypes.func,
  defaultDonor: PropTypes.string,
  defaultDataType: PropTypes.string,
};

export default DonorChartFilters;
