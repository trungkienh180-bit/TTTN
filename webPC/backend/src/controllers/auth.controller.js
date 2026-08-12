const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { ho_ten, email, mat_khau, so_dien_thoai, dia_chi } = req.body;

    if (!ho_ten || !email || !mat_khau) {
      return res.status(400).json({ message: "Vui lòng nhập đủ thông tin" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Email không hợp lệ" });
    }

    if (mat_khau.length < 6) {
      return res.status(400).json({ message: "Mật khẩu phải từ 6 ký tự" });
    }

    // Check if user exists
    const existingUser = await prisma.nguoiDung.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email này đã được sử dụng" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(mat_khau, 10);

    // Create user
    const user = await prisma.nguoiDung.create({
      data: {
        ho_ten,
        email,
        mat_khau: hashedPassword,
        so_dien_thoai: so_dien_thoai || null,
        dia_chi: dia_chi || null,
      },
    });

    res.status(201).json({
      message: "Đăng ký thành công",
      user: {
        id: user.id,
        ho_ten: user.ho_ten,
        email: user.email,
        vai_tro: user.vai_tro,
        avatar: user.avatar,
        so_dien_thoai: user.so_dien_thoai,
        dia_chi: user.dia_chi,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, mat_khau } = req.body;

    if (!email || !mat_khau) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập email và mật khẩu" });
    }

    // Find user
    const user = await prisma.nguoiDung.findUnique({
      where: { email },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không đúng" });
    }

    // Check password
    const isMatch = await bcrypt.compare(mat_khau, user.mat_khau);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không đúng" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, vai_tro: user.vai_tro },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      message: "Đăng nhập thành công",
      token,
      user: {
        id: user.id,
        ho_ten: user.ho_ten,
        email: user.email,
        vai_tro: user.vai_tro,
        avatar: user.avatar,
        so_dien_thoai: user.so_dien_thoai,
        dia_chi: user.dia_chi,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

module.exports = {
  register,
  login,
};
