import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, LogOut, Mail, Hash, Phone, CheckCircle, XCircle, Clock } from 'lucide-react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

interface Registration {
    _id: string;
    eventTitle: string;
    status: string;
    registrationDate: string;
}

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyRegistrations = async () => {
            if (!user) return;
            try {
                const res = await api.get('/registrations/my');
                setRegistrations(res.data.data);
            } catch (error) {
                console.error("Failed to fetch registrations", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyRegistrations();
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) return <div className="p-10 text-center">Please log in.</div>;

    return (
        <div className="container mx-auto px-4 py-8 mt-16 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
                <User className="text-primary" /> My Profile
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border md:col-span-1 h-fit">
                    <div className="text-center mb-6">
                        <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-primary mb-3">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <h2 className="text-xl font-bold">{user.name}</h2>
                        <span className="text-sm text-gray-500 capitalize">{user.role}</span>
                    </div>

                    <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-primary" /> {user.email}
                        </div>
                        {user.admissionNumber && (
                            <div className="flex items-center gap-2">
                                <Hash className="w-4 h-4 text-primary" /> {user.admissionNumber}
                            </div>
                        )}
                        {user.whatsappNumber && (
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-primary" /> {user.whatsappNumber}
                            </div>
                        )}
                    </div>

                    <Button variant="destructive" className="w-full mt-6" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" /> Log Out
                    </Button>
                </div>

                {/* Registrations List */}
                <div className="bg-white p-6 rounded-xl shadow-sm border md:col-span-2">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" /> My Registrations
                    </h3>

                    {loading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : registrations.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 rounded-lg">
                            <p className="text-gray-500 mb-4">No event registrations found.</p>
                            <Button variant="outline" onClick={() => navigate('/programs')}>Browse Events</Button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {registrations.map(reg => (
                                <div key={reg._id} className="p-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50/50">
                                    <div className="mb-2 sm:mb-0">
                                        <p className="font-semibold">{reg.eventTitle}</p>
                                        <p className="text-xs text-gray-500">
                                            Registered: {new Date(reg.registrationDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        {reg.status === 'Approved' && <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Approved</Badge>}
                                        {reg.status === 'Rejected' && <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Rejected</Badge>}
                                        {reg.status === 'Pending' && <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Pending</Badge>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
