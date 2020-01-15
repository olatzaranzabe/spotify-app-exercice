const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

router.post("/", async (req, res) => {
    const { name, lastname, username, email, password } = req.body;

    try {
        const user = await user.findOne({ email });
        if (email)
            return res.render("signup", { error: "email ya registrado" });
    } catch (error) {
        return res.render("signup", { message: "Hay un error" });
    }
    try {
        const hashPass = bcrypt.hashSync(password, 10);
        const user = new User({
            name,
            lastname,
            username,
            email,
            password: hashPass
        });
        await user.save();

        return res.status(200).json({
            message: `${user}, tu usuario ha sido creado correctamente`
        });
    } catch (error) {
        return res.render("signup", { error: "Hay un error" });
    }
});

module.exports = router;
