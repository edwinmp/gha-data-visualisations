export const addFilterWrapper = (chartNode) => {
  const filterWrapper = document.createElement('div');
  filterWrapper.classList.add(...['spotlight-banner', 'data-selector--wrapper']);
  chartNode.parentElement.insertBefore(filterWrapper, chartNode);

  return filterWrapper;
};

export const createOption = (selectElement, option, selected = false) => {
  const optionElement = document.createElement('option');
  optionElement.value = typeof option === 'string' ? option : option.value;
  optionElement.text = typeof option === 'string' ? option : option.label;
  if (selected) {
    optionElement.selected = true;
  }
  selectElement.appendChild(optionElement);
};

export const addFilter = (
  { wrapper, options, allItemsLabel, className, label, defaultOption = '*' },
  returnWrapper,
  errorID,
  errorMessage
) => {
  const selectElement = document.createElement('select');
  selectElement.classList.add(...['data-selector', 'js-plotly-chart-data-selector'].concat(className));
  if (allItemsLabel) {
    createOption(selectElement, { label: allItemsLabel, value: '*' }, defaultOption === '*');
  }
  options.forEach((option) => createOption(selectElement, option, option === defaultOption));
  selectElement.classList.add('data-selector--active');

  if (label) {
    // create labelled filter
    const labelElement = document.createElement('label');
    labelElement.innerHTML = label;
    const selectWrapper = document.createElement('div');
    selectWrapper.classList.add('labelled-data-selector--wrapper');
    selectWrapper.appendChild(labelElement);
    selectWrapper.appendChild(selectElement);
    wrapper.appendChild(selectWrapper);

    if (errorID && errorMessage) {
      const selectError = document.createElement('div');
      selectError.classList.add('data-selector--wrapper');
      selectError.innerHTML = errorMessage;
      selectError.style.color = 'red';
      selectError.style.fontSize = '11px';
      selectError.style.position = 'relative';
      selectError.style.padding = '5px';
      selectError.style.paddingLeft = '20px';
      selectError.style.display = 'none';
      selectError.setAttribute('id', errorID);
      wrapper.insertAdjacentElement('afterend', selectError);
    }

    if (returnWrapper) {
      return [selectElement, selectWrapper];
    }
  } else {
    wrapper.appendChild(selectElement);
  }

  return selectElement;
};
