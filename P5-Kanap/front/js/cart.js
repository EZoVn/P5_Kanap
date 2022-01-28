let basket = getBasket();
// affiche un tableau de mon panier
console.table(basket);

const url = `http://localhost:3000/api/products`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        for(let product of data){
            // console.log(product);
            for(let produit of basket){
                // console.log(produit.idProduct);
                if(produit.idProduct === product._id) {
                    document.getElementById('cart__items').innerHTML += `<article class="cart__item" data-id="${produit.idProduct}" data-color="${produit.colors}">
                            <div class="cart__item__img">
                                <img src="${product.imageUrl}" alt="${product.altTxt}">
                            </div>
                            <div class="cart__item__content">
                                <div class="cart__item__content__description">
                                    <h2>${produit.name}</h2>
                                    <p>${produit.colors}</p>
                                    <p>${produit.quantity * product.price} €</p>
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
                            
                            // ajoute la quantité du input necessite un raffraichissement
                            // ne fonctionne que sur le premier produit et influence le dernier s'il y en a plusieurs a coriger
                            const t = document.querySelector('.itemQuantity');
                            // console.log(data);
                            t.addEventListener('change', () => {
                                // boucle(t.value);
                                changeQuantity(produit.idProduct, t.value);
                                console.log(produit.idProduct, produit.quantity);
                            })
                            // supprime bien l'élément mais la page doit etre raffraichi
                            // ne prend pas en compte la couleur supprime les deux du meme id
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


// for(let produit of basket){
//     let product = basket.find(p => p.idProduct == produit.idProduct && p.colors == produit.colors);
    
//     fetch(`http://localhost:3000/api/products/${product.idProduct}`)
//     .then( data => data.json())
//     .then( product => {  
//         document.getElementById('cart__items').innerHTML += `<article class="cart__item" data-id="${produit.idProduct}" data-color="${produit.colors}">
//         <div class="cart__item__img">
//         <img src="${product.imageUrl}" alt="${product.altTxt}">
//         </div>
//         <div class="cart__item__content">
//         <div class="cart__item__content__description">
//         <h2>${produit.name}</h2>
//         <p>${produit.colors}</p>
//         <p>${produit.quantity * product.price} €</p>
//         </div>
//         <div class="cart__item__content__settings">
//         <div class="cart__item__content__settings__quantity">
//         <p>Qté : </p>
//         <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produit.quantity}">
//         </div>
//         <div class="cart__item__content__settings__delete">
//         <p class="deleteItem">Supprimer</p>
//         </div>
//         </div>
//         </div>
//         </article>`;    
//         list = document.querySelectorAll('.itemQuantity');

//     })
// }

        // .then(liste => {
        //     liste = list;
        //     for (let i = 0; i < liste.length; i++) {
        //         const element = liste[i]; 
        //         console.log(element);       
        //     }
        //     console.log(liste[0].value);
            // let test = document.querySelectorAll('.itemQuantity');
            // for(let i in liste){
            //     liste[i].addEventListener('change', function(event){
            //     console.log(i);
            //     alert(this.value);
            //     });
            // };
        // })


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