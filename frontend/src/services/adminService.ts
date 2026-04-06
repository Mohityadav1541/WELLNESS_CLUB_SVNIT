import api from '../utils/api';

export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

export interface Log {
    _id: string;
    action: string;
    user?: User;
    details: string;
    ip: string;
    createdAt: string;
}

export interface Analytics {
    totalUsers: number;
    totalEvents: number;
    totalRegistrations: number;
    newUsers: number;
}

export const adminService = {
    getUsers: async () => {
        const response = await api.get('/admin/users');
        return response.data.data;
    },

    createUser: async (userData: any) => {
        const response = await api.post('/admin/users', userData);
        return response.data.data;
    },

    deleteUser: async (id: string) => {
        const response = await api.delete(`/admin/users/${id}`);
        return response.data;
    },

    getLogs: async () => {
        const response = await api.get('/admin/logs');
        return response.data.data;
    },

    getAnalytics: async () => {
        const response = await api.get('/admin/analytics');
        return response.data.data;
    }
};

export const getAllUsers = adminService.getUsers;
