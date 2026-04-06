import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventService, Event } from '../services/eventService';
import { toast } from 'sonner';

// Keys for React Query cache
export const EVENT_KEYS = {
    all: ['events'] as const,
    details: (id: string) => ['events', id] as const,
    myRegistrations: ['my-registrations'] as const,
};

// Hook to fetch all events
export const useEvents = () => {
    return useQuery({
        queryKey: EVENT_KEYS.all,
        queryFn: eventService.getEvents,
        staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    });
};

// Hook to fetch specific event
export const useEvent = (id: string) => {
    return useQuery({
        queryKey: EVENT_KEYS.details(id),
        queryFn: () => eventService.getEventById(id),
        enabled: !!id,
    });
};

// Hook to fetch my registrations
export const useMyRegistrations = () => {
    return useQuery({
        queryKey: EVENT_KEYS.myRegistrations,
        queryFn: eventService.getMyRegistrations,
    });
};

// Hook for event registration
export const useEventRegistration = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: eventService.registerForEvent,
        onSuccess: () => {
            toast.success('Registration successful!');
            // Invalidate queries to refresh data
            queryClient.invalidateQueries({ queryKey: EVENT_KEYS.myRegistrations });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Registration failed');
        },
    });
};
