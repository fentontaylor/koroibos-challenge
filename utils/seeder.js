const csv = require('csv-parser');
const fs = require('fs');
const {
  createAthlete,
  createOlympics,
  createSport,
  createEvent,
  createAthleteEvent
} = require('./dbHelpers')


var readStream = fs.createReadStream('db/data/olympic_data_2016.csv');
readStream
  .pipe(csv())
  .on('data', (row) => {
    var athlete = createAthlete(row);
    var olympics = createOlympics(row);
    var sport = createSport(row);
    var event = createEvent(row, sport);
    createAthleteEvent(row, athlete, event, olympics);
    console.log(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  })
  .on('close', (err) => {
    console.log('Closing file.');
    readStream.destroy();
  });