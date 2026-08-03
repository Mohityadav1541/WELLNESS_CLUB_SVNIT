import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    FileText,
    ShoppingBag,
    ClipboardList,
    Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const { logout, user } = useAuth();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const navItems = [
        { name: 'Overview', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
        { name: 'Events', path: '/admin/events', icon: <Calendar className="w-5 h-5" /> },
        { name: 'Registrations', path: '/admin/registrations', icon: <FileText className="w-5 h-5" /> },
        { name: 'Users', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
        { name: 'Committees', path: '/admin/committees', icon: <Shield className="w-5 h-5" /> },
        { name: 'Merch Store', path: '/admin/merch', icon: <ShoppingBag className="w-5 h-5" /> },
        { name: 'Merch Orders', path: '/admin/orders', icon: <ClipboardList className="w-5 h-5" /> },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0f1014] text-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="p-6 border-b border-white/10 flex items-center justify-between">
                        <Link to="/" className="text-2xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-purple-600">
                            WELLNESS<span className="text-white">ADMIN</span>
                        </Link>
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="p-6 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center font-bold text-lg">
                                {user?.name?.charAt(0) || 'A'}
                            </div>
                            <div>
                                <p className="font-bold text-white text-sm">{user?.name || 'Admin User'}</p>
                                <p className="text-xs text-gray-400">{user?.role || 'Super Admin'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                        ? 'bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/20'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-white/10">
                        <Button
                            onClick={logout}
                            variant="ghost"
                            className="w-full justify-start gap-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-600 border-none"
                        >
                            <LogOut className="w-5 h-5" />
                            Logout
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header (Mobile Only) */}
                <header className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                    <Link to="/" className="text-xl font-black italic tracking-tighter text-black">
                        WELLNESS<span className="text-amber-500">ADMIN</span>
                    </Link>
                    <button onClick={toggleSidebar} className="text-gray-600 hover:text-black">
                        <Menu className="w-6 h-6" />
                    </button>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-auto p-4 md:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
