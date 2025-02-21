angular.module('burgerApp')
    .service('AuthService', function($http) {
        const API_URL = 'http://localhost:8000/api';  // Update this to match your backend URL

        this.login = function(email, password) {
            return $http.post(`${API_URL}/token/`, {
                username: email,
                password: password
            });
        };

        this.register = function(userData) {
            return $http.post(`${API_URL}/users/register/`, {
                username: userData.email,
                email: userData.email,
                password: userData.password,
                first_name: userData.name
            });
        };

        this.setToken = function(token) {
            localStorage.setItem('token', token);
        };

        this.getToken = function() {
            return localStorage.getItem('token');
        };

        this.logout = function() {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
        };

        // Add HTTP interceptor to handle 401 errors
        $http.interceptors.push(function($q) {
            return {
                'responseError': function(rejection) {
                    if (rejection.status === 401) {
                        localStorage.removeItem('token');
                    }
                    return $q.reject(rejection);
                }
            };
        });
    }); 