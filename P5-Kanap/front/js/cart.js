let basket = getBasket();
console.log(basket);



for(let produit of basket){
    let product = basket.find(p => p.idProduct == produit.idProduct && p.colors ==produit.colors);
    console.log(produit);
    console.log(product.idProduct);
    console.log(product.colors);
    // reccupere tout les produits alors quil faudrait reccuperer juste ceux du local storage
    fetch(`http://localhost:3000/api/products/${product.idProduct}`)
    .then( data => data.json())
    .then( product => {  
        document.getElementById('cart__items').innerHTML += `<article class="cart__item" data-id="${product._id}" data-color="${product.colors}">
        <div class="cart__item__img">
        <img src="${product.imageUrl}" alt="${product.altTxt}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${produit.colors}</p>
        <p>${product.price} €</p>
        </div>
        <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
        </div>
        </div>
        </div>
        </article>`;
        
    });
}

