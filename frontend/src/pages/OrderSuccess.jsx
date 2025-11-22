import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Home } from 'lucide-react';

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state?.order;

    if (!order) {
        navigate('/');
        return null;
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center py-12 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center"
            >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-12 w-12 text-primary" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Order Placed Successfully!
                </h1>

                <p className="text-gray-600 mb-8">
                    Thank you for your order. We'll send you a confirmation email shortly.
                </p>

                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                    <div className="grid grid-cols-2 gap-4 text-left">
                        <div>
                            <p className="text-sm text-gray-600">Order ID</p>
                            <p className="font-semibold text-gray-900">{order._id.slice(-8).toUpperCase()}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Amount</p>
                            <p className="font-semibold text-primary">${order.totalAmount.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Status</p>
                            <p className="font-semibold text-gray-900 capitalize">{order.status}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Payment</p>
                            <p className="font-semibold text-gray-900">{order.paymentMethod}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/orders"
                        className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                        <Package className="mr-2 h-5 w-5" />
                        View My Orders
                    </Link>
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        <Home className="mr-2 h-5 w-5" />
                        Back to Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default OrderSuccess;
