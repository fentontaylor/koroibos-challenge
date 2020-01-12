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
    let games = await DB('olympics')
      .insert({ id: 1, name: '2016 Summer' })
      .returning(['id', 'name'])

    expect(games[0].id).toBe(1)
    expect(games[0].name).toBe('2016 Summer')
  })
})