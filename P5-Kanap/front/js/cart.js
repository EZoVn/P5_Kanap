let basket = getBasket();
// affiche un tableau de mon panier
console.table(basket);

const url = `http://localhost:3000/api/products`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        for(let product of data){
            for(let produit of basket){
                if(produit.idProduct === product._id) {

                    /*Version createElement et appendChild plus maintenable que la version innerHTML*/
                    const cart__items = document.getElementById('cart__items');

                    let article = document.createElement('article');
                    article.setAttribute('class', 'cart__item');
                    article.setAttribute('data-id', `${produit.idProduct}`);
                    article.setAttribute('data-color', `${produit.colors}`);
                    cart__items.appendChild(article);

                    const cart__item__img = document.createElement('div');
                    cart__item__img.setAttribute('class', 'cart__item__img');
                    article.appendChild(cart__item__img);
                    
                    const img = document.createElement('img');
                    img.setAttribute("src", `${product.imageUrl}`);
                    img.setAttribute("alt", `${product.altTxt}`);
                    cart__item__img.appendChild(img);
                
                    const cart__item__content = document.createElement('div');
                    cart__item__content.setAttribute('class', 'cart__item__content');
                    article.appendChild(cart__item__content);

                    const cart__item__content__description = document.createElement('div');
                    cart__item__content__description.setAttribute('class', 'cart__item__content__description');
                    cart__item__content.appendChild(cart__item__content__description);
                    const h2 = document.createElement('h2');
                    cart__item__content__description.appendChild(h2).textContent = `${produit.name}`;
                    const pColor = document.createElement('p');
                    cart__item__content__description.appendChild(pColor).textContent = `${produit.colors}`;
                    const pQuantityPrice = document.createElement('p');
                    cart__item__content__description.appendChild(pQuantityPrice).textContent = `${produit.quantity * product.price} €`;

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



                            
                            /* ajoute la quantité du input necessite un raffraichissement
                            * ne fonctionne que sur le premier produit et influence nimporte quelle canape
                            */
                            const t = document.querySelector('.itemQuantity');
                            // console.log(data);
                            t.addEventListener('change', () => {
                                changeQuantity(produit.idProduct, t.value);
                                console.log(produit.idProduct, produit.quantity);
                            })
                            /* supprime bien l'élément mais la page doit etre raffraichi
                            * ne prend pas en compte la couleur supprime les deux du meme id
                            */
                            const del = document.querySelector('.deleteItem');
                            del.addEventListener('click', () => {
                                removeFromBasket(produit.idProduct, produit.colors);
                            })
                        }
                    }
                }
            })
    



function boucle(t) {
    t.forEach(element => {
        console.log(element);
                element.addEventListener('change', (e) => {
                    console.log(element.input);
                })   
                console.log(element);
            });
}

// nombre d'article total
let totalArticle = getNumberProduct();
document.getElementById('totalQuantity').innerText += `${totalArticle}`;


// Il faut reussir a réccuperer le prix de fetch avant meme probleme que les addEventListener
function getTotalPrice() {
    let basket = getBasket();
    let total = 0;
    for (let product of basket) {
        total += product.quantity * product.price;
    }
    return total;
}
let totalPrice = getTotalPrice();
console.log(totalPrice);
document.getElementById('totalPrice').innerText += `${totalPrice}`;