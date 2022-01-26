class basket{
    constructor() {
        let basket = localStorage.getItem('basket');
        console.log(basket);
        if(basket == null){
            this.basket = [];
        }else{
            this.basket = JSON.parse(basket);
        }
    }

    save(basket) {
        localStorage.setItem("basket", JSON.stringify(this.basket));
    }

    add(product) {
        let foundProduct = this.basket.find(p => p.idProduct == product.idProduct);
        if(foundProduct != undefined){
            foundProduct.quantity += foundProduct.quantitySelec;
        } else {
            product.quantity = product.quantitySelec;
            this.basket.push(product);
        }
        this.save();
    }
    
    remove(product) {
        this.basket = this.basket.filter(p => p.idProduct != product.idProduct);
        this.save();
    }

    changeQuantity(product, quantity) {
        let foundProduct = this.basket.find(p => p.idProduct == product.idProduct);
        if(foundProduct != undefined) {
            foundProduct.quantity += quantity;
            if(foundProduct.quantity <= 0) {
                this.remove(foundProduct);
            } else {
                this.save();
            }
        } 
    }

    getNumberProduct() {
        let number = 0;
        for (let product of this.basket) {
            number += product.quantity;
        }
        return number;
    }
}