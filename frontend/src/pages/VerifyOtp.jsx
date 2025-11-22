import React, { useState } from 'react';
import api from '../services/api';

export default function VerifyOtp() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('');
        try {
            const res = await api.post('/auth/verify-otp', { email, code: otp });
            if (res.data.verified) {
                setStatus('✅ OTP verified!');
            } else {
                setStatus(res.data.message || 'Verification failed');
            }
        } catch (err) {
            setStatus(err.response?.data?.message || 'Error verifying OTP');
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: '30px auto' }}>
            <h2>Verify OTP</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                <input
                    type="text"
                    placeholder="Enter OTP code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                <button type="submit" style={{ padding: '8px 16px' }}>Verify OTP</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
}
