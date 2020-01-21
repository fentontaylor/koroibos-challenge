const { Model } = require('objection');
const DB = require('../utils/dbConnect');
Model.knex(DB);

class Event extends Model {
  static get tableName() {
    return 'events';
  }
}

module.exports = Event;