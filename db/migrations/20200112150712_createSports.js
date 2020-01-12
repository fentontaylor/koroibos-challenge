
exports.up = function(knex) {
  return knex.schema.createTable('sports', (table) => {
    table.increments('id').primary();
    table.string('sport').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('sports');
};
