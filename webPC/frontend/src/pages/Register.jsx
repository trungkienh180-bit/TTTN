import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser, reset } from "../store/authSlice";
import { UserPlus, Mail, Lock, User, AlertCircle } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    ho_ten: "",
    so_dien_thoai: "",
    dia_chi: "",
    email: "",
    mat_khau: "",
    xac_nhan_mat_khau: "",
  });

  const { ho_ten, so_dien_thoai, dia_chi, email, mat_khau, xac_nhan_mat_khau } =
    formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (isSuccess || user) {
      // Đăng ký xong, chuyển sang đăng nhập
      navigate("/login");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (mat_khau !== xac_nhan_mat_khau) {
      setPasswordError("Mật khẩu xác nhận không khớp");
      return;
    }
    setPasswordError("");
    const userData = { ho_ten, so_dien_thoai, dia_chi, email, mat_khau };
    dispatch(registerUser(userData));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
          <UserPlus className="text-white" size={32} />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Tạo tài khoản mới
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            Đăng nhập
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={onSubmit}>
            {(isError || passwordError) && (
              <div className="bg-red-50 text-red-500 p-4 rounded-xl flex items-center gap-3 text-sm">
                <AlertCircle size={18} />
                {passwordError || message}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Họ và Tên
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="ho_ten"
                  value={ho_ten}
                  onChange={onChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 focus:bg-white transition-colors"
                  placeholder="Nhập họ tên của bạn"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <input
                  type="tel"
                  name="so_dien_thoai"
                  value={so_dien_thoai}
                  onChange={onChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 focus:bg-white transition-colors"
                  placeholder="Nhập số điện thoại"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Địa chỉ <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <input
                  type="text"
                  name="dia_chi"
                  value={dia_chi}
                  onChange={onChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 focus:bg-white transition-colors"
                  placeholder="Nhập địa chỉ nhận hàng"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 focus:bg-white transition-colors"
                  placeholder="Nhập email của bạn"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="mat_khau"
                  value={mat_khau}
                  onChange={onChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 focus:bg-white transition-colors"
                  placeholder="Tối thiểu 6 ký tự"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Xác nhận mật khẩu
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="xac_nhan_mat_khau"
                  value={xac_nhan_mat_khau}
                  onChange={onChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 focus:bg-white transition-colors"
                  placeholder="Nhập lại mật khẩu"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Đang xử lý..." : "Đăng ký tài khoản"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
