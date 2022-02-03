let basket = getBasket();

// affiche un tableau de mon panier
// console.table(basket);

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
            for(let produit of basket) {
                let product = data.find(p => p._id == produit._id);
                /**--article--*/
                const cart__items = document.getElementById('cart__items');
                let article = document.createElement('article');
                article.setAttribute('class', 'cart__item');
                article.setAttribute('data-id', `${produit._id}`);
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

                pQuantityPrice.setAttribute('class', 'pQuantityPrice');
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
            });
            document.getElementById('totalPrice').textContent = `${totalPrice}`;           
        });

/* /------------ Article total ---------------------\ */
let totalArticle = getNumberProduct();
document.getElementById('totalQuantity').innerText += `${totalArticle}`;

/** /---------------------------Formulaire--------------------------\ */
let form = document.querySelector('.cart__order__form');

// let contact = {};
// console.log(contact);

form.firstName.addEventListener('input', function () {
    let msg = document.getElementById('firstNameErrorMsg');
    let regExp = /^[a-zA-Z-éèêç ]{2,20}$/g;
    validation(this, regExp, msg);
});
form.lastName.addEventListener('input', function () {
    let msg = document.getElementById('lastNameErrorMsg');
    let regExp = /^[a-zA-Z-éèêç ]{3,14}$/g;
    validation(this, regExp, msg);  
});
form.address.addEventListener('input', function () {
    let msg = document.getElementById('addressErrorMsg');
    let regExp = /^[a-zA-Z0-9-, ]{3,64}$/g;
    validation(this, regExp, msg);  
});
form.city.addEventListener('input', function () {
    let msg = document.getElementById('cityErrorMsg');
    let regExp = /^[a-zA-Z ]{3,24}$/g;
    validation(this, regExp, msg);  
});

/** Fonction de validation input
 * input, le regExp du champs, msg de validation
 */
function validation(input,regExp, msg) {
    if(regExp.test(input.value)){
        msg.textContent = 'Le champ est valide.';
    } else if(input.value.trim() == "") {
        msg.textContent = 'Le champ est vide.';
    } else{
        msg.textContent = 'Le champ n\'est pas valide.';
    }
};

form.email.addEventListener('input', function() {
    validEmail(this);
});
const validEmail = function(inputEmail) {
    // creation de la reg exp validation email
    let emailRegExp = new RegExp(
        `^[a-zA-Z0-9.-_]+@{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,3}$`, 'g'
    );
    let msg = document.getElementById('emailErrorMsg');
    if(emailRegExp.test(inputEmail.value)) {
        msg.textContent = `L'email est valide`;
    } else {
        msg.textContent = `L'email est incomplet. Exemple : monEmail@mail.fr`; 
    }
};
/** récuperation des données */
let contact = {};
let products = basket.map(basket => basket._id);
console.log(products);
let btn = document.getElementById('order');
form.order.addEventListener('click', function(e) {
    e.preventDefault();
    // valid check juste si le champ est rempli 
    let valid = form.checkValidity();
    contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    };
    console.log(contact);
    if(!valid) {
        alert('Un des champs n\'est pas rempli.') ;
    } else {
        // Je recupère bien le panier et les éléments contact
        // reste a les envoyer

        // const order = {
        //     contact : {
        //         firstName: firstName.value,
        //         lastName: lastName.value,
        //         address: address.value,
        //         city: city.value,
        //         email: email.value
        //     },
        //     products: products
        // }
        // console.log(order);
        console.log(contact);
        console.log(products);
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
        'Accept': 'application/json',
        'Content-Type': 'aplication/json'
        },
            body: JSON.stringify({contact, products})
            // body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
 
            console.log(data);
            console.log(data.orderId);
            console.log(data._id);
            console.log(data.contact);
            // window.location.href = './confirmation.html?';
        })
        .catch (err => console.log(err))
    }
});