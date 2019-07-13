const { Model } = require('objection');
const moment = require('moment');

class ProblemImages extends Model {
    
    static get tableName() {
        return "problems_images";
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
                owner: {
                    relation: this.BelongsToOneRelation,
                    modelClass: __dirname + '/Problem',
                    join: {
                        from: 'problems_images.problem_id',
                        to: 'problems.id'
                    }
                }
            };
        }
}

module.exports = ProblemImages;