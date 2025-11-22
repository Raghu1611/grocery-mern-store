import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

const WishlistButton = ({ productId }) => {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const inWishlist = isInWishlist(productId);

    const handleToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (inWishlist) {
            removeFromWishlist(productId);
        } else {
            addToWishlist(productId);
        }
    };

    return (
        <button
            onClick={handleToggle}
            className={`p-2 rounded-full transition-all ${inWishlist
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500'
                }`}
            title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
            <Heart
                className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`}
            />
        </button>
    );
};

export default WishlistButton;
