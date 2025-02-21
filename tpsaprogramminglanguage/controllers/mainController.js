angular.module('burgerApp')
    .controller('MainController', function($scope, AuthService, CartService, $http) {
        $scope.isLoggedIn = false;
        $scope.showLoginModal = false;
        $scope.showRegisterModal = false;
        $scope.showCart = false;
        $scope.loginData = {};
        $scope.registerData = {};

        $scope.cart = [];
        $scope.cartCount = 0;

        $scope.updateCartCount = function() {
            $scope.cartCount = $scope.cart.reduce((total, item) => total + item.quantity, 0);
        };

        // Force digest cycle when modals are toggled
        $scope.$watch('showLoginModal', function(newVal) {
            if (newVal) {
                $scope.showRegisterModal = false;
            }
        });

        $scope.$watch('showRegisterModal', function(newVal) {
            if (newVal) {
                $scope.showLoginModal = false;
            }
        });

        $scope.login = function(event) {
            event.preventDefault();
            $scope.loginError = null;
            
            console.log('Attempting login with:', {
                email: $scope.loginData.email,
                password: '***'
            });

            AuthService.login($scope.loginData.email, $scope.loginData.password)
                .then(function(response) {
                    console.log('Login success:', response);
                    $scope.isLoggedIn = true;
                    $scope.showLoginModal = false;
                    $scope.loginData = {};
                })
                .catch(function(error) {
                    console.error('Login error details:', error);
                    if (error.data && error.data.detail) {
                        $scope.loginError = error.data.detail;
                    } else if (error.data && error.data.non_field_errors) {
                        $scope.loginError = error.data.non_field_errors[0];
                    } else {
                        $scope.loginError = 'Invalid email or password';
                    }
                });
        };

        $scope.register = function(event) {
            event.preventDefault();
            if ($scope.isRegistering) return;
            $scope.registerError = null;
            $scope.isRegistering = true;

            console.log('Attempting registration with:', {
                name: $scope.registerData.name,
                email: $scope.registerData.email,
                password: '***'
            });

            if ($scope.registerData.password !== $scope.registerData.confirmPassword) {
                $scope.registerError = 'Passwords do not match';
                return;
            }

            if ($scope.registerData.password.length < 8) {
                $scope.registerError = 'Password must be at least 8 characters long';
                return;
            }

            AuthService.register($scope.registerData)
                .then(function(response) {
                    $scope.registerData = {};
                    $scope.showRegisterModal = false;
                    alert('Registration successful! Please login.');
                    $scope.showLoginModal = true;
                    $scope.isRegistering = false;
                    $scope.$digest();
                })
                .catch(function(error) {
                    console.error('Registration error:', error);
                    $scope.isRegistering = false;
                    if (error.data) {
                        if (error.data.email) {
                            $scope.registerError = 'Email already exists';
                        } else if (error.data.username) {
                            $scope.registerError = 'Username already exists';
                        } else if (error.data.password) {
                            $scope.registerError = error.data.password[0];
                        } else if (error.data.detail) {
                            $scope.registerError = error.data.detail;
                        } else {
                            $scope.registerError = 'Registration failed. Please try again.';
                        }
                    } else {
                        $scope.registerError = 'Registration failed. Please try again.';
                    }
                });
        };

        $scope.showModal = function(modalType) {
            console.log('Showing modal:', modalType);
            if (modalType === 'login') {
                $scope.showLoginModal = true;
                $scope.showRegisterModal = false;
                document.body.classList.add('modal-open');
                console.log('Login modal state:', $scope.showLoginModal);
            } else if (modalType === 'register') {
                $scope.showRegisterModal = true;
                $scope.showLoginModal = false;
                document.body.classList.add('modal-open');
                console.log('Register modal state:', $scope.showRegisterModal);
            }
            // Force digest cycle
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        $scope.openLoginModal = function() {
            $scope.showModal('login');
            $scope.loginError = null;
            $scope.loginData = {};
        };

        $scope.closeLoginModal = function() {
            console.log('Closing login modal');
            $scope.showLoginModal = false;
            $scope.loginError = null;
            $scope.loginData = {};
            document.body.classList.remove('modal-open');
        };

        $scope.openRegisterModal = function() {
            $scope.showModal('register');
            $scope.registerError = null;
            $scope.registerData = {};
        };

        $scope.closeRegisterModal = function() {
            console.log('Closing register modal');
            $scope.showRegisterModal = false;
            $scope.registerError = null;
            $scope.registerData = {};
            document.body.classList.remove('modal-open');
        };

        $scope.openCart = function() {
            $scope.showCart = true;
        };

        $scope.closeCart = function() {
            $scope.showCart = false;
        };

        $scope.addToCart = function(item) {
            console.log('Adding to cart:', item);
            const existingItem = $scope.cart.find(i => i.id === item.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                $scope.cart.push({...item, quantity: 1});
            }
            $scope.updateCartCount();
            // Add visual feedback
            const button = event.target;
            button.classList.add('added-to-cart');
            setTimeout(() => {
                button.classList.remove('added-to-cart');
            }, 300);
            
            // Show cart modal
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

        $scope.getTotal = function() {
            return $scope.cart.reduce((total, item) => {
                const price = parseFloat(item.price.replace('₱', ''));
                return total + (price * item.quantity);
            }, 0).toFixed(2);
        };

        $scope.checkout = function() {
            if (!$scope.isLoggedIn) {
                alert('Please login to checkout');
                $scope.openLoginModal();
                return;
            }

            const orderData = {
                items: $scope.cart,
                totalAmount: $scope.getTotal(),
                shippingAddress: 'Default Address' // You might want to get this from user input
            };

            CartService.checkout(orderData)
                .then(function(response) {
                    alert('Order placed successfully!');
                    $scope.cart.length = 0; // Clear cart
                    $scope.updateCartCount();
                    $scope.closeCart();
                })
                .catch(function(error) {
                    alert('Failed to place order. Please try again.');
                    console.error('Checkout error:', error);
                });
        };

        // Add logout function
        $scope.logout = function() {
            AuthService.logout();
            $scope.isLoggedIn = false;
        };

        $scope.testConnection = function() {
            const API_URL = 'http://localhost:8000/api';  // match your authService URL
            $http.get(API_URL + '/health-check')
                .then(function(response) {
                    alert('Connection successful! Server is running.');
                })
                .catch(function(error) {
                    alert('Connection failed. Server might be down or wrong URL.');
                    console.error('Connection test error:', error);
                });
        };

        // Menu Items
        $scope.menuItems = [
            {
                id: 1,
                name: 'Classic Burger',
                price: '₱100.00',
                image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format'
            },
            {
                id: 2,
                name: 'Cheese Burger',
                price: '₱150.00',
                image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&auto=format'
            },
            {
                id: 3,
                name: 'Bacon Burger',
                price: '₱200.00',
                image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&auto=format'
            },
            {
                id: 4,
                name: 'Double Cheese Burger',
                price: '₱250.00',
                image: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=500&auto=format'
            },
            {
                id: 5,
                name: 'Chicken Burger',
                price: '₱180.00',
                image: 'https://images.unsplash.com/photo-1615297928064-24977384d0da?w=500&auto=format'
            },
            {
                id: 6,
                name: 'Veggie Burger',
                price: '₱160.00',
                image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=500&auto=format'
            }
        ];
    }); 