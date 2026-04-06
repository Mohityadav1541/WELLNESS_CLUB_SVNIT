const Committee = require('../models/Committee');
const User = require('../models/User');
const { logActivity } = require('../utils/logger');

// @desc    Get all committees
// @route   GET /api/committees
// @access  Public (or Protected depending on requirements, let's make it Protected for now as it shows member details)
exports.getCommittees = async (req, res) => {
    try {
        const committees = await Committee.find()
            .populate('members.user', 'name email role admissionNumber');

        res.status(200).json({
            success: true,
            count: committees.length,
            data: committees
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single committee
// @route   GET /api/committees/:id
// @access  Protected
exports.getCommittee = async (req, res) => {
    try {
        const committee = await Committee.findById(req.params.id)
            .populate('members.user', 'name email role admissionNumber');

        if (!committee) {
            return res.status(404).json({ success: false, message: `Committee not found with id of ${req.params.id}` });
        }

        res.status(200).json({ success: true, data: committee });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create new committee
// @route   POST /api/committees
// @access  Private (Admin/SuperAdmin)
exports.createCommittee = async (req, res) => {
    try {
        const committee = await Committee.create(req.body);

        await logActivity('CREATE_COMMITTEE', req.user._id, `Created committee: ${committee.name}`, req.ip);

        res.status(201).json({
            success: true,
            data: committee
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update committee details
// @route   PUT /api/committees/:id
// @access  Private (Admin/SuperAdmin)
exports.updateCommittee = async (req, res) => {
    try {
        const committee = await Committee.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!committee) {
            return res.status(404).json({ success: false, message: `Committee not found with id of ${req.params.id}` });
        }

        await logActivity('UPDATE_COMMITTEE', req.user._id, `Updated committee: ${committee.name}`, req.ip);

        res.status(200).json({ success: true, data: committee });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete committee
// @route   DELETE /api/committees/:id
// @access  Private (Admin/SuperAdmin)
exports.deleteCommittee = async (req, res) => {
    try {
        const committee = await Committee.findById(req.params.id);

        if (!committee) {
            return res.status(404).json({ success: false, message: `Committee not found with id of ${req.params.id}` });
        }

        await committee.deleteOne();

        await logActivity('DELETE_COMMITTEE', req.user._id, `Deleted committee: ${committee.name}`, req.ip);

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Add member to committee
// @route   POST /api/committees/:id/members
// @access  Private (Admin/SuperAdmin)
exports.addMember = async (req, res) => {
    try {
        const { userId, role } = req.body;

        const committee = await Committee.findById(req.params.id);
        if (!committee) {
            return res.status(404).json({ success: false, message: 'Committee not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if user is already a member
        const isMember = committee.members.some(member => member.user.toString() === userId);
        if (isMember) {
            return res.status(400).json({ success: false, message: 'User is already a member of this committee' });
        }

        committee.members.push({ user: userId, role: role || 'Member' });
        await committee.save();

        await logActivity('ADD_MEMBER', req.user._id, `Added member ${user.email} to ${committee.name}`, req.ip);

        const updatedCommittee = await Committee.findById(req.params.id)
            .populate('members.user', 'name email role admissionNumber');

        res.status(200).json({ success: true, data: updatedCommittee });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Remove member from committee
// @route   DELETE /api/committees/:id/members/:userId
// @access  Private (Admin/SuperAdmin)
exports.removeMember = async (req, res) => {
    try {
        const committee = await Committee.findById(req.params.id);

        if (!committee) {
            return res.status(404).json({ success: false, message: 'Committee not found' });
        }

        // Filter out the member
        committee.members = committee.members.filter(
            member => member.user.toString() !== req.params.userId
        );

        await committee.save();

        await logActivity('REMOVE_MEMBER', req.user._id, `Removed member from ${committee.name}`, req.ip);

        const updatedCommittee = await Committee.findById(req.params.id)
            .populate('members.user', 'name email role admissionNumber');

        res.status(200).json({ success: true, data: updatedCommittee });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update member role
// @route   PUT /api/committees/:id/members/:userId
// @access  Private (Admin/SuperAdmin)
exports.updateMemberRole = async (req, res) => {
    try {
        const { role } = req.body;
        const committee = await Committee.findById(req.params.id);

        if (!committee) {
            return res.status(404).json({ success: false, message: 'Committee not found' });
        }

        const memberIndex = committee.members.findIndex(
            member => member.user.toString() === req.params.userId
        );

        if (memberIndex === -1) {
            return res.status(404).json({ success: false, message: 'Member not found in committee' });
        }

        committee.members[memberIndex].role = role;
        await committee.save();

        await logActivity('UPDATE_MEMBER_ROLE', req.user._id, `Updated member role to ${role} in ${committee.name}`, req.ip);

        const updatedCommittee = await Committee.findById(req.params.id)
            .populate('members.user', 'name email role admissionNumber');

        res.status(200).json({ success: true, data: updatedCommittee });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Add member with details (Create user if not exists)
// @route   POST /api/committees/:id/members/details
// @access  Private (Admin/SuperAdmin)
exports.addMemberWithDetails = async (req, res) => {
    try {
        const { name, email, admissionNumber, whatsappNumber, role } = req.body;
        const committeeId = req.params.id;

        const committee = await Committee.findById(committeeId);
        if (!committee) {
            return res.status(404).json({ success: false, message: 'Committee not found' });
        }

        let user = await User.findOne({ email });

        if (!user) {
            // Create new user
            const password = Math.random().toString(36).slice(-8); // Generate random password
            user = await User.create({
                name,
                email,
                password,
                admissionNumber,
                whatsappNumber,
                role: 'student'
            });
        }

        // Check if user is already a member
        const isMember = committee.members.some(member => member.user.toString() === user._id.toString());
        if (isMember) {
            return res.status(400).json({ success: false, message: 'User is already a member of this committee' });
        }

        committee.members.push({ user: user._id, role: role || 'Member' });
        await committee.save();

        await logActivity('ADD_MEMBER_DETAILS', req.user._id, `Added member (manual) ${user.email} to ${committee.name}`, req.ip);

        const updatedCommittee = await Committee.findById(committeeId)
            .populate('members.user', 'name email role admissionNumber whatsappNumber');

        res.status(200).json({ success: true, data: updatedCommittee });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Export committee members to Excel
// @route   GET /api/committees/:id/export
// @access  Private (Admin/SuperAdmin)
exports.exportCommittee = async (req, res) => {
    try {
        const committee = await Committee.findById(req.params.id)
            .populate('members.user', 'name email admissionNumber whatsappNumber');

        if (!committee) {
            return res.status(404).json({ success: false, message: 'Committee not found' });
        }

        const ExcelJS = require('exceljs');
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Members');

        worksheet.columns = [
            { header: 'Name', key: 'name', width: 20 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Role', key: 'role', width: 15 },
            { header: 'Admission No', key: 'admissionNumber', width: 20 },
            { header: 'WhatsApp', key: 'whatsappNumber', width: 20 },
            { header: 'Joined At', key: 'joinedAt', width: 20 }
        ];

        // Sort members: Head > Co-Head > Member
        const rolePriority = { 'Head': 1, 'Co-Head': 2, 'Member': 3 };

        const sortedMembers = [...committee.members].sort((a, b) => {
            const priorityA = rolePriority[a.role] || 4;
            const priorityB = rolePriority[b.role] || 4;
            return priorityA - priorityB;
        });

        sortedMembers.forEach(member => {
            if (member.user) {
                worksheet.addRow({
                    name: member.user.name,
                    email: member.user.email,
                    role: member.role,
                    admissionNumber: member.user.admissionNumber || 'N/A',
                    whatsappNumber: member.user.whatsappNumber || 'N/A',
                    joinedAt: member.joinedAt.toDateString()
                });
            }
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${committee.name.replace(/\s+/g, '_')}_Members.xlsx`);

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
