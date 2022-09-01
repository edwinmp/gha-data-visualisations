import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const crisisSeverity = 'https://devinit.org/assets/svg/icons/crisis-severity-icon.svg';
const climateVulnerability = 'https://devinit.org/assets/svg/icons/climate-vulnerability-icon.svg';
const covidVaccination = 'https://devinit.org/assets/svg/icons/covid-vaccination-icon.svg';
const peopleInNeed = 'https://devinit.org/assets/svg/icons/people-in-need-icon.svg';
const foodSecurity = 'https://dev.devinit.org/assets/svg/icons/food-security.svg';

const MapFilters = (props) => {
  const [dimension, setDimension] = useState('Severity_score');
  useEffect(() => {
    props.onSelectDimension(dimension);
  }, [dimension]);
  const filterOptions = [
    { name: 'Severity_score', label: 'Severity of crisis', icon: crisisSeverity },
    { name: 'Climate_vulnerability', label: 'Climate vulnerability', icon: climateVulnerability },
    { name: 'COVID_vaccination_rate', label: 'Covid-19 vaccination rate', icon: covidVaccination },
    { name: 'Food_insecure_(millions)', label: 'Food insecurity', icon: foodSecurity },
    { name: 'People_in_need_(millions)', label: 'People in need', icon: peopleInNeed },
  ];

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
                  src={option.icon}
                  alt={option.name}
                  height="20"
                  width="20"
                  className={dimension === option.name ? '' : 'icon-disabled'}
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
