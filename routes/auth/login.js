const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

router.get("/", (req, res) => {
    res.render("login");
});

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userEmail = await User.findOne({ email });

        if (!userEmail)
            return res
                .status(404)
                .json({ message: "no se ha encontrado ningún usuario" });
        const passwordBD = userEmail.password;

        const comparePassword = await bcrypt.compareSync(password, passwordBD);

        if (!comparePassword)
            return Response.render("login", {
                error: "la contraseña no es correcta"
            });
    } catch (error) {}
});
