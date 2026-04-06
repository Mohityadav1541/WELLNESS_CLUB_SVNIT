import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '../services/adminService';
import { toast } from 'sonner';

export const ADMIN_KEYS = {
    users: ['admin', 'users'] as const,
    logs: ['admin', 'logs'] as const,
    analytics: ['admin', 'analytics'] as const,
};

export const useUsers = () => {
    return useQuery({
        queryKey: ADMIN_KEYS.users,
        queryFn: adminService.getUsers,
    });
};

export const useLogs = () => {
    return useQuery({
        queryKey: ADMIN_KEYS.logs,
        queryFn: adminService.getLogs,
        refetchInterval: 30000, // Refresh every 30s
    });
};

export const useAnalytics = () => {
    return useQuery({
        queryKey: ADMIN_KEYS.analytics,
        queryFn: adminService.getAnalytics,
    });
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: adminService.createUser,
        onSuccess: () => {
            toast.success('User created successfully');
            queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.users });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to create user');
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: adminService.deleteUser,
        onSuccess: () => {
            toast.success('User deleted successfully');
            queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.users });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to delete user');
        },
    });
};
