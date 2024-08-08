import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:3000/api/trabajador/' + email);
            const userId = response.data._id;
            localStorage.setItem('userId', userId);
            console.log('Login successful, user ID:', userId);
            window.location.href = '/personal';
        } catch (error) {
            setError('Login failed. Please try again.');
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="login-container w-full h-screen flex justify-center items-center">
            <form onSubmit={handleLogin} className="login-form border-2 border-gray-400 rounded-2xl p-4">
                <h2 className='text-center font-bold text-2xl'>Login</h2>
                <div className="form-group my-4">
                    <label htmlFor="email">Correo:</label>
                    <input 
                        type="email" 
                        className='w-full p-2 border-2 border-gray-400 rounded-lg'
                        id="email" 
                        value={email} 
                        onChange={handleEmailChange} 
                        required 
                    />
                </div>
                <div className='flex justify-center' >
                <button type="submit" className='bg-[#121212] text-white p-2 font-semibold rounded-lg'>Login</button>
                </div>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default Login;
