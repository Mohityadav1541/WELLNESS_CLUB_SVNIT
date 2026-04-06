const Registration = require('../models/Registration');

// @desc    Register for an event
// @route   POST /api/registrations
// @access  Public
exports.registerForEvent = async (req, res) => {
    try {
        const { eventId, eventTitle, name, email, admissionNumber, whatsapp } = req.body;

        // Check if already registered
        const existingRegistration = await Registration.findOne({
            eventId,
            $or: [{ email }, { admissionNumber }]
        });

        if (existingRegistration) {
            return res.status(400).json({
                message: 'You have already registered for this event with this email or admission number.'
            });
        }

        const registration = await Registration.create({
            eventId,
            eventTitle,
            name,
            email,
            admissionNumber,
            whatsapp
        });

        res.status(201).json({
            success: true,
            message: 'Registration successful!',
            data: registration
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Duplicate registration detected.' });
        }
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
// @desc    Get all registrations (Admin)
// @route   GET /api/registrations
// @access  Private (Admin/Super Admin)
exports.getRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find().sort({ registrationDate: -1 });
        res.status(200).json({ success: true, count: registrations.length, data: registrations });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update registration status (Admin)
// @route   PUT /api/registrations/:id
// @access  Private (Admin/Super Admin)
exports.updateRegistrationStatus = async (req, res) => {
    try {
        const registration = await Registration.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!registration) {
            return res.status(404).json({ success: false, message: 'Registration not found' });
        }

        res.status(200).json({ success: true, data: registration });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete registration (Admin)
// @route   DELETE /api/registrations/:id
// @access  Private (Admin/Super Admin)
exports.deleteRegistration = async (req, res) => {
    try {
        const registration = await Registration.findByIdAndDelete(req.params.id);

        if (!registration) {
            return res.status(404).json({ success: false, message: 'Registration not found' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get my registrations
// @route   GET /api/registrations/my
// @access  Private
exports.getMyRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find({ email: req.user.email }).sort({ registrationDate: -1 });
        res.status(200).json({ success: true, count: registrations.length, data: registrations });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
