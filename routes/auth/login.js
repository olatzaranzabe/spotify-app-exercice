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
        console.log(userEmail);
        if (!userEmail) {
            res.status(404).json({
                message: "no se ha encontrado ningún usuario"
            });
        }

        const passwordBD = userEmail.password;
        console.log(userEmail.password);
        const hashPass = await bcrypt.compareSync(password, passwordBD);
        console.log(hashPass);
        if (!hashPass)
            return Response.render("login", {
                error: "la contraseña no es correcta"
            });

        try {
            response.render("/login/view");
            const token = jwt.sign(
                JSON.stringify(payload),
                process.env.JWT_SECRET
            );
            console.log(process.env.JWT_SECRET);
            return res.status(200).render("login", { token });
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
