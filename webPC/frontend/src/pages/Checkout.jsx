import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchCart } from "../store/cartSlice";
import { toast } from "react-hot-toast";

const Checkout = () => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [completedOrderId, setCompletedOrderId] = useState(null);

  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return toast.error("Giỏ hàng trống");

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/orders",
        {
          dia_chi_giao: address,
          so_dien_thoai: phone,
          ghi_chu: note,
          phuong_thuc_tt: paymentMethod,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );

      dispatch(fetchCart()); // Refresh giỏ hàng về trống

      if (paymentMethod === "PAYOS" && response.data.checkoutUrl) {
        // Redirect tới trang thanh toán
        window.location.href = response.data.checkoutUrl;
      } else if (paymentMethod === "CHUYEN_KHOAN") {
        setCompletedOrderId(response.data.orderId);
        setShowQR(true);
      } else {
        toast.success("Đặt hàng thành công!");
        navigate("/"); // Có thể navigate qua trang quản lý đơn hàng
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Có lỗi xảy ra khi đặt hàng",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Thanh Toán Đơn Hàng
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form Nhập Thông Tin */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Thông Tin Giao Hàng</h2>
          <form onSubmit={handleCheckout} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Họ và tên
              </label>
              <input
                type="text"
                value={user?.ho_ten || ""}
                disabled
                className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Số điện thoại *
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Địa chỉ giao hàng *
              </label>
              <textarea
                required
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ghi chú
              </label>
              <textarea
                rows="2"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4">
              Phương Thức Thanh Toán
            </h2>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="font-medium text-gray-700">
                  Thanh toán khi nhận hàng (COD)
                </span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer p-3 border border-blue-200 bg-blue-50 rounded-lg hover:bg-blue-100">
                <input
                  type="radio"
                  name="payment"
                  value="PAYOS"
                  checked={paymentMethod === "PAYOS"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-blue-900">
                    Thanh toán Online qua PayOS (Cổng thanh toán tự động)
                  </span>
                  <span className="text-sm text-blue-700">
                    Hỗ trợ tất cả các thẻ ATM/QR Code
                  </span>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer p-3 border border-green-200 bg-green-50 rounded-lg hover:bg-green-100">
                <input
                  type="radio"
                  name="payment"
                  value="CHUYEN_KHOAN"
                  checked={paymentMethod === "CHUYEN_KHOAN"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-green-900">
                    Chuyển khoản qua mã QR (Thủ công)
                  </span>
                  <span className="text-sm text-green-700">
                    Quét mã QR và chuyển khoản thủ công cho chúng tôi
                  </span>
                </div>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:-translate-y-0.5"
            >
              {loading
                ? "Đang xử lý..."
                : `ĐẶT HÀNG TRỊ GIÁ: ${totalAmount.toLocaleString()}đ`}
            </button>
          </form>
        </div>

        {/* Tóm tắt đơn hàng */}
        <div className="lg:w-1/3 bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-semibold mb-6">Tóm Tắt Đơn Hàng</h2>
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <img
                  src={`http://localhost:5000${item.san_pham.hinh_anh}`}
                  alt={item.san_pham.ten_san_pham}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium line-clamp-2">
                    {item.san_pham.ten_san_pham}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      SL: {item.so_luong}
                    </span>
                    <span className="font-semibold text-red-600">
                      {item.san_pham.gia_khuyen_mai
                        ? (
                            item.san_pham.gia_khuyen_mai * item.so_luong
                          ).toLocaleString()
                        : (
                            item.san_pham.gia_ban * item.so_luong
                          ).toLocaleString()}
                      đ
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t-2 border-gray-200">
            <span className="text-lg font-semibold text-gray-700">
              Tổng cộng:
            </span>
            <span className="text-2xl font-bold text-red-600">
              {totalAmount.toLocaleString()}đ
            </span>
          </div>
        </div>
      </div>

      {/* Modal QR Code */}
      {showQR && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 text-center animate-fade-in-up">
            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Đặt Hàng Thành Công!
            </h3>
            <p className="text-gray-600 mb-6 text-sm">
              Mã đơn hàng của bạn là: <strong>#{completedOrderId}</strong>
              <br />
              Vui lòng quét mã QR dưới đây để thanh toán.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-100">
              <img
                src="/qr-payment.png"
                alt="QR Code Thanh Toán TPBank"
                className="w-full max-w-[200px] mx-auto rounded-lg shadow-sm"
              />
              <p className="mt-3 text-sm font-semibold text-gray-700">
                Tổng tiền:{" "}
                <span className="text-red-600 text-lg">
                  {totalAmount.toLocaleString()}đ
                </span>
              </p>
            </div>

            <button
              onClick={() => {
                setShowQR(false);
                navigate("/");
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Hoàn tất
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
