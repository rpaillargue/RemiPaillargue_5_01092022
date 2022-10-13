// Récupération de l'id du produit à afficher
let idProduit = new URL(window.location.href).searchParams.get("id");
let produitRecupere;

// Récupération input

// Récupération de l'id et affichage du produit et de ses détails dans la page Produit
fetch("http://localhost:3000/api/products/" + idProduit)
  .then(function (res) {
    return res.json();
  })
  .then(function (product) {
    produitRecupere = product;
    // console.log(product);

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
const buttonAddCart = document.getElementById("addToCart");
buttonAddCart.addEventListener("click", () => {
  // Vérification si local storage existe

  // Si existe on le récupère et on ajoute aux éléments déja existants
  if (localStorage.getItem("panier") !== null) {
    console.log(`panier exists`);
    const storage = localStorage.getItem("panier");
    const storageParsed = JSON.parse(storage);

    // On vérifie si le produit existe déja dans le local storage (function find en js)
    const elementTrouve = storageParsed.find((item) => item.id === idProduit);
    console.log(elementTrouve);

    // Si produit n'existe pas déjà dans le local storage
    if (elementTrouve === undefined) {
      storageParsed.push({ id: produitRecupere._id, quantity: 0 });
      localStorage.setItem("panier", JSON.stringify(storageParsed));
    } else {
      // Si produit déja dans le local storage
      // Modification de la quantité du produit
      elementTrouve.quantity++;
      console.log("ICI IL FAUT MODIFIER LA QUANTITE");
      // Ici il faut mettre à jour le local storage avec le produit à jour
      localStorage.setItem("panier", JSON.stringify(storageParsed));
    }
  }
  // Si existe pas on le créer
  else {
    localStorage.setItem(
      "panier",
      JSON.stringify([{ id: produitRecupere._id, quantity: 1 }])
    );
    //console.log(`panier not found`);
  }
});

buttonAddCart.addEventListener("click", () => {
  window.location.href = "./cart.html";
});
