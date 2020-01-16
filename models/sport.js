const { Model } = require('objection');
const DB = require('../utils/dbConnect');
Model.knex(DB);

class Sport extends Model {
  static get tableName() {
    return 'sports';
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