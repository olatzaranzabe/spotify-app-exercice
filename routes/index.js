const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});
module.exports = router;