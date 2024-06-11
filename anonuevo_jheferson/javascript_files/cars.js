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

async function updateCar() {
  const options = {
      method: 'PATCH',
      headers: {
          "Content-type": "application/x-www-form-urlencoded",
      },
      body: `id=${inputId.value}&\
          car_brand=${inputBrand.value}&\
          car_model=${inputModel.value}&\
          car_year=${inputYear.value}&\
          car_color=${inputColor.value}&\
          no_of_seats=${inputSeats.value}`
  };

  const response = await fetch(endpoint, options);
  const data = await response.text();

  getCars();
}

async function deleteCar(id) {
  const options = {
      method: 'DELETE',
      headers: {
          "Content-type": "application/x-www-form-urlencoded",
      },
      body: `id=${id}`
  };

  const response = await fetch(endpoint, options);
  const data = await response.text();

  getCars();
}

function getDeleteButton(item) {
  const cell = document.createElement('td');
  const button = document.createElement('button');

  button.addEventListener('click', deleteCar.bind(null, item.id));

  button.textContent = 'Delete';
  cell.append(button);
  return cell;
}

function getEditButton(item) {
  const cell = document.createElement('td');
  const button = document.createElement('button');

  button.addEventListener('click', setInputs.bind(null, item.id, 
    item.car_brand, item.car_model, item.car_year, item.car_color,
    item.no_of_seats));

  button.textContent = 'Edit';
  cell.append(button);

  return cell;
}