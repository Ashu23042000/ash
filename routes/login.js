const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");


router.post("/", async (req, res) => {

    const { email, password } = req.body;
    const getUser = await userModel.findOne({ email });
    if (getUser) {
        const comparePassword = await bcrypt.compare(password, getUser.password);
        if (comparePassword) {
            // req.session.user = getUser;
            res.status(200).send({ message: "Login Successful", user: getUser });
        } else {
            res.status(201).send("Password not match");
        }
    }
    else {
        res.status(202).send("Can't get user");
    }
});

module.exports = router;