const request = require("supertest");
const app = require('../../../app');
const DB = require('../../../utils/dbConnect');
const { destroyAll } = require('../../../utils/dbHelpers');

describe('GET /api/v1/events', () => {
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

    let expected = {
      events: [
        {
          sport: 'Athletics',
          events: [
            'Athletics Women\'s Marathon',
            'Athletics Men\'s Pole Vault'
          ]
        },
        {
          sport: 'Gymnastics',
          events: [
            'Gymnastics Women\'s Balance Beam',
            'Gymnastics Men\'s Rings'
          ]
        }
      ]
    }

    let response = await request(app).get('/api/v1/events');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('events')
    expect(response.body.events[0]).toHaveProperty('sport')
    expect(response.body.events[0]).toHaveProperty('events')
    expect(response.body).toEqual(expected);
  })
})