const Olympics = require('../../models/olympics')
const { destroyAll } = require('../../utils/dbHelpers')
const DB = require('../../utils/dbConnect')

describe('Olympics Model', () => {
  beforeEach(async () => {
    await destroyAll();
  })

  afterEach(async () => {
    await destroyAll();
  })

  it('has a tableName', () => {
    expect(Olympics.tableName).toBe('olympics')
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

    // This should create the olympics record since it does not exist
    let olympics = await Olympics.findOrCreate(data);

    expect(olympics.games).toBe(data.games);

    let result = await DB('olympics');
    expect(olympics).toEqual(result[0]);
    expect(result.length).toBe(1);

    // This should find the athlete since she already exists
    let olympics2 = await Olympics.findOrCreate(data);

    let result2 = await DB('olympics');
    expect(olympics2).toEqual(result2[0]);
    expect(result2.length).toBe(1);
  })
})