/**Récupère le panier */
let basket = getBasket();

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
        for (let produit of basket) {
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
        for (let i = 0; i < data.length; i++) {
            itemQuantity[i].addEventListener("change", function (e) {
                e.preventDefault();
                changeQuantity(data[i].dataset.id, itemQuantity[i].value, data[i].dataset.color);
            });
            del[i].addEventListener('click', function (e) {
                e.preventDefault();
                const color = data[i].dataset.color;
                const id = data[i].dataset.id;
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

form.firstName.addEventListener('input', function () {
    let msg = document.getElementById('firstNameErrorMsg');
    let regExp = /^[a-zA-Z\-áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s]{2,20}$/g;
    validation(this, regExp, msg);
    // allLetter(this);
});
form.lastName.addEventListener('input', function () {
    let msg = document.getElementById('lastNameErrorMsg');
    let regExp = /^[a-zA-Z\-áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s]{3,14}$/g;
    validation(this, regExp, msg);
});
form.address.addEventListener('input', function () {
    let msg = document.getElementById('addressErrorMsg');
    let regExp = /^[a-zA-Z0-9-, ]{3,64}$/g;
    validation(this, regExp, msg);
});
form.city.addEventListener('input', function () {
    let msg = document.getElementById('cityErrorMsg');
    let regExp = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s]{3,24}$/g;
    validation(this, regExp, msg);
});

/** Fonction de validation input
 * input, le regExp, msg de validation
 */
function validation(input, regExp, msg) {
    if (regExp.test(input.value)) {
        msg.textContent = 'Le champ est valide.';
    } else if (input.value.trim() == "") {
        msg.textContent = 'Le champ est vide.';
    } else {
        msg.textContent = 'Le champ n\'est pas valide.';
    }
};

/** Fonction pour prenom, nom et ville
 * on check si le champs n'a pas de chiffres
 */
function allLetter(inputtxt) {
    var letters = /^[A-Za-z\-áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]+$/;
    if (inputtxt.value.match(letters)) {
        return true;
    }
    return false;
}

form.email.addEventListener('input', function () {
    validEmail(this);
});
const validEmail = function (inputEmail) {
    // creation de la reg exp validation email
    let emailRegExp = new RegExp(
        `^[a-zA-Z0-9.-_]+@{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,3}$`, 'g'
    );
    let msg = document.getElementById('emailErrorMsg');
    if (emailRegExp.test(inputEmail.value)) {
        msg.textContent = `L'email est valide`;
    } else {
        msg.textContent = `L'email est incomplet. Exemple : monEmail@mail.fr`;
    }
};
/** récuperation des ID */
let products = basket.map(basket => basket._id);

let order = document.getElementById("order");
order.addEventListener('click', function (e) {
    e.preventDefault();
    // valid check juste si le champ est rempli 

    /**Récupère les valeurs entrer dans le formulaire */
    let valid = form.checkValidity();
    let contact = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        address: form.address.value,
        city: form.city.value,
        email: form.email.value
    };
    const order = { contact, products }

    if (!valid || !allLetter(form.firstName) || !allLetter(form.lastName) || !allLetter(form.city)) {
        alert('Un des champs est mal rempli ou n\'est pas rempli.');
    } else {

        fetch(`http://localhost:3000/api/products/order`, {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((res) => res.json())
            .then((data) => {
                // je récupere le orderId et l'ajoute dans l'url pour le retrouver sur la page de confirmation
                window.location.href = `./confirmation.html?orderId=${data.orderId}`;
                // Vide le panier une fois la commande valider

                localStorage.clear();
            })
            .catch(err => console.log(err))
    }
});