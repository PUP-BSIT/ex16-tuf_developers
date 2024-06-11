const container = document.querySelector('#form_container');
const inputId = document.querySelector('#car_id');
const inputBrand = document.querySelector('#car_brand');
const inputModel = document.querySelector('#car_model');
const inputYear = document.querySelector('#car_year');
const inputColor = document.querySelector('#car_color');
const inputSeats = document.querySelector('#no_of_seats');

const endpoint = '';

async function insertCar() {
  const options = {
      method: 'POST',
      headers: {
          "Content-type": "application/x-www-form-urlencoded",
      },
      body: `car_brand=${inputBrand.value}&\
          car_model=${inputModel.value}&\
          car_year=${inputYear.value}&\
          car_color=${inputColor.value}&\
          no_of_seats=${inputSeats.value}`
  };

  const response = await fetch(endpoint, options);
  const data = await response.text();

  getCars();
}