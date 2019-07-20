const { Model } = require('objection');
const moment = require('moment');

const today = moment().format("YYYY-MM-DD-hh:mm:ss");

class Donations extends Model {


  static get tableName() {
      return "donations";
  }

  $beforeInsert() {
    this.created_at = today;
    this.updated_at = today;
}

$beforeUpdate() {
    this.updated_at = today;
}
}

module.exports = Donations;