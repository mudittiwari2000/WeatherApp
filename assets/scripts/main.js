const main = document.querySelector ('.main');
const input = document.querySelector('.input');
const button = document.querySelector('.submit-btn');
const inputValue = document.querySelector('.search');
const display = document.querySelector('.display');
const name = document.querySelector('.name');
const desc = document.querySelector('.desc');
const temp = document.querySelector('.temp');
const wicon = document.querySelector('.wi');

let unitValue = 'C';
let celsius = null;

function putData(data) {

  const nameValue = data['name'];
  const tempValue = Math.round(data.main.temp);
  const descValue = data['weather'][0]['description'];
  const iconValue = data['weather'][0]['id'];
  const wiconCode = 'wi-owm-' + iconValue;
  name.textContent = nameValue;
  desc.textContent = descValue;
  temp.textContent = `${tempValue} ${unitValue}`;

  if (wicon.classList.length > 1) {
    wicon.className = wicon.className.replace(/(\wi-owm).*/g, wiconCode);
  } else {
    wicon.classList.add(wiconCode);
  }
  display.classList.remove('display-hidden');
  input.classList.add('input-toggle');
  main.classList.add ('main-toggle');
}

button.addEventListener('click', () => {

  const api = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&units=metric&appid=e23778e3d6ec71b413c096357dd1fc2d`;
  fetch(api)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      putData(data);
    }
    )

    .catch(err => alert('Something went wrong!'))
});

temp.addEventListener('click', () => {

  let tempValue = temp.textContent.slice(0, temp.textContent.length - 2);
  if (celsius === null) {
    celsius = tempValue;
  }

  // To Celsius
  if (unitValue === 'C') {
    unitValue = 'F';
    const fahrenheit = Math.floor(
      ((celsius * (9/5) + 32))
    );
    temp.textContent = fahrenheit + ' ' + unitValue;
  } else {  // To Fahrenheit
    unitValue = 'C';
    temp.textContent = celsius + ' ' + unitValue;
  }
});

// Enter to submit
inputValue.addEventListener('keyup', event => {

  if (event.key === 'Enter') {
    event.preventDefault();
    button.click();
  }
});