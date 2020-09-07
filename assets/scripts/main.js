// Selectors
const main = document.querySelector('.main');
const input = document.querySelector('.input');
const button = document.querySelector('.submit-btn');
const inputValue = document.querySelector('.search');
const display = document.querySelector('.display');
const name = document.querySelector('.name');
const date = document.querySelector('.date');
const desc = document.querySelector('.desc');
const temp = document.querySelector('.temp');
const wicon = document.querySelector('.wi');
const help = document.querySelector('.help');

// Value containers
const thresholdWidth = 700;
let unitValue = 'C';
let celsius = null;

// Putting data into display
function putData(data) {

  const nameValue = data.name;
  const countryAlpha2 = data.sys.country;
  const descValue = data.weather[0].description;
  const iconValue = data.weather[0].id;
  const wiconCode = 'wi-owm-' + iconValue;
  celsius = Math.round(data.main.temp);
  unitValue = 'C';

  // Putting data in HTML
  name.textContent = `${nameValue}, ${countryAlpha2}`;
  putDate();
  desc.textContent = descValue;
  temp.innerHTML = `${celsius} <span style='font-size: 3rem; vertical-align: text-top; margin-top: -5px'>&#176;</span>${unitValue}`;

  // Toggling different weather icons accordingly
  if (wicon.classList.length > 1) {
    wicon.className = wicon.className.replace(/(\wi-owm).*/g, wiconCode);
  } else {
    wicon.classList.add(wiconCode);
  }

  // Toggle display
  display.classList.remove('display-hidden');
  input.classList.add('input-toggle');
  main.classList.add('main-toggle');
}

function putDate() {

  const today = new Date();
  const month_long = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
  const monthL = month_long[today.getMonth()];
  const month_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthS = month_short[today.getMonth()];
  const week_long = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const weekL = week_long[today.getDay()];
  const week_short = ["Sun", "Mon", "Tues", "Wed", "thurs", "Fri", "Sat"]
  const weekS = week_short[today.getDay()];
  const date_ = today.getDate();

  if (window.innerWidth >= thresholdWidth) {
    date.textContent = `${weekL}, ${date_} ${monthL}`;
  } else {
    date.textContent = `${weekS}, ${date_} ${monthS}`;
  }
}

button.addEventListener('click', () => {

  const api = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&units=metric&appid=e23778e3d6ec71b413c096357dd1fc2d`;

  fetch(api)
    .then(response => response.json())
    .then(data => {

      putData(data);
    })
    .catch(err => alert('Something went wrong!'))
});

// Temperature toggle event
temp.addEventListener('click', () => {

  // To Celsius
  if (unitValue === 'C') {
    unitValue = 'F';
    fahrenheit = Math.round(
      (celsius * (9 / 5) + 32)
    );
    temp.innerHTML = `${fahrenheit} <span style='font-size: 3rem; vertical-align: text-top; margin-top: -5px'>&#176;</span>${unitValue}`;
  }
  // To Fahrenheit
  else {
    unitValue = 'C';
    celsius = Math.round(
      ((fahrenheit - 32) * (5 / 9))
    );
    temp.innerHTML = `${celsius} <span style='font-size: 3rem; vertical-align: text-top; margin-top: -5px'>&#176;</span>${unitValue}`;
  }
});

// Enter to submit
inputValue.addEventListener('keyup', event => {

  if (event.key === 'Enter') {
    event.preventDefault();
    button.click();
  }
});

// Toggle help on desktop by hover, and click on phone
help.addEventListener('click', e => {

  if (window.innerWidth <= thresholdWidth) {

    help.classList.toggle('help-phone');
  }
});