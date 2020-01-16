const { Model } = require('objection');
const DB = require('../utils/dbConnect');
Model.knex(DB);

class Athlete extends Model {
  static get tableName() {
    return 'athletes'
  }

  static async findOrCreate(data) {
    let athleteData = {
      name:   data.name,
      team:   data.team,
      sex:    data.sex,
      height: data.height,
      weight: data.weight,
      age:    data.age
    }
    var result = await this.query().where(athleteData);
    if (result.length === 0) {
      return await this.query().insertAndFetch(athleteData);
    }
    return result[0];
  }
}

module.exports = Athlete;