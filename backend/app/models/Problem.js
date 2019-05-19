const { Model } = require('objection');
const moment = require('moment');

const today = moment().format("YYYY-MM-DD-hh:mm:ss");

class Problem extends Model {
    
    static get tableName() {
        return "problems";
    }
    
        $beforeInsert() {
            this.created_at = today;
            this.updated_at = today;
        }
    
        $beforeUpdate() {
            this.updated_at = today;
        } 
}

module.exports = Problem;