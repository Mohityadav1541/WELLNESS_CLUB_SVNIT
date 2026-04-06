import React, { useState, useEffect } from 'react';
import { Plus, Users, Edit, Trash2, Settings, FileSpreadsheet as FileIcon } from 'lucide-react';
import { getCommittees, createCommittee, updateCommittee, deleteCommittee } from '../../services/committeeService';
import { Committee } from '../../types/committee';
import CommitteeModal from './CommitteeModal';
import MemberManagementModal from './MemberManagementModal';

const CommitteeManagement: React.FC = () => {
    const [committees, setCommittees] = useState<Committee[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
    const [editingCommittee, setEditingCommittee] = useState<Committee | null>(null);
    const [managingMembersCommittee, setManagingMembersCommittee] = useState<Committee | null>(null);

    useEffect(() => {
        fetchCommittees();
    }, []);

    const fetchCommittees = async () => {
        try {
            setLoading(true);
            const response = await getCommittees();
            if (response.success) {
                setCommittees(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch committees', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingCommittee(null);
        setIsModalOpen(true);
    };

    const handleEdit = (committee: Committee) => {
        setEditingCommittee(committee);
        setIsModalOpen(true);
    };

    const handleManageMembers = (committee: Committee) => {
        setManagingMembersCommittee(committee);
        setIsMembersModalOpen(true);
    };

    const handleSubmit = async (data: { name: string; description: string }) => {
        try {
            if (editingCommittee) {
                await updateCommittee(editingCommittee._id, data);
            } else {
                await createCommittee(data);
            }
            fetchCommittees(); // Refresh list
        } catch (error: any) {
            console.error('Failed to save committee', error);
            const message = error.response?.data?.message || JSON.stringify(error.response?.data) || 'Failed to save committee';
            alert(`Error: ${message}`);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this committee?')) {
            try {
                await deleteCommittee(id);
                fetchCommittees();
            } catch (error) {
                console.error('Failed to delete committee', error);
            }
        }
    };

    const getHeads = (committee: Committee) => {
        return committee.members.filter(m => m.role === 'Head' || m.role === 'Co-Head');
    };

    if (loading) return <div className="text-center py-10">Loading committees...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Committee Management</h2>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    New Committee
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {committees.map((committee) => {
                    const heads = getHeads(committee);
                    return (
                        <div key={committee._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
                            <div className="p-6 flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">{committee.name}</h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(committee)}
                                            className="text-gray-400 hover:text-blue-600 transition-colors"
                                            title="Edit Details"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(committee._id)}
                                            className="text-gray-400 hover:text-red-600 transition-colors"
                                            title="Delete Committee"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{committee.description}</p>

                                <div className="space-y-3">
                                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Leadership</h4>
                                    {heads.length > 0 ? (
                                        <div className="space-y-2">
                                            {heads.map(head => (
                                                <div key={head._id} className="flex items-center gap-2 text-sm">
                                                    <div className={`w-2 h-2 rounded-full ${head.role === 'Head' ? 'bg-purple-500' : 'bg-indigo-500'}`}></div>
                                                    <span className="font-medium text-gray-900">{head.user.name}</span>
                                                    <span className="text-xs text-gray-500">({head.role})</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-400 italic">No leadership assigned</p>
                                    )}
                                </div>
                            </div>

                            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Users className="w-4 h-4" />
                                    <span>{committee.members.length} Members</span>
                                </div>
                                <button
                                    onClick={() => handleManageMembers(committee)}
                                    className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                                >
                                    <Settings className="w-4 h-4" />
                                    Manage Members
                                </button>
                                <button
                                    onClick={() => import('../../services/committeeService').then(mod => mod.exportCommittee(committee._id, committee.name))}
                                    className="text-green-600 hover:text-green-700 p-2"
                                    title="Export to Excel"
                                >
                                    <FileIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {committees.length === 0 && !loading && (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900">No committees found</h3>
                    <p className="text-gray-500 mb-4">Get started by creating your first committee.</p>
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Create Committee
                    </button>
                </div>
            )}

            <CommitteeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={editingCommittee}
            />

            <MemberManagementModal
                isOpen={isMembersModalOpen}
                onClose={() => setIsMembersModalOpen(false)}
                committee={managingMembersCommittee}
                onUpdate={() => {
                    fetchCommittees();
                    // Re-fetch the specific committee to update the modal data if needed, 
                    // but for now fetchCommittees relies on parent list update.
                    // A better approach for the modal might be to self-refresh or have the parent pass a refresh trigger.
                    // We will simply re-fetch the main list and let props update naturally if referencing the same object in array
                    // Wait, since we pass 'managingMembersCommittee' which is a state object, we might need to update that too.
                    // Let's rely on the parent updating the list and finding the updated committee to pass down?
                    // Easier: fetchCommittees updates the 'committees' array. We need to update 'managingMembersCommittee' as well.
                    getCommittees().then(res => {
                        if (res.success && managingMembersCommittee) {
                            const updated = res.data.find((c: Committee) => c._id === managingMembersCommittee._id);
                            if (updated) setManagingMembersCommittee(updated);
                        }
                    });
                }}
            />
        </div>
    );
};

export default CommitteeManagement;
