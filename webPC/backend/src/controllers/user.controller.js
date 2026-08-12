const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");

const calculateRank = (totalSpent) => {
  if (totalSpent >= 156250000) return "VIP";
  if (totalSpent >= 62500000) return "Kim Cương";
  if (totalSpent >= 25000000) return "Vàng";
  if (totalSpent >= 10000000) return "Bạc";
  return "Thành Viên";
};

// Khách hàng lấy thông tin cá nhân
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await prisma.nguoiDung.findUnique({
      where: { id: userId },
      include: {
        don_hangs: {
          where: {
            OR: [{ trang_thai_tt: "DA_THANH_TOAN" }, { trang_thai: "DA_GIAO" }],
          },
          select: { tong_tien: true },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    const totalSpent = user.don_hangs.reduce(
      (sum, order) => sum + Number(order.tong_tien),
      0,
    );
    const rank = calculateRank(totalSpent);

    const { mat_khau, ...userWithoutPassword } = user;

    res.json({
      ...userWithoutPassword,
      tong_tien_da_mua: totalSpent,
      hang_thanh_vien: rank,
    });
  } catch (error) {
    console.error("Lỗi khi lấy thông tin:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Khách hàng cập nhật hồ sơ
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { ho_ten, so_dien_thoai, dia_chi, gioi_tinh, ngay_sinh } = req.body;
    let updateData = { ho_ten, so_dien_thoai, dia_chi, gioi_tinh };

    if (ngay_sinh) {
      updateData.ngay_sinh = new Date(ngay_sinh);
    }

    if (req.file) {
      updateData.avatar = `/uploads/${req.file.filename}`;

      const oldUser = await prisma.nguoiDung.findUnique({
        where: { id: userId },
      });
      if (oldUser.avatar) {
        const oldPath = path.join(__dirname, "../../", oldUser.avatar);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    }

    const updatedUser = await prisma.nguoiDung.update({
      where: { id: userId },
      data: updateData,
    });

    const { mat_khau, ...userWithoutPassword } = updatedUser;
    res.json({
      message: "Cập nhật hồ sơ thành công",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật hồ sơ:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

const bcrypt = require("bcrypt");

const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const user = await prisma.nguoiDung.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.mat_khau);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu cũ không chính xác" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.nguoiDung.update({
      where: { id: userId },
      data: { mat_khau: hashedPassword },
    });

    res.json({ message: "Đổi mật khẩu thành công" });
  } catch (error) {
    console.error("Lỗi khi đổi mật khẩu:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await prisma.donHang.findMany({
      where: { nguoi_dung_id: userId },
      orderBy: { tao_luc: "desc" },
      include: {
        chi_tiet: {
          include: {
            san_pham: {
              select: { ten_san_pham: true, hinh_anh: true },
            },
          },
        },
      },
    });

    res.json(orders);
  } catch (error) {
    console.error("Lỗi khi lấy lịch sử đơn hàng:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Admin gets all users
const getUsers = async (req, res) => {
  try {
    const users = await prisma.nguoiDung.findMany({
      select: {
        id: true,
        ho_ten: true,
        email: true,
        vai_tro: true,
        tao_luc: true,
      },
      orderBy: { tao_luc: "desc" },
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Admin updates user role
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { vai_tro } = req.body;

    // Prevent changing role of super admin if needed, or simple update:
    const user = await prisma.nguoiDung.update({
      where: { id: Number(id) },
      data: { vai_tro },
      select: {
        id: true,
        ho_ten: true,
        email: true,
        vai_tro: true,
      },
    });

    res.json({ message: "Đã cập nhật quyền", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Admin deletes user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Optional: prevent deleting self
    if (Number(id) === req.user.id) {
      return res
        .status(400)
        .json({ message: "Không thể tự xóa tài khoản đang đăng nhập" });
    }

    await prisma.nguoiDung.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Đã xóa người dùng" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

module.exports = {
  getUsers,
  updateUserRole,
  deleteUser,
  getProfile,
  updateProfile,
  changePassword,
  getMyOrders,
};
