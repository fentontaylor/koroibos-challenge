const request = require("supertest");
const app = require('../../../app');
const DB = require('../../../utils/dbConnect');
const {
  createOlympics,
  createAthlete,
  createSport,
  createEvent,
  createAthleteEvent,
  destroyAll
} = require('../../../utils/dbHelpers');

describe('GET /api/v2/graphql-olympians olympian_stats', () => {
  beforeEach(async () => {
    await destroyAll();
    let data = [
      {
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
      },
      {
        Name: 'Joe Bob',
        Sex: 'M',
        Age: '30',
        Height: '155',
        Weight: '70',
        Team: 'USA',
        Games: '2016 Summer',
        Sport: 'Diving',
        Event: 'Diving Men\'s Platform',
        Medal: 'NA'
      },
      {
        Name: 'Sruthi Singh',
        Sex: 'F',
        Age: '23',
        Height: '169',
        Weight: '45',
        Team: 'India',
        Games: '2016 Summer',
        Sport: 'Athletics',
        Event: 'Athletics Women\'s 800 metres',
        Medal: 'Gold'
      },
      {
        Name: 'Maha Abdalsalam',
        Sex: 'M',
        Age: '20',
        Height: '155',
        Weight: '60',
        Team: 'Egypt',
        Games: '2016 Summer',
        Sport: 'Diving',
        Event: 'Diving Men\'s Platform',
        Medal: 'NA'
      }
    ]
    let athlete = await createAthlete(data[0]);
    let olympics = await createOlympics(data[0]);
    let sport = await createSport(data[0]);
    let event = await createEvent(data[0], sport);
    await createAthleteEvent(data[0], athlete, event, olympics);

    let athlete2 = await createAthlete(data[1]);
    let olympics2 = await createOlympics(data[1]);
    let sport2 = await createSport(data[1]);
    let event2 = await createEvent(data[1], sport2);
    await createAthleteEvent(data[1], athlete2, event2, olympics2);

    let athlete3 = await createAthlete(data[2]);
    let olympics3 = await createOlympics(data[2]);
    let sport3 = await createSport(data[2]);
    let event3 = await createEvent(data[2], sport3);
    await createAthleteEvent(data[2], athlete3, event3, olympics3);

    let athlete4 = await createAthlete(data[3]);
    let olympics4 = await createOlympics(data[3]);
    let sport4 = await createSport(data[3]);
    let event4 = await createEvent(data[3], sport4);
    await createAthleteEvent(data[3], athlete4, event4, olympics4);
  });

  afterEach(async () => {
    await destroyAll();
  });

  it('return number of athletes, average weight by sex, average age', async () => {
    let expected = {
      "data" : {
        "olympian_stats": {
          "total_competing_olympians": 4,
          "average_age": 24.75,
          "average_weight": {
            "unit": "kg",
            "male_olympians": 65,
            "female_olympians": 49.5
          }
        }
      }
    }

    let query = 'query{olympian_stats{total_competing_olympians average_age average_weight{unit male_olympians female_olympians}}}'
    let response = await request(app).get(`/api/v2/graphql-olympians?query=${query}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(expected)
  })
})