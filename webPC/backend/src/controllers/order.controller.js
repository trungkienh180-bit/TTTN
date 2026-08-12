const prisma = require("../config/prisma");
const PaymentService = require("../services/payment/payment.service");
const PayOSStrategy = require("../services/payment/payos.strategy");

// Khởi tạo payment service với PayOS
const paymentService = new PaymentService(new PayOSStrategy());

// 1. Tạo đơn hàng (Checkout)
const createOrder = async (req, res) => {
  try {
    const nguoi_dung_id = req.user ? req.user.id : null;
    const {
      ho_ten,
      email,
      dia_chi_giao,
      so_dien_thoai,
      ghi_chu,
      phuong_thuc_tt,
      items,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Danh sách sản phẩm trống" });
    }

    // Lấy thông tin giá thật từ DB để tính tổng tiền (chống hack giá từ FE)
    let tong_tien = 0;
    const chiTietDonHangs = [];

    for (const item of items) {
      const sanPham = await prisma.sanPham.findUnique({
        where: { id: item.san_pham_id },
      });
      if (!sanPham) continue;

      const gia = sanPham.gia_khuyen_mai
        ? Number(sanPham.gia_khuyen_mai)
        : Number(sanPham.gia_ban);
      tong_tien += gia * item.so_luong;

      chiTietDonHangs.push({
        san_pham_id: item.san_pham_id,
        so_luong: item.so_luong,
        gia_mua: gia,
      });
    }

    if (chiTietDonHangs.length === 0) {
      return res.status(400).json({ message: "Sản phẩm không hợp lệ" });
    }

    // Tạo Order
    const newOrder = await prisma.donHang.create({
      data: {
        nguoi_dung_id,
        ten_khach_hang: ho_ten,
        email_khach_hang: email,
        tong_tien,
        dia_chi_giao,
        so_dien_thoai,
        ghi_chu,
        phuong_thuc_tt,
        chi_tiet: {
          create: chiTietDonHangs,
        },
      },
    });

    // Nếu có user và không phải PAYOS, xóa giỏ hàng (vì PAYOS chưa chắc đã thanh toán)
    if (nguoi_dung_id && phuong_thuc_tt !== "PAYOS") {
      const cart = await prisma.gioHang.findFirst({ where: { nguoi_dung_id } });
      if (cart) {
        await prisma.chiTietGioHang.deleteMany({
          where: { gio_hang_id: cart.id },
        });
      }
    }

    // Xử lý tạo link thanh toán nếu chọn PayOS / Online
    let checkoutUrl = null;
    if (phuong_thuc_tt === "PAYOS") {
      const orderInfo = {
        orderCode: newOrder.id,
        amount: Math.round(tong_tien), // PayOS yêu cầu số nguyên
        description: `Thanh toan don hang ${newOrder.id}`,
        items: chiTietDonHangs.map((item) => ({
          name: `San pham ID: ${item.san_pham_id}`, // Có thể lấy tên SP thật nếu map kỹ hơn
          quantity: item.so_luong,
          price: Math.round(Number(item.gia_mua)),
        })),
      };

      const paymentLink = await paymentService.createPaymentLink(orderInfo);
      checkoutUrl = paymentLink.checkoutUrl;

      // Update ma_giao_dich
      await prisma.donHang.update({
        where: { id: newOrder.id },
        data: { ma_giao_dich: paymentLink.paymentLinkId },
      });
    }

    res.status(201).json({
      message: "Tạo đơn hàng thành công",
      orderId: newOrder.id,
      checkoutUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// 2. Lấy danh sách đơn hàng của User
const getUserOrders = async (req, res) => {
  try {
    const orders = await prisma.donHang.findMany({
      where: { nguoi_dung_id: req.user.id },
      include: {
        chi_tiet: {
          include: { san_pham: true },
        },
      },
      orderBy: { tao_luc: "desc" },
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// 3. Webhook PayOS xử lý kết quả thanh toán
const payosWebhook = async (req, res) => {
  try {
    const webhookData = req.body;

    // Verify dữ liệu webhook bằng service
    const verifiedData = await paymentService.verifyPayment(webhookData);

    if (verifiedData.code === "00") {
      // Mã thành công từ PayOS
      const orderId = Number(verifiedData.orderCode);

      const order = await prisma.donHang.update({
        where: { id: orderId },
        data: {
          trang_thai_tt: "DA_THANH_TOAN",
          trang_thai: "DANG_XU_LY",
        },
        include: { chi_tiet: true },
      });

      // Xoá các sản phẩm đã mua khỏi giỏ hàng sau khi thanh toán thành công
      if (order.nguoi_dung_id) {
        const cart = await prisma.gioHang.findFirst({
          where: { nguoi_dung_id: order.nguoi_dung_id },
        });
        if (cart) {
          const productIds = order.chi_tiet.map((item) => item.san_pham_id);
          await prisma.chiTietGioHang.deleteMany({
            where: {
              gio_hang_id: cart.id,
              san_pham_id: { in: productIds },
            },
          });
        }
      }

      return res.json({ success: true, message: "Webhook xử lý thành công" });
    }

    res.json({ success: false, message: "Thanh toán thất bại" });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(400).json({ success: false, message: "Invalid webhook" });
  }
};

// 4. Lấy tất cả đơn hàng (Admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.donHang.findMany({
      include: {
        chi_tiet: {
          include: { san_pham: { include: { danh_muc: true } } },
        },
      },
      orderBy: { tao_luc: "desc" },
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// 5. Cập nhật trạng thái đơn hàng (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { trang_thai, trang_thai_tt } = req.body;

    const updatedOrder = await prisma.donHang.update({
      where: { id: Number(id) },
      data: {
        ...(trang_thai && { trang_thai }),
        ...(trang_thai_tt && { trang_thai_tt }),
      },
    });

    res.json({
      message: "Cập nhật trạng thái thành công",
      order: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  payosWebhook,
  updateOrderStatus,
};
