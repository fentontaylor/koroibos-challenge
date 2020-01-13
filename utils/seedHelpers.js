const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[env];
const DB = require('knex')(config);
const AthleteFormatter = require('./athleteFormatter')


async function createAthlete(row) {
  try {
    let data = new AthleteFormatter(row);
    let athlete = await DB('athletes')
      .insert(data)
      .returning('*');
    return athlete[0];
  } catch (err) {
    console.log(err.detail)
  }
}

async function createOlympics(row) {
  try {
    let games = row.Games;
    let result = await DB('olympics')
      .where({ games: games });

    if (result.length === 0) {
      let olympics = await DB('olympics')
        .insert({ games: games })
        .returning('*');

      return olympics[0];
    } else {
      return result[0];
    }
  } catch (err) {
    console.log(err.detail);
  }
}

module.exports = {
  createAthlete: createAthlete,
  createOlympics: createOlympics
}