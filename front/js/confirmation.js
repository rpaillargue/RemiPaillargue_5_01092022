// Récupération de la requête dans l'URL et du numéro de commande
const confirmId = new URL(window.location.href).searchParams.get("orderId");

// Affichage de l'élément HTML
const orderId = document.getElementById("orderId");
orderId.textContent = confirmId;

// On vide ensuite le local storage
localStorage.clear();
