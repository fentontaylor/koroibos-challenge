const Athlete = require('../../models/athlete')

describe('Athlete Model', () => {
  it('can initialize', () => {
    let athlete = new Athlete();
    expect(athlete).toBeInstanceOf(Athlete);
  })

  it('has a null tableName', () => {
    expect(Athlete.tableName).toBe('athletes');
  })
})