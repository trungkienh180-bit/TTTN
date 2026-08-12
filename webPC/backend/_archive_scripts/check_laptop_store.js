const mysql = require('mysql2/promise');

async function main() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'laptop_store'
  });

  // Get table definitions
  const [tables] = await connection.execute('SHOW TABLES');
  console.log("Tables:", tables);

  // Check phu_kien
  const [phuKien] = await connection.execute('SELECT * FROM phu_kien LIMIT 5');
  console.log("Phu Kien:", phuKien);

  // Check hinh_anh_san_pham
  const [images] = await connection.execute('SELECT * FROM hinh_anh_san_pham LIMIT 10');
  console.log("Images:", images);

  await connection.end();
}

main().catch(console.error);
