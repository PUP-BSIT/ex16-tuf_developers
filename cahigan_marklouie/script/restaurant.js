const container = document.querySelector('#container');
const inputId = document.querySelector('#restaurant_id');
const inputRestaurantName = document.querySelector('#restaurant_name');
const inputLocation = document.querySelector('#location');
const inputFavoriteFood = document.querySelector('#favorite_food');
const inputOperatingHours = document.querySelector('#operating_hours');
const inputContactInfo = document.querySelector('#contact_info');

const endpoint = 'https://iraya.site/api/restaurant.php';

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

async function insertRestaurant() {  
    const options = {
        method: 'POST',
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: `restaurant_name=${inputRestaurantName.value}&\
            location=${inputLocation.value}&\
            favorite_food=${inputFavoriteFood.value}&\
            operating_hours=${inputOperatingHours.value}&\
            contact_info=${inputContactInfo.value}`
    };

    const response = await fetch(endpoint, options);
    const data = await response.text();

    getRestaurant();
}

async function updateRestaurant() {
    const options = {
        method: 'PATCH',
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: `id=${inputId.value}&\
            restaurant_name=${inputRestaurantName.value}&\
            location=${inputLocation.value}&\
            favorite_food=${inputFavoriteFood.value}&\
            operating_hours=${inputOperatingHours.value}&\
            contact_info=${inputContactInfo.value}`
    };

    const response = await fetch(endpoint, options);
    const data = await response.text();

    getRestaurant();
}

async function deleteRestaurant(id) {
    const options = {
        method: 'DELETE',
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: `id=${id}`
    };
   
    const response = await fetch(endpoint, options);
    const data = await response.text();

    getRestaurant();
}

function getDeleteButton(item) {
    const cell = document.createElement('td');
    const button = document.createElement('button');
    
    button.addEventListener('click', deleteRestaurant.bind(null, item.id));

    button.textContent = 'Delete';
    cell.append(button);
    return cell;
}

function getEditButton(item) {
    const cell = document.createElement('td');
    const button = document.createElement('button');
    
    button.addEventListener('click', setInputs.bind(null, 
            item.id, item.restaurant_name,
                item.location, item.favorite_food, item.operating_hours, 
                item.contact_info));

    button.textContent = 'Edit';
    cell.append(button);
        
    return cell;
}

function setInputs(id, name, location, favorite, operating_hours, contact) {
    inputId.value = id ?? '';
    inputRestaurantName.value = name ?? '';
    inputLocation.value = location ?? '';
    inputFavoriteFood.value = favorite ?? '';
    inputOperatingHours.value = operating_hours ?? '';
    inputContactInfo.value = contact ?? '';
}

getRestaurant();