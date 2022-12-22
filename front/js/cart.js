// Appel API pour afficher les produits dans le panier
async function getProducts() {
  return fetch("http://localhost:3000/api/products")
    .then(function (res) {
      return res.json();
    })
    .then(function (products) {
      return products;
    });
}

// Requête POST pour le formulaire
async function sendForm(dataForm) {
  return fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForm),
  })
    .then(function (res) {
      return res.json();
    })
    .then((data) => {
      document.location.href = `confirmation.html?orderId=${data.orderId}`;
    });
}

const produits = await getProducts();
console.log(produits);

const cardItems = document.getElementById("cart__items");

let productFromLocalStorage = JSON.parse(localStorage.getItem("panier"));
console.log(productFromLocalStorage);

//---------------------------Affichage du panier---------------------------/
//Si le panier est vide, on affiche un message
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
      const elementParent = event.target.closest(".cart__item");
      const idElement = elementParent.dataset.id;
      const colorElement = elementParent.dataset.color;

      //---------------------------Suppression d'un produit dans le panier-----------------------------//
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
    cardItems.appendChild(cartArticle);
  }

  //-------------------Changement de la quantité depuis le panier par l'utilisateur-------------------------//
  document.querySelectorAll(".itemQuantity").forEach((item) => {
    item.addEventListener("change", (event) => {
      const elementParent = event.target.closest(".cart__item");
      const idElement = elementParent.dataset.id;
      const colorElement = elementParent.dataset.color;

      let produitTrouve = productFromLocalStorage.filter((item) => {
        return item.id === idElement && item.color === colorElement;
      });
      produitTrouve[0].quantity = event.target.value;

      const autresProduits = productFromLocalStorage.filter((item) => {
        return item.id !== idElement || item.color !== colorElement;
      });

      const nouveauStorage = [...produitTrouve, ...autresProduits];

      localStorage.setItem("panier", JSON.stringify(nouveauStorage));

      location.reload();
    });
  });

  //----------------------Total quantité et prix du panier---------------------------//
  const totalQuantityElementDOM = document.getElementById("totalQuantity");
  const totalPriceElementDOM = document.getElementById("totalPrice");

  // Calcule du total quantité du panier
  let totalQuantityValue = 0;
  for (const item of productFromLocalStorage) {
    totalQuantityValue = totalQuantityValue + +item.quantity;
  }
  totalQuantityElementDOM.textContent = totalQuantityValue;

  // Calcule du total prix du panier
  let totalPriceValue = 0;
  for (let i = 0; i < productFromLocalStorage.length; i++) {
    const produit = produits.find(
      (item) => item._id === productFromLocalStorage[i].id
    );
    totalPriceValue =
      totalPriceValue + produit.price * productFromLocalStorage[i].quantity;
  }
  totalPriceElementDOM.textContent = totalPriceValue;

  //------------------------Gestion et validation du formulaire------------------------------//
  const cartForm = document.querySelector(".cart__order__form");

  // Tableau des éléments du formulaire
  const fields = [
    {
      element: document.getElementById("firstName"),
      regex:
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃ ,.'-]+$/u,
      errorMessage: "Le champ prénom est incorrect",
      elementError: document.getElementById("firstNameErrorMsg"),
      error: false,
    },
    {
      element: document.getElementById("lastName"),
      regex: /^[a-zA-Z-\s]+$/,
      errorMessage: "Le champ nom est incorrect",
      elementError: document.getElementById("lastNameErrorMsg"),
      error: false,
    },
    {
      element: document.getElementById("address"),
      regex: /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/,
      errorMessage: "Le champ adresse est incorrect",
      elementError: document.getElementById("addressErrorMsg"),
      error: false,
    },
    {
      element: document.getElementById("city"),
      regex: /^[a-zA-Z-\s]+$/,
      errorMessage: "Le champ ville est incorrect",
      elementError: document.getElementById("cityErrorMsg"),
      error: false,
    },
    {
      element: document.getElementById("email"),
      regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      errorMessage: "Le champ email est incorrect",
      elementError: document.getElementById("emailErrorMsg"),
      error: false,
    },
  ];

  // Validation du formulaire
  cartForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    for (const field of fields) {
      if (field.regex.test(field.element.value) === false) {
        field.elementError.textContent = field.errorMessage;
        field.error = true;
      } else {
        field.elementError.textContent = "";
        field.error = false;
      }
    }

    const error = fields.find((field) => field.error);
    console.log(error);

    // Appel API lors de la validation
    if (!error) {
      console.log("CALL API");
      // Création objet contact
      const contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
      };

      // Création du tableau des produits
      let products = [];
      for (let i = 0; i < productFromLocalStorage.length; i++) {
        products.push(productFromLocalStorage[i].id);
      }

      // Création de l'objet formulaire avec toutes les données
      const dataForm = {
        contact,
        products,
      };

      const result = await sendForm(dataForm);
      console.log(result);
    }
  });
}
