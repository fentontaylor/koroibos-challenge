const config = require('../../knexfile')['test'];
const DB = require('knex')(config);
const seedHelpers = require('../../utils/seedHelpers');
const {
  createOlympics,
  createAthlete,
  createSport,
  createEvent
} = seedHelpers;

describe('Seed Helper functions', () => {
  beforeEach(async () => {
    await DB.raw("TRUNCATE TABLE athlete_events CASCADE");
    await DB.raw("TRUNCATE TABLE events CASCADE");
    await DB.raw("TRUNCATE TABLE sports CASCADE");
    await DB.raw("TRUNCATE TABLE olympics CASCADE");
    await DB.raw("TRUNCATE TABLE athletes CASCADE");

    data = {
      Name: 'Ciara Everard',
      Sex: 'F',
      Age: '26',
      Height: '169',
      Weight: '54',
      Team: 'Ireland',
      Games: '2016 Summer',
      Sport: 'Athletics',
      Event: 'Athletics Women\'s 800 metres',
      Medal: 'Bronze'
    }
  });

  afterEach(async () => {
    await DB.raw("TRUNCATE TABLE athlete_events CASCADE");
    await DB.raw("TRUNCATE TABLE events CASCADE");
    await DB.raw("TRUNCATE TABLE sports CASCADE");
    await DB.raw("TRUNCATE TABLE olympics CASCADE");
    await DB.raw("TRUNCATE TABLE athletes CASCADE");
  });

  describe('createOlympics', () => {
    it('creates an olympics record, but not duplicates', async () => {
      let olympics = await createOlympics(data);
      expect(olympics.games).toBe('2016 Summer');

      let olympics2 = await createOlympics(data);
      expect(olympics2.games).toBe('2016 Summer');

      let allOlympics = await DB('olympics');
      expect(allOlympics.length).toBe(1);
    })

    describe('createAthlete', () => {
      it('creates an athlete record from data', async () => {
        let athlete = await createAthlete(data);
        expect(athlete.name).toBe('Ciara Everard');
        expect(athlete.sex).toBe('F');
        expect(athlete.height).toBe(169);
        expect(athlete.weight).toBe(54);
        expect(athlete.age).toBe(26);
        expect(athlete.team).toBe('Ireland');
      })

      it('creates an athlete record from data', async () => {
        let nullData = {
          Name: 'Ciara Everard',
          Sex: 'NA',
          Age: 'NA',
          Height: 'NA',
          Weight: 'NA',
          Team: 'NA',
          Games: '2016 Summer',
          Sport: 'Athletics',
          Event: 'Athletics Women\'s 800 metres',
          Medal: 'NA'
        }

        let athlete = await createAthlete(nullData);
        expect(athlete.name).toBe('Ciara Everard');
        expect(athlete.sex).toBeNull();
        expect(athlete.height).toBeNull();
        expect(athlete.weight).toBeNull();
        expect(athlete.age).toBeNull();
        expect(athlete.team).toBeNull();
      })
    })

    describe('createSport', () => {
      it('creates a record of a sport without creating duplicates', async () => {
        let sport = await createSport(data);
        expect(sport.sport).toBe('Athletics');

        let sport2 = await createSport(data);
        expect(sport2.sport).toBe('Athletics');

        let allSports = await DB('sports');
        expect(allSports.length).toBe(1);
      })
    })

    describe('createEvent', () => {
      it('creates a record of an even without creating duplicates', async () => {
        let sport = await createSport(data);

        let event = await createEvent(data, sport);
        expect(event.event).toBe('Athletics Women\'s 800 metres');

        let event2 = await createEvent(data, sport);
        expect(event2.event).toBe('Athletics Women\'s 800 metres');

        let allEvents = await DB('events');
        expect(allEvents.length).toBe(1);
      })
    })

    describe('createAthleteEvent', () => {
      it('creates an athlete_event', async () => {
        let athlete = await createAthlete(data);
        let olympics = await createOlympics(data);
        let sport = await createSport(data);
        let event = await createEvent(data, sport);
        let athleteEvent = await createAthleteEvent(data, athlete, event, olympics);

        expect(athleteEvent.athlete_id).toBe(athlete.id);
        expect(athleteEvent.event_id).toBe(event.id);
        expect(athleteEvent.olympics_id).toBe(olympics.id);
        expect(athleteEvent.medal).toBe('Bronze')
      })

      t('creates with "null" for medal if value is "NA"', async () => {
        let nullData = {
          Name: 'Ciara Everard',
          Sex: 'NA',
          Age: 'NA',
          Height: 'NA',
          Weight: 'NA',
          Team: 'NA',
          Games: '2016 Summer',
          Sport: 'Athletics',
          Event: 'Athletics Women\'s 800 metres',
          Medal: 'NA'
        }

        let athlete = await createAthlete(nullData);
        let olympics = await createOlympics(nullData);
        let sport = await createSport(nullData);
        let event = await createEvent(nullData, sport);
        let athleteEvent = await createAthleteEvent(nullData, athlete, event, olympics);

        expect(athleteEvent.athlete_id).toBe(athlete.id);
        expect(athleteEvent.event_id).toBe(event.id);
        expect(athleteEvent.olympics_id).toBe(olympics.id);
        expect(athleteEvent.medal).toBe('Bronze')
      })
    })

    describe('error handling', () => {
      it('catches internal errors', async () => {
        await createAthlete();
        await createOlympics();
        await createSport();
        await createEvent();
      })
    })
  })
})