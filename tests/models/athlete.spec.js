var app = require('../../app');

const config = require('../../knexfile')['test'];
const DB = require('knex')(config);

describe('Olympics table', () => {
  beforeEach(async () => {
    await DB.raw("TRUNCATE TABLE athletes CASCADE");
  });

  afterEach(async () => {
    await DB.raw("TRUNCATE TABLE athletes CASCADE");
  });

  it('has an id and name', async () => {
    let athlete = await DB('athletes')
      .insert({
        'id': 1,
        'name': 'Bob Ross',
        'sex': 'M',
        'height': 170,
        'weight': 75,
        'age': 45,
        'team': 'USA'
      })
      .returning(['id', 'name', 'sex', 'height', 'weight', 'age', 'team'])

    expect(athlete[0].id).toBe(1)
    expect(athlete[0].name).toBe('Bob Ross')
    expect(athlete[0].sex).toBe('M')
    expect(athlete[0].height).toBe(170)
    expect(athlete[0].weight).toBe(75)
    expect(athlete[0].age).toBe(45)
    expect(athlete[0].team).toBe('USA')
  })
})