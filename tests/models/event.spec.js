const Event = require('../../models/event')
const { destroyAll } = require('../../utils/dbHelpers')
const DB = require('../../utils/dbConnect')

describe ('Event Model', () => {
  beforeEach(async () => {
    await destroyAll();
  })

  afterEach(async () => {
    await destroyAll();
  })

  it('has a tableName', () => {
    expect(Event.tableName).toBe('events');
  })
})