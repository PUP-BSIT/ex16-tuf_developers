const container = document.querySelector('#container');
const inputId = document.querySelector('#kpop_id');
const inputGroup = document.querySelector('#group');
const inputSong = document.querySelector('#song');
const inputBias = document.querySelector('#bias');
const inputDebut = document.querySelector('#debut');
const inputCompany = document.querySelector('#company');

const endpoint = 'https://iraya.site/api/kpop.php';

async function getKpop() {
    const response = await fetch(endpoint);
    const data = await response.json();

    container.innerHTML = '';

    for (const item of data) {
        const row = document.createElement('tr');
        const editButton = getEditButton(item);
        const deleteButton = getDeleteButton(item);

        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.group}</td>
            <td>${item.song}</td>
            <td>${item.bias}</td>
            <td>${item.debut}</td>
            <td>${item.company}</td>`;

        row.append(editButton);
        row.append(deleteButton);
        container.append(row);
    }

    setInputs();
}

async function insertKpop() {
    const options = {
        method: 'POST',
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: `group=${inputGroup.value}&\
            song=${inputSong.value}&\
            bias=${inputBias.value}&\
            debut=${inputDebut.value}&\
            company=${inputCompany.value}`
    };

    const response = await fetch(endpoint, options);
    const data = await response.text();

    getKpop();
}

async function updateKpop() {
    const options = {
        method: 'PATCH',
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: `id=${inputId.value}&\
            group=${inputGroup.value}&\
            song=${inputSong.value}&\
            bias=${inputBias.value}&\
            debut=${inputDebut.value}&\
            company=${inputCompany.value}`
    };

    const response = await fetch(endpoint, options);
    const data = await response.text();

    getKpop();
}

async function deleteKpop(id) {
    const options = {
        method: 'DELETE',
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: `id=${id}`
    };

    const response = await fetch(endpoint, options);
    const data = await response.text();

    getKpop();
}

function getDeleteButton(item) {
    const cell = document.createElement('td');
    const button = document.createElement('button');

    button.addEventListener('click', deleteKpop.bind(null, item.id));

    button.textContent = 'Delete';
    cell.append(button);
    return cell;
}

function getEditButton(item) {
    const cell = document.createElement('td');
    const button = document.createElement('button');

    button.addEventListener('click', setInputs.bind(null, item.id, 
      item.group, item.song, item.bias, item.debut,
      item.company));

    button.textContent = 'Edit';
    cell.append(button);

    return cell;
}

function setInputs(id, group, song, bias, debut, company) {
    inputId.value = id ?? '';
    inputGroup.value = group ?? '';
    inputSong.value = song ?? '';
    inputBias.value =  bias ?? '';
    inputDebut.value = debut ?? '';
    inputCompany.value = company ?? '';
}

getKpop();
