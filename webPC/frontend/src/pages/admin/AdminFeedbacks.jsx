import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Mail, CheckCircle, Trash2, Clock } from "lucide-react";

const AdminFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/feedbacks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbacks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/feedbacks/${id}`,
        { trang_thai: status },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchFeedbacks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFeedback = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa phản hồi này?")) {
      try {
        await axios.delete(`http://localhost:5000/api/feedbacks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchFeedbacks();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Phản hồi Khách hàng
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500">
              <th className="p-4 font-semibold">Khách hàng</th>
              <th className="p-4 font-semibold">Nội dung</th>
              <th className="p-4 font-semibold">Trạng thái</th>
              <th className="p-4 font-semibold">Thời gian</th>
              <th className="p-4 font-semibold text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="p-4">
                  <div className="font-medium text-gray-900">{item.ho_ten}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Mail size={12} /> {item.email}
                  </div>
                </td>
                <td className="p-4 text-gray-700 max-w-md truncate">
                  {item.noi_dung}
                </td>
                <td className="p-4">
                  {item.trang_thai === "CHUA_DOC" && (
                    <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold flex items-center gap-1 w-fit">
                      <Clock size={12} /> Chưa đọc
                    </span>
                  )}
                  {item.trang_thai === "DA_XU_LY" && (
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-bold flex items-center gap-1 w-fit">
                      <CheckCircle size={12} /> Đã xử lý
                    </span>
                  )}
                </td>
                <td className="p-4 text-gray-500 text-sm">
                  {new Date(item.tao_luc).toLocaleDateString("vi-VN")}
                </td>
                <td className="p-4 flex justify-end gap-2">
                  {item.trang_thai === "CHUA_DOC" && (
                    <button
                      onClick={() => updateStatus(item.id, "DA_XU_LY")}
                      className="text-green-600 hover:bg-green-50 px-3 py-1.5 rounded-lg text-sm border border-green-200 transition-colors"
                    >
                      Đánh dấu Đã xử lý
                    </button>
                  )}
                  <button
                    onClick={() => deleteFeedback(item.id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg border border-red-100 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {feedbacks.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">
                  Chưa có phản hồi nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminFeedbacks;
