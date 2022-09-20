// Récupération de l'id du produit à afficher
const idProduit = new URL(window.location.href).searchParams.get("id");

// Récupération de l'id et affichage du produit et de ses détails dans la page Produit
let produitFetch = function() {
    fetch("http://localhost:3000/api/products" + idProduit)
}