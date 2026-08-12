const mysql = require('mysql2/promise');

async function run() {
  const c = await mysql.createConnection({host:'localhost',user:'root',password:'123456',database:'laptop_store'});
  
  const [sanPham] = await c.execute('SELECT ma_san_pham, ten_san_pham FROM san_pham WHERE ten_san_pham LIKE "%Akko%" OR ten_san_pham LIKE "%Razer%" OR ten_san_pham LIKE "%Logitech%"');
  console.log('SanPham:', sanPham);
  
  const [phuKien] = await c.execute('SELECT ma_phu_kien, ten_phu_kien FROM phu_kien WHERE ten_phu_kien LIKE "%Akko%"');
  console.log('PhuKien Akko:', phuKien);

  if (phuKien.length > 0) {
     const ma = phuKien[0].ma_phu_kien;
     const [imgs1] = await c.execute('SELECT * FROM hinh_anh_san_pham WHERE ma_phu_kien = ?', [ma]);
     console.log('Images by ma_phu_kien:', imgs1);
     const [imgs2] = await c.execute('SELECT * FROM hinh_anh_san_pham WHERE ma_san_pham = ?', [ma]);
     console.log('Images by ma_san_pham (if accidentally linked):', imgs2);
  }

  const [imgs3] = await c.execute('SELECT * FROM hinh_anh_san_pham WHERE duong_dan_anh LIKE "%akko%"');
  console.log('Images containing akko in URL:', imgs3);

  const [allImages] = await c.execute('SELECT COUNT(*) as total FROM hinh_anh_san_pham');
  console.log('Total images in hinh_anh_san_pham:', allImages[0].total);

  await c.end();
}
run();
