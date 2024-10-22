import React from 'react';

function WeatherForecast({ data, tempUnit, windUnit, precipUnit }) {
    const getWeatherIconUrl = (iconCode) => {
        return `https://www.weatherbit.io/static/img/icons/${iconCode}.png`; // weather icons url
    };

    return (
        <div style={{ margin: '20px' }}>
            <ul style={{ padding: 0, listStyleType: 'none' }}>
                {data.map((item, index) => (
                    <li key={index} style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '15px', marginBottom: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                        <h3>{item.valid_date}</h3>
                        <p>Temperature: {item.temp}{tempUnit}</p>
                        <p>
                            Weather: {item.weather.description}{' '}
                            <img 
                                src={getWeatherIconUrl(item.weather.icon)} 
                                alt={item.weather.description} 
                                style={{ width: '40px', height: '40px', verticalAlign: 'middle' }} 
                            />
                        </p>
                        <p>Max Temperature: {item.max_temp}{tempUnit}</p>
                        <p>Min Temperature: {item.min_temp}{tempUnit}</p>
                        <p>Precipitation: {item.precip}{precipUnit}</p>
                        <p>Wind Speed: {item.wind_spd}{windUnit}</p>
                        <p>Sunrise: {new Date(item.sunrise_ts * 1000).toLocaleTimeString()}</p>
                        <p>Sunset: {new Date(item.sunset_ts * 1000).toLocaleTimeString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default WeatherForecast;