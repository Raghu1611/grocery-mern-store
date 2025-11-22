import { Facebook, Twitter, Instagram, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-12 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-primary">🥦</span> FreshCart
                        </h3>
                        <p className="text-gray-400">
                            Premium groceries delivered to your doorstep. Freshness guaranteed.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                            <li><a href="/products" className="hover:text-primary transition-colors">Products</a></li>
                            <li><a href="/cart" className="hover:text-primary transition-colors">Cart</a></li>
                            <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>123 Grocery Lane</li>
                            <li>Market City, MC 12345</li>
                            <li>support@freshcart.com</li>
                            <li>+1 (555) 123-4567</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Facebook size={24} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter size={24} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Instagram size={24} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Github size={24} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-8 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} FreshCart. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
