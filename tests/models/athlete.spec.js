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

  it('has a tableName', () => {
    expect(Athlete.tableName).toBe('athletes');
  })

  it('can findOrCreate a new athlete from a row of data', async () => {
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
    // This should create the athlete since she does not exist
    let athlete = await Athlete.findOrCreate(data);

    expect(athlete.name).toBe(data.name);
    expect(athlete.team).toBe(data.team);
    expect(athlete.sex).toBe(data.sex);
    expect(athlete.height).toBe(data.height);
    expect(athlete.weight).toBe(data.weight);
    expect(athlete.age).toBe(data.age);

    let result = await DB('athletes');
    expect(athlete).toEqual(result[0]);
    expect(result.length).toBe(1);

    // This should find the athlete since she already exists
    let athlete2 = await Athlete.findOrCreate(data);

    let result2 = await DB('athletes');
    expect(athlete2).toEqual(result2[0]);
    expect(result2.length).toBe(1);
  })
})