function createEditButton(className) {
  const token = localStorage.getItem('token');
  if (!token) {
    return null; // Renvoie null si le token n'est pas présent
  }

  const button = document.createElement('a');
  button.className = className;
  button.setAttribute('href', '#modal1'); // Ajout de l'ancre

  const icon = document.createElement('i');
  icon.className = 'fa-solid fa-pen-to-square';

  const buttonText = document.createTextNode('modifier');
  button.appendChild(icon);
  button.appendChild(buttonText);

  return button;
}

function addElementsToHTML(data) {
  const section = document.getElementById('portfolio');

  // Création de l'élément <h2>
  const heading = document.createElement('h2');
  heading.textContent = 'Mes Projets';

  // Création du bouton "modifier"
  const editButton = createEditButton('edit_button');
  if (editButton !== null) {
    heading.appendChild(editButton);
    addEditButtonEventListener(editButton);
  }

  // Accéder à la section avec id "introduction"
  const introductionSection = document.getElementById('introduction');

  // Création du bouton "modifier" pour l'article
  const editButton2 = createEditButton('edit_button');
  if (editButton2 !== null) {
    const article = introductionSection.querySelector('article');
    article.insertBefore(editButton2, article.firstChild);
    addEditButtonEventListener(editButton2);
  }

  // Création du bouton "modifier" pour l'article
  const editButton3 = createEditButton('edit_button3');
  if (editButton3 !== null) {
    const figure = introductionSection.querySelector('figure');
    figure.appendChild(editButton3);
    addEditButtonEventListener(editButton3);
  }

  section.appendChild(heading);

  // Création des boutons de filtre
  const filterButtons = createFilterButtons();
  section.appendChild(filterButtons);

  // Création d'une div pour la galerie avec la classe correspondante
  const galleryDiv = document.createElement('div');
  galleryDiv.className = 'gallery';
  section.appendChild(galleryDiv);

  // Création des figures et figcaption, et récupération des images à partir de l'API en backend
  data.forEach((item) => {
    const figure = document.createElement('figure');

    // Ajout de l'attribut "data-category-id" à la figure
    figure.setAttribute('data-category-id', item.categoryId);
    figure.setAttribute('data-image-id', item.id);

    const image = document.createElement('img');
    image.src = item.imageUrl; // Source de l'image dans l'API
    image.alt = item.title; // Attribut alt de l'image dans l'API
    figure.appendChild(image);

    const figcaption = document.createElement('figcaption');
    figcaption.textContent = item.title; // Texte de la figcaption dans l'API
    figure.appendChild(figcaption);

    galleryDiv.appendChild(figure);
  });

  // Fonction de filtrage des projets
  function filterProjects(categoryId) {
    const figures = galleryDiv.getElementsByTagName('figure');
    for (let i = 0; i < figures.length; i++) {
      const figure = figures[i];
      const dataCategoryId = figure.getAttribute('data-category-id');
      const categoryIdString = categoryId.toString(); // Convertit le categoryId en string

      if (categoryIdString === 'all' || dataCategoryId === categoryIdString) {
        figure.style.display = 'block'; // Affiche les figures qui correspondent à la catégorie ou toutes les figures
      } else {
        figure.style.display = 'none'; // Masque les autres figures
      }
    }
  }

  // Fonction utilitaire pour créer les boutons de filtre
  function createFilterButtons() {
    const filterButtons = document.createElement('div');
    filterButtons.className = 'filter_buttons_container';

    // Création des boutons de filtre
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
      filterButtons.appendChild(button);
    });

    return filterButtons;
  }

  // Fonction utilitaire pour créer un bouton de filtre
  function createFilterButton(categoryName) {
    const button = document.createElement('button');
    button.textContent = categoryName;
    button.className = 'filter_buttons';
    return button;
  }

  // Fonction pour définir le bouton actif
  function setActiveButton(button) {
    const buttons = filterButtons.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('button_selected');
    }
    button.classList.add('button_selected');
  }

  // Sélection du bouton "Tous" par défaut
  const defaultButton = filterButtons.querySelector('button');
  setActiveButton(defaultButton);
}

const url = 'http://localhost:5678/api/works';

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
    // Afficher l'erreur en <p>
    const errorServer = document.createElement('p');
    errorServer.textContent = 'Le serveur n\'est pas allumé';
    errorServer.className = 'errorMessage';
    const main = document.querySelector('main');
    main.insertBefore(errorServer, main.firstChild);
  });

// Partie vérification du token et création / suppression des boutons :

// Fonction pour masquer le bouton login et créer le bouton logout
function showLogoutButton() {
  const loginButton = document.getElementById('loginButton');
  loginButton.style.display = 'none'; // Masque le bouton "login"

  const logoutButton = document.createElement('button');
  logoutButton.textContent = 'logout';
  logoutButton.className = 'logout_button';
  logoutButton.addEventListener('click', () => {
    // Supprime le token d'authentification
    localStorage.removeItem('token');
    // Rafraîchit la page
    location.reload();
  });
  loginButton.parentNode.insertBefore(logoutButton, loginButton); // Insère le bouton "logout" avant le bouton "login"
}

// Fonction pour vérifier si un token d'authentification est présent et valide
function checkAuthToken() {
  const token = localStorage.getItem('token');
  if (token) {
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'buttonContainer';
    const body = document.body;
    body.insertBefore(buttonContainer, body.firstChild);
    showLogoutButton();
    return true;
  } else {
    return false;
  }
}

// Fonction pour ajouter les boutons
function addEditButtons() {
  const buttonContainer = document.getElementById('buttonContainer');

  // Création du bouton "Mode édition"
  const editModeButton = document.createElement('button');
  editModeButton.textContent = 'Mode édition';
  editModeButton.addEventListener('click', () => {
    // Logique à exécuter lors du clic sur le bouton "Mode édition"
  });
  buttonContainer.appendChild(editModeButton);

  // Création de l'icône <i class="fa-solid fa-pen-to-square"></i>
  const editIcon = document.createElement('i');
  editIcon.className = 'fa-solid fa-pen-to-square';
  // Ajout de l'icône en tant qu'enfant du bouton "Mode édition" avant le texte
  editModeButton.insertBefore(editIcon, editModeButton.firstChild);

  // Création du bouton "Publier les changements"
  const publishChangesButton = document.createElement('button');
  publishChangesButton.textContent = 'Publier les changements';
  publishChangesButton.addEventListener('click', () => {
    // Logique à exécuter lors du clic sur le bouton "Publier les changements"
  });
  buttonContainer.appendChild(publishChangesButton);
}

// Vérifie si un token d'authentification est présent
const authTokenPresent = checkAuthToken();

// Appel la fonction d'ajout des boutons si le token est présent
if (authTokenPresent) {
  addEditButtons();

  // lorsque l'utilisateur recharge la page, quitte le navigateur ou l'onglet, suppression du token
  window.addEventListener('beforeunload', () => {
    localStorage.removeItem('token');
  });
}
