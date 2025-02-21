import React from 'react';

function ThemeToggle({ isDarkMode, toggleTheme }) {
    return (
        <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? (
                <i className="fas fa-sun"></i>
            ) : (
                <i className="fas fa-moon"></i>
            )}
        </button>
    );
}

export default ThemeToggle; 