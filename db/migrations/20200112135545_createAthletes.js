
exports.up = function(knex) {
  return knex.schema.createTable('athletes', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('sex');
    table.string('team');
    table.integer('height');
    table.integer('weight');
    table.integer('age');

    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('athletes');
};
