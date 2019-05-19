const User = require("../models/User");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const HashUtil = require("../utils/hashutil");
const authenticate = require("../middlewares/authentications")
const getID = require("../utils/getUserId")

module.exports = {
  getAllUsers: router.get("/api/v1/users/getall", async (req, res) => {
    try {
      const users = await User.query().select();
      return res.status(200).json({ users });
    } catch (e) {
      res.status(422).json({ error: e.message });
    }
  }),

  getone:router.get("/api/v1/users/getone",authenticate(),async(req,res,next)=>{
    try{
      const user_id = getID(req)
      const user = await User.query().select().where("id",user_id).first()
      if(user){
       return res.status(200).json({user})
      }
    }catch(e){
      return res.status(422).json({error:e.message})
    }
  }),
  
  Register: router.post("/api/v1/register", async (req, res) => {
    try {

      const { first_name,last_name, email, password, mobile,image,country_id } = req.body;

      const crypt = new HashUtil(password);
      await crypt.hash();
      let data = {
        id: uuid(),
        first_name,
        last_name,
        email,
        password: crypt.getHash(),
        mobile,
        image,
        country_id
      };

      if (
     await User.query()
          .select()
          .where("email", data.email)
          .first()
      ) {
        return res.status(400).json({ error: "provided email already exists" });
      }
      const user = await User.query().insert({ ...data });
      res.status(200).json({ user });
    } catch (e) {
      res.status(422).json({ error: e.message });
    }
  }),

  login: router.post("/api/v1/login", async (req, res) => {
    try {
      let { email, password } = req.body;
      const user = await User.query()
        .select()
        .where("email", email)
        .first();
      if (user) {
        const crypt = new HashUtil(password, user.password);
        if (crypt.verify()) {
          var token = jwt.sign({email,id:user.id}, "process.env.ACCESS_KEY", { algorithm: 'HS256', expiresIn: 6000})
          return res.status(200).json({token,user_id:user.id});
        }
      }
      return res.status(400).json({ error: "incorrect email or password" });
    } catch (e) {
      res.status(422).json({ error: e.message });
    }
  })
};
