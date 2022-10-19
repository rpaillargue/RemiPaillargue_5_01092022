let productFromLocalStorage = JSON.parse(localStorage.getItem("panier"));

fetch("http://localhost:3000/api/products")
  .then(function (res) {
    return res.json();
  })
  .then(function (product) {
    for (let product of productFromLocalStorage) {
      // Création et insertion de l'élement article
      const cartArticle = document.createElement("article");
      document.querySelector("#cart__items").appendChild(cartArticle);
      cartArticle.className = "cart__item";
      cartArticle.setAttribute("data-id", productFromLocalStorage._id);
      console.log(cartArticle);

      // Insertion de l'élément "div" pour l'image produit
      let productDivImg = document.createElement("div");
      cartArticle.appendChild(productDivImg);
      productDivImg.className = "cart__item__img";
      console.log(productDivImg);

      // Insertion de l'image
      let productImg = document.createElement("img");
      productDivImg.appendChild(productImg);
      productImg.src = productFromLocalStorage.imageUrl;
      productImg.alt = productFromLocalStorage.altTxt;
      console.log(productImg);
    }
  });
