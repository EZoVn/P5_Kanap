class basket{
    constructor() {
        let basket = localStorage.getItem('basket');
        console.log(basket);
        if(basket == null){
            this.basket = [];
        }else{
            this.basket = JSON.parse(basket);
        }
    }

    save(basket) {
        localStorage.setItem("basket", JSON.stringify(this.basket));
    }

    add(product) {
        let foundProduct = this.basket.find(p => p.idProduct == product.idProduct);
        if(foundProduct != undefined){
            foundProduct.quantity += foundProduct.quantitySelec;
        } else {
            product.quantity = product.quantitySelec;
            this.basket.push(product);
        }
        this.save();
    }
    
    remove(product) {
        this.basket = this.basket.filter(p => p.idProduct != product.idProduct);
        this.save();
    }

    changeQuantity(product, quantity) {
        let foundProduct = this.basket.find(p => p.idProduct == product.idProduct);
        if(foundProduct != undefined) {
            foundProduct.quantity += quantity;
            if(foundProduct.quantity <= 0) {
                this.remove(foundProduct);
            } else {
                this.save();
            }
        } 
    }

    getNumberProduct() {
        let number = 0;
        for (let product of this.basket) {
            number += product.quantity;
        }
        return number;
    }
}

/*
for(let produit of basket){
    let product = basket.find(p => p.idProduct == produit.idProduct && p.colors ==produit.colors);

    // reccupere tout les produits alors quil faudrait reccuperer juste ceux du local storage
    fetch(`http://localhost:3000/api/products/${product.idProduct}`)
    .then( data => data.json())
    .then( product => {  
        document.getElementById('cart__items').innerHTML += `<article class="cart__item" data-id="${produit.idProduct}" data-color="${produit.colors}">
        <div class="cart__item__img">
        <img src="${product.imageUrl}" alt="${product.altTxt}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
        <h2>${produit.name}</h2>
        <p>${produit.colors}</p>
        <p>${product.price} €</p>
        </div>
        <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produit.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
        </div>
        </div>
        </div>
        </article>`;    
    });
}
*/

/*
const test = async function () {
    try{
        let response = await fetch(`http://localhost:3000/api/products`)
        if(response.ok) {
            let data = await response.json()


        } else {
            console.error('retour du server : ',response.status)
        }
    } catch (e) {
        console.log(e)
    }
}
 test();
 */