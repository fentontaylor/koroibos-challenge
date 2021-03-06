const csv = require('csvtojson');
const {
  createAthlete,
  createOlympics,
  createSport,
  createEvent,
  createAthleteEvent,
  destroyAll
} = require('./dbHelpers')

async function runSeed(file) {
  await csv()
    .fromFile(file)
    .subscribe(async (row) => {
      var athlete = await createAthlete(row);
      var olympics = await createOlympics(row);
      var sport = await createSport(row);
      var event = await createEvent(row, sport);
      var athleteEvent = await createAthleteEvent(row, athlete, event, olympics);
      console.log('CREATED FROM ROW:', {
        athlete: athlete,
        olympics: olympics,
        sport: sport,
        event: event,
        athleteEvent: athleteEvent
      });
    })
}

function dbSetupWith(file) {
  destroyAll()
    .then(async () => {
      await runSeed(file)
    })
}

module.exports = {
  dbSetupWith: dbSetupWith,
  runSeed: runSeed
}