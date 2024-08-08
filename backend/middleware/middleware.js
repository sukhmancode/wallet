require("dotenv").config
const JWT_SECRET  = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log("Auth Header:", authHeader);
    console.log("JWT_SECRET:", JWT_SECRET);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: "Forbidden: No token provided" });
    }
    
    const token = authHeader.split(' ')[1];
    console.log("Token:", token);

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Decoded:", decoded);

        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        } else {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
    } catch (err) {
        console.error("Token verification failed:", err);
        return res.status(401).json({ message: "Unauthorized: Token verification failed" });
    }
};

module.exports = { authMiddleware };
