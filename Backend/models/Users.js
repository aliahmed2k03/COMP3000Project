const mongoose = require("mongoose")

const HouseSchema = new mongoose.Schema({
    address: String,
    price: String,
    estate: String,
    beds: String,
    baths: String,
    imageUrl: String,
    url: String

})

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    houses: [HouseSchema]
})

const UserModel = mongoose.model("users",UserSchema);
module.exports = UserModel