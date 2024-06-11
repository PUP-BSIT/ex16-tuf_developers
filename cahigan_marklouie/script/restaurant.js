const container = document.querySelector('#container');
const inputId = document.querySelector('#restaurant_id');
const inputRestaurantName = document.querySelector('#restaurant_name');
const inputLocation = document.querySelector('#location');
const inputFavoriteFood = document.querySelector('#favorite_food');
const inputOperatingHours = document.querySelector('#operating_hours');
const inputContactInfo = document.querySelector('#contact_info');

const endpoint = 'http://localhost/test/exercise16.php';

async function getRestaurant() {
    const response = await fetch(endpoint);
    const data = await response.json();

    container.innerHTML = '';

    for(item of data) {
        const row = document.createElement('tr');
        const editButton = getEditButton(item);
        const deleteButton = getDeleteButton(item);

        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.restaurant_name}</td>
            <td>${item.location}</td>
            <td>${item.favorite_food}</td>
            <td>${item.operating_hours}</td>
            <td>${item.contact_info}</td>`;

        row.append(editButton);
        row.append(deleteButton);
        container.append(row);
    }

    setInputs();
}