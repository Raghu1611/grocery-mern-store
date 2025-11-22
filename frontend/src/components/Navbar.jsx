import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
                        <span className="text-3xl">🥦</span> FreshCart
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-primary transition-colors font-medium">Home</Link>
                        <Link to="/products" className="text-gray-600 hover:text-primary transition-colors font-medium">Products</Link>

                        {user ? (
                            <>
                                <div className="flex items-center gap-4">
                                    <Link to="/orders" className="text-gray-600 hover:text-primary transition-colors font-medium">My Orders</Link>
                                    <span className="text-gray-600">Hi, {user.name}</span>
                                    <button onClick={handleLogout} className="text-gray-600 hover:text-red-500 transition-colors" title="Logout">
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-gray-600 hover:text-primary transition-colors font-medium">Login</Link>
                                <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors font-medium">
                                    Register
                                </Link>
                            </div>
                        )}

                        <Link to="/cart" className="relative text-gray-600 hover:text-primary transition-colors">
                            <ShoppingCart size={24} />
                            {/* <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">0</span> */}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        <Link to="/" className="block py-2 text-gray-600 hover:text-primary" onClick={() => setIsOpen(false)}>Home</Link>
                        <Link to="/products" className="block py-2 text-gray-600 hover:text-primary" onClick={() => setIsOpen(false)}>Products</Link>
                        <Link to="/cart" className="block py-2 text-gray-600 hover:text-primary" onClick={() => setIsOpen(false)}>Cart</Link>
                        {user ? (
                            <>
                                <Link to="/orders" className="block py-2 text-gray-600 hover:text-primary" onClick={() => setIsOpen(false)}>My Orders</Link>
                                <div className="block py-2 text-gray-600">Hi, {user.name}</div>
                                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block w-full text-left py-2 text-red-500">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block py-2 text-gray-600 hover:text-primary" onClick={() => setIsOpen(false)}>Login</Link>
                                <Link to="/register" className="block py-2 text-primary font-medium" onClick={() => setIsOpen(false)}>Register</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
