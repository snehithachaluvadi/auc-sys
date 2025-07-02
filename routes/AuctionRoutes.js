const express = require("express");
const auctionSchema = require("../models/AuctionSchema");
const auctionRoute = new express.Router();

// ✅ Create auction
auctionRoute.post("/create-auction", (req, res) => {
    auctionSchema.create(req.body, (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            res.json(data);
        }
    });
});

// ✅ Get all auctions
auctionRoute.get("/", (req, res) => {
    auctionSchema.find((err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            res.json(data);
        }
    });
});

// ✅ Get one auction by ID
auctionRoute.route("/update-auction/:id")
    .get((req, res) => {
        auctionSchema.findById(req.params.id, (err, data) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            } else {
                res.json(data);
            }
        });
    })

    // ✅ Update auction by ID
    .put((req, res) => {
        auctionSchema.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, data) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            } else {
                res.json(data);
            }
        });
    });

// ✅ Delete auction by ID
auctionRoute.delete("/delete-auction/:id", (req, res) => {
    auctionSchema.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            res.json(data);
        }
    });
});

module.exports = auctionRoute;