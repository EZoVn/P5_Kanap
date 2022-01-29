// utiliser URLSearchparams pour extraire l'id depuis l'url et avec .get je cible ce qui se trouve apres id =
const queryString = new URLSearchParams(document.location.search);
const leId = queryString.get("id");

console.log(leId);


// id reccuperer maintgenant j'affiche les informations correspondant au produit
fetch(`http://localhost:3000/api/products/${leId}`)
    .then( res => res.json())
    .then(produit => {
        const item__img = document.querySelector('.item__img');
        
        const img = document.createElement('img');
        img.setAttribute('src', `${produit.imageUrl}`);
        img.setAttribute('alt', `${produit.altTxt}`);
        item__img.appendChild(img);
        
        document.getElementById('title').textContent = `${produit.name}`;
        document.getElementById('price').textContent = `${produit.price} `;
        document.getElementById('description').textContent = `${produit.description}`;

        produit.colors.forEach(function(element) {
            const color = document.getElementById('colors');
            
            const option = document.createElement('option');
            option.setAttribute('value', `${element}`);
            option.textContent = `${element}`;
            color.appendChild(option);
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
    addBasket(optionKanap, quantity, color);
});