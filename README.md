# GHA Data Visualisations

A starting point for creating a chart (D3, Plotly, ECharts)

## Usage

### Dev

        npm start

This starts the dev environment, compiling the javascript and css. Changes to JS & CSS files trigger a page refresh in the browser

### Map

To get the map working, add the `leaflet` CDN and css to the CMS.

### Build

        npm run build

Build files are copied into the `dist` folder. It is from these files that the contents of the assets folder are updated

To update the assets, copy the contents of the relevant files from the dist folder (`app.*.js`, `app.*.css`, `runtime.*.js`) into their
respective destinations in the assets folder

### Copy Bundled Assets

        gulp

This copies the required assets from the generated dist folder to the assets folder
