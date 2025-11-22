import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileForm, setProfileForm] = useState({ name: '', phone: '' });
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [addressForm, setAddressForm] = useState({
        fullName: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
        isDefault: false
    });

    useEffect(() => {
        fetchProfile();
        fetchAddresses();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('http://localhost:5000/api/user/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(data);
            setProfileForm({ name: data.name, phone: data.phone || '' });
        } catch (error) {
            toast.error('Error fetching profile');
        }
    };

    const fetchAddresses = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('http://localhost:5000/api/user/addresses', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAddresses(data);
        } catch (error) {
            console.error('Error fetching addresses');
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5000/api/user/profile', profileForm, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Profile updated successfully');
            setIsEditingProfile(false);
            fetchProfile();
        } catch (error) {
            toast.error('Error updating profile');
        }
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/user/addresses', addressForm, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Address added successfully');
            setShowAddressForm(false);
            setAddressForm({
                fullName: '',
                phone: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                pincode: '',
                isDefault: false
            });
            fetchAddresses();
        } catch (error) {
            toast.error('Error adding address');
        }
    };

    const handleDeleteAddress = async (addressId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/user/addresses/${addressId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Address deleted successfully');
            fetchAddresses();
        } catch (error) {
            toast.error('Error deleting address');
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Profile Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center gap-3 mb-6">
                        <User className="w-6 h-6 text-green-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                    </div>

                    {!isEditingProfile ? (
                        <div>
                            <div className="space-y-3 mb-4">
                                <div>
                                    <span className="text-gray-600">Name:</span>
                                    <span className="ml-2 font-semibold">{user.name}</span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Email:</span>
                                    <span className="ml-2 font-semibold">{user.email}</span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Phone:</span>
                                    <span className="ml-2 font-semibold">{user.phone || 'Not provided'}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditingProfile(true)}
                                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                            >
                                <Edit className="w-4 h-4" />
                                Edit Profile
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={profileForm.name}
                                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Phone</label>
                                <input
                                    type="tel"
                                    value={profileForm.phone}
                                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditingProfile(false)}
                                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Addresses Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <MapPin className="w-6 h-6 text-green-600" />
                            <h2 className="text-2xl font-bold text-gray-900">Delivery Addresses</h2>
                        </div>
                        <button
                            onClick={() => setShowAddressForm(!showAddressForm)}
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                        >
                            <Plus className="w-4 h-4" />
                            Add Address
                        </button>
                    </div>

                    {showAddressForm && (
                        <form onSubmit={handleAddAddress} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 border rounded-lg">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={addressForm.fullName}
                                onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Phone"
                                value={addressForm.phone}
                                onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Address Line 1"
                                value={addressForm.addressLine1}
                                onChange={(e) => setAddressForm({ ...addressForm, addressLine1: e.target.value })}
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 md:col-span-2"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Address Line 2"
                                value={addressForm.addressLine2}
                                onChange={(e) => setAddressForm({ ...addressForm, addressLine2: e.target.value })}
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 md:col-span-2"
                            />
                            <input
                                type="text"
                                placeholder="City"
                                value={addressForm.city}
                                onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="State"
                                value={addressForm.state}
                                onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Pincode"
                                value={addressForm.pincode}
                                onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={addressForm.isDefault}
                                    onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                                    className="text-green-600 focus:ring-green-500"
                                />
                                <span>Set as default address</span>
                            </label>
                            <div className="md:col-span-2 flex gap-2">
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                                >
                                    Save Address
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowAddressForm(false)}
                                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="space-y-4">
                        {addresses.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">No addresses saved</p>
                        ) : (
                            addresses.map((address) => (
                                <div key={address._id} className="border rounded-lg p-4 relative">
                                    {address.isDefault && (
                                        <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                                            Default
                                        </span>
                                    )}
                                    <h4 className="font-semibold text-gray-900">{address.fullName}</h4>
                                    <p className="text-gray-600">{address.phone}</p>
                                    <p className="text-gray-600">
                                        {address.addressLine1}, {address.addressLine2 && `${address.addressLine2}, `}
                                        {address.city}, {address.state} - {address.pincode}
                                    </p>
                                    <button
                                        onClick={() => handleDeleteAddress(address._id)}
                                        className="mt-2 flex items-center gap-1 text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
