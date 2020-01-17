const passport = require("passport");

module.exports = {
    isAuthenticated: (req, res, next) => {
        passport.authenticate(
            "jwt",
            { session: false },
            (error, user, info) => {
                console.log(`info recibida ${info}`);

                if (error)
                    return res.status(500).json({ message: "Hay un error" });

                if (!user)
                    return res
                        .status(401)
                        .json({ message: "usuario no autorizado" });

                req.user = user;

                next();
            }
        )(req, res, next);
    }
};
