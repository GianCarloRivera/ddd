import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import Profile from './components/Profile';
import ThemeToggle from './components/ThemeToggle';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart';
import './styles.css';

function App() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    return (
        <CartProvider>
            <Router>
                <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
                    <Navbar 
                        onLoginClick={() => setIsLoginOpen(true)}
                        onRegisterClick={() => setIsRegisterOpen(true)}
                        isLoggedIn={isLoggedIn}
                        isDarkMode={isDarkMode}
                        onCartClick={() => setIsCartOpen(true)}
                    />
                    <ThemeToggle 
                        isDarkMode={isDarkMode}
                        toggleTheme={() => setIsDarkMode(!isDarkMode)}
                    />
                    
                    <Routes>
                        <Route path="/" element={
                            <>
                                <Hero />
                                <Menu />
                            </>
                        } />
                        <Route path="/menu" element={<Menu />} />
                        <Route 
                            path="/profile" 
                            element={isLoggedIn ? <Profile /> : <Navigate to="/" />} 
                        />
                    </Routes>

                    <LoginModal 
                        isOpen={isLoginOpen}
                        onClose={() => setIsLoginOpen(false)}
                        onLogin={() => setIsLoggedIn(true)}
                        isDarkMode={isDarkMode}
                    />
                    <RegisterModal 
                        isOpen={isRegisterOpen}
                        onClose={() => setIsRegisterOpen(false)}
                        onRegister={() => setIsLoggedIn(true)}
                        isDarkMode={isDarkMode}
                    />
                    <Cart 
                        isOpen={isCartOpen}
                        onClose={() => setIsCartOpen(false)}
                    />
                </div>
            </Router>
        </CartProvider>
    );
}

export default App; 