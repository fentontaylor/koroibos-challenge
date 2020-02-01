const DB = require('./dbConnect')
const { withGraphJoined } = require('objection')
const Sport = require('../models/sport')

async function olympianIndex(params) {
  try {
    var whereClause = _addToQuery(params);
    let result = await DB.raw(
      "SELECT t.name, t.age, t.sport, t.team, " +
	      "CAST(COUNT(CASE WHEN t.medal IS NOT NULL THEN 1 END) as int) as total_medals_won " +
	      "FROM(SELECT a.name, a.age, a.team, s.sport, ae.medal  FROM athletes a " +
		      "INNER JOIN athlete_events ae " +
			      "ON ae.athlete_id = a.id " +
		      "INNER JOIN events e " +
			      "ON ae.event_id = e.id " +
		      "INNER JOIN sports s " +
            "ON e.sport_id = s.id " +
          whereClause +
          ") as t " +
        "GROUP BY t.name, t.age, t.sport, t.team " +
        "ORDER BY sport ASC, total_medals_won DESC;"
    )
    return result.rows;
  } catch(err) {
    console.log(err)
  }
}

async function olympianStats() {
  try {
    let numAthletes = await _countAthletes();
    let averageAge = await _averageAge();
    let averageWeights = await _averageWeights();
    return {
      olympian_stats: {
        total_competing_olympians: numAthletes,
        average_age: averageAge,
        average_weight: averageWeights
      }
    }
  } catch(err) {
    console.log(err)
  }
}

async function sportEvents() {
  try {
    let result = await Sport.query()
      .withGraphJoined('events(onlyEventName)')
      .select('sport', 'events')
      .then(events => events.map(obj => {
        return {
          sport: obj.sport,
          events: obj.events.map(e => e.event).sort()
        }
      }));

    return result;
  } catch(err) {
    console.log(err)
  }
}

async function eventMedalists(eventId) {
  try {
    let eventName = await DB('events')
      .where('id', eventId)
      .pluck('event')
    let medalists = await DB('events')
      .join('athlete_events', {'athlete_events.event_id': 'events.id'})
      .join('athletes', {'athlete_events.athlete_id': 'athletes.id'})
      .where('events.id', eventId)
      .whereNotNull('athlete_events.medal')
      .select('name', 'team', 'age', 'medal')
      .orderByRaw(
        "CASE WHEN medal = 'Gold' THEN '1' " +
            "WHEN medal = 'Silver' THEN '2' " +
            "ELSE medal END ASC")
    return {
      event: eventName[0],
      medalists: medalists
    }
  } catch(err) {
    console.log(err)
  }
}

async function _countAthletes() {
  let result = await DB('athletes').count('*')
  return parseInt(result[0].count)
}

async function _averageAge() {
  let result = await DB.raw('SELECT CAST(ROUND(AVG(age), 2) AS float) FROM athletes')
  return result.rows[0].round
}

async function _averageWeights() {
  let result = await DB.raw(
    "SELECT sex, " +
      "CAST(ROUND(AVG(weight), 2) AS float) as avg_weight " +
	    "FROM athletes " +
      "GROUP BY sex " +
      "ORDER BY sex")
  return {
    unit: 'kg',
    female_olympians: result.rows[0].avg_weight,
    male_olympians: result.rows[1].avg_weight,
  }
}

function _addToQuery(params) {
  var clause = ''
  if (params.age === 'youngest') {
    clause = 'WHERE a.age = (SELECT MIN(age) FROM athletes)'
  } else if (params.age === 'oldest') {
    clause = 'WHERE a.age = (SELECT MAX(age) FROM athletes)'
  }
  return clause
}

module.exports = {
  olympianIndex: olympianIndex,
  olympianStats: olympianStats,
  sportEvents: sportEvents,
  eventMedalists: eventMedalists
}