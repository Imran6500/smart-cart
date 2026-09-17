const User = require("../models/userModel");

const findByEmail = async (email) => {
    return User.findOne({ email });
};

const findByEmailWithPassword = async (email) => {
    return User.findOne({ email }).select("+password");
};

const create = async (userData) => {
    return User.create(userData);
};

module.exports = {
    findByEmail,
    findByEmailWithPassword,
    create
};