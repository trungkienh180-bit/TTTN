const prisma = require("../config/prisma");

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { san_pham_id, so_luong } = req.body;
    const nguoi_dung_id = req.user.id; // From verifyToken middleware

    // 1. Find or create Cart for user
    let cart = await prisma.gioHang.findFirst({
      where: { nguoi_dung_id },
    });

    if (!cart) {
      cart = await prisma.gioHang.create({
        data: { nguoi_dung_id },
      });
    }

    // 2. Check if item exists in cart
    const existingItem = await prisma.chiTietGioHang.findFirst({
      where: {
        gio_hang_id: cart.id,
        san_pham_id: Number(san_pham_id),
      },
    });

    if (existingItem) {
      // Update quantity
      const updatedItem = await prisma.chiTietGioHang.update({
        where: { id: existingItem.id },
        data: { so_luong: existingItem.so_luong + (Number(so_luong) || 1) },
      });
      return res.json({ message: "Đã cập nhật số lượng", item: updatedItem });
    }

    // Add new item
    const newItem = await prisma.chiTietGioHang.create({
      data: {
        gio_hang_id: cart.id,
        san_pham_id: Number(san_pham_id),
        so_luong: Number(so_luong) || 1,
      },
    });

    res.status(201).json({ message: "Đã thêm vào giỏ hàng", item: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Get cart items
const getCart = async (req, res) => {
  try {
    const nguoi_dung_id = req.user.id;

    const cart = await prisma.gioHang.findFirst({
      where: { nguoi_dung_id },
      include: {
        chi_tiet: {
          include: {
            san_pham: true,
          },
        },
      },
    });

    if (!cart) {
      return res.json({ items: [], total: 0 });
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params; // id của chi tiết giỏ hàng
    await prisma.chiTietGioHang.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Đã xóa sản phẩm khỏi giỏ" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { so_luong } = req.body;

    if (Number(so_luong) < 1) {
      return res.status(400).json({ message: "Số lượng không hợp lệ" });
    }

    const updatedItem = await prisma.chiTietGioHang.update({
      where: { id: Number(id) },
      data: { so_luong: Number(so_luong) },
    });

    res.json({ message: "Đã cập nhật số lượng", item: updatedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
};
