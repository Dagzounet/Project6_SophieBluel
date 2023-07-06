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