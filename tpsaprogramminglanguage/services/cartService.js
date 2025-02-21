angular.module('burgerApp')
    .service('CartService', function($http) {
        const cart = [];

        this.addToCart = function(item) {
            const existingItem = cart.find(i => i.id === item.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...item, quantity: 1 });
            }
        };

        this.removeFromCart = function(item) {
            const index = cart.findIndex(i => i.id === item.id);
            if (index > -1) {
                cart.splice(index, 1);
            }
        };

        this.getCart = function() {
            return cart;
        };

        this.getTotal = function() {
            return cart.reduce((total, item) => 
                total + (parseFloat(item.price.replace('₱', '').replace(',', '')) * item.quantity), 0
            );
        };

        this.checkout = function(orderData) {
            return $http.post('/api/orders', orderData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
        };
    }); 