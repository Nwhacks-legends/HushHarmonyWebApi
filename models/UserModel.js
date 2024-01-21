const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    long: Number,
    lat: Number,
    noise: Number,
    timestamp: { type: Date, default: Date.now }

})

const User = mongoose.model("User", UserSchema)
module.exports = User