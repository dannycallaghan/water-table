# WaterTable!

A demo can be viewed here:

[https://water-table.vercel.app/](https://water-table.vercel.app/)

## Run locally

Please clone then run:

```
npm i
```

This project uses Vite. To start the application, please run:

```
npm run dev
```

## Dependencies

I've attempted to limit the amount of external dependencies as much as possible, but I did utilise the following:

- D3 - for visualisations
- Google Maps React API ([https://visgl.github.io/react-google-maps/](@vis.gl/react-google-maps)) - for displaying maps.
- React Tailwind Datepicker ([https://react-tailwindcss-datepicker.vercel.app/](react-tailwindcss-datepicker), [https://day.js.org/](dayjs)) - Date picker component.
- formatcoords ([https://www.npmjs.com/package/formatcoords](formatcoords)) - Formats decimal coords into degrees/minutes/seconds.

## Testing

I've included some low confidence snapshot testing, and testing of utility functions. To run the test suite, please run:

```
npm run test
```

Unfortunately, not everything is under test due to time constraints.
