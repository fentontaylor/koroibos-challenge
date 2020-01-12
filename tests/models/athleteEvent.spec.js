const config = require('../../knexfile')['test'];
const DB = require('knex')(config);

describe('Olympics table', () => {
  beforeEach(async() => {
    await DB.raw("TRUNCATE TABLE athlete_events CASCADE");
    await DB.raw("TRUNCATE TABLE events CASCADE");
    await DB.raw("TRUNCATE TABLE sports CASCADE");
    await DB.raw("TRUNCATE TABLE olympics CASCADE");
    await DB.raw("TRUNCATE TABLE athletes CASCADE");

    athlete = await DB('athletes')
      .insert({
        'id': 1,
        'name': 'Bob Bobson',
        'sex': 'M',
        'height': 170,
        'weight': 135,
        'age': 35,
        'team': 'USA'
      })
      .returning(['id', 'name', 'sex', 'height', 'weight', 'age', 'team'])

    olympics = await DB('olympics')
      .insert({ 'id': 1, 'name': '2016 Summer' })
      .returning(['id', 'name'])

    sport = await DB('sports')
      .insert({ 'id': 1, 'sport': 'Weightlifting' })
      .returning(['id', 'sport'])

    event = await DB('events')
      .insert({
        'id': 1,
        'sport_id': sport[0].id,
        'event': "Weightlifting Men's Super- Heavyweight"
      })
      .returning(['id', 'sport_id', 'event'])

    athlete_event = await DB('athlete_events')
      .insert({
        'id': 1,
        'athlete_id': athlete[0].id,
        'event_id': event[0].id,
        'olympics_id': olympics[0].id,
        'medal': 'Gold'
      })
      .returning(['id', 'athlete_id', 'event_id', 'olympics_id', 'medal'])
  });

  afterEach(async() => {
    await DB.raw("TRUNCATE TABLE athlete_events CASCADE");
    await DB.raw("TRUNCATE TABLE events CASCADE");
    await DB.raw("TRUNCATE TABLE sports CASCADE");
    await DB.raw("TRUNCATE TABLE olympics CASCADE");
    await DB.raw("TRUNCATE TABLE athletes CASCADE");
  });

  it('has an attributes', async() => {
    expect(athlete_event[0].id).toBe(1)
    expect(athlete_event[0].athlete_id).toBe(athlete[0].id)
    expect(athlete_event[0].event_id).toBe(event[0].id)
    expect(athlete_event[0].olympics_id).toBe(olympics[0].id)
    expect(athlete_event[0].medal).toBe('Gold')
  })

  it('cascades on delete when deleting athlete', async () => {
    var athlete_events = await DB('athlete_events')
    expect(athlete_events.length).toBe(1)

    await DB('athletes').del()
    var athlete_events = await DB('athlete_events')
    expect(athlete_events.length).toBe(0)
  })

  it('cascades on delete when deleting event', async () => {
    var athlete_events = await DB('athlete_events')
    expect(athlete_events.length).toBe(1)

    await DB('events').del()
    var athlete_events = await DB('athlete_events')
    expect(athlete_events.length).toBe(0)
  })

  it('cascades on delete when deleting sport', async () => {
    var athlete_events = await DB('athlete_events')
    expect(athlete_events.length).toBe(1)

    await DB('sports').del()
    var athlete_events = await DB('athlete_events')
    expect(athlete_events.length).toBe(0)
  })

  it('cascades on delete when deleting olympics', async () => {
    var athlete_events = await DB('athlete_events')
    expect(athlete_events.length).toBe(1)

    await DB('olympics').del()
    var athlete_events = await DB('athlete_events')
    expect(athlete_events.length).toBe(0)
  })
})