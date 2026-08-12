import axios from "axios";

class PaymentService {
  /**
   * Gửi API tạo đơn hàng
   * @param {Object} orderPayload Dữ liệu đơn hàng (bao gồm phương thức thanh toán)
   * @param {String} token Token đăng nhập (nếu có)
   * @returns {Object} Data phản hồi từ server (bao gồm checkoutUrl nếu thanh toán online)
   */
  static async processCheckout(orderPayload, token) {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    const response = await axios.post(
      "http://localhost:5000/api/orders",
      orderPayload,
      config,
    );
    return response.data;
  }

  /**
   * Chuyển hướng người dùng sang trang thanh toán nếu backend có trả về checkoutUrl
   * @param {String} checkoutUrl URL của cổng thanh toán
   */
  static redirectIfRequired(checkoutUrl) {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  }
}

export default PaymentService;
