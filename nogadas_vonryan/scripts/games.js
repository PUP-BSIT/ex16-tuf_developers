const container = document.querySelector('#container');
const inputId = document.querySelector('#game_id');
const inputTitle = document.querySelector('#title');
const inputDescription = document.querySelector('#description');
const inputGenre = document.querySelector('#genre');
const inputDeveloper = document.querySelector('#developer');
const inputDate = document.querySelector('#release_date');

const endpoint = 'https://iraya.site/api/games.php';

async function getGames() {
    const response = await fetch(endpoint);
    const data = await response.json();

    container.innerHTML = '';

    for(item of data) {
        const row = document.createElement('tr');
        const editButton = getEditButton(item);
        const deleteButton = getDeleteButton(item);

        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.description}</td>
            <td>${item.genre}</td>
            <td>${item.developer}</td>
            <td>${item.release_date}</td>`;

        row.append(editButton);
        row.append(deleteButton);
        container.append(row);
    }

    setInputs();
}

async function insertGame() {
    const options = {
        method: 'POST',
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: `title=${inputTitle.value}&\
            description=${inputDescription.value}&\
            genre=${inputGenre.value}&\
            developer=${inputDeveloper.value}&\
            release_date=${inputDate.value}`
    };

    const response = await fetch(endpoint, options);
    const data = await response.text();

    getGames();
}

async function updateGame() {
    const options = {
        method: 'PATCH',
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: `id=${inputId.value}&\
            title=${inputTitle.value}&\
            description=${inputDescription.value}&\
            genre=${inputGenre.value}&\
            developer=${inputDeveloper.value}&\
            release_date=${inputDate.value}`
    };

    const response = await fetch(endpoint, options);
    const data = await response.text();

    getGames();
}

async function deleteGame(id) {
    const options = {
        method: 'DELETE',
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: `id=${id}`
    };
   
    const response = await fetch(endpoint, options);
    const data = await response.text();

    getGames();
}

function getDeleteButton(item) {
    const cell = document.createElement('td');
    const button = document.createElement('button');
    
    button.addEventListener('click', deleteGame.bind(null, item.id));

    button.textContent = 'Delete';
    cell.append(button);
    return cell;
}

function getEditButton(item) {
    const cell = document.createElement('td');
    const button = document.createElement('button');
    
    button.addEventListener('click', setInputs.bind(null, item.id, item.title,
        item.description, item.genre, item.developer, item.release_date));

    button.textContent = 'Edit';
    cell.append(button);
        
    return cell;
}

function setInputs(id, title, description, genre, developer, release_date) {
    inputId.value = id ?? '';
    inputTitle.value = title ?? '';
    inputDescription.value = description ?? '';
    inputGenre.value = genre ?? '';
    inputDeveloper.value = developer ?? '';
    inputDate.value = release_date ?? '';
}

getGames();