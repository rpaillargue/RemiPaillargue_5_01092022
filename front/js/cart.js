let productFromLocalStorage = JSON.parse(localStorage.getItem("panier"));
console.log(productFromLocalStorage);

if (!productFromLocalStorage) {
  const titleCart = document.querySelector("h1");
  const sectionCart = document.querySelector(".cart");

  titleCart.innerHTML = "Votre panier est vide !";
  sectionCart.style.display = "none";
} else {
  for (let i = 0; i > productFromLocalStorage; i++) {
    // Création et insertion de l'élement article
    const cartArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(cartArticle);
    cartArticle.className = "cart__item";
    cartArticle.setAttribute("data-id", productFromLocalStorage._id);
    //console.log("cartArticle");

    //Création et insertion de l'élément "div" pour l'image du produit
    const cartDivImg = document.createElement("div");
    cartArticle.appendChild(cartDivImg);
    cartDivImg.className = "cart__item__img";
    //console.log("cartDivImg");

    // Création et insertion de l'élément image
    const cartImg = document.createElement("img");
    cartDivImg.appendChild(cartImg);
    cartImg.src = productFromLocalStorage.imageUrl;
    //console.log(cartImg);

    // Création et insertion de l'élément "div" pour le contenu du produit
    const cartProductContent = document.createElement("div");
    cartArticle.appendChild(cartProductContent);
    cartProductContent.className = "cart__item__content";
    //console.log(cartProductContent);

    // Création et insertion de l'élément "div" pour la description du produit
    const cartProductDescription = document.createElement("div");
    cartProductContent.appendChild(cartProductDescription);
    cartProductDescription.className = "cart__item__content__description";
    //console.log(cartProductDescription);

    // Création et insertion de l'élément titre "h2"
    const cartProductTitle = document.createElement("h2");
    cartProductDescription.appendChild(cartProductTitle);
    cartProductTitle.innerHTML = productFromLocalStorage.name;
    //console.log(cartProductTitle);

    // Création et insertion de l'élément couleur "p"
    const cartProductColor = document.createElement("p");
    cartProductDescription.appendChild(cartProductColor);
    cartProductColor.innerHTML = productFromLocalStorage.colors;
    //console.log(cartProductColor);

    // Création et insertion de l'élément prix "p"
    const cartProductPrice = document.createElement("p");
    cartProductDescription.appendChild(cartProductPrice);
    cartProductPrice.innerHTML = productFromLocalStorage.price + " €";
    //console.log(cartProductPrice);

    // Création et insertion de l'élément options "div"
    const cartProductSettings = document.createElement("div");
    cartProductContent.appendChild(cartProductSettings);
    cartProductSettings.className = "cart__item__content__settings";
    //console.log(cartProductSettings);

    // Création et insertion de l'élément option quantité "div"
    const cartProductQuantity = document.createElement("div");
    cartProductContent.appendChild(cartProductQuantity);
    cartProductQuantity.className = "cart__item__content__settings__quantity";
    //console.log(cartProductQuantity);
  }
}
