const container = document.querySelector('#container');
const inputId = document.querySelector('#movie_id');
const inputTitle = document.querySelector('#title');
const inputMovieDescription = document.querySelector('#movie_description');
const inputGenre = document.querySelector('#genre');
const inputDirector = document.querySelector('#director');
const inputReleaseDate = document.querySelector('#release_date');

const endpoint = 'http://localhost/php_file/movie.php';

async function getMovie() {
  const response = await fetch(endpoint);
  const data = await response.json();

  container.innerHTML = '';

  for (const item of data) {
      const row = document.createElement('tr');
      const editButton = getEditButton(item);
      const deleteButton = getDeleteButton(item);

      row.innerHTML = `
          <td>${item.id}</td>
          <td>${item.title}</td>
          <td>${item.movie_description}</td>
          <td>${item.genre}</td>
          <td>${item.director}</td>
          <td>${item.release_date}</td>`;

      row.append(editButton);
      row.append(deleteButton);
      container.append(row);
  }

  setInputs();
}