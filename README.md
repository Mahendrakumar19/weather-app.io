# Weather App

A clean and simple single-page React application to display weather information for any city.

## Features

- Search for any city worldwide
- Display current temperature, weather condition, and humidity
- Show wind speed and feels-like temperature
- 5-day weather forecast
- Remembers last searched city using localStorage
- Fully responsive design
- Loading states and error handling

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Get OpenWeatherMap API Key**
   - Visit https://openweathermap.org/api
   - Sign up for a free account
   - Generate an API key

3. **Add API Key**
   - Open `src/App.js`
   - Replace `YOUR_API_KEY_HERE` with your actual API key

4. **Run the Application**
   ```bash
   npm start
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

## Technologies Used

- React 18
- Tailwind CSS
- Lucide React (icons)
- OpenWeatherMap API

## License

MIT
