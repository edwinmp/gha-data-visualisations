const createPill = (pillParent, pill) => {
  // create pill list item
  const pillElement = document.createElement('li');
  pillElement.classList.add('m-pills__item');
  pillElement.innerHTML = pill;
  pillParent.appendChild(pillElement);
  // create and add remove button
  const removeButton = document.createElement('button');
  removeButton.setAttribute('type', 'button');
  removeButton.style.top = '7px';
  pillElement.appendChild(removeButton);
  // create button icon
  const icon = document.createElement('i');
  icon.setAttribute('role', 'presentation');
  icon.classList.add(...['ico', 'ico--20', 'ico-cross-slate']);
  removeButton.appendChild(icon);

  return [pillElement, removeButton];
};
const createWidget = () => {
  const widgetWrapper = document.createElement('div');
  widgetWrapper.classList.add('spotlight-banner');

  return widgetWrapper;
};
const addBorderColours = (elements, colours) => {
  Array.prototype.forEach.call(elements, (element, index) => {
    if (index < colours.length) {
      element.style.borderColor = colours[index]; // eslint-disable-line
    }
    element.style.borderWidth = '2px'; // eslint-disable-line
    element.style.fontSize = '1.3rem'; // eslint-disable-line
  });
};

function PillWidget(options) {
  let enabled = true;
  const widget = {
    pillNames: options.pills || [],
    onAddListener: options.onAdd,
    onRemoveListener: options.onRemove,
    widget: null,
    pills: [],
    colours: options.colours || [],
    init() {
      this.widget = createWidget();
      if (this.pillNames && this.pillNames.length) {
        this.pillNames.forEach((pillName) => this.add(pillName, { allowDuplicate: true }));
      }
    },
    add(pillName, extra = {}) {
      if (!this.isEnabled() || (!extra.allowDuplicate && this.pillNames.includes(pillName))) return;
      this.pillNames.push(pillName);
      // create pill button
      const [pill, button] = createPill(this.widget, pillName);
      this.pills.push(pill);
      button.addEventListener('click', (event) => {
        if (!this.isEnabled()) return;
        const parent = event.currentTarget.parentElement;
        if (parent) {
          this.remove(parent.innerText);
        }
      });
      if (this.onAddListener) {
        this.onAddListener(pillName);
      }
      addBorderColours(this.pills, this.colours);
    },
    remove(pillName) {
      if (!enabled) return;
      const index = this.pillNames.indexOf(pillName);
      this.pillNames = this.pillNames.filter((p) => p !== pillName);
      const pill = this.pills[index];
      this.pills = this.pills.filter((p, _index) => _index !== index);
      pill.remove();
      if (this.onRemoveListener) {
        this.onRemoveListener(pillName);
      }
      addBorderColours(this.pills, this.colours);
    },
    onAdd(onAddListener) {
      this.onAddListener = onAddListener;
    },
    onRemove(onRemoveListener) {
      this.onRemoveListener = onRemoveListener;
    },
    removeAll() {
      this.pillNames = [];
      this.pills.forEach((button) => button.remove());
      this.pills = [];
      if (this.onRemoveListener) {
        this.onRemoveListener();
      }
    },
    enable() {
      enabled = true;
    },
    disable() {
      enabled = false;
    },
    isEnabled() {
      return enabled;
    },
  };
  widget.init();

  return widget;
}

export default PillWidget;
