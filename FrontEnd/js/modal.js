const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute('href'));
  target.style.display = 'flex';
  target.removeAttribute('aria-hidden');
  target.setAttribute('aria-modal', 'true');
};

function addEditButtonEventListener(button) {
  button.addEventListener('click', (e) => {
    e.preventDefault();
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

      data.forEach(item => {
        const figure = document.createElement('figure');
        figure.setAttribute('data-image-id', item.id); // Ajout attribut
      });
  })
  .catch(error => {
      console.error('Erreur lors de l\'appel à l\'API :', error);
  });



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
      const imageElement = document.querySelector(`[data-image-id="${imageId}"]`);
      if (imageElement) {
        imageElement.remove();
      }      
    })
    .catch(error => {
      console.error('Erreur lors de la suppression de l\'image :', error);
    });
  }
