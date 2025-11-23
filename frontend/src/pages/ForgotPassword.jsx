import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft, Key, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import api from '../services/api';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1); // 1: Email, 2: OTP & Password
    const [loading, setLoading] = useState(false);
    const [displayOtp, setDisplayOtp] = useState(null); // Store OTP from response
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/auth/send-otp', { email });

            // Check if OTP is in the response (for development/testing)
            if (response.data.otp) {
                setDisplayOtp(response.data.otp);
                toast.success(`OTP: ${response.data.otp} (Check console or email)`);
            } else {
                toast.success('OTP sent to your email');
            }

            setStep(2);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/auth/reset-password', { email, otp, password: newPassword });
            toast.success('Password reset successful! Please login.');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl"
            >
                {step === 1 && (
                    <>
                        <div>
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Forgot Password
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600">
                                Enter your email address and we'll send you an OTP.
                            </p>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSendOtp}>
                            <div className="rounded-md shadow-sm">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors shadow-lg hover:shadow-xl disabled:opacity-70"
                                >
                                    {loading ? 'Sending...' : 'Send OTP'}
                                    {!loading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </div>
                        </form>
                    </>
                )}

                {step === 2 && (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Mail className="h-8 w-8 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Check your email</h2>
                        <p className="text-gray-600 mb-8">
                            We've sent an OTP to <strong>{email}</strong>. Please check your inbox and enter the code below.
                        </p>

                        {displayOtp && (
                            <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
                                <p className="text-sm text-gray-600 mb-2">📧 Email delivery may be delayed. Use this OTP:</p>
                                <p className="text-3xl font-bold text-green-600 tracking-widest text-center">{displayOtp}</p>
                                <p className="text-xs text-gray-500 mt-2 text-center">Valid for 5 minutes</p>
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleResetPassword}>
                            <div className="rounded-md shadow-sm space-y-4 text-left">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Key className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors shadow-lg hover:shadow-xl disabled:opacity-70"
                                >
                                    {loading ? 'Resetting...' : 'Reset Password'}
                                    {!loading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="text-center mt-6">
                    <Link to="/login" className="font-medium text-sm text-gray-600 hover:text-primary inline-flex items-center">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
