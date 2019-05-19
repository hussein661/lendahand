const User = require("../models/User");
const Problem = require("../models/Problem")
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const HashUtil = require("../utils/hashutil");
const authorization = require("../middlewares/authentications")
const getID = require("../utils/getUserId")



module.exports = {
  postProblem: router.post("/api/v1/problems/post", async (req, res) => {
    try {
      const data = {
          id:uuid(),
          title:req.body.title,
          description:req.body.description,
          amount:req.body.amount,
          aquired:1,
          user_id:req.body.user_id
      }
      const problem = await Problem.query().insert(data)
      return res.status(200).json({ problem })
    } catch (e) {
      res.status(422).json({ error: e.message });
    }
  }),
  myPosts:router.get("/api/v1/problems/myposts",authorization(),async(req,res)=>{
    const user_id = getID(req)
    try {
      const myPosts = await Problem.query().select().where("user_id",user_id)
      return res.status(200).json({myPosts})
    }catch(e){
      res.status(422).json({error:e.message})
    }
  }),

  allposts:router.get("/api/v1/problems/allposts",async(req,res)=>{
    try {
      const allposts = await Problem.query().select()
      return res.status(200).json({allposts})
    }catch(e){
      res.status(422).json({error:e.message})
    }
  }),
  
};
