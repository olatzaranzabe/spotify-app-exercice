const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        require [ true, { message: "email is required"}]
    },
    password: {
        type: String,
        require [ true, { message: "password is required"}]
    }
})

const User = mongoose.model("User", userSchema);
