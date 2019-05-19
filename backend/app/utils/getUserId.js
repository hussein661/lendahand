const jwt = require("jsonwebtoken");

module.exports = req =>{
    const token = req.headers.authorization
    const user_id = jwt.decode(token).id
    return user_id
  }