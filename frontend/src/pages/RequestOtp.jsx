import React, { useState } from 'react';
import api from '../services/api';

export default function RequestOtp() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const res = await api.post('/auth/send-otp', { email });
            setMessage(res.data.message || 'OTP sent. Check your inbox.');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error sending OTP');
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: '30px auto' }}>
            <h2>Request OTP</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                <button type="submit" style={{ padding: '8px 16px' }}>Send OTP</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
