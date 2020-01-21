const Sport = require('../../models/sport')
const { destroyAll } = require('../../utils/dbHelpers')
const DB = require('../../utils/dbConnect')

describe('Sport Model', () => {
  beforeEach(async () => {
    await destroyAll();
  })

  afterEach(async () => {
    await destroyAll();
  })

  it('has a tableName', () => {
    expect(Sport.tableName).toBe('sports')
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

    // This should create the sports record since it does not exist
    let sports = await Sport.findOrCreate(data);

    expect(sports.sport).toBe(data.sport);

    let result = await DB('sports');
    expect(sports).toEqual(result[0]);
    expect(result.length).toBe(1);

    // This should find the sport since it already exists
    let olympics2 = await Sport.findOrCreate(data);

    let result2 = await DB('sports');
    expect(olympics2).toEqual(result2[0]);
    expect(result2.length).toBe(1);
  })

  describe('relationships', () => {
    it('has many events', () => {
      expect(Sport.relationMappings).toHaveProperty('events');
      expect(Sport.relationMappings.events.join)
        .toEqual({ from: 'sports.id', to: 'events.sport_id' });
    })
  })
})