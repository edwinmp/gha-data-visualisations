import { parse } from 'papaparse';

const fetchCSVData = (url) =>
  new Promise((resolve) => {
    parse(url, {
      download: true,
      header: true,
      complete: ({ data }) => resolve(data),
    });
  });

export default fetchCSVData;
