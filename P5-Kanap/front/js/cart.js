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
                }
            }
        }
    })
    .then(result => {
    })


    const text = document.querySelectorAll('.cart__item__content__description p  p');
    console.log(text);
    // console.log(product.price);




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


function addActivityItem(){
    //option is selected
    alert("yeah");
}

// console.log(test);

// nombre d'article total
let totalArticle = getNumberProduct();
document.getElementById('totalQuantity').innerText += `${totalArticle}`;


// Il faut reussir a réccuperer le prix de fetch avant
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