import { login } from '../services/api';

function LoginModal({ isOpen, onClose, onLogin }) {
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const email = e.target.email.value;
            const password = e.target.password.value;
            const { data } = await login(email, password);
            localStorage.setItem('token', data.access);
            onLogin();
            onClose();
        } catch (error) {
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div>
            {/* Render your login form here */}
        </div>
    );
}

export default LoginModal; 