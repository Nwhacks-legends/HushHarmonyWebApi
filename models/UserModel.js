const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    long: {type: Number},
    lat: {type: Number},
    noise: {type: Number},
    timestamp: { type: Date, default: Date.now }

})

const User = mongoose.model("User", UserSchema)
module.exports = User