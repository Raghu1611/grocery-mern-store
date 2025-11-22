import { useEffect } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingCart, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const { wishlist, removeFromWishlist, fetchWishlist } = useWishlist();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        fetchWishlist();
    }, []);

    const handleMoveToCart = (product) => {
        addToCart(product);
        removeFromWishlist(product._id);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-3 mb-8">
                    <Heart className="w-8 h-8 text-red-500" />
                    <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
                </div>

                {wishlist.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-xl text-gray-600 mb-4">Your wishlist is empty</p>
                        <button
                            onClick={() => navigate('/products')}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                        >
                            Browse Products
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlist.map((product) => (
                            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img
                                    src={product.image || 'https://via.placeholder.com/300'}
                                    alt={product.name}
                                    className="w-full h-48 object-cover cursor-pointer"
                                    onClick={() => navigate(`/products/${product._id}`)}
                                />
                                <div className="p-4">
                                    <p className="text-sm text-green-600 font-semibold">
                                        {product.category?.name}
                                    </p>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-2xl font-bold text-green-600">
                                            ${product.price.toFixed(2)}
                                        </span>
                                        {product.discount > 0 && (
                                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                                                {product.discount}% OFF
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleMoveToCart(product)}
                                            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            Add to Cart
                                        </button>
                                        <button
                                            onClick={() => removeFromWishlist(product._id)}
                                            className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
