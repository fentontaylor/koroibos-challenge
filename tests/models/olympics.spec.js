const config = require('../../knexfile')['test'];
const DB = require('knex')(config);

describe('Olympics table', () => {
  beforeEach(async() => {
    await DB.raw("TRUNCATE TABLE olympics CASCADE");
  });

  afterEach(async() => {
    await DB.raw("TRUNCATE TABLE olympics CASCADE");
  });

  it('has an id and name', async() => {
    let result = await DB('olympics')
      .insert({ id: 1, games: '2016 Summer' })
      .returning(['id', 'games'])

    expect(result[0].id).toBe(1)
    expect(result[0].games).toBe('2016 Summer')
  })
})