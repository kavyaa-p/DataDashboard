import React from 'react';
import './StatsSummary.css';

function StatsSummary({ data, forecastData, tempUnit, precipUnit }) {
    const totalDays = data.length;
    const averageTemp =
        forecastData.reduce((total, item) => total + item.temp, 0) / forecastData.length || 0;

    // Calculate average sunrise and sunset times
    const averageSunrise = new Date(
        forecastData.reduce((total, item) => total + item.sunrise_ts, 0) / forecastData.length * 1000
    ).toLocaleTimeString();

    const averageSunset = new Date(
        forecastData.reduce((total, item) => total + item.sunset_ts, 0) / forecastData.length * 1000
    ).toLocaleTimeString();

    return (
        <div>
            <h2>Summary Statistics</h2>
            <p>Total Days: {totalDays}</p>
            <p>Average Temperature: {averageTemp.toFixed(2)}{tempUnit}</p>
            <p>Average Sunrise: {averageSunrise}</p>
            <p>Average Sunset: {averageSunset}</p>
        </div>
    );
}

export default StatsSummary;