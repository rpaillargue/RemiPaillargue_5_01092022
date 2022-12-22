// Appel API pour récupérer les produits à afficher sur la page d'accueil
fetch("http://localhost:3000/api/products")
  .then(function (res) {
    return res.json();
  })
  .then(function (product) {
    //------------------Création des articles produits-------------------//
    for (let i = 0; i < product.length; i++) {
      console.log(product[i]);
      // Insertion de l'élément "a"
      let productLink = document.createElement("a");
      document.querySelector(".items").appendChild(productLink);
      productLink.href = `product.html?id=${product[i]._id}`;

      // Insertion de l'élément "article"
      let productArticle = document.createElement("article");
      productLink.appendChild(productArticle);

      // Insertion de l'image
      let productImg = document.createElement("img");
      productArticle.appendChild(productImg);
      productImg.src = product[i].imageUrl;
      productImg.alt = product[i].altTxt;

      // Insertion du titre "h3"
      let productName = document.createElement("h3");
      productArticle.appendChild(productName);
      productName.classList.add("productName");
      productName.textContent = product[i].name;

      // Insertion de la description "p"
      let productDescription = document.createElement("p");
      productArticle.appendChild(productDescription);
      productDescription.classList.add("productName");
      productDescription.textContent = product[i].description;
    }
  });
