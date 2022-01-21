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
            // pour retrouver l'id du produit j'ai ajouter id= dans le lien pour reccupérer ce qui se trouve après.
            document.querySelector('.items').innerHTML += `<a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`;
        }
    });
    
   