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

describe('GET /api/v2/graphql-olympians event_medalists', () => {
  beforeEach(async () => {
    await destroyAll();
    data = [
      {
        Name: 'Mark Hamill',
        Sex: 'M',
        Age: '26',
        Height: '169',
        Weight: '54',
        Team: 'USA',
        Games: '2016 Summer',
        Sport: 'Diving',
        Event: 'Diving Men\'s Platform',
        Medal: 'Bronze'
      },
      {
        Name: 'Harrison Ford',
        Sex: 'M',
        Age: '30',
        Height: '155',
        Weight: '70',
        Team: 'USA',
        Games: '2016 Summer',
        Sport: 'Diving',
        Event: 'Diving Men\'s Platform',
        Medal: 'Silver'
      },
      {
        Name: 'Steven Seagal',
        Sex: 'M',
        Age: '23',
        Height: '169',
        Weight: '45',
        Team: 'USA',
        Games: '2016 Summer',
        Sport: 'Diving',
        Event: 'Diving Men\'s Platform',
        Medal: 'Gold'
      },
      {
        Name: 'Tom Hardy',
        Sex: 'M',
        Age: '20',
        Height: '155',
        Weight: '60',
        Team: 'USA',
        Games: '2016 Summer',
        Sport: 'Diving',
        Event: 'Diving Men\'s Platform',
        Medal: 'NA'
      }
    ]
  });

  afterEach(async () => {
    await destroyAll();
  });

  it('returns the medalists for a specific event', async () => {
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

    let expected = {
      data: {
        event_medalists: {
          event: 'Diving Men\'s Platform',
          medalists: [
            {
              name: 'Steven Seagal',
              team: 'USA',
              age: 23,
              medal: 'Gold'
            },
            {
              name: 'Harrison Ford',
              team: 'USA',
              age: 30,
              medal: 'Silver'
            },
            {
              name: 'Mark Hamill',
              team: 'USA',
              age: 26,
              medal: 'Bronze'
            }
          ]
        }
      }
    }
    let query = `query{event_medalists(id: ${event.id}){event medalists}}`
    let response = await request(app).get(`/api/v2/graphql-olympians?query=${query}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(expected)
  })
})