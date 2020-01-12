const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
    res.render("login");
});

router.post("/", async (req, res) => {
    const { email, password } = req.body;
});
