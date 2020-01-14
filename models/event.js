const { Model } = require('objection')
const Sport = require('./sport')
const DB = require('../utils/dbConnect')
Model.knex(DB)

class Event extends Model {
  static get tableName() {
    return 'events';
  }

  static get relationMappings() {
    return {
      sport: {
        relation: Model.BelongsToOneRelation,
        modelClass: Sport,
        join: {
          from: 'sports.id',
          to: 'events.sport_id'
        }
      }
    }
  }

  static get modifiers() {
    return {
      onlyEventName(builder) {
        builder.select('event').orderBy('event', 'asc')
      }
    }
  }
}

module.exports = Event;