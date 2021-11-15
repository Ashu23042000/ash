const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");



router.post("/", async (req, res) => {
    const { name, email, level, profession, password, confirmPassword, } = req.body;
    if (password == confirmPassword) {
        const getUser = await userModel.findOne({ email });
        if (getUser) {
            res.status(201).send("Email already registered");
        }
        else {
            const hashpassword = await bcrypt.hash(password, 10);
            const user = new userModel({ name, email, password: hashpassword, level, profession, reportCount: 0 });
            await user.save();
            res.status(200).send("Signup Successful");

        }
    } else {
        res.status(202).send("Password not match");
    }
});

module.exports = router;