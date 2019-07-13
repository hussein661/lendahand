const bcrypt = require('bcryptjs');

const HashUtil = function(string, hash) {

    this.saltRounds = 10;
    this.string = string;
    this.hashed = hash;
}

HashUtil.prototype.hash = async function() {
    this.string = await bcrypt.hash(this.string, this.saltRounds);
}

HashUtil.prototype.getHash = function() {
    return this.string;
}

HashUtil.prototype.verify = function() {
   return bcrypt.compareSync(this.string, this.hashed)
}

module.exports = HashUtil;