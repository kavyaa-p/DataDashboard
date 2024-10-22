import React from 'react';

function WeatherList({ data, tempUnit, windUnit, precipUnit }) {
    const getWeatherIconUrl = (iconCode) => {
        return `https://www.weatherbit.io/static/img/icons/${iconCode}.png`; // weather icons url
    };

    const parseTime = (timeString) => {
        if (!timeString) return 'Invalid time';
        const [hours, minutes] = timeString.split(':');
        if (!hours || !minutes) return 'Invalid time';
        const date = new Date();
        date.setUTCHours(parseInt(hours), parseInt(minutes), 0, 0);
        return date;
    };

    if (!Array.isArray(data) || data.length === 0) {
        return <p>No data available</p>;
    }

    return (
        <div style={{ margin: '20px', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ fontSize: '2em', fontWeight: 'bold' }}>{data[0].city_name}</h2>
            <p>Current Temperature: {data[0].temp}{tempUnit}</p>
            <p>Highest Temperature: {data[0].app_max_temp ? `${data[0].app_max_temp}${tempUnit}` : 'N/A'}</p>
            <p>Lowest Temperature: {data[0].app_min_temp ? `${data[0].app_min_temp}${tempUnit}` : 'N/A'}</p>
            <p>Wind Speed: {data[0].wind_spd}{windUnit}</p>
            <p>Precipitation: {data[0].precip}{precipUnit}</p>
            <p>UV Index: {data[0].uv}</p>
            <p>AQI: {data[0].aqi}</p>
            <p>
                Weather: {data[0].weather.description || 'N/A'}{' '}
                <img 
                    src={getWeatherIconUrl(data[0].weather.icon)} 
                    alt={data[0].weather.description} 
                    style={{ width: '40px', height: '40px', verticalAlign: 'middle' }} 
                />
            </p>
            <p>Sunrise: {data[0].sunrise ? parseTime(data[0].sunrise).toLocaleTimeString() : 'N/A'}</p>
            <p>Sunset: {data[0].sunset ? parseTime(data[0].sunset).toLocaleTimeString() : 'N/A'}</p>
        </div>
    );
}

export default WeatherList;