const bcrypt = require("bcrypt");

const userRepository = require("../repositories/userRepository");
const AppError = require("../utils/AppError");

const {
    generateAccessToken,
    generateRefreshToken
} = require("../utils/jwt");

const registerUser = async ({ name, email, password }) => {
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
        throw new AppError("Email already registered", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await userRepository.create({
        name,
        email,
        password: hashedPassword
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };
};

const loginUser = async ({ email, password }) => {
    const user = await userRepository.findByEmailWithPassword(email);

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
    }

    if (!user.isActive) {
        throw new AppError("Account is inactive", 403);
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        accessToken,
        refreshToken
    };
};

module.exports = {
    registerUser,
    loginUser
};
