import axios from 'axios';
import { MerchItem, MerchOrder } from '../types/merch';

const API_URL = 'http://localhost:5000/api/merch';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
};

// Public
export const getAllMerch = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getMerch = async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// Private (User)
export const createOrder = async (data: { merchId: string; size: string; quantity: number }) => {
    const response = await axios.post(`${API_URL}/order`, data, getAuthHeader());
    return response.data;
};

export const getMyOrders = async () => {
    const response = await axios.get(`${API_URL}/myorders`, getAuthHeader());
    return response.data;
};

// Admin
export const createMerch = async (data: any) => {
    const response = await axios.post(API_URL, data, getAuthHeader());
    return response.data;
};

export const updateMerch = async (id: string, data: any) => {
    const response = await axios.put(`${API_URL}/${id}`, data, getAuthHeader());
    return response.data;
};

export const deleteMerch = async (id: string) => {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
    return response.data;
};

export const getAllOrders = async () => {
    const response = await axios.get(`${API_URL}/orders/all`, getAuthHeader());
    return response.data;
};

export const updateOrderStatus = async (id: string, status: string) => {
    const response = await axios.put(`${API_URL}/orders/${id}`, { status }, getAuthHeader());
    return response.data;
};
