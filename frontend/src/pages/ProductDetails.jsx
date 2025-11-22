import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { toast } from 'react-hot-toast';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchProduct();
        fetchReviews();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
            setProduct(data);
        } catch (error) {
            toast.error('Product not found');
            navigate('/products');
        } finally {
            setLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/products/${id}/reviews`);
            setReviews(data);
        } catch (error) {
            console.error('Error fetching reviews');
        }
    };

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        toast.success(`Added ${quantity} item(s) to cart`);
    };

    const handleWishlistToggle = () => {
        if (isInWishlist(product._id)) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product._id);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    if (!product) return null;

    const discountedPrice = product.discount
        ? product.price - (product.price * product.discount / 100)
        : product.price;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-8 p-8">
                        {/* Product Image */}
                        <div>
                            <div className="relative">
                                <img
                                    src={product.image || 'https://via.placeholder.com/400'}
                                    alt={product.name}
                                    className="w-full h-96 object-cover rounded-lg"
                                />
                                {product.discount > 0 && (
                                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-semibold">
                                        {product.discount}% OFF
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div>
                            <p className="text-sm text-green-600 font-semibold mb-2">
                                {product.category?.name || 'Category'}
                            </p>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.round(product.averageRating)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-600">
                                    ({product.reviewCount} reviews)
                                </span>
                            </div>

                            <p className="text-gray-700 mb-6">{product.description}</p>

                            {/* Price */}
                            <div className="mb-6">
                                {product.discount > 0 ? (
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl font-bold text-green-600">
                                            ${discountedPrice.toFixed(2)}
                                        </span>
                                        <span className="text-xl text-gray-400 line-through">
                                            ${product.price.toFixed(2)}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-3xl font-bold text-green-600">
                                        ${product.price.toFixed(2)}
                                    </span>
                                )}
                                <p className="text-gray-600 mt-1">per {product.unit}</p>
                            </div>

                            {/* Stock */}
                            <div className="mb-6">
                                {product.stock > 0 ? (
                                    <p className="text-green-600 font-semibold">
                                        In Stock ({product.stock} available)
                                    </p>
                                ) : (
                                    <p className="text-red-600 font-semibold">Out of Stock</p>
                                )}
                            </div>

                            {/* Quantity Selector */}
                            {product.stock > 0 && (
                                <div className="mb-6">
                                    <label className="block text-gray-700 mb-2">Quantity:</label>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                                        >
                                            -
                                        </button>
                                        <span className="text-xl font-semibold">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Add to Cart
                                </button>
                                <button
                                    onClick={handleWishlistToggle}
                                    className={`px-6 py-3 rounded-lg border-2 transition ${isInWishlist(product._id)
                                            ? 'bg-red-500 border-red-500 text-white'
                                            : 'border-gray-300 hover:border-red-500 text-gray-700'
                                        }`}
                                >
                                    <Heart className={`w-5 h-5 ${isInWishlist(product._id) ? 'fill-current' : ''}`} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="border-t p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
                        {reviews.length === 0 ? (
                            <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                        ) : (
                            <div className="space-y-4">
                                {reviews.map((review) => (
                                    <div key={review._id} className="border-b pb-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < review.rating
                                                                ? 'fill-yellow-400 text-yellow-400'
                                                                : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="font-semibold">{review.user?.name}</span>
                                            <span className="text-gray-500 text-sm">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-gray-700">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
