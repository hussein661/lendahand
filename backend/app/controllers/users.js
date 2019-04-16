const User = require('../models/User')
const app = require('../public/server')


app.get("/",async(req,res)=>{
  console.log(app)
  try{
    console.log("ss")
    const users = await User.query().select()
    return res.status(200).json({users})
  }catch(e){
    res.status(422).json({error:e.message})
  }
})