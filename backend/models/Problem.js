const { Model } = require('objection');
const moment = require('moment');


class Problem extends Model {
    
    static get tableName() {
        return "problems";
    }
    
    $beforeInsert() {
        const today = new Date()
            this.created_at = today;
            this.updated_at = today;
        }
        $beforeUpdate() {
            const today = new Date()    
            this.updated_at = today;
        } 

        static get relationMappings() {

            return {
                images: {
                    relation: this.HasManyRelation,
                    modelClass: __dirname + "/ProblemImages",
                    filter: query => query
                    .select("*"),
                    
                    join: {
                        from: 'problems.id',
                        to: 'problems_images.problem_id'
                    }
                }
            };
        }
}

module.exports = Problem;