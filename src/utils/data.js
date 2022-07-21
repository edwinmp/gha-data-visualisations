import { parse } from 'papaparse';

export const ACTIVE_BRANCH = 'main';

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
