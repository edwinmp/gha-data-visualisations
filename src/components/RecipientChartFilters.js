/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ChartFilters from './ChartFilters';
import Select from './Select';

const RecipientChartFilters = (props) => {
  const [recipients, setRecipients] = useState(props.donorRecipients);
  const [breakdown, setBreakdown] = useState(props.defaultBreakdown);
  const [recipient, setRecipient] = useState(props.defaultRecipient);

  useEffect(() => {
    setRecipients(breakdown === 'By donor' ? props.donorRecipients : props.orgTypeRecipients);
    if (props.onSelectBreakdown) props.onSelectBreakdown(breakdown, recipient);
  }, [breakdown]);

  useEffect(() => {
    if (props.onSelectRecipient) props.onSelectRecipient(recipient, breakdown);
  }, [recipient]);

  const onSelectBreakdown = (item) => {
    setBreakdown(item.value || props.defaultBreakdown);
  };
  const onSelectRecipient = (item) => {
    setRecipient(item.value || props.defaultRecipient);
  };

  return (
    <ChartFilters>
      <Select
        label="Select recipient"
        options={recipients.sort().map((item) => ({ value: item, label: item }))}
        defaultValue={[{ value: props.defaultRecipient, label: props.defaultRecipient }]}
        onChange={onSelectRecipient}
      />
      <Select
        label="Choose breakdown"
        options={['By donor', 'By type of organisation receiving funding'].map((item) => ({
          value: item,
          label: item,
        }))}
        defaultValue={[{ value: props.defaultBreakdown, label: props.defaultBreakdown }]}
        onChange={onSelectBreakdown}
        css={{
          minWidth: '300px',
        }}
      />
    </ChartFilters>
  );
};

RecipientChartFilters.propTypes = {
  donorRecipients: PropTypes.array,
  orgTypeRecipients: PropTypes.array,
  defaultRecipient: PropTypes.string,
  defaultBreakdown: PropTypes.string,
  onSelectBreakdown: PropTypes.func,
  onSelectRecipient: PropTypes.func,
};

RecipientChartFilters.defaultProps = {
  defaultBreakdown: 'By donor',
  defaultRecipient: 'Afghanistan',
};

export default RecipientChartFilters;
