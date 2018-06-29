module.exports = function Cart(oldCart){
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id){
        var storedItem = this.items[id];
        if(!storedItem){
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        storedItem.qty++;
        storedItem.price  = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    }
    this.remove = function(id){
        let item = this.items[id];
        this.totalQty-= item.qty;
        this.totalPrice -= item.price;
        delete this.items[id];
    }
    this.increase = function(id){
        let itemPrice = this.items[id].item.price;
        this.items[id].qty++;
        this.items[id].price += itemPrice;
        this.totalQty++;
        this.totalPrice += itemPrice;
    }
    this.decrease = function(id){
        if(this.items[id].qty != '1'){
            let itemPrice = this.items[id].item.price;
            this.items[id].qty--;
            this.items[id].price -= itemPrice;
            this.totalQty--;
            this.totalPrice -= itemPrice;
        }
        
    }
    this.generateArray = function() {
        var arr = [];
        for(var id in  this.items){
            arr.push(this.items[id]);
        }
        return arr;
    }
}