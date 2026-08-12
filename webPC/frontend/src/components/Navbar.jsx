import {
  Search,
  ShoppingCart,
  User,
  LogOut,
  Moon,
  Sun,
  ChevronDown,
  Phone,
  Settings,
  Menu,
  Gamepad2,
  Diamond,
  Crown,
  Star,
  Award,
  Monitor,
  Server,
  Cpu,
  HardDrive,
  MonitorSmartphone,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset, updateUser } from "../store/authSlice";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [categories, setCategories] = useState([]);
  const [menuKey, setMenuKey] = useState(0);

  // Search autocomplete states
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Handle outside click for search suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search fetch
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchInputValue.trim()) {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/products?search=${encodeURIComponent(searchInputValue.trim())}&limit=5`,
          );
          setSearchResults(res.data.products);
          setShowSuggestions(true);
        } catch (error) {
          console.error("Search error", error);
        }
      } else {
        setSearchResults([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInputValue]);

  const closeMenu = () => setMenuKey((prev) => prev + 1);

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (user && token) {
      axios
        .get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch(updateUser(res.data));
        })
        .catch(console.error);
    }
  }, [token, dispatch]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories",
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-sm transition-all duration-300">
      {/* Top Header Row */}
      <div className="max-w-[1700px] mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-[100px] gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center group mr-4">
            <div className="flex items-center">
              <Gamepad2
                className="text-[#ff5722] w-12 h-12 mr-1 rotate-12 group-hover:rotate-0 transition-transform"
                strokeWidth={1.5}
              />
              <div className="flex flex-col justify-center leading-none">
                <span className="font-black text-3xl tracking-tighter flex items-center">
                  <span
                    className="text-[#ff5722]"
                    style={{ WebkitTextStroke: "1px #c62828" }}
                  >
                    TTGK
                  </span>
                  <span
                    className="text-gray-900 dark:text-white"
                    style={{ WebkitTextStroke: "1px #333" }}
                  >
                    SHOP
                  </span>
                </span>
              </div>
            </div>
          </Link>

          {/* Search Bar & Quick Links */}
          <div
            className="hidden lg:flex flex-col flex-1 max-w-[700px] mx-4 relative"
            ref={searchRef}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowSuggestions(false);
                if (searchInputValue.trim())
                  navigate(
                    `/products?search=${encodeURIComponent(searchInputValue.trim())}`,
                  );
                else navigate(`/products`);
              }}
              className="flex w-full h-[42px] border-[2px] border-[#ff5722] rounded-md overflow-hidden bg-white relative z-50"
            >
              <input
                type="text"
                name="search"
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
                onFocus={() => {
                  if (searchInputValue.trim()) setShowSuggestions(true);
                }}
                className="flex-1 px-4 py-2 outline-none text-[13px] text-gray-700 bg-transparent"
                placeholder="Tìm kiếm sản phẩm..."
                autoComplete="off"
              />
              <button
                type="submit"
                className="bg-[#ff5722] hover:bg-[#e64a19] text-white px-7 flex items-center justify-center transition-colors"
              >
                <Search size={20} />
              </button>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && searchResults.length > 0 && (
              <div className="absolute top-[42px] left-0 w-full bg-white shadow-xl border border-gray-100 rounded-b-md z-40 max-h-[400px] overflow-y-auto">
                <div className="p-2 border-b border-gray-100 text-[12px] font-bold text-gray-500 bg-gray-50">
                  Sản phẩm gợi ý
                </div>
                {searchResults.map((prod) => (
                  <Link
                    to={`/product/${prod.id}`}
                    key={prod.id}
                    onClick={() => {
                      setShowSuggestions(false);
                      setSearchInputValue("");
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-50 transition-colors"
                  >
                    <img
                      src={prod.hinh_anh}
                      alt={prod.ten_san_pham}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex flex-col">
                      <span className="text-[13px] font-medium text-gray-800 line-clamp-2 leading-tight mb-1">
                        {prod.ten_san_pham}
                      </span>
                      <span className="text-[13px] font-bold text-[#ff5722]">
                        {Number(
                          prod.gia_khuyen_mai || prod.gia_ban,
                        ).toLocaleString("vi-VN")}{" "}
                        đ
                      </span>
                    </div>
                  </Link>
                ))}
                <div
                  onClick={() => {
                    setShowSuggestions(false);
                    navigate(
                      `/products?search=${encodeURIComponent(searchInputValue.trim())}`,
                    );
                  }}
                  className="p-3 text-center text-[13px] font-bold text-blue-600 hover:bg-blue-50 cursor-pointer"
                >
                  Xem tất cả kết quả cho "{searchInputValue}"
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-2 text-[12px] text-gray-500 dark:text-gray-400">
              {categories.slice(0, 3).map((cat) => (
                <Link
                  to={`/products?category=${cat.id}`}
                  key={cat.id}
                  className="hover:text-[#ff5722]"
                >
                  {cat.ten_danh_muc}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Actions */}
          <div className="hidden xl:flex items-center gap-5">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-10 h-10 rounded-full border border-teal-600 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors shadow-sm">
                <Phone size={18} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] text-gray-600 dark:text-gray-400 font-medium">
                  Hotline mua hàng
                </span>
                <span className="text-[13px] font-bold text-gray-900 dark:text-white">
                  098.655.2233
                </span>
              </div>
            </div>

            <Link
              to="/news"
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full border border-orange-500 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors shadow-sm">
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
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
                  <path d="M18 14h-8"></path>
                  <path d="M15 18h-5"></path>
                  <path d="M10 6h8v4h-8V6Z"></path>
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] text-gray-600 dark:text-gray-400 font-medium">
                  Cập nhật
                </span>
                <span className="text-[13px] font-bold text-gray-900 dark:text-white">
                  Tin tức công nghệ
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-10 h-10 rounded-full border border-teal-600 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors shadow-sm">
                <Settings size={18} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] text-gray-600 dark:text-gray-400 font-medium">
                  Xây dựng
                </span>
                <span className="text-[13px] font-bold text-gray-900 dark:text-white">
                  Cấu hình PC
                </span>
              </div>
            </div>

            <Link
              to="/cart"
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full border border-teal-600 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors shadow-sm">
                <ShoppingCart size={18} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[13px] font-bold text-gray-900 dark:text-white mt-1">
                  Giỏ hàng
                </span>
              </div>
            </Link>

            {/* Separator */}
            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>

            {/* Auth / User */}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex flex-col text-right leading-tight">
                  <span className="text-[11px] text-gray-500">Xin chào,</span>
                  <span className="text-[13px] font-bold text-blue-600 truncate max-w-[120px]">
                    {user.ho_ten}
                  </span>
                </div>
                <div className="relative group">
                  <div className="w-11 h-11 rounded-full border-2 border-blue-200 bg-blue-50 text-blue-600 flex items-center justify-center font-bold cursor-pointer overflow-hidden shadow-sm hover:border-blue-500 transition-all">
                    {user.avatar ? (
                      <img
                        src={`http://localhost:5000${user.avatar}`}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : user.ho_ten ? (
                      user.ho_ten.charAt(0).toUpperCase()
                    ) : (
                      "U"
                    )}
                  </div>

                  {/* Rank Badge overlay */}
                  {user.hang_thanh_vien &&
                    user.hang_thanh_vien !== "Thành Viên" && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center shadow-md bg-white">
                        {user.hang_thanh_vien === "Bạc" && (
                          <Award size={14} className="text-gray-400" />
                        )}
                        {user.hang_thanh_vien === "Vàng" && (
                          <Star
                            size={14}
                            className="text-yellow-500"
                            fill="currentColor"
                          />
                        )}
                        {user.hang_thanh_vien === "Kim Cương" && (
                          <Diamond
                            size={14}
                            className="text-cyan-500"
                            fill="currentColor"
                          />
                        )}
                        {user.hang_thanh_vien === "VIP" && (
                          <Crown
                            size={14}
                            className="text-red-500"
                            fill="currentColor"
                          />
                        )}
                      </div>
                    )}

                  {/* Dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 text-center">
                      <p className="font-bold text-gray-900 dark:text-white">
                        {user.ho_ten}
                      </p>
                      {user.hang_thanh_vien && (
                        <span
                          className={`inline-block mt-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            user.hang_thanh_vien === "VIP"
                              ? "bg-black text-yellow-500"
                              : user.hang_thanh_vien === "Kim Cương"
                                ? "bg-cyan-100 text-cyan-700"
                                : user.hang_thanh_vien === "Vàng"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : user.hang_thanh_vien === "Bạc"
                                    ? "bg-gray-200 text-gray-700"
                                    : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {user.hang_thanh_vien}
                        </span>
                      )}
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 border-b dark:border-gray-700 flex items-center gap-2 font-medium"
                    >
                      <User size={16} /> Hồ sơ cá nhân
                    </Link>
                    {(user.vai_tro === "QUAN_TRI_VIEN" ||
                      user.vai_tro === "QUAN_TRI_CAP_CAO") && (
                      <Link
                        to="/admin"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 border-b dark:border-gray-700 flex items-center gap-2 font-medium"
                      >
                        <Settings size={16} /> Trang quản trị
                      </Link>
                    )}
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 font-medium"
                    >
                      <LogOut size={16} /> Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-500 group-hover:border-blue-500 group-hover:text-blue-500 transition-colors">
                  <User size={18} />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[11px] text-gray-500">Đăng nhập</span>
                  <span className="text-[13px] font-bold text-gray-900 dark:text-white">
                    Tài khoản
                  </span>
                </div>
              </Link>
            )}

            {/* Dark Mode */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors ml-2"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex xl:hidden items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 text-gray-500"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="p-2 text-gray-500">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 relative">
        <div className="max-w-[1700px] mx-auto px-4 lg:px-8">
          <div className="flex items-center h-12 relative">
            {/* Category Button & Dropdown Menu */}
            <div className="bg-[#002f35] text-white px-5 h-full flex items-center gap-3 font-bold text-[13px] cursor-pointer hover:bg-[#003d45] transition-colors w-[260px] flex-shrink-0 group/menu relative z-50">
              <Menu size={20} />
              DANH MỤC SẢN PHẨM
              {/* Vertical Dropdown List */}
              <div
                key={menuKey}
                className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-xl border-x border-b border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-300 flex flex-col text-gray-900 dark:text-gray-100 font-normal"
              >
                {/* Fixed "All Products" Link */}
                <div className="px-5 py-2.5 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#ff5722] transition-colors">
                  <Link
                    to="/products"
                    onClick={closeMenu}
                    className="text-[13px] font-bold block uppercase text-[#ff5722]"
                  >
                    TẤT CẢ SẢN PHẨM
                  </Link>
                </div>

                {categories.length > 0 ? (
                  categories.map((cat, idx) => (
                    <div
                      key={idx}
                      className="group/item relative px-5 py-2.5 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#ff5722] flex justify-between items-center transition-colors"
                    >
                      <Link
                        to={`/products?category=${cat.id}`}
                        onClick={closeMenu}
                        className="flex-1 text-[13px] font-medium flex items-center"
                      >
                        {cat.ten_danh_muc}
                        {cat._count?.san_phams !== undefined && (
                          <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-[11px] px-2 py-0.5 rounded-full font-medium group-hover/item:bg-[#ff5722]/10 group-hover/item:text-[#ff5722] transition-colors">
                            {cat._count.san_phams}
                          </span>
                        )}
                      </Link>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400 group-hover/item:text-[#ff5722]"
                      >
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>

                      {/* Flyout Submenu (Mega Menu Style) */}
                      <div
                        className={`absolute top-0 left-full ${cat.ten_danh_muc.toUpperCase().includes("LINH KIỆN") ? "w-[750px] min-h-[350px]" : "w-[300px] min-h-full"} bg-white dark:bg-gray-800 shadow-2xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 z-[60] p-6 flex flex-col cursor-default`}
                      >
                        {!cat.ten_danh_muc
                          .toUpperCase()
                          .includes("LINH KIỆN") && (
                          <h3 className="font-bold text-gray-800 dark:text-white text-[15px] mb-4 border-b border-gray-100 dark:border-gray-700 pb-2 uppercase text-[#ff5722]">
                            {cat.ten_danh_muc}
                          </h3>
                        )}

                        {cat.ten_danh_muc.toUpperCase().includes("PC") ||
                        cat.ten_danh_muc.toUpperCase().includes("LAPTOP") ? (
                          <div className="flex flex-col gap-y-4">
                            <Link
                              to={`/products?category=${cat.id}&maxPrice=30000000`}
                              onClick={closeMenu}
                              className="text-[14px] font-medium text-gray-700 dark:text-gray-300 hover:text-[#ff5722] hover:font-bold transition-all uppercase"
                            >
                              {cat.ten_danh_muc} GIÁ RẺ
                            </Link>
                            <Link
                              to={`/products?category=${cat.id}&minPrice=30000000`}
                              onClick={closeMenu}
                              className="text-[14px] font-medium text-gray-700 dark:text-gray-300 hover:text-[#ff5722] hover:font-bold transition-all uppercase"
                            >
                              {cat.ten_danh_muc} CAO CẤP
                            </Link>
                          </div>
                        ) : cat.ten_danh_muc
                            .toUpperCase()
                            .includes("LINH KIỆN") ? (
                          <div className="grid grid-cols-4 gap-6">
                            {/* Col 1 */}
                            <div className="flex flex-col gap-8">
                              <div>
                                <Link
                                  to={`/products?category=${cat.id}&search=VGA`}
                                  onClick={closeMenu}
                                  className="text-[#ff5722] font-bold text-[14px] uppercase block mb-3 hover:text-[#e64a19]"
                                >
                                  VGA
                                </Link>
                                <div className="flex flex-col gap-2.5">
                                  <Link
                                    to={`/products?category=${cat.id}&search=RTX`}
                                    onClick={closeMenu}
                                    className="text-gray-700 dark:text-gray-300 text-[13px] font-medium hover:text-[#ff5722] transition-colors"
                                  >
                                    VGA Nvidia RTX Series
                                  </Link>
                                  <Link
                                    to={`/products?category=${cat.id}&search=NVIDIA`}
                                    onClick={closeMenu}
                                    className="text-gray-700 dark:text-gray-300 text-[13px] font-medium hover:text-[#ff5722] transition-colors"
                                  >
                                    VGA NVIDIA
                                  </Link>
                                </div>
                              </div>
                            </div>

                            {/* Col 2 */}
                            <div className="flex flex-col gap-8">
                              <div>
                                <Link
                                  to={`/products?category=${cat.id}&search=SSD`}
                                  onClick={closeMenu}
                                  className="text-[#ff5722] font-bold text-[14px] uppercase block mb-3 hover:text-[#e64a19]"
                                >
                                  SSD
                                </Link>
                                <div className="flex flex-col gap-2.5">
                                  <Link
                                    to={`/products?category=${cat.id}&search=SSD`}
                                    onClick={closeMenu}
                                    className="text-gray-700 dark:text-gray-300 text-[13px] font-medium hover:text-[#ff5722] transition-colors"
                                  >
                                    Ổ Cứng SSD
                                  </Link>
                                  <Link
                                    to={`/products?category=${cat.id}&search=NVMe`}
                                    onClick={closeMenu}
                                    className="text-gray-700 dark:text-gray-300 text-[13px] font-medium hover:text-[#ff5722] transition-colors"
                                  >
                                    SSD NVMe
                                  </Link>
                                </div>
                              </div>
                            </div>

                            {/* Col 3 */}
                            <div className="flex flex-col gap-8">
                              <div>
                                <Link
                                  to={`/products?category=${cat.id}&search=Mainboard`}
                                  onClick={closeMenu}
                                  className="text-[#ff5722] font-bold text-[14px] uppercase block mb-3 hover:text-[#e64a19]"
                                >
                                  Main
                                </Link>
                                <div className="flex flex-col gap-2.5">
                                  <Link
                                    to={`/products?category=${cat.id}&search=Intel`}
                                    onClick={closeMenu}
                                    className="text-gray-700 dark:text-gray-300 text-[13px] font-medium hover:text-[#ff5722] transition-colors"
                                  >
                                    Mainboard INTEL
                                  </Link>
                                  <Link
                                    to={`/products?category=${cat.id}&search=AMD`}
                                    onClick={closeMenu}
                                    className="text-gray-700 dark:text-gray-300 text-[13px] font-medium hover:text-[#ff5722] transition-colors"
                                  >
                                    Mainboard AMD
                                  </Link>
                                </div>
                              </div>
                            </div>

                            {/* Col 4 */}
                            <div className="flex flex-col gap-8">
                              <div>
                                <Link
                                  to={`/products?category=${cat.id}&search=VGA`}
                                  onClick={closeMenu}
                                  className="text-[#ff5722] font-bold text-[14px] uppercase block mb-3 hover:text-[#e64a19]"
                                >
                                  Card màn hình
                                </Link>
                                <div className="flex flex-col gap-2.5">
                                  <Link
                                    to={`/products?category=${cat.id}&search=AMD`}
                                    onClick={closeMenu}
                                    className="text-gray-700 dark:text-gray-300 text-[13px] font-medium hover:text-[#ff5722] transition-colors"
                                  >
                                    Card đồ họa AMD
                                  </Link>
                                  <Link
                                    to={`/products?category=${cat.id}&search=NVIDIA`}
                                    onClick={closeMenu}
                                    className="text-gray-700 dark:text-gray-300 text-[13px] font-medium hover:text-[#ff5722] transition-colors"
                                  >
                                    Card đồ họa NVIDIA
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-y-4">
                            <Link
                              to={`/products?category=${cat.id}`}
                              onClick={closeMenu}
                              className="text-[14px] font-medium text-gray-700 dark:text-gray-300 hover:text-[#ff5722] hover:font-bold transition-all uppercase"
                            >
                              XEM TẤT CẢ {cat.ten_danh_muc}
                            </Link>
                            <Link
                              to={`/products?category=${cat.id}&sort=newest`}
                              onClick={closeMenu}
                              className="text-[14px] font-medium text-gray-700 dark:text-gray-300 hover:text-[#ff5722] hover:font-bold transition-all uppercase"
                            >
                              SẢN PHẨM MỚI NHẤT
                            </Link>
                            <Link
                              to={`/products?category=${cat.id}&sort=hot`}
                              onClick={closeMenu}
                              className="text-[14px] font-medium text-gray-700 dark:text-gray-300 hover:text-[#ff5722] hover:font-bold transition-all uppercase"
                            >
                              KHUYẾN MÃI SỐC
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-5 py-3 text-[13px] text-gray-500 text-center">
                    Đang tải danh mục...
                  </div>
                )}
              </div>
            </div>

            {/* Nav Links */}
            <div className="hidden lg:flex flex-1 items-center justify-start ml-6 gap-6 xl:gap-8 text-[12px] font-bold text-gray-800 dark:text-gray-200 uppercase tracking-tight overflow-x-auto hide-scrollbar">
              {categories.map((cat) => {
                let IconComponent = Monitor;
                const lowerName = cat.ten_danh_muc.toLowerCase();
                if (
                  lowerName.includes("workstation") ||
                  lowerName.includes("2d")
                )
                  IconComponent = Server;
                else if (lowerName.includes("amd")) IconComponent = Cpu;
                else if (lowerName.includes("mini")) IconComponent = HardDrive;
                else if (
                  lowerName.includes("văn phòng") ||
                  lowerName.includes("van phong")
                )
                  IconComponent = MonitorSmartphone;
                else if (
                  lowerName.includes("linh kiện") ||
                  lowerName.includes("linh kien")
                )
                  IconComponent = Settings;
                else if (lowerName.includes("gaming gear"))
                  IconComponent = Gamepad2;

                return (
                  <div key={cat.id} className="relative group/navitem">
                    <Link
                      to={`/products?category=${cat.id}`}
                      className="flex items-center gap-2 hover:text-[#ff5722] transition-colors group whitespace-nowrap py-2"
                    >
                      <div className="bg-[#e0f7fa] dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 p-1.5 rounded-full group-hover:scale-110 transition-transform">
                        <IconComponent size={14} />
                      </div>
                      {cat.ten_danh_muc}
                      {cat._count?.san_phams !== undefined && (
                        <span className="bg-[#ff5722]/10 text-[#ff5722] text-[10px] px-1.5 py-0.5 rounded-md font-bold ml-0.5">
                          {cat._count.san_phams}
                        </span>
                      )}
                    </Link>

                    {/* Dropdown for Linh Kiện Máy Tính */}
                    {cat.ten_danh_muc.toLowerCase().includes("linh kiện") && (
                      <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover/navitem:opacity-100 group-hover/navitem:visible transition-all duration-300 z-50">
                        <div className="w-[800px] bg-white dark:bg-gray-900 shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-gray-800 rounded-xl p-8 flex gap-8">
                          {/* VGA */}
                          <div className="flex-1">
                            <Link
                              to={`/products?category=${cat.id}&search=VGA`}
                              className="text-[#ff5722] font-bold text-[14px] uppercase border-b border-gray-100 dark:border-gray-800 pb-2 mb-3 block hover:text-[#e64a19] transition-colors"
                            >
                              VGA
                            </Link>
                            <p className="text-gray-500 text-[12px] font-normal normal-case leading-relaxed">
                              Đa dạng các mẫu Card đồ họa từ NVIDIA, AMD mạnh mẽ
                              cho Gaming & Làm việc.
                            </p>
                          </div>

                          {/* SSD */}
                          <div className="flex-1">
                            <Link
                              to={`/products?category=${cat.id}&search=SSD`}
                              className="text-[#ff5722] font-bold text-[14px] uppercase border-b border-gray-100 dark:border-gray-800 pb-2 mb-3 block hover:text-[#e64a19] transition-colors"
                            >
                              SSD
                            </Link>
                            <p className="text-gray-500 text-[12px] font-normal normal-case leading-relaxed">
                              Tăng tốc máy tính với SSD NVMe, SATA siêu tốc độ
                              đọc ghi.
                            </p>
                          </div>

                          {/* Main */}
                          <div className="flex-1">
                            <Link
                              to={`/products?category=${cat.id}&search=Mainboard`}
                              className="text-[#ff5722] font-bold text-[14px] uppercase border-b border-gray-100 dark:border-gray-800 pb-2 mb-3 block hover:text-[#e64a19] transition-colors"
                            >
                              Main
                            </Link>
                            <p className="text-gray-500 text-[12px] font-normal normal-case leading-relaxed">
                              Bo mạch chủ Intel, AMD đa dạng phân khúc từ giá rẻ
                              đến cao cấp.
                            </p>
                          </div>

                          {/* Card màn hình */}
                          <div className="flex-1">
                            <Link
                              to={`/products?category=${cat.id}&search=VGA`}
                              className="text-[#ff5722] font-bold text-[14px] uppercase border-b border-gray-100 dark:border-gray-800 pb-2 mb-3 block hover:text-[#e64a19] transition-colors"
                            >
                              Card màn hình
                            </Link>
                            <p className="text-gray-500 text-[12px] font-normal normal-case leading-relaxed">
                              Trải nghiệm hình ảnh sắc nét với các dòng Card màn
                              hình mới nhất năm nay.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
