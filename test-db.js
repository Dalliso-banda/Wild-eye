import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'wild_eye_admin',
    password: 'your_secure_password',
    database: 'wild',
    port: 5432,
  },
});

try {
  const result = await db.raw('SELECT 1+1 AS result');
  console.log('✅ Connection successful:', result.rows[0]);
} catch (err) {
  console.error('❌ Connection error:', err.message);
} finally {
  await db.destroy();
}
