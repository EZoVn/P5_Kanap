let basket = getBasket();

// affiche un tableau de mon panier
console.table(basket);

const url = `http://localhost:3000/api/products`;
/** /-----------------Affichage des produits du panier ---------------------------\
*Je fais une requête fetch de tout les produits avec une boucle
*Je fais une seconde boucle avec les produits récuperer du panier
*Si je trouve un produit du panier identique à un produit dans tout les produits
*alors je crée les éléments de l'article en y incorporant les bonnes valeurs
*/
fetch(url)
    .then(response => response.json())
    .then(data => {
        for(let product of data){
            for(let produit of basket) {
                if(produit.idProduct === product._id) {

                    /**--article--*/
                    const cart__items = document.getElementById('cart__items');
                    let article = document.createElement('article');
                    article.setAttribute('class', 'cart__item');
                    article.setAttribute('data-id', `${produit.idProduct}`);
                    article.setAttribute('data-color', `${produit.colors}`);
                    cart__items.appendChild(article);

                    /**--cart__item__img--*/
                    const cart__item__img = document.createElement('div');
                    cart__item__img.setAttribute('class', 'cart__item__img');
                    article.appendChild(cart__item__img);
                    
                    const img = document.createElement('img');
                    img.setAttribute("src", `${product.imageUrl}`);
                    img.setAttribute("alt", `${product.altTxt}`);
                    cart__item__img.appendChild(img);

                    /**--cart__item__content--*/
                    const cart__item__content = document.createElement('div');
                    cart__item__content.setAttribute('class', 'cart__item__content');
                    article.appendChild(cart__item__content);
                    
                    /**--descritpion--*/
                    const cart__item__content__description = document.createElement('div');
                    cart__item__content__description.setAttribute('class', 'cart__item__content__description');
                    cart__item__content.appendChild(cart__item__content__description);
                    const h2 = document.createElement('h2');
                    cart__item__content__description.appendChild(h2).textContent = `${produit.name}`;
                    const pColor = document.createElement('p');
                    cart__item__content__description.appendChild(pColor).textContent = `${produit.colors}`;
                    const pQuantityPrice = document.createElement('p');
                    cart__item__content__description.appendChild(pQuantityPrice).textContent = `${produit.quantity * product.price} €`;
                    
                    /**--settings--*/
                    const cart__item__content__settings = document.createElement('div');
                    cart__item__content__settings.setAttribute('class', 'cart__item__content__settings');
                    cart__item__content.appendChild(cart__item__content__settings);

                    const cart__item__content__settings__quantity = document.createElement('div');
                    cart__item__content__settings__quantity.setAttribute('class', 'cart__item__content__settings__quantity');
                    cart__item__content__settings.appendChild(cart__item__content__settings__quantity);

                    const pQuantity = document.createElement('p');
                    pQuantity.textContent = 'Qté : ';
                    cart__item__content__settings__quantity.appendChild(pQuantity);
                    
                    const input = document.createElement('input');
                    input.setAttribute('type', "number");
                    input.setAttribute('class', "itemQuantity");


                    input.setAttribute('name', "itemQuantity");
                    input.setAttribute('min', "1");
                    input.setAttribute('max', "100");
                    input.setAttribute('value', `${produit.quantity}`);
                    cart__item__content__settings__quantity.appendChild(input);
                    
                    const cart__item__content__settings__delete = document.createElement('div');
                    cart__item__content__settings__delete.setAttribute('class', 'cart__item__content__settings__delete');
                    cart__item__content__settings.appendChild(cart__item__content__settings__delete);

                    const pSupprimer = document.createElement('p');
                    pSupprimer.setAttribute('class', 'deleteItem')
                    pSupprimer.textContent = 'Supprimer'
                    cart__item__content__settings__delete.appendChild(pSupprimer);                           
                    }
                }
            }
            
        })
        .then(item => {
            const itemQuantity = document.querySelectorAll('.itemQuantity');
            const data = document.querySelectorAll('.cart__item');
            const del = document.getElementsByClassName('deleteItem');

            /**---addEventListener---
             * boucle for qui va marqué data[i] à chaque tour
             * appel de la fonction changeQuantity avec id, quantity, color en paramètre
             * 
             * fonctionnement identique pour supprimer un canapé du panier
             */
            for(let i = 0; i < data.length; i++) {
                itemQuantity[i].addEventListener("change", function(e) {
                    e.preventDefault();
                    changeQuantity(data[i].dataset.id, itemQuantity[i].value, data[i].dataset.color);
                });
                del[i].addEventListener('click', function(e) {
                        e.preventDefault();
                        const color = data[i].dataset.color;
                        const id = data[i].dataset.id;
                        console.log(color, id);
                        removeFromBasket(id, color);
                });
            }

            /** /----------------- Prix total --------------------------\
            *Je récupere le prix de chaque élément du panier
            *Je l'additionne à totalPrice
            *Je retourne le prix total après la boucle
            */
            let price = document.querySelectorAll('.pQuantityPrice');
            let totalPrice = 0;
            price.forEach(priceTot => {
                let price = parseInt(priceTot.innerText);
                totalPrice += price;
            })
            document.getElementById('totalPrice').textContent = `${totalPrice}`;           
        })

/* /------------ Article total ---------------------\ */
let totalArticle = getNumberProduct();
document.getElementById('totalQuantity').innerText += `${totalArticle}`;