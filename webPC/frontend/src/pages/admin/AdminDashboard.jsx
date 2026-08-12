import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Package, Tag, Users, ShoppingCart, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    users: 0,
    users: 0,
    feedbacks: 0,
    orders: 0,
  });
  const { token } = useSelector((state) => state.auth);

  const [revenueData, setRevenueData] = useState([]);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [prodRes, catRes, userRes, orderRes] = await Promise.all([
        axios.get("http://localhost:5000/api/products?limit=1"),
        axios.get("http://localhost:5000/api/categories"),
        axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/orders/all", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const orders = orderRes.data || [];

      setStats({
        products: prodRes.data.pagination?.total || 0,
        categories: catRes.data.length || 0,
        users: userRes.data.length || 0,
        feedbacks: 0,
        orders: orders.length,
      });

      // Calculate Revenue for the last 7 days
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return {
          dateObj: d,
          name: d.toLocaleDateString("vi-VN", { weekday: "short" }),
          revenue: 0,
          dateString: d.toISOString().split("T")[0],
        };
      });

      orders.forEach((order) => {
        if (
          order.trang_thai_tt === "DA_THANH_TOAN" ||
          order.trang_thai === "DA_GIAO" ||
          order.phuong_thuc_tt === "COD"
        ) {
          const orderDate = new Date(order.tao_luc).toISOString().split("T")[0];
          const dayIndex = last7Days.findIndex(
            (d) => d.dateString === orderDate,
          );
          if (dayIndex !== -1) {
            last7Days[dayIndex].revenue += Number(order.tong_tien);
          }
        }
      });

      setRevenueData(last7Days);

      // Calculate Order by Category
      const catCount = {};
      orders.forEach((order) => {
        if (order.chi_tiet) {
          order.chi_tiet.forEach((item) => {
            const catName = item.san_pham?.danh_muc?.ten_danh_muc || "Khác";
            catCount[catName] = (catCount[catName] || 0) + item.so_luong;
          });
        }
      });

      const formattedOrderData = Object.keys(catCount)
        .map((key) => ({
          name: key,
          count: catCount[key],
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5); // top 5 categories

      setOrderData(
        formattedOrderData.length > 0
          ? formattedOrderData
          : [{ name: "Chưa có", count: 0 }],
      );
    } catch (error) {
      console.error(error);
    }
  };

  const statCards = [
    {
      title: "Tổng Sản Phẩm",
      value: stats.products,
      icon: <Package size={24} className="text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "Danh Mục",
      value: stats.categories,
      icon: <Tag size={24} className="text-purple-600" />,
      bg: "bg-purple-100",
    },
    {
      title: "Khách Hàng",
      value: stats.users,
      icon: <Users size={24} className="text-green-600" />,
      bg: "bg-green-100",
    },
    {
      title: "Đơn Hàng",
      value: stats.orders,
      icon: <ShoppingCart size={24} className="text-orange-600" />,
      bg: "bg-orange-100",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Bảng Điều Khiển</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200">
          <TrendingUp size={16} />
          <span>Dữ liệu được cập nhật theo thời gian thực</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
          >
            <div className={`p-4 rounded-xl ${card.bg}`}>{card.icon}</div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                {card.title}
              </p>
              <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[350px]">
          <h3 className="text-lg font-bold text-gray-800 mb-6">
            Biểu Đồ Doanh Thu 7 Ngày Gần Nhất
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[350px]">
          <h3 className="text-lg font-bold text-gray-800 mb-6">
            Đơn Hàng Theo Danh Mục
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
