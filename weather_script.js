const api = {
    key: "7cb7b131dfd88c731af0e6bf371d63b4",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchElement = document.querySelector('[data-city-search]')
  const searchbox = new google.maps.places.SearchBox(searchElement)
  searchbox.addListener('places_changed', setQuery)
  
  function setQuery(input) {
    const place = searchbox.getPlaces()[0]
    if (place == null) return
    const latitude = place.geometry.location.lat()
    const longitude = place.geometry.location.lng()
    console.log(latitude)
    console.log(longitude)
    getResults(latitude, longitude);
  }
  
  function getResults (latitude, longitude) {
    fetch(`${api.base}weather?lat=${latitude}&lon=${longitude}&appid=${api.key}&units=metric`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
      
  }


const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const humidityElement = document.querySelector('[data-humidity]')
const windElement = document.querySelector('[data-wind]')
const iconElement = document.querySelector(".icon-container")

function displayResults(weather) {
    console.log(weather);

    let now = new Date();
    let date = document.querySelector('.general-information .time');
    date.innerText = dateBuilder(now);

    locationElement.textContent = `${weather.name}, ${weather.sys.country}`;
    statusElement.textContent = `${weather.weather[0].description}`
    temperatureElement.textContent = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
    humidityElement.textContent = `${weather.main.humidity}%`
    windElement.textContent = `${weather.wind.speed} meter/sec`
    iconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png">`
}
  
  
  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }

