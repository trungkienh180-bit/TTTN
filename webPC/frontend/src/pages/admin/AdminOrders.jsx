import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Package, Search, Filter, X } from "lucide-react";
import { toast } from "react-hot-toast";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // States cho Modals
  const [viewOrder, setViewOrder] = useState(null);
  const [updateOrder, setUpdateOrder] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateData, setUpdateData] = useState({
    trang_thai: "",
    trang_thai_tt: "",
  });

  const { user, token } = useSelector((state) => state.auth);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders", error);
      toast.error("Lỗi tải danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status) {
      case "CHO_XAC_NHAN":
        return "bg-yellow-100 text-yellow-800";
      case "DANG_XU_LY":
        return "bg-blue-100 text-blue-800";
      case "DANG_GIAO_HANG":
        return "bg-purple-100 text-purple-800";
      case "DA_GIAO":
        return "bg-green-100 text-green-800";
      case "DA_HUY":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "CHUA_THANH_TOAN":
        return "bg-yellow-100 text-yellow-800";
      case "DA_THANH_TOAN":
        return "bg-green-100 text-green-800";
      case "THAT_BAI":
        return "bg-red-100 text-red-800";
      case "HOAN_TIEN":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${updateOrder.id}/status`,
        updateData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast.success("Cập nhật trạng thái thành công!");
      setUpdateOrder(null);
      fetchOrders();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Có lỗi xảy ra khi cập nhật",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Package className="w-6 h-6 text-blue-600" />
          Quản Lý Đơn Hàng
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm mã đơn..."
              className="pl-10 pr-4 py-2 border rounded-lg"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white hover:bg-gray-50">
            <Filter className="w-5 h-5" /> Lọc
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">Đang tải...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã ĐH
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái ĐH
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thanh toán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {order.so_dien_thoai}
                    </div>
                    <div
                      className="text-sm text-gray-500 truncate w-32"
                      title={order.dia_chi_giao}
                    >
                      {order.dia_chi_giao}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-red-600">
                    {Number(order.tong_tien).toLocaleString()}đ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.trang_thai)}`}
                    >
                      {order.trang_thai}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusColor(order.trang_thai_tt)}`}
                    >
                      {order.trang_thai_tt} ({order.phuong_thuc_tt})
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.tao_luc).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setViewOrder(order)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Xem
                    </button>
                    <button
                      onClick={() => {
                        setUpdateOrder(order);
                        setUpdateData({
                          trang_thai: order.trang_thai,
                          trang_thai_tt: order.trang_thai_tt,
                        });
                      }}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Cập nhật
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Chưa có đơn hàng nào.
            </div>
          )}
        </div>
      )}

      {/* Modal Xem Chi Tiết Đơn Hàng */}
      {viewOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-800">
                Chi tiết đơn hàng #{viewOrder.id}
              </h2>
              <button
                onClick={() => setViewOrder(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Thông tin khách hàng
                  </h3>
                  <p className="text-sm">
                    <span className="text-gray-500">Tên:</span>{" "}
                    {viewOrder.ten_khach_hang}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">SĐT:</span>{" "}
                    {viewOrder.so_dien_thoai}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Email:</span>{" "}
                    {viewOrder.email_khach_hang || "Không có"}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Địa chỉ:</span>{" "}
                    {viewOrder.dia_chi_giao}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Thông tin đơn hàng
                  </h3>
                  <p className="text-sm">
                    <span className="text-gray-500">Ngày đặt:</span>{" "}
                    {new Date(viewOrder.tao_luc).toLocaleString("vi-VN")}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Phương thức TT:</span>{" "}
                    {viewOrder.phuong_thuc_tt}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Ghi chú:</span>{" "}
                    {viewOrder.ghi_chu || "Không có"}
                  </p>
                </div>
              </div>

              <h3 className="font-semibold text-gray-700 mb-3">
                Sản phẩm đã đặt
              </h3>
              <div className="border rounded-lg overflow-hidden mb-4">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 font-medium">Sản phẩm</th>
                      <th className="p-3 font-medium text-center">SL</th>
                      <th className="p-3 font-medium text-right">Đơn giá</th>
                      <th className="p-3 font-medium text-right">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {viewOrder.chi_tiet?.map((item, idx) => (
                      <tr key={idx}>
                        <td className="p-3 flex items-center gap-3">
                          <img
                            src={`http://localhost:5000${item.san_pham?.hinh_anh}`}
                            alt=""
                            className="w-10 h-10 object-cover rounded"
                          />
                          <span className="line-clamp-1">
                            {item.san_pham?.ten_san_pham}
                          </span>
                        </td>
                        <td className="p-3 text-center">{item.so_luong}</td>
                        <td className="p-3 text-right">
                          {Number(item.gia_mua).toLocaleString()}đ
                        </td>
                        <td className="p-3 text-right font-medium text-red-600">
                          {(
                            item.so_luong * Number(item.gia_mua)
                          ).toLocaleString()}
                          đ
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end">
                <div className="text-lg font-bold">
                  <span className="text-gray-600 mr-4">Tổng cộng:</span>
                  <span className="text-red-600">
                    {Number(viewOrder.tong_tien).toLocaleString()}đ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Cập Nhật Trạng Thái */}
      {updateOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center p-5 border-b">
              <h2 className="text-xl font-bold text-gray-800">
                Cập nhật đơn hàng #{updateOrder.id}
              </h2>
              <button
                onClick={() => setUpdateOrder(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleUpdateStatus} className="p-5">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trạng thái đơn hàng
                </label>
                <select
                  className="w-full border rounded-lg p-2.5 outline-none focus:border-blue-500"
                  value={updateData.trang_thai}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, trang_thai: e.target.value })
                  }
                >
                  <option value="CHO_XAC_NHAN">Chờ xác nhận</option>
                  <option value="DANG_XU_LY">Đang xử lý</option>
                  <option value="DANG_GIAO_HANG">Đang giao hàng</option>
                  <option value="DA_GIAO">Đã giao hàng</option>
                  <option value="DA_HUY">Đã hủy</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trạng thái thanh toán
                </label>
                <select
                  className="w-full border rounded-lg p-2.5 outline-none focus:border-blue-500"
                  value={updateData.trang_thai_tt}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      trang_thai_tt: e.target.value,
                    })
                  }
                >
                  <option value="CHUA_THANH_TOAN">Chưa thanh toán</option>
                  <option value="DA_THANH_TOAN">Đã thanh toán</option>
                  <option value="THAT_BAI">Thất bại</option>
                  <option value="HOAN_TIEN">Hoàn tiền</option>
                </select>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setUpdateOrder(null)}
                  className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isUpdating ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
