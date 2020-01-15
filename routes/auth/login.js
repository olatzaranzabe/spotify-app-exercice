const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

router.get("/", (req, res) => {
    res.render("login");
});

router.post("/", async (req, res) => {
    const { email, password } = req.body;
    console.log(email);

    try {
        const userEmail = await User.findOne({ email });

        if (!userEmail)
            return res
                .status(404)
                .json({ message: "no se ha encontrado ningún usuario" });
        const passwordBD = userEmail.password;
        console.log(userEmail.password);
        const hashPass = await bcrypt.compareSync(password, passwordBD);

        if (!hashPass)
            return Response.render("login", {
                error: "la contraseña no es correcta"
            });

        try {
            response.render("/login/view");
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Hubo un error" });
    }
});

module.exports = router;
