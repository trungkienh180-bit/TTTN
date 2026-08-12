import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../store/cartSlice";
import { toast } from "react-hot-toast";
import {
  Trash2,
  CreditCard,
  Minus,
  Plus,
  Printer,
  FileSpreadsheet,
  Check,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PaymentService from "../services/payment/PaymentService";
import PolicySection from "../components/PolicySection";
import SearchableSelect from "../components/SearchableSelect";
import { vietnamData, provinces } from "../utils/vietnamData";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, isLoading } = useSelector((state) => state.cart);
  const { user, token } = useSelector((state) => state.auth);
  const [agreed, setAgreed] = useState(false);

  const [formData, setFormData] = useState({
    ho_ten: user ? user.ho_ten : "",
    sdt: user ? user.so_dien_thoai : "",
    email: user ? user.email : "",
    dia_chi: user ? user.dia_chi : "",
    tinh_thanh: "",
    quan_huyen: "",
    ghi_chu: "",
    phuong_thuc_tt: "COD",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [successModalConfig, setSuccessModalConfig] = useState({
    show: false,
    title: "",
    message: "",
  });
  const [completedOrderId, setCompletedOrderId] = useState(null);
  const [tempOrderId, setTempOrderId] = useState(null);
  const [completedTotal, setCompletedTotal] = useState(0);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch, user]);

  const handleRemove = (id) => {
    if (window.confirm("Xóa sản phẩm này khỏi giỏ?")) {
      dispatch(removeFromCart(id));
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?")) {
      dispatch(clearCart());
    }
  };

  const handleUpdateQuantity = (id, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty < 1) return;
    dispatch(updateQuantity({ id, so_luong: newQty }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const items = cart?.chi_tiet || [];
  const totalAmount = items.reduce((sum, item) => {
    const price = item.san_pham.gia_khuyen_mai || item.san_pham.gia_ban;
    return sum + Number(price) * item.so_luong;
  }, 0);

  const handleCheckoutClick = () => {
    if (items.length === 0) return toast.error("Giỏ hàng trống!");
    if (!agreed) return toast.error("Vui lòng đồng ý với Điều kiện giao dịch!");
    if (!formData.ho_ten || !formData.sdt || !formData.dia_chi) {
      return toast.error("Vui lòng điền đủ Họ tên, SĐT và Địa chỉ!");
    }

    if (formData.phuong_thuc_tt === "CHUYEN_KHOAN") {
      const generatedId = Math.floor(1000000000 + Math.random() * 9000000000);
      setTempOrderId(generatedId);
      setCompletedTotal(totalAmount);
      setShowQR(true);
    } else {
      processOrder();
    }
  };

  const processOrder = async (qrNote = "") => {
    try {
      setIsSubmitting(true);
      const orderPayload = {
        ho_ten: formData.ho_ten,
        email: formData.email,
        so_dien_thoai: formData.sdt,
        dia_chi_giao:
          `${formData.dia_chi}, ${formData.quan_huyen}, ${formData.tinh_thanh}`
            .trim()
            .replace(/^,\s*/, "")
            .replace(/,\s*$/, ""),
        ghi_chu: qrNote ? qrNote + (formData.ghi_chu || "") : formData.ghi_chu,
        phuong_thuc_tt: formData.phuong_thuc_tt,
        items: items.map((item) => ({
          san_pham_id: item.san_pham_id,
          so_luong: item.so_luong,
        })),
      };

      const res = await PaymentService.processCheckout(orderPayload, token);

      if (formData.phuong_thuc_tt !== "PAYOS") {
        dispatch(clearCart());
      }

      if (res.checkoutUrl) {
        PaymentService.redirectIfRequired(res.checkoutUrl);
      } else if (formData.phuong_thuc_tt === "CHUYEN_KHOAN") {
        setSuccessModalConfig({
          show: true,
          title: "Đã ghi nhận đơn hàng!",
          message:
            "Cảm ơn bạn! Đơn hàng của bạn đang chờ xác nhận thanh toán. Chúng tôi sẽ liên hệ lại sớm nhất.",
        });
        setShowQR(false);
        setTimeout(() => {
          setSuccessModalConfig({ show: false, title: "", message: "" });
          navigate("/");
        }, 3500);
      } else {
        setSuccessModalConfig({
          show: true,
          title: "Đặt hàng thành công!",
          message: "",
        });
        setTimeout(() => {
          setSuccessModalConfig({ show: false, title: "", message: "" });
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Có lỗi xảy ra khi đặt hàng!",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading)
    return (
      <div className="text-center py-20 font-medium text-gray-500">
        Đang tải giỏ hàng...
      </div>
    );

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen pb-12">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
          {/* Header Giỏ Hàng */}
          <div className="flex justify-between items-center bg-[#01353f] p-4 px-6 border-b border-[#01353f]">
            <h2 className="text-[18px] font-black text-white uppercase tracking-wide">
              Giỏ hàng của bạn
            </h2>
            {items.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-red-400 text-sm hover:text-red-300 hover:underline font-bold transition-colors"
              >
                Xóa toàn bộ
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">Giỏ hàng đang trống.</p>
              <Link
                to="/"
                className="text-blue-600 font-medium hover:underline border border-blue-600 px-4 py-2 rounded"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          ) : (
            <div className="flex flex-col">
              {/* Table Items */}
              <div className="hidden md:flex bg-gray-900 p-3 text-sm font-bold text-white uppercase tracking-wider rounded-t-lg mt-2 mx-4">
                <div className="w-[50%] pl-2">Sản phẩm</div>
                <div className="w-[15%] text-center">Đơn giá</div>
                <div className="w-[15%] text-center">Số lượng</div>
                <div className="w-[15%] text-right pr-4">Thành tiền</div>
                <div className="w-[5%] text-center"></div>
              </div>

              <div className="border-x border-b border-gray-200 mb-6 rounded-b-lg overflow-hidden shadow-sm mx-4">
                {items.map((item) => {
                  const price = Number(
                    item.san_pham.gia_khuyen_mai || item.san_pham.gia_ban,
                  );
                  return (
                    <div
                      key={item.id}
                      className="flex flex-col md:flex-row items-center py-4 px-4 border-b border-gray-200 gap-4 hover:bg-gray-50"
                    >
                      {/* Product Info */}
                      <div className="w-full md:w-[50%] flex gap-4">
                        <img
                          src={
                            item.san_pham.hinh_anh?.startsWith("http")
                              ? item.san_pham.hinh_anh
                              : `http://localhost:5000${item.san_pham.hinh_anh}`
                          }
                          alt={item.san_pham.ten_san_pham}
                          className="w-24 h-24 object-contain"
                        />
                        <div className="flex flex-col gap-1.5 justify-center">
                          <Link
                            to={`/product/${item.san_pham.id}`}
                            className="font-bold text-[14px] text-gray-900 hover:text-blue-600 leading-tight"
                          >
                            {item.san_pham.ten_san_pham}
                          </Link>
                          <div className="text-[13px] text-gray-700 mt-1">
                            {item.san_pham.ram && (
                              <div>
                                <span className="font-bold">RAM:</span>{" "}
                                <span className="text-[#ff0000] font-medium">
                                  {item.san_pham.ram}
                                </span>
                              </div>
                            )}
                            {item.san_pham.o_cung && (
                              <div>
                                <span className="font-bold">Ổ cứng SSD:</span>{" "}
                                <span className="text-[#ff0000] font-medium">
                                  {item.san_pham.o_cung}
                                </span>
                              </div>
                            )}
                            {item.san_pham.tan_nhiet && (
                              <div>
                                <span className="font-bold">Tản nhiệt:</span>{" "}
                                <span className="text-[#ff0000] font-medium">
                                  {item.san_pham.tan_nhiet}
                                </span>
                              </div>
                            )}
                            <div>
                              <span className="font-bold">Bảo hành:</span>{" "}
                              <span className="text-[#ff0000] font-medium">
                                36 Tháng
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="w-full md:w-[15%] text-center font-medium text-[14px] text-gray-800">
                        {price.toLocaleString("vi-VN")} VNĐ
                      </div>

                      {/* Quantity */}
                      <div className="w-full md:w-[15%] flex justify-center">
                        <div className="flex border border-gray-300 rounded-sm overflow-hidden h-8 w-24">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.so_luong, -1)
                            }
                            className="w-1/3 bg-[#f8f8f8] hover:bg-gray-200 flex justify-center items-center font-bold text-gray-600"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            readOnly
                            value={item.so_luong}
                            className="w-1/3 text-center border-x border-gray-300 text-[13px] font-bold text-gray-700 outline-none"
                          />
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.so_luong, 1)
                            }
                            className="w-1/3 bg-[#f8f8f8] hover:bg-gray-200 flex justify-center items-center font-bold text-gray-600"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Total Price */}
                      <div className="w-full md:w-[15%] text-right font-bold text-[14px] text-gray-900">
                        {(price * item.so_luong).toLocaleString("vi-VN")} VNĐ
                      </div>

                      {/* Delete */}
                      <div className="w-full md:w-[5%] flex justify-center md:justify-end">
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Subtotal */}
              <div className="flex justify-end pb-8 mb-6 border-b border-gray-100 mr-2">
                <div className="text-[15px] font-bold text-gray-800 flex items-center">
                  Tổng tiền:{" "}
                  <span className="text-[#ff0000] text-[22px] ml-2 font-extrabold">
                    {totalAmount.toLocaleString("vi-VN")} VNĐ
                  </span>
                </div>
              </div>

              {/* Checkout Section (2 Columns) */}
              <div className="flex flex-col lg:flex-row gap-8 pb-8 px-4">
                {/* Left Column: Form Info */}
                <div className="w-full lg:w-3/5">
                  <div className="bg-[#01353f] p-3 px-4 font-black text-white text-[15px] uppercase rounded-t-lg shadow-sm">
                    THÔNG TIN NGƯỜI MUA
                  </div>
                  <div className="border border-gray-200 border-t-0 p-5 rounded-b-lg bg-white shadow-sm">
                    <p className="text-[13px] text-gray-600 mb-4 font-medium">
                      Để tiếp tục đặt hàng, quý khách xin vui lòng nhập thông
                      tin bên dưới
                    </p>

                    <div className="space-y-3 px-1">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center">
                        <label className="w-full sm:w-[130px] text-[13px] font-bold text-gray-700 shrink-0 mb-1 sm:mb-0">
                          Họ tên<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="ho_ten"
                          value={formData.ho_ten}
                          onChange={handleInputChange}
                          className="flex-1 w-full border border-gray-300 p-2 rounded-sm focus:border-blue-500 outline-none text-[13px]"
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center">
                        <label className="w-full sm:w-[130px] text-[13px] font-bold text-gray-700 shrink-0 mb-1 sm:mb-0">
                          SĐT<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="sdt"
                          value={formData.sdt}
                          onChange={handleInputChange}
                          className="flex-1 w-full border border-gray-300 p-2 rounded-sm focus:border-blue-500 outline-none text-[13px]"
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center">
                        <label className="w-full sm:w-[130px] text-[13px] font-bold text-gray-700 shrink-0 mb-1 sm:mb-0">
                          Email<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="flex-1 w-full border border-gray-300 p-2 rounded-sm focus:border-blue-500 outline-none text-[13px]"
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row items-start">
                        <label className="w-full sm:w-[130px] text-[13px] font-bold text-gray-700 shrink-0 mt-2 mb-1 sm:mb-0">
                          Địa chỉ<span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="dia_chi"
                          value={formData.dia_chi}
                          onChange={handleInputChange}
                          className="flex-1 w-full border border-gray-300 p-2 rounded-sm focus:border-blue-500 outline-none text-[13px] h-16 resize-none"
                        ></textarea>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center relative z-20">
                        <label className="w-full sm:w-[130px] text-[13px] font-bold text-gray-700 shrink-0 mb-1 sm:mb-0">
                          Tỉnh/Thành phố
                        </label>
                        <SearchableSelect
                          name="tinh_thanh"
                          value={formData.tinh_thanh}
                          onChange={handleInputChange}
                          options={provinces}
                          placeholder="Chọn Tỉnh/Thành phố"
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center relative z-10">
                        <label className="w-full sm:w-[130px] text-[13px] font-bold text-gray-700 shrink-0 mb-1 sm:mb-0">
                          Quận/Huyện
                        </label>
                        <SearchableSelect
                          name="quan_huyen"
                          value={formData.quan_huyen}
                          onChange={handleInputChange}
                          options={
                            formData.tinh_thanh
                              ? vietnamData[formData.tinh_thanh]
                              : []
                          }
                          placeholder="Chọn Quận/Huyện"
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center">
                        <label className="w-full sm:w-[130px] text-[13px] font-bold text-gray-700 shrink-0 mb-1 sm:mb-0">
                          Thanh toán<span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-col sm:flex-row gap-4 w-full border border-gray-200 p-2 rounded-sm bg-white">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="phuong_thuc_tt"
                              value="COD"
                              checked={formData.phuong_thuc_tt === "COD"}
                              onChange={handleInputChange}
                              className="accent-[#e30019]"
                            />
                            <span className="text-[13px] font-medium text-gray-700">
                              Tiền mặt (COD)
                            </span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="phuong_thuc_tt"
                              value="PAYOS"
                              checked={formData.phuong_thuc_tt === "PAYOS"}
                              onChange={handleInputChange}
                              className="accent-[#e30019]"
                            />
                            <span className="text-[13px] font-medium text-gray-700">
                              Chuyển khoản (PayOS)
                            </span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="phuong_thuc_tt"
                              value="CHUYEN_KHOAN"
                              checked={
                                formData.phuong_thuc_tt === "CHUYEN_KHOAN"
                              }
                              onChange={handleInputChange}
                              className="accent-[#e30019]"
                            />
                            <span className="text-[13px] font-medium text-gray-700">
                              Chuyển khoản (Mã QR)
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start">
                        <label className="w-full sm:w-[130px] text-[13px] font-bold text-gray-700 shrink-0 mt-2 mb-1 sm:mb-0">
                          Ghi chú
                        </label>
                        <textarea
                          name="ghi_chu"
                          value={formData.ghi_chu}
                          onChange={handleInputChange}
                          className="flex-1 w-full border border-gray-300 p-2 rounded-sm focus:border-blue-500 outline-none text-[13px] h-20 resize-none"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Totals & Buttons */}
                <div className="w-full lg:w-2/5 flex flex-col">
                  <div className="bg-[#01353f] p-3 px-4 font-black text-white text-[15px] uppercase rounded-t-lg shadow-sm">
                    TỔNG TIỀN
                  </div>

                  <div className="border border-gray-200 border-t-0 p-5 rounded-b-lg bg-white shadow-sm flex flex-col h-full justify-between">
                    <div>
                      <div className="flex justify-between items-center text-[13px] mb-3 pb-3 border-b border-gray-100">
                        <span className="text-gray-700 font-medium">
                          Tổng cộng
                        </span>
                        <span className="font-medium text-gray-900">
                          {totalAmount.toLocaleString("vi-VN")} VNĐ
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-[15px] mb-4 border-b border-gray-200 pb-4">
                        <span className="font-bold text-gray-800 text-[14px]">
                          Thành tiền
                        </span>
                        <div className="text-right">
                          <div className="font-bold text-[#ff0000] text-lg">
                            {totalAmount.toLocaleString("vi-VN")} VNĐ
                          </div>
                          <div className="text-[11px] text-gray-500 font-normal">
                            (Giá đã bao gồm VAT)
                          </div>
                        </div>
                      </div>

                      <div
                        className="flex items-start gap-2 mb-6 cursor-pointer"
                        onClick={() => setAgreed(!agreed)}
                      >
                        <input
                          type="checkbox"
                          checked={agreed}
                          onChange={() => {}}
                          className="w-4 h-4 cursor-pointer mt-0.5 shrink-0"
                        />
                        <span className="text-[13px] text-gray-800 leading-tight">
                          Tôi đã đọc và đồng ý với các Điều kiện giao dịch chung
                          của website
                        </span>
                      </div>

                      {/* 6 Buttons Grid */}
                      <div className="grid grid-cols-2 gap-2">
                        <button className="col-span-1 bg-[#01353f] hover:bg-[#00252c] text-white text-[12px] font-bold py-2.5 px-2 rounded-sm flex items-center justify-center gap-1.5 uppercase transition-colors">
                          <Printer size={15} /> In báo giá
                        </button>
                        <button className="col-span-1 bg-[#01353f] hover:bg-[#00252c] text-white text-[12px] font-bold py-2.5 px-2 rounded-sm flex items-center justify-center gap-1.5 uppercase transition-colors">
                          <FileSpreadsheet size={15} /> Tải file Excel
                        </button>

                        <button
                          onClick={handleCheckoutClick}
                          disabled={isSubmitting}
                          className="col-span-1 bg-[#e30019] hover:bg-[#cc0016] text-white py-2.5 px-2 rounded-sm flex items-center justify-center gap-1.5 transition-colors disabled:opacity-70"
                        >
                          <Check size={16} />{" "}
                          <span className="text-[14px] font-bold uppercase">
                            {isSubmitting ? "Đang xử lý..." : "Đặt hàng"}
                          </span>
                        </button>
                        <button className="col-span-1 bg-[#2b5883] hover:bg-[#1a3c61] text-white py-1.5 px-1 rounded-sm flex flex-col items-center justify-center transition-colors">
                          <span className="uppercase text-[12px] font-bold flex items-center gap-1">
                            <FileSpreadsheet size={12} /> Trả góp qua hồ sơ
                          </span>
                          <span className="text-[10px] font-normal text-white/90">
                            Chỉ từ 5.664.000 Đ/THÁNG
                          </span>
                        </button>

                        <button className="col-span-1 bg-[#2d88d3] hover:bg-[#2572b3] text-white py-2 px-1 rounded-sm flex flex-col items-center justify-center transition-colors shadow-sm border border-[#2572b3]">
                          <span className="uppercase text-[12px] font-bold">
                            Trả góp qua thẻ
                          </span>
                          <span className="text-[10px] font-normal text-white/90">
                            Visa, Master, JCB
                          </span>
                        </button>
                        <button className="col-span-1 bg-[#facc15] hover:bg-[#eab308] text-gray-900 py-2 px-1 rounded-sm flex flex-col items-center justify-center transition-colors shadow-sm border border-[#eab308]">
                          <span className="uppercase text-[12px] font-black">
                            Mua ngay - Trả sau
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Policy Section added to bottom of Cart */}
      <PolicySection />

      {/* Modal QR Code */}
      {showQR && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 font-sans">
          <div className="bg-[#fcfaf9] rounded-xl shadow-2xl max-w-3xl w-full flex flex-col overflow-hidden animate-fade-in-up">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                <div className="text-red-500 font-bold border border-red-500 rounded p-1">
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full border-[1.5px] border-red-500 block"></span>
                    <span className="w-1.5 h-1.5 rounded-full border-[1.5px] border-red-500 block"></span>
                  </div>
                  <div className="flex gap-1 items-center mt-1">
                    <span className="w-1.5 h-1.5 rounded-full border-[1.5px] border-red-500 block"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 block"></span>
                  </div>
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-gray-800 leading-tight">
                    Thanh toán Chuyển khoản QR
                  </h3>
                  <p className="text-[13px] text-gray-500 mt-0.5">
                    Mã thanh toán:{" "}
                    <span className="font-bold text-red-600">
                      DH{tempOrderId}
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowQR(false);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="flex flex-col md:flex-row p-6 gap-6 bg-[#fcfaf9]">
              {/* Left: QR Code */}
              <div className="w-full md:w-5/12 flex flex-col items-center">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm w-full flex flex-col items-center">
                  {/* Image container for cropping and zooming */}
                  <div className="w-full max-w-[260px] aspect-square rounded-2xl overflow-hidden relative shadow-inner">
                    <img
                      src="/qr-payment.png"
                      alt="QR Code"
                      className="absolute inset-0 w-full h-full object-cover object-center scale-[1.3] md:scale-[1.4] origin-center mix-blend-multiply"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-blue-600 font-medium text-sm mt-4 border-t border-gray-100 w-full pt-3 justify-center">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      ></path>
                    </svg>
                    Auto-check 24/7
                  </div>
                </div>
              </div>

              {/* Right: Info */}
              <div className="w-full md:w-7/12 flex flex-col gap-3">
                {/* Bank */}
                <div className="border border-gray-200 rounded-lg p-3 bg-white flex justify-between items-center shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-[13px] mb-1">
                      Ngân hàng nhận
                    </span>
                    <span className="font-bold text-gray-800 text-[15px]">
                      TPBank
                    </span>
                  </div>
                </div>

                {/* Account */}
                <div className="border border-gray-200 rounded-lg p-3 bg-white flex justify-between items-center shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-[13px] mb-1">
                      Số tài khoản
                    </span>
                    <span className="font-bold text-red-600 text-[18px]">
                      61308112004
                    </span>
                    <span className="text-gray-500 text-[11px] font-medium uppercase mt-0.5">
                      HUYNH TRUNG KIEN
                    </span>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText("61308112004")}
                    className="flex items-center gap-1.5 text-gray-600 hover:text-gray-800 text-[13px] font-semibold px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      ></path>
                    </svg>
                    Sao chép
                  </button>
                </div>

                {/* Amount */}
                <div className="border border-gray-200 rounded-lg p-3 bg-white flex justify-between items-center shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-[13px] mb-1">
                      Số tiền cần chuyển
                    </span>
                    <span className="font-bold text-red-600 text-[18px]">
                      {completedTotal.toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(completedTotal.toString())
                    }
                    className="flex items-center gap-1.5 text-gray-600 hover:text-gray-800 text-[13px] font-semibold px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      ></path>
                    </svg>
                    Sao chép
                  </button>
                </div>

                {/* Content */}
                <div className="border border-gray-200 rounded-lg p-3 bg-white flex justify-between items-center shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-[13px] mb-1">
                      Nội dung chuyển khoản{" "}
                      <span className="text-red-500 font-bold">(BẮT BUỘC)</span>
                    </span>
                    <span className="font-bold text-red-600 text-[18px]">
                      DH{tempOrderId}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(`DH${tempOrderId}`)
                    }
                    className="flex items-center gap-1.5 text-white bg-[#c92a2a] hover:bg-[#a61e1e] text-[13px] font-semibold px-3 py-1.5 rounded-md transition-colors shadow-sm"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      ></path>
                    </svg>
                    Sao chép
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 bg-[#fcfaf9] flex flex-col gap-4">
              <div className="bg-[#fffdf5] border border-[#ffec99] p-3 rounded-lg flex items-start gap-2.5 text-[#946c00] shadow-sm">
                <svg
                  className="w-5 h-5 shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  ></path>
                </svg>
                <p className="text-[13px] leading-relaxed">
                  Vui lòng giữ nguyên{" "}
                  <strong>Nội dung chuyển khoản (DH{tempOrderId})</strong> để hệ
                  thống dễ dàng xác nhận đơn hàng của bạn.
                </p>
              </div>

              <div className="flex gap-3 mt-1">
                <button
                  onClick={() => {
                    processOrder(`[Mã TT: DH${tempOrderId}] `);
                  }}
                  disabled={isSubmitting}
                  className="flex-1 bg-[#c92a2a] hover:bg-[#a61e1e] text-white font-bold py-3.5 px-4 rounded-lg flex justify-center items-center gap-2 transition-colors shadow-sm text-[15px] disabled:opacity-70"
                >
                  <svg
                    className="w-5 h-5"
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
                  {isSubmitting ? "Đang xử lý..." : "Xác nhận đã chuyển khoản"}
                </button>
                <button
                  onClick={() => {
                    setShowQR(false);
                  }}
                  className="px-8 bg-white hover:bg-gray-50 text-gray-700 font-bold py-3.5 rounded-lg transition-colors border border-gray-300 shadow-sm text-[15px]"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {successModalConfig.show && (
        <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full flex flex-col items-center justify-center text-center">
            <svg className="w-24 h-24 mb-6" viewBox="0 0 52 52">
              <circle
                className="success-circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
                stroke="#ff4d4f"
                strokeWidth="2"
                strokeDasharray="166"
                strokeDashoffset="166"
              />
              <path
                className="success-check"
                fill="none"
                stroke="#ff4d4f"
                strokeWidth="4"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
                strokeDasharray="48"
                strokeDashoffset="48"
              />
            </svg>
            <style>{`
            .success-circle {
              animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
            }
            .success-check {
              animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
            }
            @keyframes stroke {
              100% {
                stroke-dashoffset: 0;
              }
            }
          `}</style>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {successModalConfig.title}
            </h3>
            {successModalConfig.message && (
              <p className="text-gray-600 mt-2 text-sm md:text-base leading-relaxed">
                {successModalConfig.message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
