const jwt = require("jsonwebtoken");
const config = require("../config/env");
const AppError = require("../utils/AppError");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppError("Authentication required", 401);
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            config.jwtAccessSecret
        );

        if (decoded.type !== "access") {
            throw new AppError("Invalid access token", 401);
        }

        req.user = {
            id: decoded.sub,
            role: decoded.role
        };

        next();
    } catch (error) {
       if (error.name === "JsonWebTokenError") {
            return next(new AppError("Invalid access token", 401));
        }

        if (error.name === "TokenExpiredError") {
            return next(new AppError("Access token expired", 401));
        }

        next(error);
    }
};

module.exports = authMiddleware;