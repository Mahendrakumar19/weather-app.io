import React from 'react';
import { MapPin, Droplets, Wind, Cloud } from 'lucide-react';

const WeatherDisplay = ({ weather }) => {
    return (
        <div className="p-8 bg-white shadow-2xl rounded-2xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-2 text-gray-600">
                        <MapPin size={18} />
                        <span className="text-lg">{weather.name}, {weather.sys.country}</span>
                    </div>
                    <h2 className="text-5xl font-bold text-gray-800">
                        {Math.round(weather.main.temp)}°C
                    </h2>
                </div>
                <div className="text-center">
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                        alt={weather.weather[0].description}
                        className="w-32 h-32"
                    />
                    <p className="text-xl text-gray-700 capitalize">
                        {weather.weather[0].description}
                    </p>
                </div>
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                <div className="text-center">
                    <Droplets className="mx-auto mb-2 text-blue-500" size={24} />
                    <p className="text-2xl font-semibold text-gray-800">{weather.main.humidity}%</p>
                    <p className="text-sm text-gray-600">Humidity</p>
                </div>
                <div className="text-center">
                    <Wind className="mx-auto mb-2 text-blue-500" size={24} />
                    <p className="text-2xl font-semibold text-gray-800">{weather.wind.speed} m/s</p>
                    <p className="text-sm text-gray-600">Wind Speed</p>
                </div>
                <div className="text-center">
                    <Cloud className="mx-auto mb-2 text-blue-500" size={24} />
                    <p className="text-2xl font-semibold text-gray-800">{weather.main.feels_like.toFixed(1)}°C</p>
                    <p className="text-sm text-gray-600">Feels Like</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherDisplay;