import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import loginImage from '../assets/login.jpg'; 

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });

            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));

               
                navigate('/dashboard'); 
            }
        } catch (err) {
            console.error("Login Error:", err.response?.data);
            navigate('/dashboard'); 
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
                <img src={loginImage} alt="Login" className="w-40 h-32 mb-8 rounded-full" />
                
                <h2 className="text-3xl font-semibold text-center text-blue-600">Login</h2>

                <form onSubmit={handleLogin} className="mt-4 w-full">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Username</label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                        Login
                    </button>
                </form>

                <div className="mt-4 w-full flex justify-between">
                    <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
                    <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
