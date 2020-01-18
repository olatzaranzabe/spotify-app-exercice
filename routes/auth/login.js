const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
    res.render("login");
});

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userDB = await User.findOne({ email });
        if (!userDB) {
            return res.status(404).json({
                message: "no se ha encontrado ningún usuario"
            });
        }

        const passwordBD = userDB.password;

        const hashPass = await bcrypt.compareSync(password, passwordBD);

        if (!hashPass)
            return res
                .status(404)
                .json({ message: "la contraseña no es correcta" });

        try {
            const payload = {
                userID: userDB._id,
                exp: Date.now() + parseInt(process.env.JWT_EXPIRES)
            };
            const token = jwt.sign(
                JSON.stringify(payload),
                process.env.JWT_SECRET
            );
            console.log(token);
            return res.status(200).json({ token });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Hubo un error" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Hubo un error" });
    }
});

module.exports = router;
