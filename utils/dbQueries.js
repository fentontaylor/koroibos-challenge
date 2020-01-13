const DB = require('./dbConnect')

async function olympianIndex() {
  try {
    let result = await DB.raw(
      "SELECT t.name, t.age, t.sport, t.team, " +
	      "CAST(COUNT(CASE WHEN t.medal IS NOT NULL THEN 1 END) as int) as total_medals_won " +
	      "FROM(SELECT a.name, a.age, a.team, s.sport, ae.medal  FROM athletes a " +
		      "INNER JOIN athlete_events ae " +
			      "ON ae.athlete_id = a.id " +
		      "INNER JOIN events e " +
			      "ON ae.event_id = e.id " +
		      "INNER JOIN sports s " +
			      "ON e.sport_id = s.id) as t " +
        "GROUP BY t.name, t.age, t.sport, t.team " +
        "ORDER BY t.name;"
    )
    return result.rows;
  } catch(err) {
    console.log(err)
  }
}

module.exports = {
  olympianIndex: olympianIndex
}