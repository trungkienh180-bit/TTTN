const mysql = require('mysql2/promise');

async function recreateDb() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
  });
  console.log('Dropping laptop_ecommerce...');
  await connection.query('DROP DATABASE IF EXISTS laptop_ecommerce;');
  console.log('Creating laptop_ecommerce...');
  await connection.query('CREATE DATABASE laptop_ecommerce;');
  console.log('Done.');
  await connection.end();
}

recreateDb().catch(console.error);
