const Athlete = require('../../models/athlete')
const { destroyAll } = require('../../utils/dbHelpers')
const DB = require('../../utils/dbConnect')

describe('Athlete Model', () => {
  beforeEach(async () => {
    await destroyAll();
  })

  afterEach(async () => {
    await destroyAll();
  })

  it('can initialize', () => {
    let athlete = new Athlete();
    expect(athlete).toBeInstanceOf(Athlete);
  })

  it('has a null tableName', () => {
    expect(Athlete.tableName).toBe('athletes');
  })

  it('can create a new athlete from a row of data', async () => {
    let athlete = await Athlete.findOrCreateWith({
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
    })
    let result = await DB('athletes')
    expect(athlete).toEqual(result[0])
  })
})