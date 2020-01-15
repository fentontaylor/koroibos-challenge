const BaseModel = require('../../models/baseModel')

describe('BaseModel', () => {
  it('can initialize', () => {
    let baseModel = new BaseModel();
    expect(baseModel).toBeInstanceOf(BaseModel);
  })

  it('has a null tableName', () => {
    expect(BaseModel.tableName).toBeNull();
  })

  it('has a knex connection', () => {
    let knexObject = BaseModel.knex();
    expect(knexObject).toHaveProperty('select');
    expect(knexObject).toHaveProperty('insert');
    expect(knexObject).toHaveProperty('join');
  })
})