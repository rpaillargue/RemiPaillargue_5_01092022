let productFromLocalStorage = JSON.parse(localStorage.getItem("panier"));

if (!productFromLocalStorage) {
  const titleCart = document.querySelector("h1");
  const sectionCart = document.querySelector(".cart");

  titleCart.innerHTML = "Votre panier est vide !";
  sectionCart.style.display = "none";
} else {
  for (let product of productFromLocalStorage) {
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
    console.log(cartImg);
  }
}
