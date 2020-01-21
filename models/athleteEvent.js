const { Model } = require('objection');
const DB = require('../utils/dbConnect');
const Event = require('./event');
const Athlete = require('./athlete');
const Olympics = require('./olympics');
Model.knex(DB);

class AthleteEvent extends Model {
  static get tableName() {
    return 'athlete_events';
  }

  // Might want to not pass in the row of data, but the actual ids of previously created records
}

module.exports = AthleteEvent;