const curLocBtn = document.querySelector('.current-location');
let long;
let lat;

curLocBtn.addEventListener ('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition (position => {

      lat = position.coords.latitude;
      long = position.coords.longitude;
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=e23778e3d6ec71b413c096357dd1fc2d`

      fetch (api)
        .then (response => response.json())
        .then (data => {
          putData (data);
        })
        .catch (err => {
          alert('Something Went Wrong!');
        })
    });
  } else {
    alert('Something Went Wrong!')
  }
});