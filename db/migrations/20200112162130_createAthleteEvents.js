
exports.up = function(knex) {
  return knex.schema.createTable('athlete_events', (table) => {
    table.increments('id').primary();
    table.integer('athlete_id')
      .unsigned()
      .notNullable()
      .references('athletes.id')
      .onDelete('CASCADE');
    table.integer('event_id')
      .unsigned()
      .notNullable()
      .references('events.id')
      .onDelete('CASCADE');
    table.integer('olympics_id')
      .unsigned()
      .notNullable()
      .references('olympics.id')
      .onDelete('CASCADE');
    table.string('medal');
    
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('athlete_events');
};
