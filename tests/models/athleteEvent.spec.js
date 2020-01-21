const AthleteEvent = require('../../models/athleteEvent');
const { destroyAll } = require('../../utils/dbHelpers');
const DB = require('../../utils/dbConnect');

describe('Event Model', () => {
  beforeEach(async () => {
    await destroyAll();
  })

  afterEach(async () => {
    await destroyAll();
  })

  it('has a tableName', () => {
    expect(AthleteEvent.tableName).toBe('athlete_events');
  })
})