// Création d'un class qui va assigner chaque element de jsonProduct a this
class Product {
    constructor(jsonProduct) {
        jsonProduct && Object.assign(this, jsonProduct);
    }
}
/** récuperation des données des produits 
 * boucle pour répéter l'opération à chaque produit
 * affiché chaque produit avec les details
 * */
fetch("https://kanap-ezo-api.vercel.app/api/products")
    .then(data => data.json())
    .then(jsonListProduct => {
        for (let jsonProduct of jsonListProduct) {
            let product = new Product(jsonProduct);

            const item = document.getElementById('items');

            const a = document.createElement('a');
            item.appendChild(a);
            // pour retrouver l'id du produit j'ai ajouter id= dans le lien pour reccupérer ce qui se trouve après.
            a.setAttribute("href", `./product.html?id=${product._id}`);

            const article = document.createElement('article');
            a.appendChild(article);

            const img = document.createElement('img');
            img.setAttribute("src", `${product.imageUrl}`);
            img.setAttribute('alt', `${product.altTxt}`)
            article.appendChild(img);

            const h3 = document.createElement('h3');
            h3.setAttribute('class', 'productName')
            h3.textContent = `${product.name}`;
            article.appendChild(h3);

            const p = document.createElement('p');
            p.setAttribute('class', "productDescription")
            article.appendChild(p).textContent = `${product.description}`;
        }
    });