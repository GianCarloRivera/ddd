angular.module('burgerApp', [])
    .controller('MainController', function($scope) {
        // Burger Menu Items
        $scope.burgers = [
            {
                id: 1,
                name: 'Classic Burger',
                price: '₱100.00',
                description: 'Juicy beef patty with fresh lettuce, tomatoes, and our special sauce',
                image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=500&q=80'
            },
            {
                id: 2,
                name: 'Cheese Burger',
                price: '₱150.00',
                description: 'Our classic burger topped with melted cheddar cheese',
                image: 'https://images.unsplash.com/photo-1547584370-2cc98b8b8dc8?w=500&q=80'
            },
            {
                id: 3,
                name: 'Bacon Burger',
                price: '₱250.00',
                description: 'Classic burger with crispy bacon strips and BBQ sauce',
                image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&q=80'
            }
        ];

        // Cart functionality
        $scope.cart = [];
        $scope.showCart = false;
        $scope.cartCount = 0;

        $scope.toggleCart = function() {
            $scope.showCart = !$scope.showCart;
        };

        $scope.addToCart = function(burger) {
            const existingItem = $scope.cart.find(item => item.id === burger.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                $scope.cart.push({...burger, quantity: 1});
            }
            $scope.updateCartCount();
            $scope.showCart = true;
        };

        $scope.removeFromCart = function(item) {
            const index = $scope.cart.findIndex(i => i.id === item.id);
            if (index > -1) {
                $scope.cart.splice(index, 1);
                $scope.updateCartCount();
            }
        };

        $scope.increaseQuantity = function(item) {
            item.quantity++;
            $scope.updateCartCount();
        };

        $scope.decreaseQuantity = function(item) {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                $scope.removeFromCart(item);
            }
            $scope.updateCartCount();
        };

        $scope.updateCartCount = function() {
            $scope.cartCount = $scope.cart.reduce((total, item) => total + item.quantity, 0);
        };

        $scope.getTotal = function() {
            return $scope.cart.reduce((total, item) => {
                const price = parseFloat(item.price.replace('₱', ''));
                return total + (price * item.quantity);
            }, 0).toFixed(2);
        };

        $scope.checkout = function() {
            if ($scope.cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            alert('Thank you for your order! Total: ₱' + $scope.getTotal());
            $scope.cart = [];
            $scope.updateCartCount();
            $scope.showCart = false;
        };
    }); 