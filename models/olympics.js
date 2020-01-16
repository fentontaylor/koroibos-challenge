const { Model } = require('objection');
const DB = require('../utils/dbConnect');
Model.knex(DB);

class Olympics extends Model {
  static get tableName() {
    return 'olympics';
  }

  static async findOrCreate(data) {
    let gamesData = { games: data.games };
    let result = await this.query().where(gamesData);
    if (result.length === 0) {
      return await this.query().insertAndFetch(gamesData);
    }
    return result[0];
  }
}

module.exports = Olympics;