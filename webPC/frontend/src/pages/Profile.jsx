import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/authSlice";
import {
  User,
  Phone,
  MapPin,
  Camera,
  Star,
  Award,
  Crown,
  Diamond,
  CheckCircle,
  AlertCircle,
  ShoppingBag,
  Shield,
  LogOut,
  Package,
  Clock,
  Truck,
  FileText,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("info"); // info, orders, password

  const [profileData, setProfileData] = useState({
    ho_ten: "",
    email: "",
    so_dien_thoai: "",
    dia_chi: "",
    gioi_tinh: "",
    ngay_sinh: "",
    avatar: "",
    tong_tien_da_mua: 0,
    hang_thanh_vien: "Thành Viên",
  });

  const [formData, setFormData] = useState({
    ho_ten: "",
    so_dien_thoai: "",
    dia_chi: "",
    gioi_tinh: "",
    ngay_sinh: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [orders, setOrders] = useState([]);

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfileData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // Fetch profile
        const resProfile = await axios.get(
          "http://localhost:5000/api/users/profile",
          config,
        );
        setProfileData(resProfile.data);
        setFormData({
          ho_ten: resProfile.data.ho_ten || "",
          so_dien_thoai: resProfile.data.so_dien_thoai || "",
          dia_chi: resProfile.data.dia_chi || "",
          gioi_tinh: resProfile.data.gioi_tinh || "",
          ngay_sinh: resProfile.data.ngay_sinh
            ? resProfile.data.ngay_sinh.split("T")[0]
            : "",
        });
        setAvatarPreview(
          resProfile.data.avatar
            ? resProfile.data.avatar.startsWith("http")
              ? resProfile.data.avatar
              : `http://localhost:5000${resProfile.data.avatar}`
            : null,
        );

        // Fetch orders
        const resOrders = await axios.get(
          "http://localhost:5000/api/users/orders",
          config,
        );
        setOrders(resOrders.data);
      } catch (error) {
        setMessage({ type: "error", text: "Lỗi khi tải thông tin hồ sơ." });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfileData();
  }, [token, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const submitData = new FormData();
      submitData.append("ho_ten", formData.ho_ten);
      submitData.append("so_dien_thoai", formData.so_dien_thoai);
      submitData.append("dia_chi", formData.dia_chi);
      submitData.append("gioi_tinh", formData.gioi_tinh);
      if (formData.ngay_sinh) {
        submitData.append("ngay_sinh", formData.ngay_sinh);
      }
      if (avatarFile) {
        submitData.append("avatar", avatarFile);
      }

      const res = await axios.put(
        "http://localhost:5000/api/users/profile",
        submitData,
        config,
      );

      setMessage({ type: "success", text: "Cập nhật hồ sơ thành công!" });
      dispatch(updateUser(res.data.user));
      setProfileData({ ...profileData, ...res.data.user });
      setAvatarFile(null);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Có lỗi xảy ra khi cập nhật",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "Mật khẩu mới không khớp!" });
      return;
    }

    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(
        "http://localhost:5000/api/users/change-password",
        {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        },
        config,
      );

      setMessage({ type: "success", text: "Đổi mật khẩu thành công!" });
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Có lỗi xảy ra khi đổi mật khẩu",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getRankInfo = (rank, totalSpent) => {
    const tiers = [
      {
        name: "Thành Viên",
        min: 0,
        next: 10000000,
        icon: <User size={24} />,
        bg: "bg-gray-100",
        text: "text-gray-600",
        border: "border-gray-300",
      },
      {
        name: "Bạc",
        min: 10000000,
        next: 25000000,
        icon: <Award size={24} />,
        bg: "bg-gradient-to-br from-gray-200 to-gray-400",
        text: "text-gray-800",
        border: "border-gray-400",
      },
      {
        name: "Vàng",
        min: 25000000,
        next: 62500000,
        icon: <Star size={24} />,
        bg: "bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600",
        text: "text-yellow-900",
        border: "border-yellow-500",
      },
      {
        name: "Kim Cương",
        min: 62500000,
        next: 156250000,
        icon: <Diamond size={24} />,
        bg: "bg-gradient-to-br from-cyan-100 via-cyan-300 to-blue-500",
        text: "text-cyan-900",
        border: "border-cyan-400",
      },
      {
        name: "VIP",
        min: 156250000,
        next: null,
        icon: <Crown size={24} />,
        bg: "bg-gradient-to-br from-gray-900 via-black to-red-900",
        text: "text-yellow-500",
        border: "border-red-600",
      },
    ];
    const currentTier = tiers.find((t) => t.name === rank) || tiers[0];
    const progress = currentTier.next
      ? Math.min(
          100,
          Math.max(
            0,
            ((totalSpent - currentTier.min) /
              (currentTier.next - currentTier.min)) *
              100,
          ),
        )
      : 100;
    return { ...currentTier, progress };
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "CHO_XAC_NHAN":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "DANG_XU_LY":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "DANG_GIAO_HANG":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "DA_GIAO":
        return "bg-green-100 text-green-800 border-green-200";
      case "DA_HUY":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (isLoading)
    return (
      <div className="text-center py-32 text-gray-500 font-medium text-lg">
        Đang tải hồ sơ...
      </div>
    );

  const rankInfo = getRankInfo(
    profileData.hang_thanh_vien,
    profileData.tong_tien_da_mua,
  );

  return (
    <div className="bg-[#f4f6f8] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT SIDEBAR */}
          <div className="w-full lg:w-1/4">
            {/* User Mini Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center mb-6 relative overflow-hidden">
              <div className="relative z-10 w-24 h-24 rounded-full border-4 border-white shadow-md bg-gray-50 flex items-center justify-center overflow-hidden mb-4">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-gray-300 uppercase">
                    {profileData.ho_ten?.[0] || "U"}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-900 text-center relative z-10">
                {profileData.ho_ten}
              </h2>
              <p className="text-gray-500 text-sm mb-4 relative z-10">
                {user?.email}
              </p>

              <div
                className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl ${rankInfo.bg} ${rankInfo.border} border shadow-sm relative z-10`}
              >
                <span className={`${rankInfo.text} drop-shadow-sm`}>
                  {rankInfo.icon}
                </span>
                <span
                  className={`font-black uppercase tracking-wider ${rankInfo.text} drop-shadow-sm`}
                >
                  {rankInfo.name}
                </span>
              </div>

              <div className="mt-4 w-full relative z-10 text-center">
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-1">
                  Tổng chi tiêu
                </p>
                <p className="text-xl font-black text-[#ff4d4f]">
                  {Number(profileData.tong_tien_da_mua).toLocaleString()}đ
                </p>
              </div>

              {rankInfo.name === "VIP" && (
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
              )}
            </div>

            {/* Navigation Menu */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <nav className="flex flex-col">
                <button
                  onClick={() => setActiveTab("info")}
                  className={`flex items-center gap-3 px-6 py-4 text-left transition-colors border-l-4 ${activeTab === "info" ? "border-[#ff4d4f] bg-red-50 text-[#ff4d4f] font-bold" : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"}`}
                >
                  <User
                    size={20}
                    className={
                      activeTab === "info" ? "text-[#ff4d4f]" : "text-gray-400"
                    }
                  />
                  Thông tin cá nhân
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`flex items-center gap-3 px-6 py-4 text-left transition-colors border-l-4 ${activeTab === "orders" ? "border-[#ff4d4f] bg-red-50 text-[#ff4d4f] font-bold" : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"}`}
                >
                  <ShoppingBag
                    size={20}
                    className={
                      activeTab === "orders"
                        ? "text-[#ff4d4f]"
                        : "text-gray-400"
                    }
                  />
                  Lịch sử mua hàng
                </button>
                <button
                  onClick={() => setActiveTab("password")}
                  className={`flex items-center gap-3 px-6 py-4 text-left transition-colors border-l-4 ${activeTab === "password" ? "border-[#ff4d4f] bg-red-50 text-[#ff4d4f] font-bold" : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"}`}
                >
                  <Shield
                    size={20}
                    className={
                      activeTab === "password"
                        ? "text-[#ff4d4f]"
                        : "text-gray-400"
                    }
                  />
                  Đổi mật khẩu
                </button>
              </nav>
            </div>
          </div>

          {/* RIGHT CONTENT AREA */}
          <div className="w-full lg:w-3/4">
            {message.text && (
              <div
                className={`p-4 rounded-xl mb-6 flex items-center gap-3 shadow-sm border ${message.type === "success" ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"}`}
              >
                {message.type === "success" ? (
                  <CheckCircle className="shrink-0" />
                ) : (
                  <AlertCircle className="shrink-0" />
                )}
                <span className="font-medium text-sm">{message.text}</span>
              </div>
            )}

            {/* TAB: INFO */}
            {activeTab === "info" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                  <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2 uppercase tracking-tight">
                    <FileText className="text-[#ff4d4f]" size={28} /> Thông Tin
                    Của Bạn
                  </h2>
                </div>

                <form onSubmit={handleProfileSubmit}>
                  {/* Avatar Upload */}
                  <div className="flex flex-col items-center sm:items-start sm:flex-row gap-6 mb-10 pb-8 border-b border-gray-100">
                    <div className="relative group">
                      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm bg-gray-50 flex items-center justify-center">
                        {avatarPreview ? (
                          <img
                            src={avatarPreview}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-4xl font-bold text-gray-300 uppercase">
                            {formData.ho_ten?.[0] || "U"}
                          </span>
                        )}
                      </div>
                      <label className="absolute bottom-0 right-0 bg-[#ff4d4f] hover:bg-[#d9363e] text-white p-2.5 rounded-full cursor-pointer shadow-lg transition-transform transform group-hover:scale-110 border-2 border-white">
                        <Camera size={16} />
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    <div className="flex flex-col justify-center text-center sm:text-left mt-2">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        Ảnh đại diện
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        Định dạng JPEG, PNG. Dung lượng tối đa 5MB.
                      </p>
                      <label className="text-sm font-semibold text-blue-600 hover:text-blue-800 cursor-pointer">
                        Tải ảnh lên
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">
                        Email (Không thể thay đổi)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                          </svg>
                        </div>
                        <input
                          type="text"
                          value={profileData.email || user?.email || ""}
                          readOnly
                          className="w-full pl-11 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 font-medium cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">
                        Họ và Tên
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                          <User size={18} />
                        </div>
                        <input
                          type="text"
                          name="ho_ten"
                          value={formData.ho_ten}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium text-gray-900"
                          placeholder="Nhập họ và tên..."
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">
                        Số điện thoại
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                          <Phone size={18} />
                        </div>
                        <input
                          type="tel"
                          name="so_dien_thoai"
                          value={formData.so_dien_thoai}
                          onChange={handleInputChange}
                          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium text-gray-900"
                          placeholder="Nhập số điện thoại..."
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">
                        Giới tính
                      </label>
                      <div className="relative">
                        <select
                          name="gioi_tinh"
                          value={formData.gioi_tinh}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium text-gray-900 appearance-none"
                        >
                          <option value="">Chọn giới tính</option>
                          <option value="Nam">Nam</option>
                          <option value="Nữ">Nữ</option>
                          <option value="Khác">Khác</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">
                        Ngày sinh
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="ngay_sinh"
                          value={formData.ngay_sinh}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium text-gray-900"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-gray-700">
                        Địa chỉ (Giao hàng mặc định)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 pt-3.5 flex items-start pointer-events-none text-gray-400">
                          <MapPin size={18} />
                        </div>
                        <textarea
                          name="dia_chi"
                          value={formData.dia_chi}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium text-gray-900"
                          placeholder="Nhập chi tiết địa chỉ nhận hàng của bạn..."
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className={`px-8 py-3.5 rounded-xl font-bold text-white uppercase tracking-wider transition-all shadow-md ${isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-[#ff4d4f] hover:bg-[#d9363e] hover:shadow-lg"}`}
                    >
                      {isSaving ? "Đang lưu..." : "Lưu Thay Đổi"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB: PASSWORD */}
            {activeTab === "password" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                  <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2 uppercase tracking-tight">
                    <Shield className="text-[#ff4d4f]" size={28} /> Đổi Mật Khẩu
                  </h2>
                </div>

                <form onSubmit={handlePasswordSubmit} className="max-w-md">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">
                        Mật khẩu hiện tại
                      </label>
                      <input
                        type="password"
                        name="oldPassword"
                        value={passwordData.oldPassword}
                        onChange={handlePasswordChange}
                        required
                        minLength={6}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium"
                        placeholder="Nhập mật khẩu hiện tại"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">
                        Mật khẩu mới
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        required
                        minLength={6}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium"
                        placeholder="Mật khẩu mới (ít nhất 6 ký tự)"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">
                        Xác nhận mật khẩu mới
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                        minLength={6}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium"
                        placeholder="Nhập lại mật khẩu mới"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className={`w-full py-3.5 rounded-xl font-bold text-white uppercase tracking-wider transition-all shadow-md ${isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-black hover:shadow-lg"}`}
                    >
                      {isSaving ? "Đang xử lý..." : "Cập Nhật Mật Khẩu"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB: ORDERS */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-end">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2 uppercase tracking-tight mb-2">
                      <Package className="text-[#ff4d4f]" size={28} /> Lịch Sử
                      Đơn Hàng
                    </h2>
                    <p className="text-sm text-gray-500">
                      Quản lý và theo dõi trạng thái các đơn hàng bạn đã đặt.
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-bold border border-blue-100">
                      Tổng số: {orders.length} đơn hàng
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  {orders.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
                      <ShoppingBag
                        size={48}
                        className="mx-auto text-gray-300 mb-4"
                      />
                      <h3 className="text-lg font-bold text-gray-700 mb-2">
                        Bạn chưa có đơn hàng nào
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Hãy dạo quanh cửa hàng và chọn cho mình những sản phẩm
                        ưng ý nhé.
                      </p>
                      <Link
                        to="/products"
                        className="inline-block bg-[#ff4d4f] text-white font-bold py-2.5 px-6 rounded-xl hover:bg-[#d9363e] transition-colors"
                      >
                        Tiếp tục mua sắm
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors shadow-sm hover:shadow-md"
                        >
                          {/* Order Header */}
                          <div className="bg-gray-50 px-5 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Mã ĐH: </span>
                                <span className="font-black text-gray-900">
                                  #ORD-{order.id.toString().padStart(4, "0")}
                                </span>
                              </div>
                              <div className="h-4 w-px bg-gray-300 hidden sm:block"></div>
                              <div className="flex items-center gap-1.5 text-gray-600">
                                <Clock size={14} />
                                {new Date(order.tao_luc).toLocaleDateString(
                                  "vi-VN",
                                )}
                              </div>
                            </div>
                            <div
                              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border flex items-center gap-1.5 w-max ${getOrderStatusColor(order.trang_thai)}`}
                            >
                              {order.trang_thai === "DANG_GIAO_HANG" && (
                                <Truck size={12} />
                              )}
                              {order.trang_thai.replace(/_/g, " ")}
                            </div>
                          </div>

                          {/* Order Items */}
                          <div className="px-5 py-4 divide-y divide-gray-100">
                            {order.chi_tiet.map((item) => (
                              <div
                                key={item.id}
                                className="py-3 first:pt-0 last:pb-0 flex items-center gap-4"
                              >
                                <div className="w-16 h-16 rounded-lg bg-gray-50 border border-gray-200 overflow-hidden flex-shrink-0 p-1">
                                  <img
                                    src={
                                      item.san_pham.hinh_anh?.startsWith("http")
                                        ? item.san_pham.hinh_anh
                                        : `http://localhost:5000${item.san_pham.hinh_anh}`
                                    }
                                    alt={item.san_pham.ten_san_pham}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-bold text-gray-800 text-sm truncate">
                                    {item.san_pham.ten_san_pham}
                                  </h4>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Số lượng: x{item.so_luong}
                                  </p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <span className="font-bold text-[#ff4d4f]">
                                    {Number(item.gia_mua).toLocaleString()}đ
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Order Footer */}
                          <div className="bg-gray-50 px-5 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3">
                            <div className="text-sm text-gray-600">
                              Thanh toán:{" "}
                              <span className="font-bold text-gray-900">
                                {order.phuong_thuc_tt}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-sm text-gray-600 mr-2">
                                Tổng tiền:
                              </span>
                              <span className="text-lg font-black text-[#ff4d4f]">
                                {Number(order.tong_tien).toLocaleString()} VNĐ
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
