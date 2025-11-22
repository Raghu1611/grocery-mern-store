import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Leaf } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center bg-gradient-to-r from-green-50 to-blue-50 overflow-hidden">
                <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-dark mb-6 leading-tight">
                            Fresh Groceries <br />
                            <span className="text-primary">Delivered Fast</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-lg">
                            Get farm-fresh produce and daily essentials delivered right to your doorstep. Quality you can trust.
                        </p>
                        <Link to="/products" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg">
                            Shop Now <ArrowRight size={20} />
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="md:w-1/2 mt-12 md:mt-0 relative"
                    >
                        {/* Placeholder for a hero image - using a generated-like composition with CSS/SVG or just a nice emoji composition for now if no image asset */}
                        <div className="relative w-full h-[400px] bg-white/30 backdrop-blur-sm rounded-3xl p-8 flex items-center justify-center">
                            <span className="text-[200px]">🥗</span>
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                                className="absolute top-0 right-0 text-8xl"
                            >
                                🍎
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, 20, 0] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                                className="absolute bottom-0 left-0 text-8xl"
                            >
                                🥑
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-green-100/50 to-transparent skew-x-12"></div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <FeatureCard
                            icon={<Leaf size={40} className="text-primary" />}
                            title="100% Organic"
                            description="We source our produce directly from local organic farms."
                        />
                        <FeatureCard
                            icon={<Truck size={40} className="text-primary" />}
                            title="Fast Delivery"
                            description="Same-day delivery for orders placed before 2 PM."
                        />
                        <FeatureCard
                            icon={<ShieldCheck size={40} className="text-primary" />}
                            title="Quality Guarantee"
                            description="Not satisfied? We'll refund your money, no questions asked."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-xl transition-all border border-gray-100"
    >
        <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-4 text-dark">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </motion.div>
);

export default Home;
