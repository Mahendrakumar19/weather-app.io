import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ city, setCity, onSearch, loading, suggestions, onInputChange }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);

    useEffect(() => {
        setSelectedIndex(-1);
    }, [suggestions]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setCity(value);
        setShowSuggestions(value.length > 0);
        onInputChange(value);
    };

    const handleKeyPress = (e) => {
        if (showSuggestions && suggestions.length > 0) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => 
                    prev < suggestions.length - 1 ? prev + 1 : 0
                );
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => 
                    prev > 0 ? prev - 1 : suggestions.length - 1
                );
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (selectedIndex >= 0) {
                    handleSuggestionClick(suggestions[selectedIndex]);
                } else {
                    onSearch(city);
                }
            } else if (e.key === 'Escape') {
                setShowSuggestions(false);
                setSelectedIndex(-1);
            }
        } else if (e.key === 'Enter') {
            onSearch(city);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        const fullName = `${suggestion.name}, ${suggestion.country}`;
        setCity(fullName);
        setShowSuggestions(false);
        setSelectedIndex(-1);
        onSearch(fullName);
    };

    const handleInputBlur = () => {
        // Delay hiding suggestions to allow for clicks
        setTimeout(() => setShowSuggestions(false), 150);
    };

    const handleInputFocus = () => {
        if (city.length > 0 && suggestions.length > 0) {
            setShowSuggestions(true);
        }
    };

    return (
        <div className="mb-8">
            <div className="relative max-w-md mx-auto">
                <input
                    ref={inputRef}
                    type="text"
                    value={city}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    onBlur={handleInputBlur}
                    onFocus={handleInputFocus}
                    placeholder="Enter city name..."
                    className="w-full px-4 py-3 pr-12 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    autoComplete="off"
                />
                <button
                    onClick={() => onSearch(city)}
                    disabled={loading}
                    className="absolute p-2 text-white transition-colors -translate-y-1/2 bg-blue-500 rounded-md right-2 top-1/2 hover:bg-blue-600 disabled:opacity-50"
                >
                    <Search size={20} />
                </button>
                
                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                    <div 
                        ref={suggestionsRef}
                        className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                    >
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={`${suggestion.lat}-${suggestion.lon}`}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors ${
                                    index === selectedIndex 
                                        ? 'bg-blue-50 text-blue-700' 
                                        : 'hover:bg-gray-50'
                                }`}
                            >
                                <div className="font-medium text-gray-900">
                                    {suggestion.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {suggestion.state ? `${suggestion.state}, ` : ''}{suggestion.country}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;