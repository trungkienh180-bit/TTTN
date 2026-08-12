const mysql = require('mysql2/promise');

async function createDb() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
  });
  await connection.query('CREATE DATABASE IF NOT EXISTS laptop_ecommerce;');
  console.log('Database created or already exists.');
  await connection.end();
}

createDb().catch(console.error);
