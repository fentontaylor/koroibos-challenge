const DB = require('../../utils/dbConnect');

describe('Olympics table', () => {
  beforeEach(async() => {
    await DB.raw("TRUNCATE TABLE sports CASCADE");
  });

  afterEach(async() => {
    await DB.raw("TRUNCATE TABLE sports CASCADE");
  });

  it('has attributes', async() => {
    let sport = await DB('sports')
      .insert({ 'id': 1, 'sport': 'Weightlifting' })
      .returning(['id', 'sport'])

    expect(sport[0].id).toBe(1)
    expect(sport[0].sport).toBe('Weightlifting')
  })
})