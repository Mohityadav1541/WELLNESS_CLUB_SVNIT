import React from 'react';
import { useLogs } from '../../hooks/useAdmin';
import { RefreshCw } from 'lucide-react';

const SystemLogs: React.FC = () => {
    const { data: logs, isLoading, refetch } = useLogs();

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading System Logs...</div>;

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h3 className="text-lg font-medium text-gray-900">System Logs</h3>
                <button
                    onClick={() => refetch()}
                    className="p-2 text-gray-500 hover:text-gray-700 transition"
                    title="Refresh Logs"
                >
                    <RefreshCw className="w-4 h-4" />
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-sm">
                        {logs?.map((log: any) => (
                            <tr key={log._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                    {new Date(log.createdAt).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                    {log.action}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                    {log.user?.email || 'System'}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {log.details}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-mono text-xs">
                                    {log.ip}
                                </td>
                            </tr>
                        ))}
                        {logs?.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                                    No logs found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SystemLogs;
