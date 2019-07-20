const Donation = require("../models/Donations");
const User = require("../models/User")
const Problem = require("../models/Problem")
const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const authorization = require("../middlewares/authentications");
const getID = require("../utils/getUserId");

module.exports = {
  donate: router.post("/api/v1/donate",authorization() ,async (req, res) => {
    const {donor_id,problem_id,amount} = req.body
    try{
        const donor = await User.query().select().where("id",donor_id)
        if(!donor){
            return res.status(400).json({error:"donor user is not found"})
        }
        if(donor_id !== getID(req)){
            return res.status(401).json({error:"authentication error"})
        }

    const problem = await Problem.query().select().where("id",problem_id)
    if(!problem){
        return res.status(400).json({error:"post is not found"})
    }
    const data = {
        id:uuid(),
        problem_id,
        donor_id,
        amount
    }
   const donation =  await Donation.query().insert(data)
    return res.status(201).json(donation)
    }catch(e){
        res.status(400).json({error:e.message})
    }
})
}