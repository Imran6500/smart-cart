const authService = require("../services/authService");
const sendResponse = require("../utils/response");

const register = async (req, res, next) => {
    try {
        const user = await authService.registerUser(req.body);

        return sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User registered successfully",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const result = await authService.loginUser(req.body);

        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Login successful",
            data: result
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login
};