const DB = require('./dbConnect')

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
    console.log('AVG AGE:', averageAge)
  } catch(err) {
    console.log(err)
  }
}

async function _countAthletes() {
  let result = await DB('athletes').count('*')
  return result[0].count
}

async function _averageAge() {
  var result = await DB.raw('SELECT CAST(ROUND(AVG(age), 2) as float) FROM athletes')
  return result.rows[0].round
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
  olympianStats: olympianStats
}