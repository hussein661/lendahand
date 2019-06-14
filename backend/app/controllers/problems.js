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
          needed_amount:req.body.needed_amount,
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

  deletePost:router.delete("/api/v1/problems/delete/:postId",authorization(),async (req,res)=>{
     const user_id = getID(req)
      try{
        const problem = await Problem.query().select().where("id",req.params.postId).first()
        if(!problem){
          return res.status(401).json({error:" post not found"})
        }
        if(problem.user_id !== user_id){
          return res.status(401).json({error:"unauthorized access"})
        }
        const deleted = await Problem.query().where("id",req.params.postId).delete()
        if(deleted != 0 ){
         return res.status(200).json({message:"post successfully deleted "})
        }
        return res.status(401).json({error:"unknown error"})
        }catch(e){
        res.status(422).json({error:e.message})
      }
  }),

  editPost:router.put("/api/v1/problems/edit/:postId",authorization(),async (req,res)=>{
    const user_id = getID(req)
    const title = req.body.title
    const id = req.params.postId
     try{
       const problem = await Problem.query().select().where("id",req.params.postId).first()
       if(!problem){
         return res.status(401).json({error:"post not found"})
       }
       if(problem.user_id !== user_id){
         return res.status(401).json({error:"unauthorized access"})
       }
       const updated = await Problem.query().where("id",id).update({title})
       if(updated != 0 ){
        return res.status(200).json({message:"post successfully updated"})
       }
       return res.status(401).json({error:"unknown error"})
       }catch(e){
       res.status(422).json({error:e.message})
     }
 })
  
};
