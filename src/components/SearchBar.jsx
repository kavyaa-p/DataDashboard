import React from 'react';
import './SearchBar.css';

function SearchBar({ searchItem, setSearchItem, onSearch }) {
    return (
        <div>
            <input
                type="text"
                placeholder="Search by city name..."
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
            />
            <button onClick={onSearch}>Search</button>
        </div>
    );
}

export default SearchBar;