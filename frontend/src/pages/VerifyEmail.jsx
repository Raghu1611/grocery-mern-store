import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const VerifyEmail = () => {
    const [otp, setOtp] = useState('');
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const navigate = useNavigate();

    useEffect(() => {
        if (!email) {
            toast.error('Invalid access');
            navigate('/register');
        }
    }, [email, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/auth/verify-email', { email, otp });
            toast.success('Email verified successfully! Please login.');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Verification failed');
        }
    };

    return (
        <div className="container" style={{ marginTop: '5rem', maxWidth: '400px' }}>
            <div className="card">
                <h2 className="text-center" style={{ marginBottom: '1rem' }}>Verify Email</h2>
                <p className="text-center" style={{ marginBottom: '2rem', color: '#6b7280' }}>
                    Enter the OTP sent to {email}
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            style={{ textAlign: 'center', letterSpacing: '0.5rem', fontSize: '1.5rem' }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Verify
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyEmail;
