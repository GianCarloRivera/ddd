import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `JWT ${token}`;
    }
    return config;
});

export const login = (email, password) => 
    api.post('/token/', { username: email, password });

export const register = (name, email, password) => 
    api.post('/users/register/', { 
        username: email,
        email,
        password,
        first_name: name 
    });

export const createOrder = (orderData) => 
    api.post('/orders', orderData);

export const getOrders = () => 
    api.get('/orders/myorders'); 