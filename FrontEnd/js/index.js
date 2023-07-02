function addElementsToHTML(data) {
    const section = document.getElementById('portfolio');

    // Création de l'élément <h2>
    const heading = document.createElement('h2');
    heading.textContent = 'Mes Projets';
    section.appendChild(heading);

    // Création des boutons de filtre
    const filterButtons = createFilterButtons();
    section.appendChild(filterButtons);

    // Création d'une div pour la gallery avec la classe qui va avec
    const galleryDiv = document.createElement('div');
    galleryDiv.className = 'gallery';
    section.appendChild(galleryDiv);

    // Création des figures et figcaption, et récupération des images à partir de l'API en backend
    data.forEach(item => {
        const figure = document.createElement('figure');

        const image = document.createElement('img');
        image.src = item.imageUrl;  // Source de l'image dans l'API
        image.alt = item.title;  // Attribut alt de l'image dans l'API
        figure.appendChild(image);

        const figcaption = document.createElement('figcaption');
        figcaption.textContent = item.title;  // Texte de la figcaption dans l'API
        figure.appendChild(figcaption);

        galleryDiv.appendChild(figure);
    });

    // Fonction de filtrage des projets
    function filterProjects(categoryId) {
        const figures = galleryDiv.getElementsByTagName('figure');
        for (let i = 0; i < figures.length; i++) {
            const figure = figures[i];
            if (categoryId === 'all') {
                figure.style.display = 'block'; // Afficher toutes les figures
            } else {
                const item = data[i];
                if (item.categoryId === categoryId) {
                    figure.style.display = 'block'; // Afficher la figure correspondant à la catégorie sélectionnée
                } else {
                    figure.style.display = 'none'; // Masquer les autres figures
                }
            }
        }
    }

    // Fonction utilitaire pour créer les boutons de filtre
    function createFilterButtons() {
        const filterButtons = document.createElement('div');
        filterButtons.className = 'filter_buttons_container';

        // Création du bouton "Tous"
        const allButton = createFilterButton('Tous');
        allButton.addEventListener('click', () => {
            filterProjects('all');
            setActiveButton(allButton);
        });
        filterButtons.appendChild(allButton);

        // Création du bouton "Objets"
        const objectsButton = createFilterButton('Objets');
        objectsButton.addEventListener('click', () => {
            filterProjects(1); // catégorie 1 (id coté API)
            setActiveButton(objectsButton);
        });
        filterButtons.appendChild(objectsButton);

        // Création du bouton "Appartements"
        const apartmentsButton = createFilterButton('Appartements');
        apartmentsButton.addEventListener('click', () => {
            filterProjects(2); // catégorie 2 (id coté API)
            setActiveButton(apartmentsButton);
        });
        filterButtons.appendChild(apartmentsButton);

        // Création du bouton "Hôtels & restaurants"
        const hotelsRestaurantsButton = createFilterButton('Hôtels & restaurants');
        hotelsRestaurantsButton.addEventListener('click', () => {
            filterProjects(3); // catégorie 3 (id coté API)
            setActiveButton(hotelsRestaurantsButton);
        });
        filterButtons.appendChild(hotelsRestaurantsButton);

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
        const buttons = filterButtons.getElementsByTagName('button');   // Récupération des boutons
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('button_selected');               // Pour chaque itération, suppression de la classe button_selected
        }
        button.classList.add('button_selected');                        // Ajout hors de la boucle for de la classe css button_selected à la variable 'button' qui renvoi au setActiveButton unique de chacun
    }
    // Sélection du bouton "Tous" par défaut
    const defaultButton = filterButtons.querySelector('button');
    setActiveButton(defaultButton);
}
 


const url = 'http://localhost:5678/api/works';  // lien de la partie works de l'API

fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',  // type de données correspondant à l'API
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur : ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        addElementsToHTML(data);  // appel de la fonction ci dessus d'ajout des éléments de la page depuis l'API
        console.log(data);
    })
    .catch(error => {
        console.error('Erreur lors de l\'appel à l\'API :', error);  // sinon afficher erreur
    });







    // Partie vérification du token et création // suppression des boutons :





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
        loginButton.parentNode.insertBefore(logoutButton, loginButton); // Insérer le bouton "logout" avant le bouton "login"
      }
      



    // Fonction pour vérifier si un token d'authentification est présent et valide
function checkAuthToken() {
    const token = localStorage.getItem('token');
    if (token) {
      // Vérifie la présence du token
      const buttonContainer = document.createElement('div');
      buttonContainer.id = 'buttonContainer';
      const body = document.body;
      body.insertBefore(buttonContainer, body.firstChild);
      showLogoutButton(); // Appel de la fonction qui permet d'afficher le bouton "logout"
      return true; // true si présent
    }
    return false; // false si absent
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

    // Création de l'icone <i class="fa-solid fa-pen-to-square"></i>
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
  
  // Vérifier si un token d'authentification est présent
  if (checkAuthToken()) {
    // Appel la fonction d'ajout des boutons
    addEditButtons();
  }
  