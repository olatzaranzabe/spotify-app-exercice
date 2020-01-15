require("dotenv").config();
const Express = require("express");
const app = Express();
const bodyParser = require("body-parser");
const SERVER_PORT = process.env.SERVER_PORT || 5000;

const hbs = require("hbs");

app.use(Express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/login", require("./routes/auth/login"));
app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT} `);
});
