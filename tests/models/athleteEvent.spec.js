const DB = require('../../utils/dbConnect');

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
      .insert({ 'id': 2, 'games': '2016 Summer' })
      .returning(['id', 'games'])

    sport = await DB('sports')
      .insert({ 'id': 3, 'sport': 'Weightlifting' })
      .returning(['id', 'sport'])

    event = await DB('events')
      .insert({
        'id': 4,
        'sport_id': sport[0].id,
        'event': "Weightlifting Men's Super- Heavyweight"
      })
      .returning(['id', 'sport_id', 'event'])

    athlete_event = await DB('athlete_events')
      .insert({
        'id': 5,
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
    expect(athlete_event[0].id).toBe(5)
    expect(athlete_event[0].athlete_id).toBe(athlete[0].id)
    expect(athlete_event[0].event_id).toBe(event[0].id)
    expect(athlete_event[0].olympics_id).toBe(olympics[0].id)
    expect(athlete_event[0].medal).toBe('Gold')
  })

  it('cascades on delete when deleting athlete', async() => {
    var athlete_events = await DB('athlete_events')
    expect(athlete_events.length).toBe(1)

    await DB('athletes').del()
    var athlete_events = await DB('athlete_events')
    expect(athlete_events.length).toBe(0)
  })

  it('cascades on delete when deleting event', async() => {
    var athlete_events = await DB('athlete_events')
    expect(athlete_events.length).toBe(1)

    await DB('events').del()
    var athlete_events = await DB('athlete_events')
    expect(athlete_events.length).toBe(0)
  })

  it('cascades on delete when deleting sport', async() => {
    var athlete_events = await DB('athlete_events')
    expect(athlete_events.length).toBe(1)

    await DB('sports').del()
    var athlete_events = await DB('athlete_events')
    expect(athlete_events.length).toBe(0)
  })

  it('cascades on delete when deleting olympics', async() => {
    var athlete_events = await DB('athlete_events')
    expect(athlete_events.length).toBe(1)

    await DB('olympics').del()
    var athlete_events = await DB('athlete_events')
    expect(athlete_events.length).toBe(0)
  })

  it('can join through foreign keys to other tables', async() => {
    let result = await DB('athletes')
      .join('athlete_events', { 'athletes.id': 'athlete_events.athlete_id' })
      .join('olympics', { 'athlete_events.olympics_id': 'olympics.id' })
      .join('events', { 'athlete_events.event_id': 'events.id' })
      .join('sports', { 'events.sport_id': 'sports.id'})

    data = result[0]
    expect(data.name).toBe(athlete[0].name)
    expect(data.sex).toBe(athlete[0].sex)
    expect(data.height).toBe(athlete[0].height)
    expect(data.weight).toBe(athlete[0].weight)
    expect(data.team).toBe(athlete[0].team)
    expect(data.age).toBe(athlete[0].age)
    expect(data.games).toBe(olympics[0].games)
    expect(data.event).toBe(event[0].event)
    expect(data.sport).toBe(sport[0].sport)
    expect(data.medal).toBe(athlete_event[0].medal)
  })
})