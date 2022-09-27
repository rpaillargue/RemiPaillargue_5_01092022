// Récupération de l'id du produit à afficher
let idProduit = new URL(window.location.href).searchParams.get("id");

// Récupération de l'id et affichage du produit et de ses détails dans la page Produit
fetch("http://localhost:3000/api/products/" + idProduit)
  .then(function (res) {
    return res.json();
  })
  .then(function (product) {
    console.log(product);

    // Création et insertion de l'élément image
    const parentImg = document.querySelector(".item__img");
    let produitImage = document.createElement("img");
    produitImage.src = product.imageUrl;
    produitImage.alt = product.altTxt;
    parentImg.appendChild(produitImage);

    // Création et insertion de l'élément titre
    const productTitle = document.querySelector("#title");
    productTitle.innerHTML = product.name;

    // Création et insertion de l'élément prix
    const productPrice = document.querySelector("#price");
    productPrice.innerHTML = product.price;

    // Création et insertion de l'élément description
    const productDescription = document.querySelector("#description");
    productDescription.innerHTML = product.description;

    // Création et insertion de l'élément couleur
    const productColor = document.querySelector("#colors");
    for (i = 0; i < product.colors.length; i++) {
      productColor.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
    }
  });

// Ajout d'un produit au panier
