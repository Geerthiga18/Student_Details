import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import signupImage from '../assets/login.jpg'; 

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });

            if (res.status === 201) {
                setSuccess('User registered successfully! Redirecting to login...');
                setTimeout(() => navigate('/'), 2000); 
            }
        } catch (err) {
            setError(err.response?.data?.msg || 'Signup failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
                <img src={signupImage} alt="Sign Up" className="w-40 h-32 mb-8 rounded-full" />
                
                <h2 className="text-3xl font-semibold text-center text-green-600">Sign Up</h2>
                
                {error && <p className="text-red-600">{error}</p>}
                {success && <p className="text-green-600">{success}</p>}

                <form onSubmit={handleSignup} className="mt-4 w-full">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Username</label>
                        <input
                            type="text"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                        Sign Up
                    </button>
                </form>

                <div className="mt-4">
                    <Link to="/" className="text-blue-500 hover:underline">Already have an account? Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
