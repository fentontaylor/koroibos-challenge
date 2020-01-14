const { Model } = require('objection')
const Event = require('./event')
const DB = require('../utils/dbConnect')
Model.knex(DB)

class Sport extends Model {
  static get tableName() {
    return 'sports';
  }

  static get relationMappings() {
    return {
      events: {
        relation: Model.HasManyRelation,
        modelClass: Event,
        join: {
          from: 'sports.id',
          to: 'events.sport_id'
        }
      }
    }
  }
}

module.exports = Sport;