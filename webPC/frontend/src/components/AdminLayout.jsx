import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  LayoutDashboard,
  Package,
  Tag,
  Users,
  FileText,
  Image,
  LogOut,
  MessageSquare,
  ShoppingCart,
  Settings,
} from "lucide-react";
import { logout, reset } from "../store/authSlice";
import { useEffect } from "react";

const AdminLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
    {
      name: "Quản lý Đơn hàng",
      path: "/admin/orders",
      icon: <ShoppingCart size={20} />,
    },
    {
      name: "Quản lý Sản phẩm",
      path: "/admin/products",
      icon: <Package size={20} />,
    },
    {
      name: "Quản lý Danh mục",
      path: "/admin/categories",
      icon: <Tag size={20} />,
    },
    {
      name: "Quản lý Phản hồi",
      path: "/admin/feedbacks",
      icon: <MessageSquare size={20} />,
    },
    {
      name: "Quản lý Tin tức",
      path: "/admin/news",
      icon: <FileText size={20} />,
    },
    {
      name: "Quản lý Banner",
      path: "/admin/banners",
      icon: <Image size={20} />,
    },
    {
      name: "Quản lý Người dùng",
      path: "/admin/users",
      icon: <Users size={20} />,
    },
    {
      name: "Cấu hình & Khóa",
      path: "/admin/config",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-gray-800">
          <span className="font-bold text-2xl tracking-tight text-white">
            WebPC Admin
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">
              {user?.ho_ten?.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-white">{user?.ho_ten}</p>
              <p className="text-xs text-gray-400">Quản trị viên</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
          >
            <LogOut size={18} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold text-gray-800">
            {navItems.find((item) => item.path === location.pathname)?.name ||
              "Dashboard"}
          </h1>
        </header>
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
