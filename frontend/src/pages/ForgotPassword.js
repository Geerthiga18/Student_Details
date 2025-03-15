import React, { useState } from 'react';
import axios from 'axios';
import forgotPasswordImage from '../assets/login.jpg';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            setMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
                <img src={forgotPasswordImage} alt="Forgot Password" className="w-40 h-32 mb-8 rounded-full" />
                <h2 className="text-3xl font-semibold text-center text-blue-600">Forgot Password</h2>
                {message && <p className="text-green-600">{message}</p>}
                {error && <p className="text-red-600">{error}</p>}
                <form onSubmit={handleForgotPassword} className="mt-4 w-full">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;