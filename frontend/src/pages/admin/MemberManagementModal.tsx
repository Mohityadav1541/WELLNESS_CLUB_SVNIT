import React, { useState, useEffect } from 'react';
import { X, Search, UserPlus, Trash2, Shield, User } from 'lucide-react';
import { Committee, CommitteeMember } from '../../types/committee';
import { getAllUsers } from '../../services/adminService';
import { addMember, removeMember, updateMemberRole } from '../../services/committeeService';

interface MemberManagementModalProps {
    isOpen: boolean;
    onClose: () => void;
    committee: Committee | null;
    onUpdate: () => void; // Trigger refresh of parent list
}

const MemberManagementModal: React.FC<MemberManagementModalProps> = ({
    isOpen,
    onClose,
    committee,
    onUpdate
}) => {
    const [activeTab, setActiveTab] = useState<'current' | 'search' | 'manual'>('current');
    const [users, setUsers] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState('Member');

    // Manual add form state
    const [manualExactData, setManualExactData] = useState({
        name: '',
        email: '',
        admissionNumber: '',
        whatsappNumber: ''
    });

    useEffect(() => {
        if (isOpen && activeTab === 'search') {
            fetchUsers();
        }
    }, [isOpen, activeTab]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await getAllUsers();
            if (response.success) {
                setUsers(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch users', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddMember = async (userId: string) => {
        if (!committee) return;
        try {
            await addMember(committee._id, userId, selectedRole);
            onUpdate();
            alert('Member added successfully');
        } catch (error: any) {
            alert(error.response?.data?.message || 'Failed to add member');
        }
    };

    const handleManualAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!committee) return;
        try {
            await import('../../services/committeeService').then(mod =>
                mod.addMemberWithDetails(committee._id, {
                    ...manualExactData,
                    role: selectedRole
                })
            );
            onUpdate();
            alert('Member added successfully');
            setManualExactData({ name: '', email: '', admissionNumber: '', whatsappNumber: '' });
            setActiveTab('current');
        } catch (error: any) {
            alert(error.response?.data?.message || 'Failed to add member');
        }
    };

    const handleRemoveMember = async (userId: string) => {
        if (!committee) return;
        if (!window.confirm('Are you sure you want to remove this member?')) return;
        try {
            await removeMember(committee._id, userId);
            onUpdate();
        } catch (error: any) {
            alert('Failed to remove member');
        }
    };

    const handleRoleChange = async (userId: string, newRole: string) => {
        if (!committee) return;
        try {
            await updateMemberRole(committee._id, userId, newRole);
            onUpdate();
        } catch (error) {
            alert('Failed to update role');
        }
    };

    const filteredUsers = users.filter(user =>
        !committee?.members.some(m => m.user._id === user._id) &&
        (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (!isOpen || !committee) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 h-[600px] flex flex-col">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">Manage Members</h3>
                        <p className="text-sm text-gray-500">{committee.name}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex border-b border-gray-200">
                    <button
                        className={`flex-1 py-3 text-sm font-medium text-center ${activeTab === 'current' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('current')}
                    >
                        Current ({committee.members.length})
                    </button>
                    <button
                        className={`flex-1 py-3 text-sm font-medium text-center ${activeTab === 'search' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('search')}
                    >
                        Search Existing
                    </button>
                    <button
                        className={`flex-1 py-3 text-sm font-medium text-center ${activeTab === 'manual' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('manual')}
                    >
                        Add Manually
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === 'current' && (
                        <div className="space-y-4">
                            {committee.members.length === 0 ? (
                                <p className="text-center text-gray-500 py-8">No members yet.</p>
                            ) : (
                                committee.members.map((member) => (
                                    <div key={member._id} className="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                    {member.user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{member.user.name}</p>
                                                    <p className="text-xs text-gray-500">{member.user.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <select
                                                    value={member.role}
                                                    onChange={(e) => handleRoleChange(member.user._id, e.target.value)}
                                                    className={`text-sm rounded border-gray-300 focus:ring-blue-500 focus:border-blue-500 px-2 py-1 ${member.role === 'Head' ? 'bg-purple-100 text-purple-800 font-bold' :
                                                        member.role === 'Co-Head' ? 'bg-indigo-100 text-indigo-800 font-semibold' :
                                                            'bg-gray-100 text-gray-800'
                                                        }`}
                                                >
                                                    <option value="Head">Head</option>
                                                    <option value="Co-Head">Co-Head</option>
                                                    <option value="Member">Member</option>
                                                </select>
                                                <button
                                                    onClick={() => handleRemoveMember(member.user._id)}
                                                    className="text-red-500 hover:text-red-700 p-1"
                                                    title="Remove Member"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                        {/* Additional Details */}
                                        <div className="text-xs text-gray-500 pl-14 grid grid-cols-2 gap-2 mt-1">
                                            <div>Admission: {member.user.admissionNumber || 'N/A'}</div>
                                            <div>WhatsApp: {member.user.whatsappNumber || 'N/A'}</div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {activeTab === 'search' && (
                        <div className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-sm font-medium text-gray-700">Assign Role:</span>
                                <select
                                    value={selectedRole}
                                    onChange={(e) => setSelectedRole(e.target.value)}
                                    className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
                                >
                                    <option value="Member">Member</option>
                                    <option value="Co-Head">Co-Head</option>
                                    <option value="Head">Head</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                {loading ? (
                                    <p className="text-center text-gray-500">Loading users...</p>
                                ) : filteredUsers.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 mb-2">No matching users found.</p>
                                        <button
                                            onClick={() => setActiveTab('manual')}
                                            className="text-blue-600 hover:underline text-sm"
                                        >
                                            Add manually instead?
                                        </button>
                                    </div>
                                ) : (
                                    filteredUsers.slice(0, 10).map((user) => (
                                        <div key={user._id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-200 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{user.name}</p>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleAddMember(user._id)}
                                                className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors text-sm font-medium"
                                            >
                                                <UserPlus className="w-4 h-4" />
                                                Add
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'manual' && (
                        <form onSubmit={handleManualAdd} className="space-y-4">
                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 mb-4">
                                This will add the user to the committee. If the email doesn't exist, a new user account will be created.
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                    value={manualExactData.name}
                                    onChange={e => setManualExactData({ ...manualExactData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                    value={manualExactData.email}
                                    onChange={e => setManualExactData({ ...manualExactData, email: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Admission Number</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                        value={manualExactData.admissionNumber}
                                        onChange={e => setManualExactData({ ...manualExactData, admissionNumber: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                        value={manualExactData.whatsappNumber}
                                        onChange={e => setManualExactData({ ...manualExactData, whatsappNumber: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <select
                                    value={selectedRole}
                                    onChange={(e) => setSelectedRole(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                >
                                    <option value="Member">Member</option>
                                    <option value="Co-Head">Co-Head</option>
                                    <option value="Head">Head</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Add Member
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MemberManagementModal;
