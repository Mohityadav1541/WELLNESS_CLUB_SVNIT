import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, ShoppingBag } from 'lucide-react';
import { getAllMerch, createMerch, updateMerch, deleteMerch } from '../../services/merchService';
import { MerchItem } from '../../types/merch';

const MerchManagement: React.FC = () => {
    const [merchItems, setMerchItems] = useState<MerchItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<MerchItem | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'T-Shirt',
        sizes: [] as string[],
        image: ''
    });

    useEffect(() => {
        fetchMerch();
    }, []);

    const fetchMerch = async () => {
        try {
            setLoading(true);
            const response = await getAllMerch();
            if (response.success) {
                setMerchItems(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch merch', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (item?: MerchItem) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                name: item.name,
                description: item.description,
                price: item.price.toString(),
                category: item.category,
                sizes: item.sizes,
                image: item.image
            });
        } else {
            setEditingItem(null);
            setFormData({
                name: '',
                description: '',
                price: '',
                category: 'T-Shirt',
                sizes: ['S', 'M', 'L', 'XL'],
                image: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const dataToSubmit = {
                ...formData,
                price: parseFloat(formData.price)
            };

            if (editingItem) {
                await updateMerch(editingItem._id, dataToSubmit);
            } else {
                await createMerch(dataToSubmit);
            }
            setIsModalOpen(false);
            fetchMerch();
        } catch (error) {
            console.error('Failed to save merch', error);
            alert('Failed to save merch item');
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await deleteMerch(id);
                fetchMerch();
            } catch (error) {
                console.error('Failed to delete merch', error);
            }
        }
    };

    const handleSizeChange = (size: string) => {
        setFormData(prev => {
            const newSizes = prev.sizes.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size];
            return { ...prev, sizes: newSizes };
        });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Merchandise Management</h2>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <Plus className="w-5 h-5" />
                    Add Product
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {merchItems.map(item => (
                    <div key={item._id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                        <img
                            src={item.image || 'https://via.placeholder.com/300?text=No+Image'}
                            alt={item.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-gray-500 text-sm mb-2">{item.category}</p>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xl font-bold text-blue-600">₹{item.price}</span>
                                <div className="flex gap-1">
                                    {item.sizes.map(size => (
                                        <span key={size} className="text-xs px-2 py-1 bg-gray-100 rounded">{size}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => handleOpenModal(item)}
                                    className="p-2 text-gray-500 hover:text-blue-600"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="p-2 text-gray-500 hover:text-red-600"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6">
                        <h3 className="text-xl font-semibold mb-4">{editingItem ? 'Edit Product' : 'Add New Product'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full border rounded-md p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full border rounded-md p-2"
                                    rows={3}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full border rounded-md p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full border rounded-md p-2"
                                    >
                                        <option>T-Shirt</option>
                                        <option>Hoodie</option>
                                        <option>Cap</option>
                                        <option>Accessory</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sizes</label>
                                <div className="flex gap-2 flex-wrap">
                                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() => handleSizeChange(size)}
                                            className={`px-3 py-1 rounded-full text-sm ${formData.sizes.includes(size) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full border rounded-md p-2"
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                >
                                    {editingItem ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MerchManagement;
