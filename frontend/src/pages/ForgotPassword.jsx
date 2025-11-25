import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/auth/forgot-password', { email });
            toast.success('OTP sent to your email');
            navigate(`/reset-password?email=${email}`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send OTP');
        }
    };

    return (
        <div className="container" style={{ marginTop: '5rem', maxWidth: '400px' }}>
            <div className="card">
                <h2 className="text-center" style={{ marginBottom: '2rem' }}>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Send OTP
                    </button>
                </form>
                <p className="text-center mt-4">
                    <Link to="/login" className="text-primary">Back to Login</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
