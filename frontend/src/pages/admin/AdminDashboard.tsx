import React from 'react';
import {
    Users,
    Calendar,
    CheckCircle,
    Clock,
    TrendingUp,
    Activity
} from 'lucide-react';

const StatCard = ({ title, value, icon, trend, color }: any) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-100`}>
                {icon}
            </div>
        </div>
        {trend && (
            <div className="mt-4 flex items-center text-sm">
                <span className="text-green-500 font-medium flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {trend}
                </span>
                <span className="text-gray-400 ml-2">vs last month</span>
            </div>
        )}
    </div>
);

const AdminDashboard = () => {
    // TODO: Fetch real stats from API
    const stats = [
        { title: 'Total Events', value: '12', icon: <Calendar className="w-6 h-6 text-blue-600" />, color: 'bg-blue-500', trend: '+2' },
        { title: 'Active Registrations', value: '1,240', icon: <CheckCircle className="w-6 h-6 text-green-600" />, color: 'bg-green-500', trend: '+12%' },
        { title: 'Total Users', value: '856', icon: <Users className="w-6 h-6 text-purple-600" />, color: 'bg-purple-500', trend: '+5%' },
        { title: 'Pending Approvals', value: '45', icon: <Clock className="w-6 h-6 text-amber-600" />, color: 'bg-amber-500', trend: '-10%' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 mt-2">Welcome back, here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Recent Activity & Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Area */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Registration Trends</h2>
                        <button className="text-sm text-gray-400 hover:text-gray-600">Last 7 Days</button>
                    </div>
                    <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                        <Activity className="w-8 h-8 mr-2" />
                        Chart Visualization Coming Soon
                    </div>
                </div>

                {/* Recent Activity Feed */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h2>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="flex items-start gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                    <Users className="w-4 h-4 text-gray-500" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-900 font-medium">New registration for <span className="text-amber-600">eSports event</span></p>
                                    <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
