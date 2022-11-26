//* dom elements
const $city = document.querySelector('.subtitle')
const $currentTemp = document.querySelector('.current-temp')
const $condition = document.querySelector('.condition')
const $conditionIcon = document.querySelector('.condition-icon')
const $feelingTemp = document.querySelector('.feeling-temp')
const $maxTemp = document.querySelector('.max-temp')
const $minTemp = document.querySelector('.min-temp')

//* WEATHER
// getting the weather api information and setting the DOM content
const getData = async (latitude, longitude) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ee4e3ca7b6ef8bd99a7b5003af484b1b&units=metric&lang=pt_br`
  )
  const data = await res.json()

  //
  $city.textContent = `${data.name.toUpperCase()}`

  //
  $condition.textContent = data.weather[0].description.toUpperCase()
  const iconHtml = `<img src='http://openweathermap.org/img/w/${data.weather[0].icon}.png' alt='Ícone previsão de tempo' />`
  $conditionIcon.innerHTML = iconHtml

  //
  const currentTempHtml = `
  Temperatura atual: <span> <img src='./assets/svgs/thermometer.svg' alt='Ícone termômetro'/>
  ${Math.floor(data.main.temp)}ºC</span>`
  $currentTemp.innerHTML = currentTempHtml

  //
  const fellingTempHtml = `
  Sensação térmica: <span> <img src='./assets/svgs/thermometer.svg' alt='Ícone termômetro'/>
  ${Math.floor(data.main.feels_like)}ºC</span>`
  $feelingTemp.innerHTML = fellingTempHtml

  //
  const minTempHtml = `
  Min: <span> <img src='./assets/svgs/arrow-down.svg' alt='Ícone termômetro'/>
  ${Math.floor(data.main.temp_min)}ºC</span>`
  $minTemp.innerHTML = minTempHtml

  //
  const maxTempHtml = `
  Máx: <span> <img src='./assets/svgs/arrow-up.svg' alt='Ícone termômetro'/>
  ${Math.floor(data.main.temp_max)}ºC</span>`
  $maxTemp.innerHTML = maxTempHtml
}

//* GEOLOCATION
// success callback
const positionCallback = (position) => {
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude

  //calling the data api function
  getData(latitude, longitude)
}

// error callback
const errorCallback = (err) => {
  if (err.code === 1) {
    alert('Error: Access is denied!')
  } else if (err.code === 2) {
    alert('Error: Position is unavailable!')
  }
}

// calling the geolocation browser api
const getPosition = () => {
  if (navigator.geolocation) {
    const options = { enableHighAccuracy: true, maximumAge: 30000, timeout: 30000 }
    navigator.geolocation.getCurrentPosition(positionCallback, errorCallback, options)
  } else {
    alert('Sorry, browser does not support geolocation!')
  }
}

getPosition()
