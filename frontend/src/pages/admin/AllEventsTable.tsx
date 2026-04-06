import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventService } from '../../services/eventService';
import { toast } from 'sonner';
import { Trash2, Calendar, MapPin, Plus, Edit, Download, Users } from 'lucide-react';
import EventModal from './EventModal';
import * as XLSX from 'xlsx';

const AllEventsTable: React.FC = () => {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<any>(null);

    const { data: events, isLoading } = useQuery({
        queryKey: ['events'],
        queryFn: eventService.getEvents
    });

    const createMutation = useMutation({
        mutationFn: eventService.createEvent,
        onSuccess: () => {
            toast.success('Event created successfully');
            queryClient.invalidateQueries({ queryKey: ['events'] });
            setIsModalOpen(false);
        },
        onError: () => toast.error('Failed to create event')
    });

    const updateMutation = useMutation({
        mutationFn: eventService.updateEvent,
        onSuccess: () => {
            toast.success('Event updated successfully');
            queryClient.invalidateQueries({ queryKey: ['events'] });
            setIsModalOpen(false);
            setEditingEvent(null);
        },
        onError: () => toast.error('Failed to update event')
    });

    const deleteMutation = useMutation({
        mutationFn: eventService.deleteEvent,
        onSuccess: () => {
            toast.success('Event deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['events'] });
        },
        onError: () => toast.error('Failed to delete event')
    });

    const handleDelete = (id: string, title: string) => {
        if (window.confirm(`Are you sure you want to delete event "${title}"?`)) {
            deleteMutation.mutate(id);
        }
    };

    const handleEdit = (event: any) => {
        setEditingEvent(event);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setEditingEvent(null);
        setIsModalOpen(true);
    };

    const handleSubmit = (data: any) => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        // For image, if it's a URL we might need to handle it differently backend side
        // But simplified we just send the fields
        // Backend expects FormData if using multer, but our api might handle json too
        // Let's stick to the service implementation which uses FormData
        // If 'image' is a string URL, we might need to adjust backend to accept it or just ignore if it's not a file

        if (editingEvent) {
            // For update, we need to restructure how we call the mutation
            // The service expects { id, data }
            updateMutation.mutate({ id: editingEvent._id, data: data });
        } else {
            // For create, service expects just data
            // NOTE: Backend expects 'images' array, but our simple form uses 'image' string
            // We might need to adapt the data here
            const apiData = { ...data, images: [data.image] };
            createMutation.mutate(apiData);
        }
    };

    const handleExportRegistrations = async (eventId: string, eventTitle: string) => {
        try {
            toast.info(`Fetching registrations for ${eventTitle}...`);
            const registrations = await eventService.getEventRegistrations(eventId);

            if (!registrations || registrations.length === 0) {
                toast.warning('No registrations found for this event.');
                return;
            }

            // Prepare data for Excel
            const excelData = registrations.map((reg: any) => ({
                'Name': reg.user?.name || 'N/A',
                'Email': reg.user?.email || 'N/A',
                'Admission No': reg.admissionNumber || 'N/A',
                'Phone': reg.whatsappNumber || 'N/A',
                'Transaction ID': reg.transactionId || 'N/A',
                'Status': reg.status,
                'Registered At': new Date(reg.createdAt).toLocaleString()
            }));

            // Create Worksheet
            const ws = XLSX.utils.json_to_sheet(excelData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Registrations");

            // Save File
            XLSX.writeFile(wb, `${eventTitle.replace(/[^a-z0-9]/gi, '_')}_Registrations.xlsx`);
            toast.success('Excel file downloaded!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to export registrations');
        }
    };

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading Events...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">All Events</h3>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
                >
                    <Plus className="w-4 h-4" />
                    Create Event
                </button>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {events?.map((event: any) => (
                            <tr key={event._id || event.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{event.title}</div>
                                    <div className="text-xs text-gray-500 truncate max-w-xs">{event._id}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 flex items-center gap-1">
                                        <Calendar className="w-3 h-3" /> {event.date}
                                    </div>
                                    <div className="text-sm text-gray-500 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" /> {event.location}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${event.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                                            event.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}>
                                        {event.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => handleExportRegistrations(event._id, event.title)}
                                            className="text-green-600 hover:text-green-900 bg-green-50 p-2 rounded hover:bg-green-100 transition"
                                            title="Export Registrations to Excel"
                                        >
                                            <Download className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleEdit(event)}
                                            className="text-blue-600 hover:text-blue-900 bg-blue-50 p-2 rounded hover:bg-blue-100 transition"
                                            title="Edit Event"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(event._id || event.id, event.title)}
                                            className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded hover:bg-red-100 transition"
                                            title="Delete Event"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <EventModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={editingEvent}
                isEditing={!!editingEvent}
            />
        </div>
    );
};

export default AllEventsTable;
