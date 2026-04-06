import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AnalyticsDashboard from './AnalyticsDashboard';
import AdminUsersTable from './AdminUsersTable';
import SystemLogs from './SystemLogs';
import AllEventsTable from './AllEventsTable';
import CommitteeManagement from './CommitteeManagement';
import MerchManagement from './MerchManagement';
import MerchOrders from './MerchOrders';
import { LayoutDashboard, Users, FileText, Calendar, ShoppingBag, ClipboardList } from 'lucide-react';

const SuperAdminDashboard: React.FC = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'analytics' | 'users' | 'logs' | 'events' | 'committees' | 'merch' | 'orders'>('analytics');

    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

    if (user?.role !== 'superadmin') {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
                    <p className="text-gray-600">You do not have permission to view this page.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex font-sans">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <h1 className="text-lg font-bold text-gray-800">Super Admin</h1>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <SidebarItem
                        icon={<LayoutDashboard className="w-5 h-5" />}
                        label="Analytics"
                        active={activeTab === 'analytics'}
                        onClick={() => setActiveTab('analytics')}
                    />
                    <SidebarItem
                        icon={<Users className="w-5 h-5" />}
                        label="User Management"
                        active={activeTab === 'users'}
                        onClick={() => setActiveTab('users')}
                    />
                    <SidebarItem
                        icon={<Calendar className="w-5 h-5" />}
                        label="All Events"
                        active={activeTab === 'events'}
                        onClick={() => setActiveTab('events')}
                    />
                    <SidebarItem
                        icon={<Users className="w-5 h-5" />}
                        label="Committee Management"
                        active={activeTab === 'committees'}
                        onClick={() => setActiveTab('committees')}
                    />
                    <SidebarItem
                        icon={<ShoppingBag className="w-5 h-5" />}
                        label="Merch Store"
                        active={activeTab === 'merch'}
                        onClick={() => setActiveTab('merch')}
                    />
                    <SidebarItem
                        icon={<ClipboardList className="w-5 h-5" />}
                        label="Merch Orders"
                        active={activeTab === 'orders'}
                        onClick={() => setActiveTab('orders')}
                    />
                    <SidebarItem
                        icon={<FileText className="w-5 h-5" />}
                        label="System Logs"
                        active={activeTab === 'logs'}
                        onClick={() => setActiveTab('logs')}
                    />
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            {user?.name.charAt(0)}
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                            <div className="text-xs text-gray-500 capitalize">{user?.role}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 md:px-8">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {activeTab === 'analytics' && 'Dashboard Overview'}
                        {activeTab === 'users' && 'User Management'}
                        {activeTab === 'events' && 'Event Management'}
                        {activeTab === 'committees' && 'Committee Management'}
                        {activeTab === 'merch' && 'Merch Management'}
                        {activeTab === 'orders' && 'Order Management'}
                        {activeTab === 'logs' && 'System Activity Logs'}
                    </h2>
                </header>

                <main className="flex-1 overflow-auto p-6 md:p-8">
                    {activeTab === 'analytics' && <AnalyticsDashboard />}
                    {activeTab === 'users' && <AdminUsersTable />}
                    {activeTab === 'events' && <AllEventsTable />}
                    {activeTab === 'committees' && <CommitteeManagement />}
                    {activeTab === 'merch' && <MerchManagement />}
                    {activeTab === 'orders' && <MerchOrders />}
                    {activeTab === 'logs' && <SystemLogs />}
                </main>
            </div>
        </div>
    );
};

const SidebarItem = ({ icon, label, active, onClick }: any) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${active
            ? 'bg-blue-50 text-blue-700'
            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
    >
        {icon}
        <span>{label}</span>
    </button>
);

export default SuperAdminDashboard;
