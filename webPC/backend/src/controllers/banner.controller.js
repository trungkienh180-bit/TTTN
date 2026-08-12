const prisma = require("../config/prisma");

const getBanners = async (req, res) => {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: { tao_luc: "desc" },
    });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

const createBanner = async (req, res) => {
  try {
    const { tieu_de, lien_ket } = req.body;
    const hinh_anh = req.file ? `/uploads/${req.file.filename}` : null;

    if (!hinh_anh)
      return res.status(400).json({ message: "Vui lòng tải lên hình ảnh" });

    const banner = await prisma.banner.create({
      data: { tieu_de, lien_ket, hinh_anh },
    });
    res.status(201).json(banner);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.banner.delete({ where: { id: Number(id) } });
    res.json({ message: "Đã xóa banner" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

module.exports = { getBanners, createBanner, deleteBanner };
