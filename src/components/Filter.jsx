import React, { useState } from 'react';
import './Filter.css';

function Filter({ setSelectedCategory, setSelectedDate, setUnitSystem }) {
    const [selectedCondition, setSelectedCondition] = useState('All');

    const handleCategoryChange = (e) => {
        const condition = e.target.value;
        setSelectedCondition(condition);
        setSelectedCategory(condition);
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setSelectedDate(selectedDate);
    };

    const handleUnitChange = (e) => {
        const unit = e.target.value;
        setUnitSystem(unit);
    };

    return (
        <div>
            <h2>Filter by Weather Condition, Date, and Units</h2>

            <select value={selectedCondition} onChange={handleCategoryChange}>
                <option value="All">All Conditions</option>
                <option value="clear sky">Clear Sky</option>
                <option value="few clouds">Few Clouds</option>
                <option value="scattered clouds">Scattered Clouds</option>
                <option value="overcast clouds">Overcast Clouds</option>
                <option value="rain">Rain</option>
                <option value="thunderstorm">Thunderstorm</option>
                <option value="snow">Snow</option>
            </select>

            <input type="date" onChange={handleDateChange} />

            <div>
                <label>
                    <input
                        type="radio"
                        value="M"
                        name="units"
                        defaultChecked
                        onChange={handleUnitChange}
                    />
                    Metric (°C, m/s)
                </label>
                <label>
                    <input
                        type="radio"
                        value="I"
                        name="units"
                        onChange={handleUnitChange}
                    />
                    Imperial (°F, mph)
                </label>
                <label>
                    <input
                        type="radio"
                        value="S"
                        name="units"
                        onChange={handleUnitChange}
                    />
                    Scientific (K, m/s)
                </label>
            </div>
        </div>
    );
}

export default Filter;