import React, { useState, useEffect } from 'react';
import {
    Search,
    FileText,
    CheckCircle,
    XCircle,
    MoreHorizontal,
    Download,
    Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge"; // You might need to check if this component exists, or use div
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import api from '@/utils/api';
import { Registration } from '@/types/registration';

const RegistrationManagement = () => {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    // Fetch Registrations
    const fetchRegistrations = async () => {
        setLoading(true);
        try {
            const res = await api.get('/registrations');
            setRegistrations(res.data.data);
        } catch (error) {
            console.error("Failed to fetch registrations:", error);
            toast.error("Failed to load registrations");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            await api.put(`/registrations/${id}`, { status: newStatus });
            toast.success(`Registration marked as ${newStatus}`);
            fetchRegistrations();
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleExport = () => {
        // Simple CSV export logic
        const headers = ["Event", "Student Name", "Email", "Admission No", "Status", "Date"];
        const csvContent = [
            headers.join(","),
            ...filteredRegistrations.map(r => [
                `"${r.eventTitle}"`,
                `"${r.name}"`,
                r.email,
                r.admissionNumber,
                r.status,
                new Date(r.registrationDate).toLocaleDateString()
            ].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "registrations_export.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Filter Logic
    const filteredRegistrations = registrations.filter(reg => {
        const matchesSearch =
            reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.eventTitle.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'All' || reg.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-700 hover:bg-green-100';
            case 'Rejected': return 'bg-red-100 text-red-700 hover:bg-red-100';
            default: return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Registration Management</h1>
                    <p className="text-gray-500">Manage student registrations for all events.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleExport} className="gap-2">
                        <Download className="w-4 h-4" />
                        Export CSV
                    </Button>
                    <Button onClick={fetchRegistrations} className="bg-amber-500 hover:bg-amber-600 text-black">
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search student, admission no, or event..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 bg-white"
                    />
                </div>
                <div className="w-full md:w-48">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Status</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Approved">Approved</SelectItem>
                            <SelectItem value="Rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500">Total Registrations</p>
                    <p className="text-2xl font-bold">{registrations.length}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500">Pending Approval</p>
                    <p className="text-2xl font-bold text-yellow-600">{registrations.filter(r => r.status === 'Pending').length}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500">Approved</p>
                    <p className="text-2xl font-bold text-green-600">{registrations.filter(r => r.status === 'Approved').length}</p>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50/50">
                            <TableHead>Event</TableHead>
                            <TableHead>Student Details</TableHead>
                            <TableHead>Admission No</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">Loading registrations...</TableCell>
                            </TableRow>
                        ) : filteredRegistrations.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-gray-500">No registrations found matching your filters.</TableCell>
                            </TableRow>
                        ) : (
                            filteredRegistrations.map((reg) => (
                                <TableRow key={reg._id} className="hover:bg-gray-50/50">
                                    <TableCell className="font-medium max-w-[200px] truncate" title={reg.eventTitle}>
                                        {reg.eventTitle}
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium text-sm">{reg.name}</p>
                                            <p className="text-xs text-gray-500">{reg.email}</p>
                                            <p className="text-xs text-gray-400">{reg.whatsapp}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>{reg.admissionNumber}</TableCell>
                                    <TableCell className="text-sm text-gray-500">
                                        {new Date(reg.registrationDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(reg.status)}`}>
                                            {reg.status}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleStatusUpdate(reg._id, 'Approved')} className="text-green-600">
                                                    <CheckCircle className="mr-2 h-4 w-4" /> Approve
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleStatusUpdate(reg._id, 'Rejected')} className="text-red-600">
                                                    <XCircle className="mr-2 h-4 w-4" /> Reject
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleStatusUpdate(reg._id, 'Pending')}>
                                                    Mark as Pending
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default RegistrationManagement;
