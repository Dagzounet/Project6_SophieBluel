function verifyCredentials(email, password) {
  const url = "http://localhost:5678/api/users/login";    //connection à la partie login de l'API
  const data = {
    email: email,
    password: password
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(function (response) {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 401) {
        throw new Error("Erreur de mot de passe, peut être oublié ?");
      } else if (response.status === 404) {
        throw new Error("Utilisateur introuvable, souci de mail");
      } else {
        throw new Error("Erreur dans l'identifiant ou le mot de passe");
      }
    })
    .then(function (data) {
      // Enregistre le token d'authentification dans le localStorage du navigateur
      localStorage.setItem("token", data.token);

      //change la variable connected dans le storage
      localStorage.setItem("connected", "1");

      // Redirige vers l'accueil
      window.location.href = "index.html";
    })
    .catch(function (error) {
      // Vérifie si l'erreur est "Failed to fetch"
      if (error.message === "Failed to fetch") {
        // Supprime les messages d'erreur précédents s'ils existent
        removeErrorMessages();

        // Affiche l'erreur "Le serveur n'est pas allumé"
        console.error('Erreur lors de l\'appel à l\'API :', error);
        const errorServer = document.createElement('p');
        errorServer.textContent = "Le serveur n'est pas allumé";
        errorServer.className = 'errorMessage';
        const main = document.querySelector('main');
        main.insertBefore(errorServer, main.firstChild);
      } else {
        // Supprime les messages d'erreur précédents s'ils existent
        removeErrorMessages();

        // Affiche d'autres erreurs sous forme de <p> avec la classe 'errorMessage'
        console.error('Erreur lors de l\'appel à l\'API :', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = error.message;
        errorMessage.className = 'errorMessage';
        const main = document.querySelector('main');
        main.insertBefore(errorMessage, main.firstChild);
      }
    });

  function removeErrorMessages() {
    const errorMessages = document.querySelectorAll('.errorMessage');
    errorMessages.forEach(function (errorMessage) {
      errorMessage.remove();
    });
  }
}



document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche l'envoi du formulaire

  // Récupération des valeurs des champs e-mail et mot de passe
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Appel de la fonction de vérification de l'identifiant et du mot de passe
  verifyCredentials(email, password);
});

