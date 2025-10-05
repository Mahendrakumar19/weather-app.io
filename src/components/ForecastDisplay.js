import React from 'react';

const ForecastDisplay = ({ forecast }) => {
    const getDayName = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };

    return (
        <div className="p-8 bg-white shadow-2xl rounded-2xl">
            <h3 className="mb-6 text-2xl font-bold text-gray-800">5-Day Forecast</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                {forecast.map((day, index) => (
                    <div
                        key={index}
                        className="p-4 text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl"
                    >
                        <p className="mb-2 font-semibold text-gray-700">
                            {getDayName(day.dt)}
                        </p>
                        <img
                            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                            alt={day.weather[0].description}
                            className="w-16 h-16 mx-auto"
                        />
                        <p className="text-2xl font-bold text-gray-800">
                            {Math.round(day.main.temp)}°C
                        </p>
                        <p className="mt-1 text-xs text-gray-600 capitalize">
                            {day.weather[0].description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ForecastDisplay;