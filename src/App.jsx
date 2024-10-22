import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import StatsSummary from './components/StatsSummary';
import WeatherList from './components/WeatherList';
import Filter from './components/Filter';
import WeatherForecast from './components/WeatherForecast';
import './App.css';

const API_KEY = 'd2521cee72784f028f36d0638dee4c53'; // Your new Weatherbit API key

function App() {
  const [currentData, setCurrentData] = useState([]); // Store current weather data
  const [forecastData, setForecastData] = useState([]); // Store forecast data
  const [filteredData, setFilteredData] = useState([]); // Filtered forecast data
  const [searchItem, setSearchItem] = useState('Irvine, CA'); // Default city set to Irvine, CA
  const [selectedCategory, setSelectedCategory] = useState('All'); // Filter by weather condition
  const [selectedDate, setSelectedDate] = useState(''); // Filter by date
  const [unitSystem, setUnitSystem] = useState('M'); // Metric by default (can toggle to 'I' or 'S' for Imperial or Scientific)

  const getUnit = () => {
    switch (unitSystem) {
      case 'M': // Metric
        return {
          temp: '°C',
          wind: 'm/s',
          precip: 'mm',
        };
      case 'I': // Imperial
        return {
          temp: '°F',
          wind: 'mph',
          precip: 'in',
        };
      case 'S': // Scientific (Kelvin)
        return {
          temp: 'K',
          wind: 'm/s',
          precip: 'mm',
        };
      default:
        return {
          temp: '°C',
          wind: 'm/s',
          precip: 'mm',
        };
    }
  };

  const fetchWeatherData = async (city) => {
    try {
      // Fetch current weather
      const currentResponse = await fetch(
        `https://api.weatherbit.io/v2.0/current?city=${city}&units=${unitSystem}&key=${API_KEY}`
      );

      if (!currentResponse.ok) {
        throw new Error(`Error fetching current weather: ${currentResponse.status}`);
      }

      const currentResult = await currentResponse.json();
      setCurrentData(currentResult.data);
      setFilteredData(currentResult.data);
      
      const forecastResponse = await fetch(
        `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&units=${unitSystem}&key=${API_KEY}`
      );

      if (!forecastResponse.ok) {
        throw new Error(`Error fetching forecast data: ${forecastResponse.status}`);
      }

      const forecastResult = await forecastResponse.json();
      setForecastData(forecastResult.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherData('Irvine, CA');
  }, [unitSystem]);

  const handleSearchClick = () => {
    fetchWeatherData(searchItem);
  };

  // Filter logic (weather condition and date)
  useEffect(() => {
    let filtered = forecastData;

    // Filter by weather condition
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((item) =>
        item.weather.description.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by selected date
    if (selectedDate) {
      filtered = filtered.filter((item) => item.valid_date === selectedDate);
    }

    setFilteredData(filtered);
  }, [selectedCategory, selectedDate, forecastData]);

  // Get the correct unit symbols for temperature, wind, and precipitation
  const unitSymbols = getUnit();

  return (
    <div>
      <Header title="SkyWatch" />
      <SearchBar searchItem={searchItem} setSearchItem={setSearchItem} onSearch={handleSearchClick} />
      <Filter
        setSelectedCategory={setSelectedCategory}
        setSelectedDate={setSelectedDate}
        setUnitSystem={setUnitSystem}
      />
      <StatsSummary
        data={filteredData}
        forecastData={forecastData}
        tempUnit={unitSymbols.temp}
        precipUnit={unitSymbols.precip}
      />
      <WeatherList
        data={currentData}
        tempUnit={unitSymbols.temp}
        windUnit={unitSymbols.wind}
        precipUnit={unitSymbols.precip}
      />
      <h2>16-Day Weather Forecast</h2>
      <WeatherForecast
        data={filteredData}
        tempUnit={unitSymbols.temp}
        windUnit={unitSymbols.wind}
        precipUnit={unitSymbols.precip}
      />
    </div>
  );
}

export default App;