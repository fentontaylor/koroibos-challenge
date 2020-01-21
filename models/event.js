const { Model } = require('objection');
const DB = require('../utils/dbConnect');
const Sport = require('./sport');
Model.knex(DB);

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
          from: 'events.sport_id',
          to: 'sports.id'
        }
      }
    }
  }

  static async findOrCreate(data) {
    let sport = await Sport.findOrCreate(data);
    let eventData = {
      event: data.event,
      sport_id: sport.id
    }
    let result = await this.query().where(eventData);
    if (result.length === 0) {
      return await this.query().insertAndFetch(eventData);
    }
    return result[0];
  }
}

module.exports = Event;