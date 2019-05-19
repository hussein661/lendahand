const jwt = require("jsonwebtoken");

module.exports = function() {

  var Auth = async function(req, res, next) {
      const token = req.headers["authorization"]
      jwt.verify(token,"process.env.ACCESS_KEY",function(error,decoded){
        if(error){
            return res.status(401).json({error});
        }
        if("id" in decoded){
            next()
        }
    });
  }
  return Auth;
};
