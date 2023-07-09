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
  // Réinitialise l'image en aperçu
  img.src = '';

  // Réinitialise le texte dans "Titre"
  titleInput.value = '';

  // Réinitialise le texte dans "Catégorie"
  categorySelect.selectedIndex = 0;
};

// Création du bouton de fermeture
const closeBtn2 = document.querySelector('.close_button2');
closeBtn2.addEventListener('click', closeModal2);

// Création de l'élément figure
const form = document.createElement('form');

// Création de l'élément label pour le titre
const titleLabel = document.createElement('label');
titleLabel.textContent = 'Titre';
titleLabel.className = "addPhotoTitle";
const titleInput = document.createElement('input');
titleInput.className = "addPhotoTitlebar";
titleInput.type = 'text';




let selectedCategory = '';


// Création de l'élément label pour la catégorie
const categoryLabel = document.createElement('label');
categoryLabel.textContent = 'Catégorie';
categoryLabel.className = "addPhotoCategory";
const categorySelect = document.createElement('select');
categorySelect.className = "addPhotoCategorybar";

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

function handleCategoryChange(event) {
  selectedCategory = event.target.value; // Met à jour la variable avec la catégorie sélectionnée
}


// Création du bouton "Valider"
const submitButton = document.createElement('button');
submitButton.textContent = 'Valider';
submitButton.className = "addPhotoValidate";
submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  // Récupére les valeurs du formulaire
  const categoryId = categorySelect.value;
  const imageFile = fileInput.files[0];
  // Créer un objet FormData pour envoyer les données
  const formData = new FormData();
  formData.append('title', titleInput.value);
  formData.append('image', imageFile);
  formData.append('category', categoryId);
  // Ferme la modal2
  closeModal2();

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
      // Ajoute le projet dynamiquement à la page

      // Créer une figure pour le nouveau projet
      const newFigure = document.createElement('figure');
      newFigure.setAttribute('data-image-id', data.id);
      newFigure.className = 'manual-figure';
      newFigure.setAttribute('data-category-id', selectedCategory); // Attribuer la catégorie sélectionnée

      // Créer une image pour le nouveau projet
      const newImage = document.createElement('img');
      newImage.src = data.imageUrl;
      newImage.alt = data.title;
      newFigure.appendChild(newImage);

      // Créer un figcaption pour le nouveau projet
      const newFigcaption = document.createElement('figcaption');
      newFigcaption.textContent = data.title;
      newFigure.appendChild(newFigcaption);

      // Créer un bouton de suppression pour la nouvelle image
      const newDeleteButton = document.createElement('button');
      newDeleteButton.addEventListener('click', () => {
        deleteImage(data.id); // Appel à la fonction de suppression avec l'id de la nouvelle image
      });

      const newDeleteIcon = document.createElement('i');
      newDeleteIcon.classList.add('fa-sharp', 'fa-solid', 'fa-trash-can');
      newDeleteButton.appendChild(newDeleteIcon);

      // Ajoute la nouvelle figure à la galerie
      const galleryDiv = document.querySelector('.gallery');
      galleryDiv.appendChild(newFigure);

      // Ajoute l'ID de catégorie à la nouvelle figure
      newFigure.setAttribute('data-category-id', categoryId);

      // Clone de la figure pour ajouter à la galerie-container
      const newFigureClone = newFigure.cloneNode(true);

      // Ajoute le bouton de suppression à la figure clonée
      newFigureClone.appendChild(newDeleteButton);

      // Ajoute la figure clonée à la galerie-container
      const galleryContainerDiv = document.querySelector('.gallery-container');
      galleryContainerDiv.appendChild(newFigureClone);

      // Réinitialise les valeurs du formulaire
      titleInput.value = '';
      categorySelect.selectedIndex = 0;
      img.src = '';
    })
    .catch(error => {
      // Gestion des erreurs
      console.error('Erreur lors de l\'ajout du projet :', error);
    });
});
// Création de l'élément file input pour ajouter la photo
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.style.display = 'none';

// Ajout des éléments à la figure
form.appendChild(fileInput);
form.appendChild(titleLabel);
form.appendChild(titleInput);
form.appendChild(categoryLabel);
form.appendChild(categorySelect);
form.appendChild(submitButton);

// Ajout de la figure à la modal2
modal2.appendChild(form);

// Création du bouton "+ Ajouter photo"
const addPhotoButton = document.createElement('button');
addPhotoButton.textContent = '+ Ajouter photo';
addPhotoButton.className = "addPhotoButton";
addPhotoButton.addEventListener('click', () => {
  fileInput.click();
});

// Création de la div pour contenir le bouton
const buttonContainer = document.createElement('div');
buttonContainer.className = "button-container"; // Remplacez "button-container" par la classe souhaitée
buttonContainer.appendChild(addPhotoButton);

// Ajout de la div au modal2
modal2.appendChild(buttonContainer);

// Création de l'élément image pour afficher l'image sélectionnée
const img = document.createElement('img');
buttonContainer.appendChild(img);

// Événement lors du changement de fichier
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) {
    img.src = URL.createObjectURL(file);
  }
});

// Style pour masquer les éléments par défaut
const style = document.createElement('style');
style.textContent = '.modal2 figure { display: none; }';
document.head.appendChild(style);

// Afficher la figure lors du clic sur le bouton "+ Ajouter photo"
addPhotoButton.addEventListener('click', () => {
  form.style.display = 'block';
});

// ajout de la ligne grise
const hrElement = document.createElement('hr');
modal2.appendChild(hrElement);