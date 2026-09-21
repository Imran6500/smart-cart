const express = require("express");
const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Profile accessed successfully",
        data: {
            user: req.user
        },
        meta: null
    });
});

router.get(
    "/admin-test",
    authMiddleware,
    authorize("admin"),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Admin access granted",
            data: {
                user: req.user
            },
            meta: null
        });
    }
);

module.exports = router;