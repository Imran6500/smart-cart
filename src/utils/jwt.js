const jwt = require("jsonwebtoken");
const config = require("../config/env");

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            sub: user._id.toString(),
            role: user.role,
            type: "access"
        },
        config.jwtAccessSecret,
        {
            expiresIn: "15m"
        }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            sub: user._id.toString(),
            type: "refresh"
        },
        config.jwtRefreshSecret,
        {
            expiresIn: "7d"
        }
    );
};

module.exports = {
    generateAccessToken,
    generateRefreshToken
};