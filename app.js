require("dotenv").config();
const Express = require("express");
const app = Express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/User");
const passport = require("passport");
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const DB_PORT = process.env.DB_PORT;

const hbs = require("hbs");
const LocalStrategy = require("passport-local").Strategy;

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const session = require("express-session");

const bcrypt = require("bcryptjs");
var indexRouter = require("./routes/index");

app.use(Express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/login", require("./routes/auth/login"));
app.use("/signup", require("./routes/auth/signup"));

app.use(passport.initialize());

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            session: false
        },
        async (email, password, next) => {
            console.log(
                `Estrategia local. Información recibida: email ${email}, password${password}`
            );

            try {
                const user = await User.findOne({ email });

                if (!user) {
                    next(null, false, { message: "not found" });
                }

                if (!bcrypt.compareSync(password, user.password)) {
                    next(null, false, {
                        message: "la contraseña no es correcta"
                    });
                }

                next(null, user);
            } catch (error) {
                console.log(error);
                next(error);
            }
        }
    )
);

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

passport.use(
    new JwtStrategy(opts, async (tokenPayload, next) => {
        console.log(`Estrategia jwt. Token: ${tokenPayload}`);

        try {
            const user = await User.findOne({ _id: tokenPayload.sub });

            if (!user) next(null, false, { message: "invalid token" });

            next(null, user);
        } catch (error) {
            console.log(error);
            next(error);
        }
    })
);

app.use("/", indexRouter);

app.use((req, res, next) => {
    res.status(404).json({ message: "Not found" });
});

mongoose
    .connect(`mongodb://localhost:${DB_PORT}/app`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log(`Connected to mongo on port ${DB_PORT}`))
    .catch(err => {
        throw err;
    });

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT} `);
});
