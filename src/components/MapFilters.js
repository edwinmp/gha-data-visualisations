import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const crisisType = 'https://dev.devinit.org/assets/svg/icons/crisis-type-icon.svg';
const peopleInNeed = 'https://dev.devinit.org/assets/svg/icons/people-in-need-icon.svg';
const foodSecurity = 'https://dev.devinit.org/assets/svg/icons/food-security.svg';
const crisisTypeDisabled = 'https://dev.devinit.org/assets/svg/icons/crisis-type-icon-disabled.svg';
const foodSecurityDisabled = 'https://dev.devinit.org/assets/svg/icons/food-security-disabled.svg';
const peopleInNeedDisabled = 'https://dev.devinit.org/assets/svg/icons/people-in-need-icon-disabled.svg';

const MapFilters = (props) => {
  const [dimension, setDimension] = useState('Crisis_type');
  const filterOptions = [
    {
      name: 'Crisis_type',
      label: 'Crisis state',
      icon: crisisType,
      disabledIcon: crisisTypeDisabled,
    },
    {
      name: 'IPC_Food_insecurity_phase',
      label: 'Food insecurity',
      icon: foodSecurity,
      disabledIcon: foodSecurityDisabled,
    },
    {
      name: 'People_in_need_(millions)',
      label: 'People in need',
      icon: peopleInNeed,
      disabledIcon: peopleInNeedDisabled,
    },
  ];

  useEffect(() => {
    props.onSelectDimension(dimension);
    window.dataLayer.push({
      event: 'mapFilterSelected',
      filter: filterOptions.find((opt) => opt.name === dimension).label,
    });
  }, [dimension]);

  return (
    <ul>
      {filterOptions.map((option) => (
        <li key={option.name} className="mapFilterItem">
          {option.icon ? (
            <>
              <button
                onClick={() => {
                  setDimension(option.name);
                }}
                className={dimension === option.name ? 'mapFilterButton mapFilterItem-active' : 'mapFilterButton'}
              >
                <img
                  src={dimension === option.name ? option.icon : option.disabledIcon}
                  alt={option.name}
                  height="20"
                  width="20"
                />
                <p className={option.name === 'Food_insecure_(millions)' ? 'food-icon' : ''}>{option.label}</p>
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setDimension(option.name);
              }}
            >
              <p>{option.label}</p>
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

MapFilters.propTypes = {
  onSelectDimension: PropTypes.func,
};
export default MapFilters;
