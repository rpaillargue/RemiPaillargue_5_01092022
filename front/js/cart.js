async function getProducts() {
  return fetch("http://localhost:3000/api/products")
    .then(function (res) {
      return res.json();
    })
    .then(function (products) {
      return products;
    });
}

const produits = await getProducts();
console.log(produits);

const cardItems = document.getElementById("cart__items");

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
    const produit = produits.find(
      (item) => item._id === productFromLocalStorage[i].id
    );
    // console.log(produit);
    // Création et insertion de l'élement article
    const cartArticle = document.createElement("article");
    cartArticle.classList.add("cart__item");
    cartArticle.dataset.id = productFromLocalStorage[i].id;
    cartArticle.dataset.color = productFromLocalStorage[i].color;
    // console.log(cartArticle);

    // Création et insertion de la div image
    const cartDivImg = document.createElement("div");
    cartDivImg.classList.add("cart__item__img");
    cartArticle.appendChild(cartDivImg);
    //console.log(cartDivImg);

    // Création et insertion de l'image
    const cartImg = document.createElement("img");
    cartImg.src = produit.imageUrl;
    cartImg.alt = produit.altTxt;
    cartDivImg.appendChild(cartImg);
    //console.log(cartImg);

    // Création et insertion de la div content
    const cartDivContent = document.createElement("div");
    cartDivContent.classList.add("cart__item__content");
    cartArticle.appendChild(cartDivContent);
    //console.log(cartDivContent);

    // Création et insertion de la div description
    const cartDivDescription = document.createElement("div");
    cartDivDescription.classList.add("cart__item__content__description");
    cartDivContent.appendChild(cartDivDescription);
    cartArticle.appendChild(cartDivContent);
    //console.log(cartDivDescription);

    //Création et insertion de l'élément titre "h2"
    const cartTitleProduct = document.createElement("h2");
    cartTitleProduct.innerHTML = produit.name;
    cartDivDescription.appendChild(cartTitleProduct);
    cartDivContent.appendChild(cartDivDescription);
    cartArticle.appendChild(cartDivContent);
    //console.log(cartTitleProduct);

    // Création et insertion de l'élément couleur "p"
    const cartColorProduct = document.createElement("p");
    cartColorProduct.innerHTML = productFromLocalStorage[i].color;
    cartDivDescription.appendChild(cartColorProduct);
    cartDivContent.appendChild(cartDivDescription);
    cartArticle.appendChild(cartDivContent);
    //console.log(cartColorProduct)

    // Création et insertion de l'élément prix "p"
    const cartPriceProduct = document.createElement("p");
    cartPriceProduct.innerHTML = produit.price + " €";
    cartDivDescription.appendChild(cartPriceProduct);
    cartDivContent.appendChild(cartDivDescription);
    cartArticle.appendChild(cartDivContent);
    //console.log(cartPriceProduct);

    // Création et insertion de l'élément content settings "div"
    const cartContentSettings = document.createElement("div");
    cartContentSettings.classList.add("cart__item__content__settings");
    cartDivContent.appendChild(cartContentSettings);
    cartArticle.appendChild(cartDivContent);
    //console.log(cartContentSettings);

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
    cartInputQuantity.setAttribute(
      "value",
      productFromLocalStorage[i].quantity
    );
    cartSettingsQuantity.appendChild(cartInputQuantity);
    //console.log(cartInputQuantity);

    // Création et insertion de l'élement delete "div"
    const cartSettingsDelete = document.createElement("div");
    cartSettingsDelete.classList.add("cart__item__content__settings__delete");
    cartContentSettings.appendChild(cartSettingsDelete);
    //console.log(cartSettingsDelete);

    // Création et insertion de l'élément delete "p"
    const cartDelete = document.createElement("p");
    cartDelete.classList.add("deleteItem");
    cartDelete.innerHTML = "Supprimer";
    cartSettingsDelete.appendChild(cartDelete);
    cartSettingsDelete.addEventListener("click", (event) => {
      console.log("DELETEEEE");
      console.log(productFromLocalStorage);
      console.log(produit);

      const elementParent = event.target.closest(".cart__item");
      const idElement = elementParent.dataset.id;
      const colorElement = elementParent.dataset.color;
      // Suppression d'un produit dans le panier
      const produitsRestants = productFromLocalStorage.filter((item) => {
        return item.id !== idElement || item.color !== colorElement;
      });

      console.log(produitsRestants);

      localStorage.setItem("panier", JSON.stringify(produitsRestants));
      // Si aucun produit dans le local storage on affiche le panier vide
      if (produitsRestants.length === 0) {
        localStorage.clear();
      }
      // Et on raffraichit la page
      location.reload();
    });
    // Ajout au clic de quantité
    const addQuantity = document.getElementsByClassName("itemQuantity");
    // console.log(addQuantity);

    cardItems.appendChild(cartArticle);
    //console.log(cartDelete);
  }
}
