let productFromLocalStorage = JSON.parse(localStorage.getItem("panier"));
console.log(productFromLocalStorage);

if (!productFromLocalStorage) {
  console.log("Aucun prodruit dans le panier !");
  const titleCart = document.querySelector("h1");
  const sectionCart = document.querySelector(".cart");

  titleCart.innerHTML = "Votre panier est vide !";
  sectionCart.style.display = "none";
} else {
  for (let i = 0; i < productFromLocalStorage.length; i++) {
    console.log(productFromLocalStorage[i]);
    // Création et insertion de l'élement article
    const cartArticle = document.createElement("article");
    cartArticle.classList.add("cart__item");
    cartArticle.dataset.id = productFromLocalStorage[i].id;
    cartArticle.dataset.color = productFromLocalStorage[i].color;
    console.log(cartArticle);

    // Création et insertion de la div image
    const cartDivImg = document.createElement("div");
    cartDivImg.classList.add("cart__item__img");
    cartArticle.appendChild(cartDivImg);
    console.log(cartDivImg);

    // Création et insertion de l'image
    const cartImg = document.createElement("img");
    // Appel API à faire
    cartImg.src = productFromLocalStorage[i].imageURL;
    cartImg.alt = productFromLocalStorage[i].altTxt;
    console.log(cartImg);

    // Création et insertion de la div content
    const cartDivContent = document.createElement("div");
    cartDivContent.classList.add("cart__item__content");
    cartArticle.appendChild(cartDivContent);
    console.log(cartDivContent);

    // Création et insertion de la div description
    const cartDivDescription = document.createElement("div");
    cartDivDescription.classList.add("cart__item__content__description");
    cartDivContent.appendChild(cartDivDescription);
    cartArticle.appendChild(cartDivContent);
    console.log(cartDivDescription);

    //Création et insertion de l'élément titre "h2"
    const cartTitleProduct = document.createElement("h2");
    cartTitleProduct.innerHTML = productFromLocalStorage[i].name;
    cartDivDescription.appendChild(cartTitleProduct);
    cartDivContent.appendChild(cartDivDescription);
    cartArticle.appendChild(cartDivContent);
    //console.log(cartTitleProduct);

    // Création et insertion de l'élément couleur "p"
    const cartColorProduct = document.createElement("p");
    cartColorProduct.innerHTML = productFromLocalStorage[i].colors;
    cartDivDescription.appendChild(cartColorProduct);
    cartDivContent.appendChild(cartDivDescription);
    cartArticle.appendChild(cartDivContent);
    //console.log(cartColorProduct)

    // Création et insertion de l'élément prix "p"
    // Appel API à faire
    const cartPriceProduct = document.createElement("p");
    cartPriceProduct.innerHTML = productFromLocalStorage[i].price;
    cartDivDescription.appendChild(cartPriceProduct);
    cartDivContent.appendChild(cartDivDescription);
    cartArticle.appendChild(cartDivContent);
    //console.log(cartPriceProduct);

    // Création et insertion de l'élément content settings "div"
    const cartContentSettings = document.createElement("div");
    cartContentSettings.classList.add("cart__item__content__settings");
    cartDivContent.appendChild(cartContentSettings);
    cartArticle.appendChild(cartDivContent);
    console.log(cartContentSettings);

    // Création et insertion de l'élément settings quantitty "div"
    const cartSettingsQuantity = document.createElement("div");
    cartSettingsQuantity.classList.add(
      "cart__item__content__settings__quantity"
    );
    cartContentSettings.appendChild(cartSettingsQuantity);
    cartDivContent.appendChild(cartContentSettings);
    cartArticle.appendChild(cartDivContent);
    //console.log(cartSettingsQuantity)

    // Création et insertion de l'élément quantité "p"
    //<p>Qté : </p>
    //<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42"></input>
    const cartQuantityProduct = document.createElement("p");
    cartQuantityProduct.innerHTML = "Qté : ";
    cartSettingsQuantity.appendChild(cartQuantityProduct);
    //console.log(cartQuantityProduct);

    // Création et insertion de l'élément quantité "input"
    const cartInputQuantity = document.createElement("input");
    cartInputQuantity.setAttribute("type", "number");
    cartInputQuantity.classList.add("itemQuantity");
    cartInputQuantity.setAttribute("name", "itemQuantity");
    cartInputQuantity.setAttribute("min", "1");
    cartInputQuantity.setAttribute("max", "100");
    //cartInputQuantity.value = productFromLocalStorage.quantity;
    cartSettingsQuantity.appendChild(cartInputQuantity);
    //console.log(cartInputQuantity);

    // Création et insertion de l'élement delete "div" et "p"
    const cartSettingsDelete = document.createElement("div");
    cartSettingsDelete.classList.add("cart__item__content__settings__delete");
    cartContentSettings.appendChild(cartSettingsDelete);
    //console.log(cartSettingsDelete);
    const cartDelete = document.createElement("p");
    cartDelete.classList.add("deleteItem");
    cartDelete.innerHTML = "Supprimer";
    cartSettingsDelete.appendChild(cartDelete);
    //console.log(cartDelete);
  }
}
