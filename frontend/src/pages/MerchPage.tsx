import React, { useState, useEffect } from 'react';
import { getAllMerch, createOrder } from '../services/merchService';
import { MerchItem } from '../types/merch';
import { ShoppingBag, X, Sparkles, Star } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import TiltedCard from '../components/TiltedCard';

const MerchPage: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const [merchItems, setMerchItems] = useState<MerchItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState<MerchItem | null>(null);
    const [orderForm, setOrderForm] = useState({
        size: '',
        quantity: 1
    });

    useEffect(() => {
        fetchMerch();
    }, []);

    const fetchMerch = async () => {
        try {
            setLoading(true);
            const response = await getAllMerch();
            if (response.success && response.data.length > 0) {
                setMerchItems(response.data);
            } else {
                // Default Placeholder Item if no data
                setMerchItems([
                    {
                        _id: 'default_1',
                        name: 'Wellness Club Signature Tee',
                        description: 'Premium cotton blend t-shirt featuring the minimalist Wellness Club logo. Breathable fabric perfect for workouts or casual wear.',
                        price: 399,
                        category: 'T-Shirt',
                        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                        colors: ['Black', 'Navy', 'White'],
                        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop',
                        isActive: true
                    },
                    {
                        _id: 'default_2',
                        name: 'Wellness Essential Hoodie',
                        description: 'Stay warm and stylish with our heavy-weight cotton fleece hoodie. Features a kangaroo pocket and embroidered club insignia.',
                        price: 899,
                        category: 'Hoodie',
                        sizes: ['S', 'M', 'L', 'XL'],
                        colors: ['Black', 'Grey'],
                        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop',
                        isActive: true
                    },
                    {
                        _id: 'default_3',
                        name: 'Wellness Team Cap',
                        description: 'Classic 6-panel baseball cap with adjustable strap. Embroidered 3D logo on the front. One size fits all.',
                        price: 249,
                        category: 'Accessories',
                        sizes: ['One Size'],
                        colors: ['Black', 'Blue'],
                        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop',
                        isActive: true
                    }
                ]);
            }
        } catch (error) {
            console.error('Failed to fetch merch', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBuyClick = (item: MerchItem) => {
        if (!isAuthenticated) {
            alert('Please login to place an order.');
            return;
        }
        setSelectedItem(item);
        setOrderForm({ size: item.sizes[0] || 'M', quantity: 1 });
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedItem) return;

        // If it's the default item, we can't actually order it via API if it's not in DB
        if (selectedItem._id === 'default_1') {
            alert('This is a demo item. Please ask Admin to add real products.');
            return;
        }

        try {
            await createOrder({
                merchId: selectedItem._id,
                size: orderForm.size,
                quantity: orderForm.quantity
            });
            alert('Order placed successfully! We will contact you for payment.');
            setSelectedItem(null);
        } catch (error) {
            console.error('Failed to place order', error);
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0518] text-white flex flex-col font-sans overflow-x-hidden relative">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-[#2a1b3d] to-transparent opacity-60" />
                <div className="absolute top-20 right-20 w-72 h-72 bg-purple-600 rounded-full blur-[100px] opacity-20 animate-pulse" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20" />
            </div>



            <div className="flex-grow pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
                {/* Hero Section */}
                <div className="text-center mb-16 relative">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-6">
                        <Sparkles className="w-4 h-4" />
                        <span>Official Merchandise</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ffecc7] via-[#e4bd5b] to-[#cba33e] mb-4 drop-shadow-sm font-serif">
                        WELLNESS CLUB
                    </h1>
                    <p className="text-xl md:text-2xl text-purple-200/80 max-w-2xl mx-auto italic">
                        "We Constitute Health"
                    </p>
                    <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#e4bd5b] to-transparent mx-auto mt-6" />
                </div>

                {loading ? (
                    <div className="text-center py-20 text-purple-300 animate-pulse">Summoning merchandise...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
                        {merchItems.map(item => (
                            <div key={item._id} className="group relative">
                                {/* Glow Effect */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-75 transition duration-500 blur-md"></div>

                                <div className="relative bg-[#1a1025] border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:transform hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
                                    <div className="h-80 relative overflow-hidden bg-[#150d20]">
                                        <TiltedCard
                                            imageSrc={item.image || 'https://via.placeholder.com/400?text=Merch'}
                                            altText={item.name}
                                            captionText={item.category}
                                            containerHeight="100%"
                                            containerWidth="100%"
                                            imageHeight="100%"
                                            imageWidth="100%"
                                            rotateAmplitude={10}
                                            scaleOnHover={1.1}
                                            showMobileWarning={false}
                                            showTooltip={false}
                                            displayOverlayContent={true}
                                            overlayContent={
                                                <div className="absolute top-4 right-4 z-20">
                                                    <span className="bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-semibold text-white tracking-wider">
                                                        {item.category.toUpperCase()}
                                                    </span>
                                                </div>
                                            }
                                        />
                                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#1a1025] to-transparent pointer-events-none z-10" />
                                    </div>

                                    <div className="p-6 relative z-20 flex-grow flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-2 font-serif tracking-wide">{item.name}</h3>
                                            <p className="text-purple-300/70 text-sm mb-6 line-clamp-2">{item.description}</p>
                                        </div>

                                        <div className="flex items-end justify-between mt-auto">
                                            <div>
                                                <p className="text-xs text-purple-400 mb-1">Price</p>
                                                <span className="text-3xl font-bold text-[#e4bd5b]">₹{item.price}</span>
                                            </div>
                                            <button
                                                onClick={() => handleBuyClick(item)}
                                                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2.5 rounded-xl hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all font-medium group/btn"
                                            >
                                                <ShoppingBag className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                                Get Yours
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Credits Section */}
                <div className="border-t border-white/10 pt-16 pb-8 text-center relative z-10">
                    <h2 className="text-2xl font-serif text-purple-200 mb-8 flex items-center justify-center gap-2">
                        Crafted with <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 animate-pulse" /> by
                    </h2>

                    <div className="max-w-sm mx-auto">
                        <TiltedCard
                            containerHeight="auto"
                            containerWidth="100%"
                            imageHeight="auto"
                            imageWidth="100%"
                            rotateAmplitude={12}
                            scaleOnHover={1.05}
                            showMobileWarning={false}
                            showTooltip={false}
                            displayOverlayContent={false}
                        >
                            <div className="bg-[#1a1e29]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden shadow-2xl group">
                                {/* Background glow */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                                <div className="relative z-10 flex flex-col items-center">
                                    {/* Profile Image */}
                                    <div className="relative w-32 h-32 mb-6">
                                        <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#2a3040] shadow-lg">
                                            <img
                                                src="/mohit_yadav.jpg"
                                                alt="Mohit Yadav"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        {/* Code Icon Badge */}
                                        <div className="absolute bottom-1 right-1 bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center border-4 border-[#1a1e29] shadow-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                <polyline points="16 18 22 12 16 6"></polyline>
                                                <polyline points="8 6 2 12 8 18"></polyline>
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Name & Role */}
                                    <h3 className="text-2xl font-bold text-[#fbbf24] mb-3">Mohit Yadav</h3>
                                    <span className="px-5 py-1.5 bg-[#dbeafe] text-[#1e40af] rounded-full text-sm font-bold mb-6">
                                        Full Stack Developer
                                    </span>

                                    {/* Bio */}
                                    <p className="text-gray-300 text-sm leading-relaxed mb-8 font-light">
                                        Full-stack developer responsible for the architecture and implementation of the Wellness Club platform
                                    </p>

                                    {/* Social Links */}
                                    <div className="flex gap-4">
                                        <a href="https://www.instagram.com/yadav__mohit_0?igsh=MWZwcWUxYXBpdjlsNA==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 hover:scale-110 transition-all text-gray-400 hover:text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                        </a>
                                        <a href="https://github.com/Mohityadav1541" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 hover:scale-110 transition-all text-gray-400 hover:text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                        </a>
                                        <a href="https://www.linkedin.com/in/mohit-yadav-3a8957310?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 hover:scale-110 transition-all text-gray-400 hover:text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </TiltedCard>
                    </div>

                    <p className="mt-12 text-xs text-gray-600">Made with 💜 for Wellness Club</p>
                </div>
            </div>

            {/* Order Modal */}
            {selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
                    <div className="bg-[#1a1025] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-purple-600/30 rounded-full blur-2xl pointer-events-none" />

                        <div className="p-6 border-b border-white/10 flex justify-between items-center relative z-10">
                            <h3 className="text-xl font-bold text-white font-serif tracking-wide">Secure Your Order</h3>
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="text-gray-400 hover:text-white transition bg-white/5 p-2 rounded-full hover:bg-white/10"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 relative z-10">
                            <div className="flex gap-4 mb-6 bg-white/5 p-3 rounded-lg border border-white/5">
                                <img
                                    src={selectedItem.image || 'https://via.placeholder.com/100'}
                                    alt={selectedItem.name}
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div>
                                    <h4 className="font-semibold text-white/90">{selectedItem.name}</h4>
                                    <p className="text-[#e4bd5b] font-bold mt-1">₹{selectedItem.price}</p>
                                </div>
                            </div>

                            <form onSubmit={handlePlaceOrder} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-purple-200/80 mb-2">Select Size</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {selectedItem.sizes.map(size => (
                                            <button
                                                key={size}
                                                type="button"
                                                onClick={() => setOrderForm({ ...orderForm, size })}
                                                className={`py-2 rounded-lg text-sm font-bold border transition-all ${orderForm.size === size
                                                    ? 'border-[#e4bd5b] bg-[#e4bd5b]/20 text-[#e4bd5b] shadow-[0_0_10px_rgba(228,189,91,0.2)]'
                                                    : 'border-white/10 text-gray-400 hover:border-white/30 hover:bg-white/5'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                    {!orderForm.size && <p className="text-red-400 text-xs mt-1">Please select a size</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-purple-200/80 mb-2">Quantity</label>
                                    <div className="flex items-center border border-white/10 rounded-lg w-32 bg-black/20">
                                        <button
                                            type="button"
                                            onClick={() => setOrderForm(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                                            className="px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 border-r border-white/10 transition"
                                        >-</button>
                                        <input
                                            type="number"
                                            min="1"
                                            value={orderForm.quantity}
                                            onChange={(e) => setOrderForm({ ...orderForm, quantity: parseInt(e.target.value) || 1 })}
                                            className="w-full text-center py-2 bg-transparent text-white focus:outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setOrderForm(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
                                            className="px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 border-l border-white/10 transition"
                                        >+</button>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                                    <div className="text-sm text-gray-400">Total</div>
                                    <div className="text-2xl font-bold text-[#e4bd5b]">₹{selectedItem.price * orderForm.quantity}</div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!orderForm.size}
                                    className="w-full mt-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3.5 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/40"
                                >
                                    Confirm Order
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MerchPage;
