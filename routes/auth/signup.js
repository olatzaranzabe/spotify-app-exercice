const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await user.findOne({ email });
        if (email)
            return res.render("signup", { error: "email ya registrado" });
    } catch (error) {
        res.render("signup", { message: "Hay un error" });
    }
    try {
        const hashPass = bcrypt.hashSync(password, 10);

        const user = new User({ email, password: hashPas });
    } catch (error) {
        res.render("signup", { error: "Hay un error" });
    }
});
