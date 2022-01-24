// Format des produits

class Product{
    constructor(jsonProduct){
        jsonProduct && Object.assign(this, jsonProduct);
    }
}

// utiliser URLSearchparams pour extraire l'id depuis l'url et avec .get je cible ce qui se trouve apres id =
const queryString = new URLSearchParams(document.location.search);
const leId = queryString.get("id");

console.log(leId);


// id reccuperer maintgenant je doit aller le retrouver dans le tableau et afficher les informations correspondant au produit
fetch("http://localhost:3000/api/products")
    .then( res => res.json())
    .then(jsonListProduct => {
        for(let jsonProduct of jsonListProduct){
            let product = new Product(jsonProduct);
            // je parcours le tableau des produits si je trouve l'id correspondant a leId je copie l'element dans la variable produit
            console.log(product);
            // comment sortir les elements de ce fetch
            if(product._id == leId){
                console.log('ok');
                let produit = product;
                console.log(produit);
                return produit;
            }else{
                console.log('not ok');
            }
        }        
    })
    .then(produit => {
        document.querySelector('.item__img').innerHTML += `<img src="${produit.imageUrl}" alt="${produit.altTxt}">`
        document.getElementById('title').innerHTML += `${produit.name}`
        document.getElementById('price').innerHTML += `${produit.price}`
        document.getElementById('description').innerHTML += `${produit.description}`
        // document.getElementById('colors').innerHTML += `<option value="${produit.colors[0]}">${produit.colors[0]}</option>`;
        // document.getElementById('colors').innerHTML += `<option value="${produit.colors[1]}">${produit.colors[1]}</option>`;
        // document.getElementById('colors').innerHTML += `<option value="${produit.colors[2]}">${produit.colors[2]}</option>`;
        // faire une boucle pour charger chaque couleur dans le selecteur
        produit.colors.forEach(function(element) {
            let i = element;
           document.getElementById('colors').innerHTML += `<option value="${element}">${element}</option>`;
    })
})

    // serait-il possible d'ajouter un titre a la page dans le head

/** ecouter l'evenemment click
 * quel couleur 
 * quelle quantité+
 * click du bouton ajouter au panier 
 * enregistrer les éléments du panier
 */
// const color = idForm.value;
const idForm = document.querySelector('#colors');
const quantitySelec = document.querySelector('#quantity');

const element = document.getElementById('addToCart');
element.addEventListener('click', (e) => {
    e.preventDefault();
    const color = idForm.value;
    const quantity = quantitySelec.value;

    let optionKanap = {
    // nom du produit
        idProduct : leId,
        colors : color,
        quantitySelec : quantity
    }
    // je récupere bien l'id, la quantité et la couleur mais ca ne l'envoi pas encore dans le panier
    console.log(optionKanap);
    addBasket(leId);
    console.log(leId);
});