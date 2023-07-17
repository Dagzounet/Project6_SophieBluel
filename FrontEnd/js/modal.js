// Partie ouverture, fermeture et gestion des événements de la modale

// Récupération de la modal du html
const modal = document.querySelector('.modal');
const modalWrapper2 = document.getElementById('modal2');

// Fonction d'ouverture de la modale
function openModal(e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute('href'));
  target.style.display = 'flex';
  target.removeAttribute('aria-hidden');
  target.setAttribute('aria-modal', 'true');
}

// Fonction pour fermer la modal
function closeModal() {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  modal.removeAttribute('aria-modal');
  // Réinitialise l'image en aperçu
  img.src = '';
  // Réinitialise la valeur du file input
  fileInput.value = null;
  // Réinitialise le texte dans "Titre"
  titleInput.value = '';
  // Réinitialise le texte dans "Catégorie"
  categorySelect.selectedIndex = 0;
  // Supprime le message d'erreur s'il est présent
  const existingErrorMessage = modal2.querySelector('.errorMessage');
  if (existingErrorMessage) {
    existingErrorMessage.remove();
  }
}

// Ajout evenement pour refermer modal lors d'un clic externe
function handleModalClick(e) {
  if (e.target === modal) {
    closeModal();
    // Réinitialise l'image en aperçu
    img.src = '';
    // Réinitialise le texte dans "Titre"
    titleInput.value = '';
    // Réinitialise le texte dans "Catégorie"
    categorySelect.selectedIndex = 0;
  }
}




// Partie suppression d'une image de l'interface utilisateur et de l'API

// Fonction pour supprimer une image de l'interface utilisateur
function deleteImageFromUI(imageId) {
  // Supprime l'image de la section "portfolio"
  const portfolioImageElement = document.querySelector(`#portfolio [data-image-id="${imageId}"]`);
  if (portfolioImageElement) {
    portfolioImageElement.remove();
  }

  // Supprime l'image de la modal "gallery-container"
  const modalImageElement = document.querySelector(`.gallery-container [data-image-id="${imageId}"]`);
  if (modalImageElement) {
    modalImageElement.remove();
  }
}

// Fonction pour supprimer une image
function deleteImage(imageId) {
  const deleteUrl = `http://localhost:5678/api/works/${imageId}`;

  // Récupère le token à partir du local storage
  const token = localStorage.getItem('token');
  fetch(deleteUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur : ' + response.status);
      }
      // Supprime l'image de l'interface utilisateur une fois qu'elle est supprimée avec succès
      deleteImageFromUI(imageId);
    })
    .catch(error => {
      console.error('Erreur lors de la suppression de l\'image :', error);
    });
}




// Partie d'ajout de la galerie à la modal

// Fonction pour ajouter la galerie à container
function addGalleryToContainer(data) {
  const galleryContainer = document.querySelector('.gallery-container');

  data.forEach(item => {
    const figure = document.createElement('figure');
    figure.setAttribute('data-image-id', item.id); // Ajout attribut pour suppression temps réel

    const image = document.createElement('img');
    image.src = item.imageUrl;
    image.alt = item.title;
    figure.appendChild(image);

    const figcaption = document.createElement('figcaption');
    figcaption.textContent = "editer";
    figure.appendChild(figcaption);

    // Ajout bouton de suppression pour chaque image
    const deleteButton = document.createElement('button');
    deleteButton.addEventListener('click', () => {
      // Code pour supprimer l'image
      deleteImage(item.id); // Appel à la fonction de suppression avec l'id
    });

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-sharp', 'fa-solid', 'fa-trash-can');
    deleteButton.appendChild(deleteIcon);
    figure.appendChild(deleteButton);

    galleryContainer.appendChild(figure);
  });

  // partie d'ajout de l'icone avec la croix directionnelle
  const firstFigure = document.querySelector('.gallery-container figure:first-child');

  const icon = document.createElement('i');
  icon.classList.add('fa-solid', 'fa-arrows-up-down-left-right');

  firstFigure.appendChild(icon);
}




// Partie Gestion des événements et création des éléments dans le DOM


// Fonction pour ajouter l'événement de clic au bouton "Modifier"
function addEditButtonEventListener(button) {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const modalWrapper = document.querySelector('.modal-wrapper');

    modalWrapper2.style.display = 'none';
    modalWrapper.style.display = 'block';
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = 'flex';
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');
  });
}


// Fonction pour initialiser les événements et créer les éléments dans le DOM
function initializeModalEventsAndElements() {
  const editButtons = document.querySelectorAll('.edit_button');
  editButtons.forEach((button) => {
    addEditButtonEventListener(button);
  });

  const closeButton = document.querySelector('.close_button');
  closeButton.addEventListener('click', closeModal);

  const modal = document.querySelector('.modal');
  modal.addEventListener('click', handleModalClick);

  const modalWrapper = document.querySelector('.modal-wrapper');

  const title = document.createElement('h1');
  title.textContent = 'Galerie Photo';

  modalWrapper.insertBefore(title, modalWrapper.firstChild);

  const hr = document.createElement('hr');
  modalWrapper.appendChild(hr);

  const addButton = document.createElement('button');
  addButton.textContent = 'Ajouter une photo';
  addButton.classList.add('add-button');
  modalWrapper.appendChild(addButton);

  addButton.addEventListener('click', (e) => {
    e.preventDefault();
    modalWrapper.style.display = 'none';
    modalWrapper2.style.display = 'block';
  });

  const deleteText = document.createElement('p');
  deleteText.textContent = 'Supprimer la galerie';
  deleteText.classList.add('deletewholegallery');
  modalWrapper.appendChild(deleteText);
}




// Partie Appel à l'API pour récupérer les données de la galerie
function fetchGalleryData(url) {
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur : ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      addGalleryToContainer(data); // Appel de la fonction pour ajouter la galerie
    })
    .catch(error => {
      console.error('Erreur lors de l\'appel à l\'API :', error);
      const errorServer = createErrorMessage('Le serveur n\'est pas allumé');
      modal.insertBefore(errorServer, modal.firstChild);
    });
}

// Appel pour initialiser les événements et créer les éléments dans le DOM
initializeModalEventsAndElements();

// Appel à l'API pour récupérer les données de la galerie
fetchGalleryData(url);
