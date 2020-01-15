const Athlete = require('../../models')

describe('Athlete Model', () => {
  it('can initialize', () => {
    let athlete = new Athlete();
    expect(athlete).toBeInstanceOf(Athlete);
  })

  it('has a null tableName', () => {
    expect(BaseModel.tableName).toBe('athletes');
  })
})