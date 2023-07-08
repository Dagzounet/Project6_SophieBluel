// Fonction d'ouverture de la modale
const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute('href'));
  target.style.display = 'flex';
  target.removeAttribute('aria-hidden');
  target.setAttribute('aria-modal', 'true');
};

// Fonction du bouton "modifier"
function addEditButtonEventListener(button) {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const modalWrapper = document.querySelector('.modal-wrapper');
    const modalWrapper2 = document.getElementById('modal2');
    
    modalWrapper2.style.display = 'none';
    modalWrapper.style.display = 'block';
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = 'flex';
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');
  });
}


// Sélection de tous les boutons "Modifier" avec ajout evenement
const editButtons = document.querySelectorAll('.edit_button');
editButtons.forEach((button) => {
  addEditButtonEventListener(button);
});

// Sélection du bouton "Fermer" de la modal et ajout evenement pour masquer
const closeButton = document.querySelector('.close_button');
closeButton.addEventListener('click', (e) => {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute('href'));
  target.style.display = 'none';
  target.setAttribute('aria-hidden', 'true');
  target.removeAttribute('aria-modal');
});

const modal = document.querySelector('.modal');

// Ajout evenement pour refermer modal lors d'un clic externe
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Fonction pour fermer la modal
function closeModal() {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  modal.removeAttribute('aria-modal');
}


const modalWrapper = document.querySelector('.modal-wrapper');

// Création de l'élément h1
const title = document.createElement('h1');
title.textContent = 'Galerie Photo';

// Insertion du titre en premier dans modal-wrapper
modalWrapper.insertBefore(title, modalWrapper.firstChild);

// Création de la ligne grise horizontale
const hr = document.createElement('hr');
modalWrapper.appendChild(hr);

// Création du bouton "Ajouter une photo"
const addButton = document.createElement('button');
addButton.textContent = 'Ajouter une photo';
addButton.classList.add('add-button');
modalWrapper.appendChild(addButton);

// Evenement du bouton "Ajouter une photo"
const modalWrapper2 = document.getElementById('modal2');

addButton.addEventListener('click', (e) => {
  e.preventDefault();
  modalWrapper.style.display = 'none';
  modalWrapper2.style.display = 'block';
});

// Création du texte "Supprimer la galerie"
const deleteText = document.createElement('p');
deleteText.textContent = 'Supprimer la galerie';
deleteText.classList.add('deletewholegallery');
modalWrapper.appendChild(deleteText);


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
      deleteImage(item.id); // fonctionne avec l'id
    });

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-sharp', 'fa-solid', 'fa-trash-can');
    deleteButton.appendChild(deleteIcon);
    figure.appendChild(deleteButton);

    galleryContainer.appendChild(figure);
  });
}

fetch(url, {
  method: 'GET',
  headers: {
      'Content-Type': 'application/json',
  }
})
  .then(response => {
      if (!response.ok) {
          throw new Error('Erreur : ' + response.status);
      }
      return response.json();
  })
  .then(data => {
      addGalleryToContainer(data); // Appel de la nouvelle fonction pour ajouter la galerie
      console.log(data);
      const firstFigure = document.querySelector('.gallery-container figure:first-child');
      const icon = document.createElement('i');
      icon.classList.add('fa-solid', 'fa-arrows-up-down-left-right'); // ajout de l'icone de fleche de deplacement unique à la premiere figure
      firstFigure.appendChild(icon);

      data.forEach(item => {
        const figure = document.createElement('figure');
        figure.setAttribute('data-image-id', item.id); // Ajout attribut
      });
  })
  .catch(error => {
      console.error('Erreur lors de l\'appel à l\'API :', error);
  });




  
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


  function deleteImage(imageId) {
    const deleteUrl = `http://localhost:5678/api/works/${imageId}`;
  
      // Récupère le token à partir du local storage
  const token = localStorage.getItem('token');
  console.log(token)
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

  