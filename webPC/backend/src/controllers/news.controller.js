const prisma = require("../config/prisma");

const getNews = async (req, res) => {
  try {
    const news = await prisma.tinTuc.findMany({
      orderBy: { tao_luc: "desc" },
    });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await prisma.tinTuc.findUnique({
      where: { id: Number(id) },
      include: { san_pham: true },
    });
    if (!news) return res.status(404).json({ message: "Không tìm thấy" });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

const createNews = async (req, res) => {
  try {
    const { tieu_de, noi_dung, san_pham_id } = req.body;
    const hinh_anh = req.file ? `/uploads/${req.file.filename}` : null;

    if (!hinh_anh || !tieu_de || !noi_dung)
      return res
        .status(400)
        .json({ message: "Vui lòng điền đủ thông tin và chọn ảnh" });

    const newsData = { tieu_de, noi_dung, hinh_anh };
    if (san_pham_id) {
      newsData.san_pham_id = Number(san_pham_id);
    }

    const news = await prisma.tinTuc.create({
      data: newsData,
    });
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.tinTuc.delete({ where: { id: Number(id) } });
    res.json({ message: "Đã xóa tin tức" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { tieu_de, noi_dung, san_pham_id } = req.body;

    // Tìm tin tức cũ để biết hình ảnh cũ
    const oldNews = await prisma.tinTuc.findUnique({
      where: { id: Number(id) },
    });
    if (!oldNews)
      return res.status(404).json({ message: "Không tìm thấy tin tức" });

    const hinh_anh = req.file
      ? `/uploads/${req.file.filename}`
      : oldNews.hinh_anh;

    const newsData = {
      tieu_de: tieu_de || oldNews.tieu_de,
      noi_dung: noi_dung || oldNews.noi_dung,
      hinh_anh,
    };

    if (san_pham_id) {
      newsData.san_pham_id = Number(san_pham_id);
    } else {
      newsData.san_pham_id = null;
    }

    const news = await prisma.tinTuc.update({
      where: { id: Number(id) },
      data: newsData,
    });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

module.exports = { getNews, getNewsById, createNews, updateNews, deleteNews };
