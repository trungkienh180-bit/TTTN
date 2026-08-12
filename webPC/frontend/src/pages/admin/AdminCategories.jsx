import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    ten_danh_muc: "",
    mo_ta: "",
  });
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Lỗi tải danh mục", error);
    }
  };

  const handleAddClick = () => {
    setEditingId(null);
    setFormData({ ten_danh_muc: "", mo_ta: "" });
    setIsModalOpen(true);
  };

  const handleEditClick = (cat) => {
    setEditingId(cat.id);
    setFormData({ ten_danh_muc: cat.ten_danh_muc, mo_ta: cat.mo_ta || "" });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Bạn có chắc muốn xóa danh mục này? LƯU Ý: Các sản phẩm thuộc danh mục cũng có thể bị ảnh hưởng!",
      )
    ) {
      try {
        await axios.delete(`http://localhost:5000/api/categories/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchCategories();
      } catch (error) {
        alert(
          "Không thể xóa danh mục. Có thể danh mục này đang chứa sản phẩm.",
        );
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/categories/${editingId}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
      } else {
        await axios.post("http://localhost:5000/api/categories", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (error) {
      alert("Lỗi: " + error.response?.data?.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý Danh mục</h2>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          <span>Thêm Danh mục</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500">
              <th className="p-4 font-semibold">ID</th>
              <th className="p-4 font-semibold">Tên Danh mục</th>
              <th className="p-4 font-semibold">Mô tả</th>
              <th className="p-4 font-semibold text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr
                key={cat.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="p-4 font-medium text-gray-900">#{cat.id}</td>
                <td className="p-4 font-medium text-blue-600">
                  {cat.ten_danh_muc}
                </td>
                <td className="p-4 text-gray-600 max-w-md truncate">
                  {cat.mo_ta || "Không có mô tả"}
                </td>
                <td className="p-4 flex justify-end gap-3">
                  <button
                    onClick={() => handleEditClick(cat)}
                    className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">
                  Chưa có danh mục nào. Hãy ấn nút Thêm.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 my-8 relative">
            <h3 className="text-xl font-bold mb-4">
              {editingId ? "Chỉnh sửa Danh mục" : "Thêm Danh mục mới"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1 font-medium text-gray-700">
                  Tên danh mục
                </label>
                <input
                  type="text"
                  value={formData.ten_danh_muc}
                  onChange={(e) =>
                    setFormData({ ...formData, ten_danh_muc: e.target.value })
                  }
                  className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                  placeholder="Ví dụ: PC Gaming"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 font-medium text-gray-700">
                  Mô tả (không bắt buộc)
                </label>
                <textarea
                  value={formData.mo_ta}
                  onChange={(e) =>
                    setFormData({ ...formData, mo_ta: e.target.value })
                  }
                  className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  rows="3"
                  placeholder="Mô tả về danh mục này..."
                ></textarea>
              </div>
              <div className="flex gap-4 justify-end mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  {editingId ? "Cập nhật" : "Lưu Danh mục"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
