import { useState, useEffect } from 'react';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                // Mock data if backend fails or is empty
                setProducts([
                    { _id: '1', name: 'Fresh Apples', price: 2.99, image: '🍎', category: 'Fruits', description: 'Crisp and sweet red apples.' },
                    { _id: '2', name: 'Organic Bananas', price: 1.49, image: '🍌', category: 'Fruits', description: 'Rich in potassium.' },
                    { _id: '3', name: 'Whole Milk', price: 3.50, image: '🥛', category: 'Dairy', description: 'Farm fresh whole milk.' },
                    { _id: '4', name: 'Sourdough Bread', price: 4.99, image: '🍞', category: 'Bakery', description: 'Freshly baked sourdough.' },
                    { _id: '5', name: 'Avocados', price: 1.99, image: '🥑', category: 'Vegetables', description: 'Creamy ripe avocados.' },
                    { _id: '6', name: 'Eggs (Dozen)', price: 5.99, image: '🥚', category: 'Dairy', description: 'Free-range organic eggs.' },
                ]);
                // Only show error toast if it's not a 404 (which might mean just no products yet)
                if (error.response?.status !== 404) {
                    // toast.error('Using offline mode for products');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Our Products</h1>
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-shadow shadow-sm"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                            <div className="h-48 bg-gray-100 flex items-center justify-center text-6xl">
                                {product.image || '📦'}
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="text-xs text-primary font-semibold uppercase tracking-wide">{product.category}</p>
                                        <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                                    </div>
                                    <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                                </div>
                                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-primary transition-colors duration-300"
                                >
                                    <ShoppingCart size={18} />
                                    Add to Cart
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
