
exports.up = function(knex) {
  return knex.schema.createTable('athletes', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('sex').notNullable();
    table.string('team').notNullable();
    table.integer('height').notNullable();
    table.integer('weight').notNullable();
    table.integer('age').notNullable();

    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('athletes');
};
