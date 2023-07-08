const modal2 = document.getElementById('modal2');

// Création de la flèche de retour
const arrowIcon = document.createElement('i');
arrowIcon.className = 'fa-solid fa-arrow-left';

// Événement lors du clic sur la flèche de retour
arrowIcon.addEventListener('click', () => {
  const modalWrapper = document.querySelector('.modal-wrapper');
  modalWrapper2.style.display = 'none';
  modalWrapper.style.display = 'block';
});

modal2.appendChild(arrowIcon);

// Création du titre h1
const titlemodal2 = document.createElement('h1');
titlemodal2.textContent = 'Ajout photo';
modal2.insertBefore(titlemodal2, modal2.firstChild);

// Fermeture de la modal
const closeModal2 = () => {
  modal.style.display = 'none';
  modal2.style.display = 'none';
};

// Création du bouton de fermeture
const closeBtn2 = document.querySelector('.close_button2');
closeBtn2.addEventListener('click', closeModal);

// Création de l'élément figure
const figure = document.createElement('figure');

// Création de l'élément file input pour ajouter la photo
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.style.display = 'none';

// Événement lors du changement de fichier
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    figure.appendChild(img);
  }
});

// Création de l'élément label pour le titre
const titleLabel = document.createElement('label');
titleLabel.textContent = 'Titre: ';
const titleInput = document.createElement('input');
titleInput.type = 'text';

// Création de l'élément label pour la catégorie
const categoryLabel = document.createElement('label');
categoryLabel.textContent = 'Catégorie: ';
const categorySelect = document.createElement('select');

// Options pour les catégories
const categories = [
  { id: '1', name: 'Objets' },
  { id: '2', name: 'Appartements' },
  { id: '3', name: 'Hôtels & restaurants' }
];

categories.forEach(category => {
  const option = document.createElement('option');
  option.value = category.id;
  option.textContent = category.name;
  categorySelect.appendChild(option);
});

// Création du bouton "Valider"
const submitButton = document.createElement('button');
submitButton.textContent = 'Valider';
submitButton.addEventListener('click', () => {
  const formData = new FormData();
  const categoryId = categorySelect.value;
  const imageFile = fileInput.files[0];
  formData.append('title', titleInput.value);
  formData.append('image', imageFile);
  formData.append('category', categoryId);

  const token = localStorage.getItem('token');
  fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'multipart/form-data',
    },
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      // Traitement des données de la réponse
    })
    .catch(error => {
      // Gestion des erreurs
    });
});

// Ajout des éléments à la figure
figure.appendChild(fileInput);
figure.appendChild(titleLabel);
figure.appendChild(titleInput);
figure.appendChild(categoryLabel);
figure.appendChild(categorySelect);
figure.appendChild(submitButton);

// Ajout de la figure à la modal2
modal2.appendChild(figure);

// Création du bouton "+ Ajouter photo"
const addPhotoButton = document.createElement('button');
addPhotoButton.textContent = '+ Ajouter photo';
addPhotoButton.addEventListener('click', () => {
  fileInput.click();
});

// Ajout du bouton "+ Ajouter photo" à la modal2
modal2.appendChild(addPhotoButton);

// Style pour masquer les éléments par défaut
const style = document.createElement('style');
style.textContent = '.modal2 figure { display: none; }';
document.head.appendChild(style);

// Afficher la figure lors du clic sur le bouton "+ Ajouter photo"
addPhotoButton.addEventListener('click', () => {
  figure.style.display = 'block';
});
