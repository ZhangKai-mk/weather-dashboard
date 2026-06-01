import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, recentSearches }) {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city) => {
    onSearch(city);
    setInput('');
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  const handleInputFocus = () => {
    if (recentSearches.length > 0 && input === '') {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="搜索城市... (例如: Beijing, New York)"
            value={input}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            autoComplete="off"
          />
          <button type="submit" className="search-btn">
            🔍 Search
          </button>
        </div>

        {showSuggestions && recentSearches.length > 0 && input === '' && (
          <div className="suggestions">
            <div className="suggestions-title">📍 最近搜索</div>
            {recentSearches.map((city, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(city)}
              >
                <span className="suggestion-icon">🕐</span>
                {city}
              </div>
            ))}
          </div>
        )}
      </form>

      <div className="popular-cities">
        <span className="popular-title">热门城市:</span>
        <button 
          className="city-tag"
          onClick={() => handleSuggestionClick('Beijing')}
        >
          北京
        </button>
        <button 
          className="city-tag"
          onClick={() => handleSuggestionClick('Shanghai')}
        >
          上海
        </button>
        <button 
          className="city-tag"
          onClick={() => handleSuggestionClick('London')}
        >
          伦敦
        </button>
        <button 
          className="city-tag"
          onClick={() => handleSuggestionClick('New York')}
        >
          纽约
        </button>
        <button 
          className="city-tag"
          onClick={() => handleSuggestionClick('Tokyo')}
        >
          东京
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
