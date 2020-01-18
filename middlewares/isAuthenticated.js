module.exports = (req, res, next) => {
    if (req.session.token) {
        next();
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
