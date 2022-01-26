// utiliser URLSearchparams pour extraire l'id depuis l'url et avec .get je cible ce qui se trouve apres id =
const queryString = new URLSearchParams(document.location.search);
const leId = queryString.get("id");

console.log(leId);


// id reccuperer maintgenant je doit afficher les informations correspondant au produit
fetch(`http://localhost:3000/api/products/${leId}`)
    .then( res => res.json())
    .then(produit => {
        document.querySelector('.item__img').innerHTML += `<img src="${produit.imageUrl}" alt="${produit.altTxt}">`
        document.getElementById('title').innerHTML += `${produit.name}`
        document.getElementById('price').innerHTML += `${produit.price}`
        document.getElementById('description').innerHTML += `${produit.description}`

        // faire une boucle pour charger chaque couleur dans le selecteur
        produit.colors.forEach(function(element) {
           document.getElementById('colors').innerHTML += `<option value="${element}">${element}</option>`;
    })
})
    // serait-il possible d'ajouter un titre a la page dans le head

const element = document.getElementById('addToCart');
element.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('title').innerText;
    const color = document.querySelector('#colors').value;
    // je reccupere un entier pour faire des calculs
    let quantity = parseInt(document.querySelector('#quantity').value);
    let optionKanap = {
        name : name,
        idProduct : leId,
        colors : color,    
    }
    // je récupere bien l'id, la quantité et la couleur mais ca ne l'envoi pas encore dans le panier
    // console.log(optionKanap);
    addBasket(optionKanap, quantity, color);
});