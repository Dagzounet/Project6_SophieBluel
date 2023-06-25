const url = 'http://localhost:5678/api/works';

fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4'
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur : ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    // Traitement des données renvoyées par l'API
    addElementsToHTML(data); //appel de la fonction ci dessous
    console.log(data);

    // Définition de la fonction addElementsToHTML()
    function addElementsToHTML(data) {
      const section = document.getElementById('portfolio');
      
      // Création de l'élément <h2>
      const heading = document.createElement('h2');
      heading.textContent = 'Mes Projets';
      section.appendChild(heading);
    
      // Création d'une div pour la gallery avec la classe qui va avec
      const galleryDiv = document.createElement('div');
      galleryDiv.className = 'gallery';
      section.appendChild(galleryDiv);
    
      // Création des figures et figcaption, et récupération des images à partir de l'API en backend
      data.forEach(item => {
        const figure = document.createElement('figure');
    
        const image = document.createElement('img');
        image.src = item.imageUrl; // Source de l'image dans l'API
        image.alt = item.title; // Attribut alt de l'image dans l'API
        figure.appendChild(image);
    
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = item.title; // Texte de la figcaption dans l'API
        figure.appendChild(figcaption);
    
        galleryDiv.appendChild(figure);
      });
    }
  })
  .catch(error => {
    console.error('Erreur lors de l\'appel à l\'API :', error);
  });
