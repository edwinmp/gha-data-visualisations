import { parse } from 'papaparse';

export const ACTIVE_BRANCH = 'feature/climate-bubble-charts';

export const sortedData = (data, property) => data.sort((a, b) => Number(b[property]) - Number(a[property]));

const fetchCSVData = (url) =>
  new Promise((resolve) => {
    parse(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => resolve(data),
    });
  });

export default fetchCSVData;
