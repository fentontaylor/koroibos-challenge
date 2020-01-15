const { Model } = require('objection');
const DB = require('../utils/dbConnect');
Model.knex(DB);

class BaseModel extends Model {
  static get tableName() {
    return null
  }
}

module.exports = BaseModel;