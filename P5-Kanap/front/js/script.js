// Création d'un class qui va assigner chaque element de jsonProduct a this
class Product{
    constructor(jsonProduct){
        jsonProduct && Object.assign(this, jsonProduct);
    }
}
// récuperation des données des produits et boucle pour répéter l'opération et affiché chaque produit
fetch("http://localhost:3000/api/products")
    .then( data => data.json())
    .then( jsonListProduct => {
        for(let jsonProduct of jsonListProduct){
            let product = new Product(jsonProduct);
            document.querySelector('.items').innerHTML += `<a href="./product.html?id=42">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`;
        }
    });
    