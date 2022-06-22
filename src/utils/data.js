const fetchCSVData = (url) => new Promise((resolve) => {
  window.d3.csv(url, (data) => resolve(data));
});

export default fetchCSVData;
