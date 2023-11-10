

const games = JSON.parse(localStorage.getItem('games')) || [];

renderGamesTable();


function addGame() {
  cleanInputs();
  const addGameForm = document.getElementById('addGameForm');
  var addGameModal = new bootstrap.Modal(document.getElementById('addGameModal'));
  addGameModal.show();

  addGameForm.onsubmit = (e) => {
    e.preventDefault();
    if (gameValidation('add')) {
      const gameElements = e.target.elements;
      const game = {
        code: generateGameCode(),
        name: gameElements.name.value,
        category: gameElements.category.value,
        description: gameElements.description.value,
        price: gameElements.price.value,
        dev: gameElements.dev.value,
        year: gameElements.year.value,
        platform: gameElements.platform.value,
        videoUrl: gameElements.trailerUrl.value,
        published: gameElements.checkPublished.checked,
        starred: false,
      };

      games.push(game);
      localStorage.setItem('games', JSON.stringify(games));
      renderGamesTable();
      addGameModal.hide();
    }
  }
}

function deleteGame(code) {
  const confirmDeleteButton = document.getElementById('confirmDelete');
  var modalDeleteConfirm = new bootstrap.Modal(
    document.getElementById('deleteGameModal')
  );
  modalDeleteConfirm.show();
  confirmDeleteButton.onclick = () => {
    games.forEach((game) => {
      if (game.code == code) {
        const gamesFiltered = games.filter((game) => game.code != code);
        localStorage.setItem('games', JSON.stringify(gamesFiltered));
      }
    });
    renderGamesTable();
  };
}


function modifyGame(code) {
  loadModifyInputs(code);
  const modifyGameForm = document.getElementById('modifyGameForm');
  var modifyGameModal = new bootstrap.Modal(
    document.getElementById('modifyGameModal')
  );
  modifyGameModal.show();
  modifyGameForm.onsubmit = function (e) {
    e.preventDefault();
    games.forEach((game) => {
      if (gameValidation('modify')) {
        if (game.code == code) {
          const gameElements = e.target.elements;
          game.name = gameElements.nameModify.value;
          game.category = gameElements.categoryModify.value;
          game.description = gameElements.descriptionModify.value;
          game.videoUrl = gameElements.trailerUrlModify.value;
          game.published = gameElements.checkPublishedModify.checked;
          games[game.code] = game;
          localStorage.setItem('games', JSON.stringify(games));
        }
      }
    });
    renderGamesTable();
    modifyGameModal.hide();
  };
}


function starGame(code) {

  const confirmStarButton = document.getElementById('confirmStar');
  var starGameModal = new bootstrap.Modal(
    document.getElementById('starGameModal')
  );
  starGameModal.show();
  confirmStarButton.onclick = () => {
    games.forEach((game) => {
      game.starred = false;
      if (game.code == code) {
        game.starred = true;
        games[game.code] = game;
      }
      localStorage.setItem('games', JSON.stringify(games));
      renderGamesTable();
    });
  };
}


function generateGameCode() {
  if (games.length) {
    gameCodes = games.map((game) => game.code);
    return Math.max(...gameCodes) + 1;
  }
  return 0;
}

// Busca juegos por su nombre
function searchGames() {
  const gameCategory = document.getElementById('category-option-search').value;
  const gameName = document.getElementById('game-name-search').value;
  var gamesTableBody = document.getElementById('games-table-body');
  var foundGames = 0;

  gamesTableBody.innerHTML = '';
  games.forEach((game) => {
    if ((game.name.toLowerCase().indexOf(gameName.toLowerCase()) > -1) && gameCategory == 'all') {
      renderGame(game);
      foundGames++;
    } else if ((game.name.toLowerCase().indexOf(gameName.toLowerCase()) > -1) && (game.category.toLowerCase().indexOf(gameCategory.toLowerCase()) > -1)) {
      renderGame(game);
      foundGames++;
    }

  });

  if (foundGames != games.length) {
    changeGamesListInfo(`${foundGames} found games.`);
  } else changeGamesListInfo(`${games.length} games in the catalog.`);
}


function renderGamesTable() {
  const gamesTableBody = document.getElementById('games-table-body');
  const games = JSON.parse(localStorage.getItem('games')) || [];
  gamesTableBody.innerHTML = '';
  games.forEach((game) => {
    renderGame(game);
  });
  changeGamesListInfo(`${games.length} games in the catalog.`);
}


function renderGame(game) {
  const gamesTableBody = document.getElementById('games-table-body');
  gamesTableBody.innerHTML += `
      <tr>
        <td>${game.code}</td>
        <td>${game.name}</td>
        ${getCategoryColorName(game)}
        <td>${getGameIsPublished(game)}</td>
        <td>
          <div class="d-flex justify-content-evenly">
            <button class="btn p-0" onclick="modifyGame(${game.code})"><i class="bi bi-pencil text-warning"></i></button>
            <button class="btn p-0" onclick="deleteGame(${game.code})"><i class="bi bi-trash text-danger"></i></button>
            ${getGameIsStarred(game)}
          </div>
        </td>
      </tr>
      `;
}

function getGameIsPublished(game) {
  return (game.published) ? '<i class="bi bi-check-circle-fill text-primary"></i>' : '<i class="bi bi-check-circle text-primary"></i>';
}


function getGameIsStarred(game) {
  return (game.starred) ? `<button class="btn p-0"><i class="bi bi-patch-check-fill text-success text-success"></i></button>` : `<button class="btn p-0" onclick="starGame(${game.code})"><i class="bi bi-patch-check text-success"></i></button>`;
}


function getCategoryColorName(game) {
  switch (game.category) {
    case 'shooter':
      return `<td class="${game.category} fw-bold"><span class="badge bg-danger ">Shots</span></td>`

    case 'puzzle':
      return `<td class="${game.category} fw-bold"><span class="badge bg-warning text-black">Puzzle</span></td>`

    case 'strategy':
      return `<td class="${game.category} fw-bold"><span class="badge bg-info text-black">Strategy</span></td>`

    default:
      return `<td class="${game.category} fw-bold"><span class="badge bg-dark">Other</span></td>`
  }
}


function changeGamesListInfo(text) {
  let tableInfoText = document.getElementById('games-table-info-text');
  tableInfoText.innerHTML = text;
}

function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById('games-table');
  switching = true;

  dir = 'asc';

  while (switching) {

    switching = false;
    rows = table.rows;

    for (i = 1; i < rows.length - 1; i++) {

      shouldSwitch = false;

      x = rows[i].getElementsByTagName('TD')[n];
      y = rows[i + 1].getElementsByTagName('TD')[n];

      if (dir == 'asc') {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
         
          shouldSwitch = true;
          break;
        }
      } else if (dir == 'desc') {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {

      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;

      switchcount++;
    } else {
 
      if (switchcount == 0 && dir == 'asc') {
        dir = 'desc';
        switching = true;
      }
    }
  }
}

function gameValidation(operationType) {
  return (validateName(operationType) && validateDescription(operationType) && validateTrailerUrl(operationType)) ? true : false;
}

function validateName(operationType) {

  const gameName = (operationType == 'add') ? document.querySelector('.name-add') : document.querySelector('.name-modify')
  const gameCode = (operationType == 'modify') ? document.getElementById('code').value : null;
  const actualGame = (operationType == 'modify') ? games.find(game => game.code == gameCode) : null;
  let nameValidated = false;
  let gameExists = false;

  games.forEach(game => {
    if (game.name.toLowerCase() == gameName.value.toLowerCase()) {
      gameExists = true;
      if (operationType == 'modify' && game.code == actualGame.code) {
        gameExists = false;
      }
    }
  });

  if (gameExists) {
    setError(operationType, gameName, 'There is already a game with that name.');
    nameValidated = false;
  } else if (gameName.value === '') {
    setError(operationType, gameName, 'You must enter a name');
    nameValidated = false;
  } else if (gameName.value.length < 2) {
    setError(operationType, gameName, 'The name must be longer.');
    nameValidated = false;
  } else {
    setSuccess(operationType, gameName);
    nameValidated = true;
  }

  return nameValidated;
}

function validateDescription(operationType) {
  const gameDescription = (operationType == 'add') ? document.querySelector('.description-add') : document.querySelector('.description-modify');
  let descriptionValidated = false;

  if (gameDescription.value === '') {
    setError(operationType, gameDescription, 'Enter a description.');
    descriptionValidated = false;
  } else if (gameDescription.value.length < 10) {
    setError(operationType, gameDescription, 'Enter a longer description.');
    descriptionValidated = false;
  } else {
    setSuccess(operationType, gameDescription);
    descriptionValidated = true;
  }
  return descriptionValidated;
}

function validateTrailerUrl(operationType) {
  const gameURL = (operationType == 'add') ? document.querySelector('.trailer-url-add') : document.querySelector('.trailer-url-modify');
  const regexForYT = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
  let urlValidated = false;

  if (gameURL.value === '') {
    setError(operationType, gameURL, 'Enter a link.');
    urlValidated = false;
  } else if (!(regexForYT.test(String(gameURL.value.toLowerCase())))) {
    setError(operationType, gameURL, 'You did not enter a valid link.');
    urlValidated = false;
  } else {
    setSuccess(operationType, gameURL);
    urlValidated = true;
  }
  return urlValidated;
}

function setError(operationType, element, message) {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');
  const operationButton = (operationType == 'add') ? document.querySelector('.add-game-button') : document.querySelector('.modify-game-button');

  errorDisplay.innerText = message;
  errorDisplay.classList.add('invalid-feedback');
  element.classList.remove('is-valid');
  element.classList.add('is-invalid');
  operationButton.setAttribute('disabled', '');
}

function setSuccess(operationType, element) {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');
  const operationButton = (operationType == 'add') ? document.querySelector('.add-game-button') : document.querySelector('.modify-game-button');

  errorDisplay.innerText = '';
  errorDisplay.classList.remove('invalid-feedback');
  element.classList.remove('is-invalid');
  element.classList.add('is-valid');
  operationButton.removeAttribute('disabled');
}

function cleanInputs() {
  document.getElementById('name').value = '';
  document.getElementById('name').classList.remove('is-valid');
  document.getElementById('description').value = '';
  document.getElementById('description').classList.remove('is-valid');
  document.getElementById('trailerUrl').value = '';
  document.getElementById('trailerUrl').classList.remove('is-valid');
  document.getElementById('checkPublished').checked = false;
}

function loadModifyInputs(code) {
  const games = JSON.parse(localStorage.getItem('games')) || [];
  let codeInput = document.getElementById('code');
  let nameInput = document.getElementById('nameModify');
  let descriptionInput = document.getElementById('descriptionModify');
  let categoryInput = document.getElementById('categoryModify');
  let trailerUrlInput = document.getElementById('trailerUrlModify');
  let checkPublishedInput = document.getElementById('checkPublishedModify');

  games.forEach(game => {
    if (game.code == code) {
      codeInput.value = game.code;
      nameInput.value = game.name;
      descriptionInput.value = game.description;
      categoryInput.value = game.category;
      trailerUrlInput.value = game.videoUrl;
      checkPublishedInput.checked = game.published;
    }
  });
}

function createGames() {
  let gamesArr = [
    {
      code: 0,
      name: 'Half-Life',
      category: 'shooter',
      description: 'Dr Gordon Freeman doesnt speak a single word, but he has one hell of a story to tell you, a revolutionary story that may not be all it seems, told not through scenes, but through visual surroundings..',
      price: '100',
      dev: 'Valve',
      year: '1998',
      platform: 'pc',
      videoUrl: 'https://www.youtube.com/embed/wtIp8jOo8_o',
      published: true,
      starred: false,
    },
    {
      code: 1,
      name: 'Portal',
      category: 'puzzle',
      description: 'Chell, and her new robot friend, Wheatley, face more puzzles devised by GLaDOS, an A.I. with the sole purpose of testing the Portal Gun and getting revenge on Chell for the events of Portal.',
      price: '200',
      dev: 'Valve',
      year: '2007',
      platform: 'pc',
      videoUrl: "https://www.youtube.com/embed/tax4e4hBBZc",
      published: true,
      starred: false,
    },
    {
      code: 2,
      name: 'Half Life Alyx',
      category: 'shooter',
      description: 'Half-Life: Alyx is Valves return to the Half-Life series. It is the story of an impossible fight against a ruthless alien race known as the Combine. Set between the events of Half-Life and Half-Life 2, Alyx Vance and her father Eli mount an early resistance to the brutal occupation of Earth by the Combine. ',
      price: '1000',
      dev: 'Valve',
      year: '2020',
      platform: 'vr',
      videoUrl: "https://www.youtube.com/embed/O2W0N3uKXmo",
      published: true,
      starred: true,
    },
    {
      code: 3,
      name: 'Age Of Empires IV',
      category: 'strategy',
      description: 'Age of Empires IV offers you a real-time strategy experience evolved to a new generation. Putting you at the center of epic historical battles that shaped the world.',
      price: '600',
      dev: 'Microsoft',
      year: '2021',
      platform: 'xbox',
      videoUrl: "https://www.youtube.com/embed/QFlVNtGJVDU",
      published: true,
      starred: false,
    },
  ];

  localStorage.setItem('games', JSON.stringify(gamesArr));
}