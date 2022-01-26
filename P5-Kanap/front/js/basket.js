function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}

function getBasket() {
    let basket = localStorage.getItem('basket');
    // console.log(basket);
    if(basket == null){
        return [];
    }else{
        return JSON.parse(basket);
    }
}

function addBasket(product, quantity, color) {
    let basket = getBasket();
    // foundProduct va comparer les id et colors afin de lier les informations charger dans ajouter au panier
    let foundProduct = basket.find(p => p.idProduct == product.idProduct && p.colors == product.colors);
    // Si le canapé est deja dans le panier j'incrémente la quantité séléctionner dans le tableau du produit avec 
    // le bon Id et Color
    if(foundProduct != undefined) {
        // changeQuantity(product, quantity, color);
        foundProduct.quantity  += quantity;
    } 
    // Sinon je crée l'élément dans le tableau
    else {
        product.quantity = quantity;
        basket.push(product);
    }
    saveBasket(basket);
}

function removeFromBasket(product, color) {
    let basket = getBasket();
    basket = basket.filter(p => p.idProduct != product.idProduct && p.colors != product.colors);
    saveBasket(basket);
}

function changeQuantity(product, quantity, color) {
    let basket = getBasket();
    let foundProduct = basket.find(p => p.idProduct == product.idProduct && p.colors == product.colors);
    if(foundProduct != undefined) {
        foundProduct.quantity += quantity;
        if(foundProduct.quantity <= 0) {
            removeFromBasket(foundProduct);
        } else {
            saveBasket(basket);
        }
    } 
}

function getNumberProduct() {
    let basket = getBasket();
    let number = 0;
    for (let product of basket) {
        number += product.quantity;
    }
    return number;
}

function getTotalPrice() {
    let basket = getBasket();
    let total = 0;
    for (let product of basket) {
        total += product.quantity * product.price;
    }
    return total;
}