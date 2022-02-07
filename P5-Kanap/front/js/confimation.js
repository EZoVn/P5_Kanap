let order = document.location.search;

let orderId = document.getElementById('orderId');
orderId.textContent = order.replace(`?`, '');