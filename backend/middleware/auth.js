const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }
};

exports.authorize = (...roles) => {
    return (req, res, next) => {
        console.log('Authorize Middleware - User Role:', req.user.role);
        console.log('Authorize Middleware - Allowed Roles:', roles);

        const userRole = req.user.role.toLowerCase().replace(' ', '');
        const allowedRoles = roles.map(role => role.toLowerCase().replace(' ', ''));

        console.log('Normalized User Role:', userRole);
        console.log('Normalized Allowed Roles:', allowedRoles);

        if (!allowedRoles.includes(userRole)) {
            console.log('Authorization Failed');
            return res.status(403).json({
                success: false,
                message: `User role ${req.user.role} is not authorized to access this route`
            });
        }
        next();
    };
};
