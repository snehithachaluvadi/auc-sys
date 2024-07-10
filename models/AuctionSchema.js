const mongoose = require("mongoose");
const auctionSchema = new mongoose.Schema({
    "title": { type: String },
    "description": { type: String },
    "startingBid": { type: Number },
    "startDate": { type: Date },
    "endDate": { type: Date },
}, {
    collection: "auction"
});

module.exports = mongoose.model("auctionSchema", auctionSchema);