// Partie fonctions utilitaires


//creation d'un element
function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text) {
    element.textContent = text;
  }
  return element;
}

//creation d'une icone
function createIcon(className) {
  const icon = createElement('i', className);
  return icon;
}

//creation d'un bouton
function createButton(className, text, clickHandler) {
  const button = createElement('button', className, text);
  button.addEventListener('click', clickHandler);
  return button;
}

function createLinkButton(className, href, text) {
  const linkButton = createElement('a', className, text);
  linkButton.setAttribute('href', href);
  return linkButton;
}

//creation des messages d'erreurs
function createErrorMessage(message) {
  const errorParagraph = createElement('p', 'errorMessage', message);
  return errorParagraph;
}

//récupérer le token
function getToken() {
  return localStorage.getItem('token');
}

//enregistrer le token
function setToken(token) {
  localStorage.setItem('token', token);
}

//supprimer le token
function removeToken() {
  localStorage.removeItem('token');
}





// Partie gestion des boutons et de l'authentification


//bouton de logout si présence du token

function showLogoutButton() {
  const loginButton = document.getElementById('loginButton');
  loginButton.style.display = 'none';

  const logoutButton = createButton('logout_button', 'logout', () => {
    removeToken();
    location.reload();
  });

  loginButton.parentNode.insertBefore(logoutButton, loginButton);
}


function checkAuthToken() {
  const token = getToken();
  const connectedCheck = parseInt(localStorage.getItem('connected'));
  if (token) {
    const buttonContainer = createElement('div');
    buttonContainer.id = 'buttonContainer';
    document.body.insertBefore(buttonContainer, document.body.firstChild);
    showLogoutButton();
    return true;
  } else if (connectedCheck === 1) {
    localStorage.setItem('connected', '0');
    location.reload();
    const reconnectMessage = document.createElement('p');
    reconnectMessage.textContent = "Reconnectez-vous.";
    reconnectMessage.className = "errorMessage";
    const main = document.querySelector('main');
    main.insertBefore(reconnectMessage, main.firstChild);
    return false;
  }
}

// bouton du mode edition

function addEditButtons() {
  const buttonContainer = document.getElementById('buttonContainer');

  const editModeButton = createButton('edit_mode_button', 'Mode édition', () => {
    // Logique à exécuter lors du clic sur le bouton "Mode édition"
  });
  const editIcon = createIcon('fa-solid fa-pen-to-square');
  editModeButton.insertBefore(editIcon, editModeButton.firstChild);
  buttonContainer.appendChild(editModeButton);

  const publishChangesButton = createButton('publish_changes_button', 'Publier les changements', () => {
    // Logique à exécuter lors du clic sur le bouton "Publier les changements"
  });
  buttonContainer.appendChild(publishChangesButton);
}





// Partie création des éléments HTML

//creation des boutons "modifier"
function createEditButton(className) {
  const token = getToken();
  if (!token) {
    return null;
  }

  const button = createLinkButton(className, '#modal1');
  const icon = createIcon('fa-solid fa-pen-to-square');
  const buttonText = document.createTextNode('modifier');
  button.appendChild(icon);
  button.appendChild(buttonText);

  return button;
}



//creation des 3 boutons "modifier"
function addElementsToHTML(data) {
  const section = document.getElementById('portfolio');

  const heading = createElement('h2');
  heading.textContent = 'Mes Projets';

  const editButton = createEditButton('edit_button');
  if (editButton) {
    heading.appendChild(editButton);
    addEditButtonEventListener(editButton);
  }

  const introductionSection = document.getElementById('introduction');

  const editButton2 = createEditButton('edit_button');
  if (editButton2) {
    const article = introductionSection.querySelector('article');
    article.insertBefore(editButton2, article.firstChild);
    addEditButtonEventListener(editButton2);
  }

  const editButton3 = createEditButton('edit_button3');
  if (editButton3) {
    const figure = introductionSection.querySelector('figure');
    figure.appendChild(editButton3);
    addEditButtonEventListener(editButton3);
  }

  section.appendChild(heading);



  //creation filtres et gallerie
  const filterButtons = createFilterButtons();
  section.appendChild(filterButtons);

  const galleryDiv = createElement('div', 'gallery');
  section.appendChild(galleryDiv);

  data.forEach((item) => {
    const figure = createElement('figure');
    figure.setAttribute('data-category-id', item.categoryId);
    figure.setAttribute('data-image-id', item.id);

    const image = createElement('img');
    image.src = item.imageUrl;
    image.alt = item.title;
    figure.appendChild(image);

    const figcaption = createElement('figcaption', null, item.title);
    figure.appendChild(figcaption);

    galleryDiv.appendChild(figure);
  });

  function filterProjects(categoryId) {
    const figures = galleryDiv.getElementsByTagName('figure');
    for (let i = 0; i < figures.length; i++) {
      const figure = figures[i];
      const dataCategoryId = figure.getAttribute('data-category-id');
      const categoryIdString = categoryId.toString();

      if (categoryIdString === 'all' || dataCategoryId === categoryIdString) {
        figure.style.display = 'block';
      } else {
        figure.style.display = 'none';
      }
    }
  }

  function createFilterButtons() {
    const filterButtonsContainer = createElement('div', 'filter_buttons_container');

    const filterData = [
      { categoryName: 'Tous', categoryId: 'all' },
      { categoryName: 'Objets', categoryId: 1 },
      { categoryName: 'Appartements', categoryId: 2 },
      { categoryName: 'Hôtels & restaurants', categoryId: 3 },
    ];

    filterData.forEach((item) => {
      const button = createFilterButton(item.categoryName);
      button.addEventListener('click', () => {
        filterProjects(item.categoryId);
        setActiveButton(button);
      });
      filterButtonsContainer.appendChild(button);
    });

    return filterButtonsContainer;
  }

  function createFilterButton(categoryName) {
    const button = createButton('filter_buttons', categoryName);
    return button;
  }

  function setActiveButton(button) {
    const buttons = filterButtons.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('button_selected');
    }
    button.classList.add('button_selected');
  }

  const defaultButton = filterButtons.querySelector('button');
  setActiveButton(defaultButton);
}





// Appel à l'API pour obtenir les données

const url = 'http://localhost:5678/api/works';

function fetchWorksData() {

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erreur : ' + response.status);
      }
      return response.json();
    })
    .then((data) => {
      addElementsToHTML(data);
    })
    .catch((error) => {
      console.error('Erreur lors de l\'appel à l\'API :', error);
      const errorServer = createErrorMessage('Le serveur n\'est pas allumé');
      const main = document.querySelector('main');
      main.insertBefore(errorServer, main.firstChild);
    });
}




// Initialisation et check du token

function initializePage() {
  const authTokenPresent = checkAuthToken();
  const connectedCheck = parseInt(localStorage.getItem('connected'));
  // Vérifie si la variable 'connected' n'est pas déjà définie dans le local storage
  if (isNaN(connectedCheck)) {
    localStorage.setItem('connected', '0');
  }
  if (authTokenPresent) {
    addEditButtons();
    window.addEventListener('beforeunload', () => {
      removeToken();
    });
  }
  fetchWorksData();
}

initializePage();
