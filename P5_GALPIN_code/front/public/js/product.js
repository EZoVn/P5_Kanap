/** Récupération de l'ID dans l'URL 
 * utiliser URLSearchparams pour extraire l'id depuis l'url
 * avec .get je cible ce qui se trouve apres id  
 */
const queryString = new URLSearchParams(document.location.search);
const leId = queryString.get("id");

/** id récupérer maintenant j'affiche les informations correspondant au produit */
fetch(`https://kanap-ezo-api.vercel.app/api/products/${leId}`)
    .then(res => res.json())
    .then(produit => {

        const item__img = document.querySelector('.item__img');

        const img = document.createElement('img');
        img.setAttribute('src', `${produit.imageUrl}`);
        img.setAttribute('alt', `${produit.altTxt}`);
        item__img.appendChild(img);

        document.getElementById('title').textContent = `${produit.name}`;
        document.getElementById('price').textContent = `${produit.price} `;
        document.getElementById('description').textContent = `${produit.description}`;

        produit.colors.forEach(function (element) {
            const color = document.getElementById('colors');

            const option = document.createElement('option');
            option.setAttribute('value', `${element}`);
            option.textContent = `${element}`;
            color.appendChild(option);
        })
    })

/** J'écoute le clic du bouton Ajouter au panier 
 *  Je récupère le nom, la couleur et la quantité du produit dans optionKanp
 *  J'envoi les données dans le localStorage grace à ma fonction addBasket()
*/
const element = document.getElementById('addToCart');
element.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('title').innerText;
    const color = document.querySelector('#colors').value;
    // je reccupere un entier pour faire des calculs
    let quantity = parseInt(document.querySelector('#quantity').value);
    let optionKanap = {
        name: name,
        _id: leId,
        colors: color,
    }
    if (!color) {
        alert('Choisissez une couleur');
    } else if (quantity <= 0) {
        alert('Vous avez oublier d\'ajouter une quantité');
    } else {
        addBasket(optionKanap, quantity);
    }
});