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
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erreur dans l'identifiant ou le mot de passe");
      }
    })
    .then(function(data) {
      // Enregistre le token d'authentification dans le localStorage du navigateur
      localStorage.setItem("token", data.token);
  
      // Redirige vers l'accueil
      window.location.href = "index.html";
    })
    .catch(function(error) {
      // Affiche une erreur pour l'identifiant ou le mot de passe
      alert(error.message);
    });
  }
  



  document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire
  
    // Récupération des valeurs des champs e-mail et mot de passe
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // Appel de la fonction de vérification de l'identifiant et du mot de passe
    verifyCredentials(email, password);
  });
  
