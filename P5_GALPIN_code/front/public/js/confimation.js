/**Récupère l'URL
 * trouve le numero de commande avec get
 * affiche sur la page
 */
const order = new URLSearchParams(document.location.search);
document.getElementById('orderId').textContent = order.get("orderId");