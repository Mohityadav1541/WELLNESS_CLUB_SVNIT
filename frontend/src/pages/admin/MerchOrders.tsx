import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus } from '../../services/merchService';
import { MerchOrder } from '../../types/merch';

const MerchOrders: React.FC = () => {
    const [orders, setOrders] = useState<MerchOrder[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await getAllOrders();
            if (response.success) {
                setOrders(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch orders', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            await updateOrderStatus(id, newStatus);
            fetchOrders();
        } catch (error) {
            console.error('Failed to update status', error);
            alert('Failed to update status');
        }
    };

    if (loading) return <div>Loading orders...</div>;

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-medium text-gray-900">Merchandise Orders</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-sm">
                        {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{order.user?.name || 'Unknown'}</div>
                                    <div className="text-xs text-gray-500">{order.user?.email}</div>
                                    <div className="text-xs text-gray-500">{order.user?.admissionNumber}</div>
                                </td>
                                <td className="px-6 py-4 text-gray-900">
                                    {order.merch?.name || 'Deleted Item'}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    Size: <span className="font-medium">{order.size}</span><br />
                                    Qty: {order.quantity}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    ₹{order.totalAmount}
                                </td>
                                <td className="px-6 py-4">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        className={`text-xs font-semibold rounded-full px-2 py-1 border-0 cursor-pointer focus:ring-2 focus:ring-offset-1
                                            ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 focus:ring-yellow-500' : ''}
                                            ${order.status === 'Paid' ? 'bg-green-100 text-green-800 focus:ring-green-500' : ''}
                                            ${order.status === 'Delivered' ? 'bg-blue-100 text-blue-800 focus:ring-blue-500' : ''}
                                            ${order.status === 'Cancelled' ? 'bg-red-100 text-red-800 focus:ring-red-500' : ''}
                                        `}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Paid">Paid</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MerchOrders;
