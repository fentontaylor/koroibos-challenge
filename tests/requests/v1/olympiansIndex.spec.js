var request = require("supertest");
var app = require('../../../app');

const DB = require('../../../utils/dbConnect');
const { dbSetupWith } = require('../../../utils/dbSeed');
const {
  createOlympics,
  createAthlete,
  createSport,
  createEvent,
  createAthleteEvent,
  destroyAll
} = require('../../../utils/dbHelpers');


describe('GET /api/v1/olympians', ()=>{
  beforeEach(async () => {
    await destroyAll();
    data = {
      Name: 'Ciara Everard',
      Sex: 'F',
      Age: '26',
      Height: '169',
      Weight: '54',
      Team: 'Ireland',
      Games: '2016 Summer',
      Sport: 'Athletics',
      Event: 'Athletics Women\'s 800 metres',
      Medal: 'Bronze'
    }
  });

  afterEach(async () => {
    await destroyAll();
  });

  it('example', async () => {
    let athlete = await createAthlete(data);
    let olympics = await createOlympics(data);
    let sport = await createSport(data);
    let event = await createEvent(data, sport);
    let athleteEvent = await createAthleteEvent(data, athlete, event, olympics);
    
    var response = await request(app)
      .get('/api/v1/olympians')
    expect(response.status).toBe(200)
  })
})