const Event = require('../../models/event')
const { destroyAll } = require('../../utils/dbHelpers')
const DB = require('../../utils/dbConnect')

describe ('Event Model', () => {
  beforeEach(async () => {
    await destroyAll();
  })

  afterEach(async () => {
    await destroyAll();
  })

  it('has a tableName', () => {
    expect(Event.tableName).toBe('events');
  })

  it('can findOrCreate from a row of data', async () => {
    let data = {
      name: 'Katniss Everdeen',
      team: 'USA',
      sex: 'F',
      height: 160,
      weight: 50,
      age: 19,
      games: '2016 Summer',
      sport: 'Archery',
      event: 'Archery Women\'s Individual',
      medal: 'Gold'
    }

    // This should create the event since it does not exist yet
    let event = await Event.findOrCreate(data);

    expect(event.event).toBe(data.event);

    let result = await DB('events');

    expect(event).toEqual(result[0]);
    expect(result.length).toBe(1);

    // This should find and return the even since it already exists
    let event2 = await Event.findOrCreate(data);

    expect(event2.event).toBe(data.event);

    let result2 = await DB('events');
    expect(event2).toEqual(result2[0]);
    expect(result2.length).toBe(1);
  })

  describe('relationships', () => {
    it('belongs to one sport', () => {
      expect(Event.relationMappings).toHaveProperty('sport');
      expect(Event.relationMappings.sport.join)
        .toEqual({ from: 'events.sport_id', to: 'sports.id' });
    })
  })
})