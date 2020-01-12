const config = require('../../knexfile')['test'];
const DB = require('knex')(config);

describe('Olympics table', () => {
  beforeEach(async () => {
    await DB.raw("TRUNCATE TABLE sports CASCADE");
  });

  afterEach(async () => {
    await DB.raw("TRUNCATE TABLE sports CASCADE");
  });

  it('has an id and name', async () => {
    let sport = await DB('sports')
      .insert({ 'id': 1, 'sport': 'Weightlifting' })
      .returning(['id', 'sport'])

    expect(sport[0].id).toBe(1)
    expect(sport[0].sport).toBe('Weightlifting')
  })
})