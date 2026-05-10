/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('crime_reports', (table) => {
    table.increments('id').primary();
    
    // Links report to a user. If user is deleted, their reports are deleted.
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');

    table.string('type').nullable(); 
    table.text('description').nullable();

    // --- REMOVE THE "exports.up" LINE THAT WAS HERE ---

    // GPS Coordinates
    table.decimal('latitude', 10, 8).notNullable();
    table.decimal('longitude', 11, 8).notNullable();
    
    table.string('status').defaultTo('active'); 
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('crime_reports');
}
