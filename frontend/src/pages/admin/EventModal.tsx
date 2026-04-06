import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';

const eventSchema = z.object({
    title: z.string().min(3, 'Title is required'),
    date: z.string().min(1, 'Date is required'),
    time: z.string().min(1, 'Time is required'),
    location: z.string().min(1, 'Location is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    status: z.enum(['upcoming', 'ongoing', 'closed']),
    image: z.any().optional(), // File object or URL string
});

type EventFormValues = z.infer<typeof eventSchema>;

interface EventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: EventFormValues) => void;
    initialData?: any;
    isEditing?: boolean;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onSubmit, initialData, isEditing }) => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<EventFormValues>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: '',
            date: '',
            time: '',
            location: '',
            description: '',
            status: 'upcoming',
            image: ''
        }
    });

    useEffect(() => {
        if (initialData) {
            setValue('title', initialData.title);
            setValue('date', initialData.date);
            setValue('time', initialData.time);
            setValue('location', initialData.location);
            setValue('description', initialData.description);
            setValue('status', initialData.status);
            setValue('image', initialData.images?.[0] || '');
        } else {
            reset({
                title: '',
                date: '',
                time: '',
                location: '',
                description: '',
                status: 'upcoming',
                image: ''
            });
        }
    }, [initialData, setValue, reset]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">
                        {isEditing ? 'Edit Event' : 'Create New Event'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Event Title</label>
                            <input
                                {...register('title')}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                {...register('date')}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.date && <p className="text-xs text-red-500">{errors.date.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Time</label>
                            <input
                                {...register('time')}
                                placeholder="e.g. 10:00 AM - 12:00 PM"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.time && <p className="text-xs text-red-500">{errors.time.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Location</label>
                            <input
                                {...register('location')}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.location && <p className="text-xs text-red-500">{errors.location.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            {...register('description')}
                            rows={4}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Status</label>
                            <select
                                {...register('status')}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="upcoming">Upcoming</option>
                                <option value="ongoing">Ongoing</option>
                                <option value="closed">Closed</option>
                            </select>
                            {errors.status && <p className="text-xs text-red-500">{errors.status.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Event Banner</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setValue('image', e.target.files[0]);
                                    }
                                }}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.image && <p className="text-xs text-red-500">{errors.image.message as string}</p>}
                            <p className="text-xs text-gray-500">Upload an image (Max 5MB)</p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                            {isEditing ? 'Save Changes' : 'Create Event'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventModal;
