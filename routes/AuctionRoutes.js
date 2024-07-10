const express = require("express");
const auctionSchema = require("../models/AuctionSchema");
const auctionRoute = new express.Router();


auctionRoute.post("/create-auction",(req,res)=>{
    auctionSchema.create(req.body,(err,data)=>{
        if(err)
            return err;
        else
            res.json(data);
    })
});

auctionRoute.get("/",(req,res)=>{
    auctionSchema.find((err,data)=>{
        if(err)
            return err;
        else
            res.json(data);
    })
})
auctionRoute.route("/update-auction/:id")
.get((req,res)=>{
    auctionSchema.findById(req.params.id,(err,data)=>{
        if(err)
            return err;
        else
            res.json(data);
    })
})
.put((req,res)=>{
    auctionSchema.findByIdAndUpdate(req.params.id,{$set:req.body},
        (err,data)=>{
            if(err)
                return err;
            else
                res.json(data);
        })
});


auctionRoute.delete("/delete-auction/:id",(req,res)=>{
    console.log("**** Server delete")
    auctionSchema.findByIdAndRemove(req.params.id,(err,data)=>{
        console.log("***** Delete function ", err , data)
        if(err)
            return err;
        else
            res.json(data);
    })
});

module.exports = auctionRoute;