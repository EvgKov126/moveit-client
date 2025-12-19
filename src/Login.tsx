import React, { useState } from 'react';
import { validateLoginInput, handleAuthSuccess } from './authService';
import './Login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const validation = validateLoginInput(email, password);
        if (!validation.isValid) {
            setError(validation.errors.email || validation.errors.password || "Помилка");
            return;
        }

        if (handleAuthSuccess("mock-token")) {
            alert("Вхід успішний!");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>MOVEIT</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        className="form-input"
                        type="email"
                        placeholder="Login"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="form-input"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button className="login-button" type="submit">sign in</button>
                </form>
            </div>
        </div>
    );
};

export default Login;