
exports.up = function(knex) {
  return knex.schema.createTable('events', (table) => {
    table.increments('id').primary();
    table.integer('sport_id')
      .unsigned()
      .notNullable()
      .references('sports.id')
      .onDelete('CASCADE');
    table.string('event');
    table.unique('event');

    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('events');
};
