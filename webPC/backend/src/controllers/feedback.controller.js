const prisma = require("../config/prisma");

// User submits feedback
const createFeedback = async (req, res) => {
  try {
    const { ho_ten, email, noi_dung } = req.body;

    if (!ho_ten || !email || !noi_dung) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    const feedback = await prisma.phanHoi.create({
      data: {
        ho_ten,
        email,
        noi_dung,
      },
    });

    res.status(201).json({ message: "Cảm ơn bạn đã gửi phản hồi!", feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Admin gets all feedbacks
const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await prisma.phanHoi.findMany({
      orderBy: { tao_luc: "desc" },
    });
    res.json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Admin updates feedback status
const updateFeedbackStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { trang_thai } = req.body; // CHUA_DOC, DA_DOC, DA_XU_LY

    const feedback = await prisma.phanHoi.update({
      where: { id: Number(id) },
      data: { trang_thai },
    });

    res.json({ message: "Đã cập nhật trạng thái", feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Admin deletes feedback
const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.phanHoi.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Đã xóa phản hồi" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

module.exports = {
  createFeedback,
  getFeedbacks,
  updateFeedbackStatus,
  deleteFeedback,
};
