import { useState, useEffect } from 'react';
import axios from 'axios';
import { Star } from 'lucide-react';

const FilterSidebar = ({ onFilterChange, currentFilters }) => {
    const [categories, setCategories] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
    const [selectedCategory, setSelectedCategory] = useState(currentFilters.category || '');
    const [selectedRating, setSelectedRating] = useState(currentFilters.minRating || 0);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/categories');
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        onFilterChange({ ...currentFilters, category: categoryId });
    };

    const handlePriceChange = () => {
        onFilterChange({
            ...currentFilters,
            minPrice: priceRange.min,
            maxPrice: priceRange.max
        });
    };

    const handleRatingChange = (rating) => {
        setSelectedRating(rating);
        onFilterChange({ ...currentFilters, minRating: rating });
    };

    const handleClearFilters = () => {
        setSelectedCategory('');
        setSelectedRating(0);
        setPriceRange({ min: 0, max: 100 });
        onFilterChange({});
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
                <button
                    onClick={handleClearFilters}
                    className="text-sm text-green-600 hover:text-green-700"
                >
                    Clear All
                </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
                <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === ''}
                            onChange={() => handleCategoryChange('')}
                            className="mr-2 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-gray-700">All</span>
                    </label>
                    {categories.map((category) => (
                        <label key={category._id} className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="category"
                                checked={selectedCategory === category._id}
                                onChange={() => handleCategoryChange(category._id)}
                                className="mr-2 text-green-600 focus:ring-green-500"
                            />
                            <span className="text-gray-700">{category.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                            placeholder="Min"
                            className="w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <span>-</span>
                        <input
                            type="number"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                            placeholder="Max"
                            className="w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <button
                        onClick={handlePriceChange}
                        className="w-full py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                        Apply
                    </button>
                </div>
            </div>

            {/* Rating */}
            <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Rating</h4>
                <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                        <label key={rating} className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="rating"
                                checked={selectedRating === rating}
                                onChange={() => handleRatingChange(rating)}
                                className="mr-2 text-green-600 focus:ring-green-500"
                            />
                            <div className="flex items-center">
                                {[...Array(rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                                <span className="ml-2 text-gray-700">& up</span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
