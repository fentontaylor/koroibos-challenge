
exports.up = function(knex) {
  return knex.schema.createTable('sports', (table) => {
    table.increments('id').primary();
    table.string('sport');
    table.unique('sport');

    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('sports');
};
