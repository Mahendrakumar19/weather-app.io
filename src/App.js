import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import { Cloud, Loader2 } from 'lucide-react';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const API_BASE = 'https://api.openweathermap.org/data/2.5';
const GEO_API_BASE = 'https://api.openweathermap.org/geo/1.0';

const App = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [debounceTimer, setDebounceTimer] = useState(null);

    // Load last searched city from localStorage on mount
    useEffect(() => {
        const savedCity = localStorage.getItem('lastSearchedCity');
        if (savedCity) {
            setCity(savedCity);
            fetchWeather(savedCity);
        }
    }, []);

    // Fetch location suggestions from geocoding API
    const fetchLocationSuggestions = async (query) => {
        if (!query.trim() || query.length < 2) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await fetch(
                `${GEO_API_BASE}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
            );
            
            if (response.ok) {
                const data = await response.json();
                setSuggestions(data);
            }
        } catch (err) {
            console.error('Error fetching location suggestions:', err);
            setSuggestions([]);
        }
    };

    // Debounced input handler
    const handleInputChange = useCallback((value) => {
        // Clear existing timer
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        // Set new timer
        const newTimer = setTimeout(() => {
            fetchLocationSuggestions(value);
        }, 300); // 300ms delay

        setDebounceTimer(newTimer);
    }, [debounceTimer]);

    // Clean up timer on unmount
    useEffect(() => {
        return () => {
            if (debounceTimer) {
                clearTimeout(debounceTimer);
            }
        };
    }, [debounceTimer]);

    const fetchWeather = async (cityName) => {
        if (!cityName.trim()) return;

        setLoading(true);
        setError('');

        try {
            // Fetch current weather
            const weatherRes = await fetch(
                `${API_BASE}/weather?q=${cityName}&units=metric&appid=${API_KEY}`
            );

            if (!weatherRes.ok) {
                throw new Error('City not found. Please check the spelling and try again.');
            }

            const weatherData = await weatherRes.json();

            // Fetch 5-day forecast
            const forecastRes = await fetch(
                `${API_BASE}/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
            );
            const forecastData = await forecastRes.json();

            // Process forecast data - get one entry per day at noon
            const dailyForecast = forecastData.list
                .filter(item => item.dt_txt.includes('12:00:00'))
                .slice(0, 5);

            setWeather(weatherData);
            setForecast(dailyForecast);

            // Save to localStorage
            localStorage.setItem('lastSearchedCity', cityName);
        } catch (err) {
            setError(err.message);
            setWeather(null);
            setForecast([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (searchCity) => {
        fetchWeather(searchCity);
    };

    return (
        <div className="min-h-screen p-4 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="py-8 text-center">
                    <h1 className="mb-2 text-4xl font-bold text-white">Weather App</h1>
                    <p className="text-blue-100">Get current weather and 5-day forecast</p>
                </div>

                {/* Search Bar */}
                <SearchBar
                    city={city}
                    setCity={setCity}
                    onSearch={handleSearch}
                    loading={loading}
                    suggestions={suggestions}
                    onInputChange={handleInputChange}
                />

                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="text-white animate-spin" size={48} />
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="max-w-md px-4 py-3 mx-auto mb-4 text-red-700 bg-red-100 border border-red-400 rounded-lg">
                        <p className="font-medium">{error}</p>
                    </div>
                )}

                {/* Weather Display */}
                {weather && !loading && (
                    <div className="space-y-6">
                        <WeatherDisplay weather={weather} />
                        {forecast.length > 0 && <ForecastDisplay forecast={forecast} />}
                    </div>
                )}

                {/* Initial State Message */}
                {!weather && !loading && !error && (
                    <div className="py-12 text-center">
                        <Cloud className="mx-auto mb-4 text-white opacity-50" size={64} />
                        <p className="text-lg text-white">Enter a city name to get started</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;