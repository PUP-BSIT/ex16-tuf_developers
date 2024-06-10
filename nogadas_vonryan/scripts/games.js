const container = document.querySelector('#container');
const inputId = document.querySelector('#game_id');
const inputTitle = document.querySelector('#title');
const inputDescription = document.querySelector('#description');
const inputGenre = document.querySelector('#genre');
const inputDeveloper = document.querySelector('#developer');
const inputDate = document.querySelector('#release_date');

const endpoint = '';

async function getGames() {
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);

    container.innerHTML = '';

    for(item of data) {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.description}</td>
            <td>${item.genre}</td>
            <td>${item.developer}</td>
            <td>${item.release_date}</td>`;

        container.append(row);
    }
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
    console.log(data);

    getGames();
}