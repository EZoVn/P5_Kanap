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
        let content = "";
        for(let jsonProduct of jsonListProduct){
            let product = new Product(jsonProduct);
            // pour retrouver l'id du produit j'ai ajouter id= dans le lien pour reccupérer ce qui se trouve après.

            // Version createElement et appendChild un peu longue mais maintenable facilement
            const item = document.getElementById('items');

            const a = document.createElement('a');
            item.appendChild(a);
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
            
          // Version rapide avec content ou innnerHtml pour ajouter un bloc de code entier
          //   content += `<a href="./product.html?id=${product._id}">
          //   <article>
          //     <img src="${product.imageUrl}" alt="${product.altTxt}">
          //     <h3 class="productName">${product.name}</h3>
          //     <p class="productDescription">${product.description}</p>
          //   </article>
          // </a>`;
        }
        // document.querySelector('.items').innerHTML = content;
    });
    
   