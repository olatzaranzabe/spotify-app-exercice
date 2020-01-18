const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/authentication");

router.get("/", isAuthenticated, (req, res, next) => {
    console.log("autorizado");
    res.json({ message: "Autorizado" });
});
router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.use("/auth", require("./auth"));
module.exports = router;
