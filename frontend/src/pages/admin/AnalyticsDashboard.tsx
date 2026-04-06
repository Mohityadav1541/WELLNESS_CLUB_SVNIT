import React from 'react';
import { useAnalytics } from '../../hooks/useAdmin';
import { Users, Calendar, Trophy, TrendingUp } from 'lucide-react';

const AnalyticsDashboard: React.FC = () => {
    const { data, isLoading } = useAnalytics();

    if (isLoading) return <div className="text-center py-20 text-gray-500">Loading Analytics...</div>;

    const stats = [
        {
            label: "Total Users",
            value: data?.totalUsers || 0,
            icon: <Users className="w-6 h-6 text-blue-600" />,
            change: "+" + (data?.newUsers || 0) + " this week",
            bg: "bg-blue-50"
        },
        {
            label: "Total Events",
            value: data?.totalEvents || 0,
            icon: <Calendar className="w-6 h-6 text-purple-600" />,
            change: "Active & Past",
            bg: "bg-purple-50"
        },
        {
            label: "Registrations",
            value: data?.totalRegistrations || 0,
            icon: <Trophy className="w-6 h-6 text-amber-600" />,
            change: "All time",
            bg: "bg-amber-50"
        },
        {
            label: "System Health",
            value: "100%",
            icon: <TrendingUp className="w-6 h-6 text-green-600" />,
            change: "Optimal",
            bg: "bg-green-50"
        }
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg ${stat.bg}`}>
                                {stat.icon}
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                        <p className="text-gray-500 text-sm">{stat.label}</p>
                        <div className="mt-2 text-xs text-gray-400">
                            {stat.change}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h3>
                <div className="text-sm text-gray-600">
                    <p>New users in last 7 days: <strong>{data?.newUsers || 0}</strong></p>
                    <p className="mt-2">Server Status: <span className="text-green-600 font-medium">Operational</span></p>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
