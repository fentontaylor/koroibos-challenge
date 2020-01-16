const { Model } = require('objection');
const DB = require('../utils/dbConnect');
Model.knex(DB);

class Athlete extends Model {
  static get tableName() {
    return 'athletes'
  }
}

module.exports = Athlete;