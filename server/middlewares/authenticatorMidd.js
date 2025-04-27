import jwt from 'jsonwebtoken';

// Middleware to authenticate user and attach user data to req.user
export const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach decoded token data (like id, role) to request
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

// Middleware to authorize based on user role
export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'You are not allowed to access this route' });
        }
        next();
    };
};
