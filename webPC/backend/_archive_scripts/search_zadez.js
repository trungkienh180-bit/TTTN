const mysql = require('mysql2/promise');
async function run() {
  const c = await mysql.createConnection({host:'localhost',user:'root',password:'123456',database:'laptop_store'});
  const [inHinhAnh] = await c.execute('SELECT * FROM hinh_anh_san_pham WHERE duong_dan_anh LIKE "%zadez%"');
  console.log('Images in hinh_anh_san_pham:', inHinhAnh);
  
  const [inSanPham] = await c.execute('SELECT ma_san_pham, ten_san_pham, anh_dai_dien FROM san_pham WHERE anh_dai_dien LIKE "%zadez%"');
  console.log('Images in san_pham:', inSanPham);
  
  const [inPhuKien] = await c.execute('SELECT ma_phu_kien, ten_phu_kien, anh_dai_dien FROM phu_kien WHERE anh_dai_dien LIKE "%zadez%"');
  console.log('Images in phu_kien:', inPhuKien);

  await c.end();
}
run();
