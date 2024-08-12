## Weather Project

This project has been created by a student at Parsity, an online software engineering course. The work in this repository is wholly of the student based on a sample starter project that can be accessed by looking at the repository that this project forks.

If you have any questions about this project or the program in general, visit [parsity.io](https://parsity.io/) or email hello@parsity.io.

# What is it?

A React weather app that fetches weather data using the [open weather api](https://openweathermap.org/) and stores the data using redux.

## Features

- Search for the weather data of a city using a text input and receive back current weather, 5 day forecast, and 5 day forecast in graph form.
- Search for the weather of current location using a button
- Set a default location to local storage
- Responsive components

## Component structure

```
Layout
|
|AppNavBar.js
|
|page.js
    |
    |SearchBar.jsx
    |   |
    |   |SearchBarForm.jsx
    |
    |WeatherPanel.jsx
        |
        |Panel.jsx
        |   |
        |   |CurrentWeather.jsx
        |
        |Weather.jsx
              |
              |FiveDayWeather.jsx
              |   |
              |   |DayBox.jsx
              |
              |Graphs.jsx
                  |
                  |Graph.jsx
```
