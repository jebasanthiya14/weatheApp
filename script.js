
const API_KEY = 'be291af54339fcebbf1c4b716a0017c9'; 

// Tamil Nadu districts and major towns
const tamilNaduPlaces = {
    "Ariyalur": ["Ariyalur", "Sendurai", "Udayarpalayam"],
    "Chennai": ["Chennai", "Ambattur", "Avadi", "Guindy", "Teynampet", "Anna Nagar", "Adyar", "Velachery"],
    "Coimbatore": ["Coimbatore", "Mettupalayam", "Pollachi", "Tiruppur", "Sulur", "Annur"],
    "Cuddalore": ["Cuddalore", "Panruti", "Chidambaram", "Virudhachalam", "Kurinjipadi"],
    "Dharmapuri": ["Dharmapuri", "Harur", "Pappireddipatti", "Palacode"],
    "Dindigul": ["Dindigul", "Palani", "Oddanchatram", "Vedasandur", "Natham"],
    "Erode": ["Erode", "Gobichettipalayam", "Bhavani", "Sathyamangalam", "Perundurai"],
    "Kanchipuram": ["Kanchipuram", "Sriperumbudur", "Uthiramerur", "Walajabad", "Chengalpattu"],
    "Karur": ["Karur", "Kulithalai", "Krishnarayapuram", "Aravakurichi"],
    "Krishnagiri": ["Krishnagiri", "Hosur", "Pochampalli", "Uthangarai"],
    "Madurai": ["Madurai", "Melur", "Usilampatti", "Thirumangalam", "Peraiyur"],
    "Nagapattinam": ["Nagapattinam", "Mayiladuthurai", "Tharangambadi", "Vedaranyam"],
    "Namakkal": ["Namakkal", "Rasipuram", "Tiruchengode", "Paramathi-Velur"],
    "Nilgiris": ["Ooty", "Coonoor", "Gudalur", "Kotagiri"],
    "Perambalur": ["Perambalur", "Kunnam", "Alathur", "Veppanthattai"],
    "Pudukkottai": ["Pudukkottai", "Aranthangi", "Iluppur", "Gandarvakottai"],
    "Ramanathapuram": ["Ramanathapuram", "Paramakudi", "Tiruvadanai", "Rameswaram"],
    "Salem": ["Salem", "Attur", "Mettur", "Omalur", "Edappadi"],
    "Sivaganga": ["Sivaganga", "Karaikudi", "Devakottai", "Ilayangudi"],
    "Thanjavur": ["Thanjavur", "Kumbakonam", "Pattukkottai", "Orathanadu"],
    "Theni": ["Theni", "Bodinayakkanur", "Periyakulam", "Uthamapalayam"],
    "Thoothukudi": ["Thoothukudi", "Kovilpatti", "Tiruchendur", "Sathankulam"],
    "Tiruchirappalli": ["Tiruchirappalli", "Srirangam", "Thuraiyur", "Manapparai", "Thuvakudi"],
    "Tirunelveli": ["Tirunelveli", "Ambasamudram", "Nanguneri", "Radhapuram"],
    "Tiruppur": ["Tiruppur", "Palladam", "Udumalaipettai", "Dharapuram"],
    "Tiruvallur": ["Tiruvallur", "Poonamallee", "Ambattur", "Gummidipoondi"],
    "Tiruvannamalai": ["Tiruvannamalai", "Arni", "Chengam", "Polur"],
    "Tiruvarur": ["Tiruvarur", "Mannargudi", "Thiruthuraipoondi", "Nannilam"],
    "Vellore": ["Vellore", "Gudiyatham", "Tirupattur", "Arakkonam"],
    "Viluppuram": ["Viluppuram", "Tindivanam", "Gingee", "Kallakurichi"],
    "Virudhunagar": ["Virudhunagar", "Aruppukkottai", "Sivakasi", "Sattur"]
};


function getAllCities() {
    return Object.values(tamilNaduPlaces).flat();
}

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const cityName = document.getElementById('city-name');
const currentTemp = document.getElementById('current-temp');
const weatherDesc = document.getElementById('weather-desc');
const weatherIcon = document.getElementById('weather-icon');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const pressure = document.getElementById('pressure');
const forecastContainer = document.getElementById('forecast-container');

// Weather icons mapping
const weatherIcons = {
    '01d': 'fas fa-sun',
    '01n': 'fas fa-moon',
    '02d': 'fas fa-cloud-sun',
    '02n': 'fas fa-cloud-moon',
    '03d': 'fas fa-cloud',
    '03n': 'fas fa-cloud',
    '04d': 'fas fa-cloud',
    '04n': 'fas fa-cloud',
    '09d': 'fas fa-cloud-rain',
    '09n': 'fas fa-cloud-rain',
    '10d': 'fas fa-cloud-sun-rain',
    '10n': 'fas fa-cloud-moon-rain',
    '11d': 'fas fa-bolt',
    '11n': 'fas fa-bolt',
    '13d': 'far fa-snowflake',
    '13n': 'far fa-snowflake',
    '50d': 'fas fa-smog',
    '50n': 'fas fa-smog'
};


function initializeAutocomplete() {
    const allCities = getAllCities();
    
    cityInput.addEventListener('input', function() {
        const input = this.value.toLowerCase();
        const suggestions = allCities.filter(city => 
            city.toLowerCase().includes(input)
        ).slice(0, 10);
        
        showSuggestions(suggestions);
    });
}


function showSuggestions(suggestions) {
    let dropdown = document.getElementById('suggestions-dropdown');
    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.id = 'suggestions-dropdown';
        dropdown.style.position = 'absolute';
        dropdown.style.backgroundColor = 'white';
        dropdown.style.border = '1px solid #ddd';
        dropdown.style.zIndex = '1000';
        dropdown.style.width = cityInput.offsetWidth + 'px';
        dropdown.style.maxHeight = '200px';
        dropdown.style.overflowY = 'auto';
        cityInput.parentNode.appendChild(dropdown);
    } else {
        dropdown.innerHTML = '';
    }
    
    if (suggestions.length === 0) {
        dropdown.style.display = 'none';
        return;
    }
    
    suggestions.forEach(city => {
        const item = document.createElement('div');
        item.textContent = city;
        item.style.padding = '8px 12px';
        item.style.cursor = 'pointer';
        
        item.addEventListener('click', () => {
            cityInput.value = city;
            dropdown.style.display = 'none';
            getWeatherByCity(city);
        });
        
        item.addEventListener('mouseover', () => {
            item.style.backgroundColor = '#f0f0f0';
        });
        
        item.addEventListener('mouseout', () => {
            item.style.backgroundColor = 'transparent';
        });
        
        dropdown.appendChild(item);
    });
    
    dropdown.style.display = 'block';
    
    document.addEventListener('click', function hideDropdown(e) {
        if (!cityInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
}

// Fetch weather data
async function fetchWeatherData(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},in&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError('Error fetching weather data. Please try another city.');
        return null;
    }
}

// Fetch forecast data
async function fetchForecastData(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city},in&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('Forecast data not available');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching forecast data:', error);
        return null;
    }
}

// Show error message
function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    errorElement.style.marginTop = '10px';
    errorElement.style.textAlign = 'center';
    
    // Remove previous error if exists
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    document.querySelector('.search-container').appendChild(errorElement);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        errorElement.remove();
    }, 5000);
}

// Update weather UI
function updateWeatherUI(data) {
    if (!data) return;
    
    cityName.textContent = `${data.name}, Tamil Nadu`;
    currentTemp.textContent = Math.round(data.main.temp);
    weatherDesc.textContent = data.weather[0].description;
    
    const iconCode = data.weather[0].icon;
    weatherIcon.className = weatherIcons[iconCode] || 'fas fa-question';
    
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    pressure.textContent = `${data.main.pressure} hPa`;
}

// Update forecast UI
function updateForecastUI(data) {
    if (!data) return;
    
    forecastContainer.innerHTML = '';
    
    // Get daily forecasts (every 24 hours)
    const dailyForecasts = [];
    for (let i = 0; i < data.list.length; i += 8) {
        dailyForecasts.push(data.list[i]);
    }
    
    dailyForecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        
        forecastItem.innerHTML = `
            <div class="forecast-day">${day}</div>
            <i class="forecast-icon ${weatherIcons[forecast.weather[0].icon] || 'fas fa-question'}"></i>
            <div class="forecast-temp">
                <span class="forecast-max">${Math.round(forecast.main.temp_max)}°</span>
                <span class="forecast-min">${Math.round(forecast.main.temp_min)}°</span>
            </div>
        `;
        
        forecastContainer.appendChild(forecastItem);
    });
}

// Get weather by city
async function getWeatherByCity(city) {
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    const weatherData = await fetchWeatherData(city);
    if (weatherData) {
        updateWeatherUI(weatherData);
        
        const forecastData = await fetchForecastData(city);
        updateForecastUI(forecastData);
    }
}

// Get weather by location
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    // First get city name from coordinates
                    const reverseGeoResponse = await fetch(
                        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
                    );
                    
                    if (!reverseGeoResponse.ok) {
                        throw new Error('Location not found');
                    }
                    
                    const locationData = await reverseGeoResponse.json();
                    const city = locationData[0].name;
                    
                    // Update input field
                    cityInput.value = city;
                    
                    // Get weather data
                    await getWeatherByCity(city);
                } catch (error) {
                    console.error('Error fetching weather by location:', error);
                    showError('Unable to retrieve weather for your location.');
                }
            },
            (error) => {
                console.error('Geolocation error:', error);
                showError('Unable to retrieve your location. Please enable location services.');
            }
        );
    } else {
        showError('Geolocation is not supported by your browser.');
    }
}

// Event listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    getWeatherByCity(city);
});

locationBtn.addEventListener('click', getWeatherByLocation);

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        getWeatherByCity(city);
    }
});

// Initialize the app
function init() {
    initializeAutocomplete();
    // Default to Chennai weather on load
    getWeatherByCity('Chennai');
}

// Start the application
window.addEventListener('load', init);