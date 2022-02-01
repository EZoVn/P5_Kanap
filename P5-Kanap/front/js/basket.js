/**---Savegarde du panier---
*enregistre dans le panier
*converti une valeur jS en JSON
*/
function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}

/**---Récupere les produits du panier---
*récupère le localStorage
*si le panier est vide créer un tableau vide
*sinon parse le format JSON en jS
*/
function getBasket() {
    let basket = localStorage.getItem('basket');
    // console.log(basket);
    if(basket == null){
        return [];
    }else{
        return JSON.parse(basket);
    }
}

/**---Ajout au panier---
*récupère le panier
*foundProduct va comparer les id et colors afin de lier les informations du produit charger dans ajouter au panier
* Si le canapé est deja dans le panier j'incrémente la quantité séléctionner dans le tableau du produit avec le bon Id et Color
*Sinon je crée l'élément dans le tableau
*sauvegarde dans le panier avec la fonction saveBasket
*/
function addBasket(product, quantity, color) {
    let basket = getBasket();
    let foundProduct = basket.find(p => p.idProduct == product.idProduct && p.colors == product.colors);
    if(foundProduct != undefined) {
        foundProduct.quantity  += quantity;
    } 
    else {
        product.quantity = quantity;
        basket.push(product);
    }
    saveBasket(basket);
}

// ne fonctionne pas encore
/**---Supprimer du panier---
 * récupère le panier
 * filtre les valeurs id et color envoyer en paramètre afin des les isolers du panier
 * sauvegarde le panier sauf l'élément filtrer 
 */
function removeFromBasket(product, color) {
    let basket = getBasket();
    basket = basket.filter(p => p.idProduct != product || p.colors != color);
    saveBasket(basket);
}

// fonctionne uniquement sur le premier article avec l'id reccuperer sans data-id, manque la couleur
/**---Change quantiter--- 
 * récupère le panier
 * recherche le bon produit avec l'id
 * si le produit existe je met la quantité ajouter en paramètre sur le produit
 *  si la quantité du produit est inférieur ou égal à 0, je le supprime du panier avec la fonction removeFromBasket
 * sinon je sauvegarde le panier avec la nouvelle quantité
 */
function changeQuantity(product, quantity, color) {
    let basket = getBasket();
    let foundProduct = basket.find(p => p.idProduct === product && p.colors === color);

    // console.log(product);
    if(foundProduct != undefined) {
        foundProduct.quantity = parseInt(quantity);
        if(foundProduct.quantity <= 0) {
            removeFromBasket(product, color);
        } else {
            saveBasket(basket);
        }
    } 
}

/**---Nombres total de produit---
 * récupère le panier
 * pour chaque produit du panier 
 * je récupère la quantité et l'ajoute à la variable number
 * retourn number
 */
function getNumberProduct() {
    let basket = getBasket();
    let number = 0;
    for (let product of basket) {
        number += product.quantity;
    }
    return number;
}