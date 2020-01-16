const { Model } = require('objection');
const DB = require('../utils/dbConnect');
Model.knex(DB);

class Athlete extends Model {
  static get tableName() {
    return 'athletes'
  }

  static findOrCreateWith(data) {
    let athleteData = {
      name:   data.name,
      team:   data.team,
      sex:    data.sex,
      height: data.height,
      weight: data.weight,
      age:    data.age
    };
    return this.query().insertAndFetch(athleteData);
  }
}

module.exports = Athlete;