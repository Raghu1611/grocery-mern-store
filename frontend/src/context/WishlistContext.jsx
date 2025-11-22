import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const { user } = useAuth();

    // Fetch wishlist from backend when user logs in
    useEffect(() => {
        if (user) {
            fetchWishlist();
        } else {
            setWishlist([]);
        }
    }, [user]);

    const fetchWishlist = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('http://localhost:5000/api/user/wishlist', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWishlist(data);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    };

    const addToWishlist = async (productId) => {
        if (!user) {
            toast.error('Please login to add to wishlist');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `http://localhost:5000/api/user/wishlist/${productId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Added to wishlist');
            fetchWishlist();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add to wishlist');
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(
                `http://localhost:5000/api/user/wishlist/${productId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Removed from wishlist');
            fetchWishlist();
        } catch (error) {
            toast.error('Failed to remove from wishlist');
        }
    };

    const isInWishlist = (productId) => {
        return wishlist.some(item => item._id === productId);
    };

    return (
        <WishlistContext.Provider value={{
            wishlist,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            fetchWishlist,
        }}>
            {children}
        </WishlistContext.Provider>
    );
};
