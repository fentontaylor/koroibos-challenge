const request = require("supertest");
const app = require('../../../app');
const DB = require('../../../utils/dbConnect');
const { destroyAll } = require('../../../utils/dbHelpers');

describe('GET /api/v2/graphql-olympians events index', () => {
  beforeEach(async () => {
    await destroyAll();
  })

  afterEach(async () => {
    await destroyAll();
  })

  it('returns every sport and its associated events', async () => {
    let sport1 = await DB('sports').insert({ sport: 'Athletics' }).returning('*');
    let sport2 = await DB('sports').insert({ sport: 'Gymnastics' }).returning('*');
    await DB('events').insert({ event: 'Athletics Women\'s Marathon', sport_id: sport1[0].id });
    await DB('events').insert({ event: 'Athletics Men\'s Pole Vault', sport_id: sport1[0].id });
    await DB('events').insert({ event: 'Gymnastics Women\'s Balance Beam', sport_id: sport2[0].id });
    await DB('events').insert({ event: 'Gymnastics Men\'s Rings', sport_id: sport2[0].id });

    const expected = {
      data: {
        events: [
          {
            sport: 'Athletics',
            events: [
              'Athletics Men\'s Pole Vault',
              'Athletics Women\'s Marathon'
            ]
          },
          {
            sport: 'Gymnastics',
            events: [
              'Gymnastics Men\'s Rings',
              'Gymnastics Women\'s Balance Beam'
            ]
          }
        ]
      }
    }

    const query = 'query{events{events}}'
    const response = await request(app).get(`/api/v2/graphql-olympians?query=${query}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected);
  })
})