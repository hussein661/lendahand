const { Model } = require('objection');
const moment = require('moment');

const today = moment().format("YYYY-MM-DD-hh:mm:ss");

class User extends Model {


  static get tableName() {
      return "users";
  }

  $beforeInsert() {
    this.created_at = today;
    this.updated_at = today;
}

$beforeUpdate() {
    this.updated_at = today;
}
}

module.exports = User;