const { Model } = require('objection');
const DB = require('../utils/dbConnect');
const Event = require('./event');
Model.knex(DB);

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

  static async findOrCreate(data) {
    let sportData = { sport: data.sport };
    let result = await this.query().where(sportData);
    if (result.length === 0) {
      return await this.query().insertAndFetch(sportData);
    }
    return result[0];
  }
}

module.exports = Sport;