const prisma = require("../config/prisma");

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await prisma.danhMuc.findMany({
      include: {
        _count: {
          select: { san_phams: true },
        },
      },
    });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Get single category by ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.danhMuc.findUnique({
      where: { id: Number(id) },
    });

    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Create new category
const createCategory = async (req, res) => {
  try {
    const { ten_danh_muc, mo_ta } = req.body;

    if (!ten_danh_muc) {
      return res.status(400).json({ message: "Tên danh mục là bắt buộc" });
    }

    const category = await prisma.danhMuc.create({
      data: {
        ten_danh_muc,
        mo_ta,
      },
    });

    res.status(201).json({ message: "Tạo danh mục thành công", category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Update category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { ten_danh_muc, mo_ta } = req.body;

    const category = await prisma.danhMuc.update({
      where: { id: Number(id) },
      data: {
        ten_danh_muc,
        mo_ta,
      },
    });

    res.json({ message: "Cập nhật danh mục thành công", category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.danhMuc.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Xóa danh mục thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
