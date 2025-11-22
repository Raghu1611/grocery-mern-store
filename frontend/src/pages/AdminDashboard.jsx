import { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, DollarSign, ShoppingBag, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('http://localhost:5000/api/admin/dashboard', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStats(data);
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Revenue</p>
                                <p className="text-2xl font-bold text-green-600">${stats?.total Revenue || 0}</p>
                            </div>
                            <DollarSign className="w-12 h-12 text-green-600 bg-green-100 rounded-full p-2" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Orders</p>
                                <p className="text-2xl font-bold text-blue-600">{stats?.totalOrders || 0}</p>
                            </div>
                            <ShoppingBag className="w-12 h-12 text-blue-600 bg-blue-100 rounded-full p-2" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Products</p>
                                <p className="text-2xl font-bold text-purple-600">{stats?.totalProducts || 0}</p>
                            </div>
                            <Package className="w-12 h-12 text-purple-600 bg-purple-100 rounded-full p-2" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Users</p>
                                <p className="text-2xl font-bold text-orange-600">{stats?.totalUsers || 0}</p>
                            </div>
                            <Users className="w-12 h-12 text-orange-600 bg-orange-100 rounded-full p-2" />
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                        <button
                            onClick={() => navigate('/admin/orders')}
                            className="text-green-600 hover:text-green-700 font-semibold"
                        >
                            View All
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4">Order ID</th>
                                    <th className="text-left py-3 px-4">Customer</th>
                                    <th className="text-left py-3 px-4">Amount</th>
                                    <th className="text-left py-3 px-4">Status</th>
                                    <th className="text-left py-3 px-4">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats?.recentOrders?.slice(0, 5).map((order) => (
                                    <tr key={order._id} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4 font-mono text-sm">{order._id.slice(-6)}</td>
                                        <td className="py-3 px-4">{order.user?.name || 'N/A'}</td>
                                        <td className="py-3 px-4 font-semibold">${order.totalAmount}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                                    order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-600">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                )) || (
                                        <tr>
                                            <td colSpan="5" className="text-center py-8 text-gray-500">
                                                No recent orders
                                            </td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Low Stock Products */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <AlertTriangle className="w-6 h-6 text-orange-600" />
                        <h2 className="text-xl font-bold text-gray-900">Low Stock Alert</h2>
                    </div>
                    <div className="space-y-4">
                        {stats?.lowStockProducts?.length > 0 ? (
                            stats.lowStockProducts.map((product) => (
                                <div key={product._id} className="flex justify-between items-center border-b pb-3">
                                    <div>
                                        <p className="font-semibold">{product.name}</p>
                                        <p className="text-sm text-gray-600">{product.category?.name}</p>
                                    </div>
                                    <span className="text-red-600 font-bold">
                                        {product.stock} left
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-4">All products have sufficient stock</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
