const prisma = require("../config/prisma");

// Get all products
const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      sort,
      minPrice,
      maxPrice,
    } = req.query;

    // Build query
    const where = {};
    if (search) {
      const s = search.toLowerCase();
      const synonymsDict = [
        ["máy tính", "pc", "computer"],
        ["laptop", "lap", "máy tính xách tay"],
        ["chuột", "mouse", "chuot"],
        ["bàn phím", "keyboard", "ban phim"],
        ["tai nghe", "headphone", "headset", "earphone"],
        ["màn hình", "monitor", "screen", "man hinh"],
        ["card màn hình", "vga", "card đồ họa", "gpu", "card do hoa"],
        ["bo mạch chủ", "mainboard", "main", "bo mach chu"],
        ["bộ nhớ trong", "ram", "memory"],
        ["ổ cứng", "ssd", "hdd", "o cung"],
        ["tản nhiệt", "cooler", "tan nhiet"],
        ["nguồn", "psu", "nguon", "power"],
        ["vỏ case", "case", "thùng máy", "vo case"],
      ];

      let searchQueries = [search];
      for (const group of synonymsDict) {
        const sortedGroup = [...group].sort((a, b) => b.length - a.length);
        for (const word of sortedGroup) {
          if (s.includes(word)) {
            for (const synonym of group) {
              if (synonym !== word) {
                const newQuery = s.replace(new RegExp(word, "gi"), synonym);
                searchQueries.push(newQuery);
              }
            }
            break;
          }
        }
      }

      searchQueries = [...new Set(searchQueries)];
      where.OR = searchQueries.map((q) => ({ ten_san_pham: { contains: q } }));
    }
    if (category) {
      where.danh_muc_id = Number(category);
    }

    if (minPrice || maxPrice) {
      where.gia_ban = {};
      if (minPrice) where.gia_ban.gte = Number(minPrice);
      if (maxPrice) where.gia_ban.lte = Number(maxPrice);
    }

    // Build sort
    let orderBy = {};
    if (sort === "price_asc") orderBy = { gia_ban: "asc" };
    else if (sort === "price_desc") orderBy = { gia_ban: "desc" };
    else if (sort === "name_asc") orderBy = { ten_san_pham: "asc" };
    else if (sort === "name_desc") orderBy = { ten_san_pham: "desc" };
    else orderBy = { tao_luc: "desc" }; // default latest

    // Execute query
    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      prisma.sanPham.findMany({
        where,
        orderBy,
        skip,
        take: Number(limit),
        include: {
          danh_muc: {
            select: { ten_danh_muc: true },
          },
        },
      }),
      prisma.sanPham.count({ where }),
    ]);

    res.json({
      products,
      pagination: {
        total,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Get single product
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.sanPham.findUnique({
      where: { id: Number(id) },
      include: {
        danh_muc: true,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Create product (Admin)
const createProduct = async (req, res) => {
  try {
    const {
      danh_muc_id,
      ten_san_pham,
      gia_ban,
      gia_khuyen_mai,
      so_luong,
      mo_ta,
      la_moi,
      la_giam_gia,
      la_ban_chay,
      hang_san_xuat,
      mainboard,
      cpu,
      ram,
      vga,
      o_cung,
      tan_nhiet,
      vo_case,
      nguon,
      he_dieu_hanh,
      hinh_anh_1,
      hinh_anh_2,
      hinh_anh_3,
    } = req.body;

    let hinh_anh = req.body.hinh_anh || "";
    if (req.file) {
      hinh_anh = `/uploads/${req.file.filename}`;
    }

    const product = await prisma.sanPham.create({
      data: {
        danh_muc_id: Number(danh_muc_id),
        ten_san_pham,
        gia_ban: Number(gia_ban),
        gia_khuyen_mai: gia_khuyen_mai ? Number(gia_khuyen_mai) : null,
        so_luong: Number(so_luong) || 0,
        mo_ta,
        hinh_anh,
        hinh_anh_1,
        hinh_anh_2,
        hinh_anh_3,
        la_moi: la_moi === "true",
        la_giam_gia: la_giam_gia === "true",
        la_ban_chay: la_ban_chay === "true",
        hang_san_xuat,
        mainboard,
        cpu,
        ram,
        vga,
        o_cung,
        tan_nhiet,
        vo_case,
        nguon,
        he_dieu_hanh,
      },
    });

    res.status(201).json({ message: "Tạo sản phẩm thành công", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Update product (Admin)
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      danh_muc_id,
      ten_san_pham,
      gia_ban,
      gia_khuyen_mai,
      so_luong,
      mo_ta,
      la_moi,
      la_giam_gia,
      la_ban_chay,
      hang_san_xuat,
      mainboard,
      cpu,
      ram,
      vga,
      o_cung,
      tan_nhiet,
      vo_case,
      nguon,
      he_dieu_hanh,
      hinh_anh_1,
      hinh_anh_2,
      hinh_anh_3,
    } = req.body;

    // Check if new image is uploaded
    const updateData = {
      danh_muc_id: danh_muc_id ? Number(danh_muc_id) : undefined,
      ten_san_pham,
      gia_ban: gia_ban ? Number(gia_ban) : undefined,
      gia_khuyen_mai: gia_khuyen_mai ? Number(gia_khuyen_mai) : null,
      so_luong: so_luong !== undefined ? Number(so_luong) : undefined,
      mo_ta,
      hinh_anh_1: hinh_anh_1 !== undefined ? hinh_anh_1 : undefined,
      hinh_anh_2: hinh_anh_2 !== undefined ? hinh_anh_2 : undefined,
      hinh_anh_3: hinh_anh_3 !== undefined ? hinh_anh_3 : undefined,
      la_moi: la_moi === "true",
      la_giam_gia: la_giam_gia === "true",
      la_ban_chay: la_ban_chay === "true",
      hang_san_xuat,
      mainboard,
      cpu,
      ram,
      vga,
      o_cung,
      tan_nhiet,
      vo_case,
      nguon,
      he_dieu_hanh,
    };

    if (req.file) {
      updateData.hinh_anh = `/uploads/${req.file.filename}`;
    } else if (req.body.hinh_anh) {
      updateData.hinh_anh = req.body.hinh_anh;
    }

    const product = await prisma.sanPham.update({
      where: { id: Number(id) },
      data: updateData,
    });

    res.json({ message: "Cập nhật sản phẩm thành công", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.sanPham.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Xóa sản phẩm thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
