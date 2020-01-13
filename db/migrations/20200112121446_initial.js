
exports.up = function(knex) {
  return knex.schema.createTable('olympics', (table) => {
    table.increments('id').primary();
    table.string('games');
    table.unique('games');

    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('olympics');
};
