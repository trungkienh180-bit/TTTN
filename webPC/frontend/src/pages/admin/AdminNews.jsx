import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Plus, Trash2, Edit2 } from "lucide-react";

const AdminNews = () => {
  const [news, setNews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ tieu_de: "", noi_dung: "" });
  const [imageFile, setImageFile] = useState(null);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/news");
      setNews(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Chắc chắn xóa bài viết này?")) {
      try {
        await axios.delete(`http://localhost:5000/api/news/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchNews();
      } catch (error) {
        alert("Lỗi xóa bài viết");
      }
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ tieu_de: item.tieu_de, noi_dung: item.noi_dung });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setImageFile(null);
    setFormData({ tieu_de: "", noi_dung: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingId && !imageFile) return alert("Vui lòng chọn ảnh bài viết");

    const data = new FormData();
    data.append("tieu_de", formData.tieu_de);
    data.append("noi_dung", formData.noi_dung);
    if (imageFile) {
      data.append("hinh_anh", imageFile);
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/news/${editingId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post("http://localhost:5000/api/news", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
      handleCloseModal();
      fetchNews();
    } catch (error) {
      alert("Lỗi lưu bài viết: " + error.response?.data?.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý Tin tức</h2>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({ tieu_de: "", noi_dung: "" });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          <span>Viết bài mới</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group flex flex-col"
          >
            <div className="relative h-48 bg-gray-100 flex-shrink-0">
              <img
                src={
                  item.hinh_anh?.startsWith("http")
                    ? item.hinh_anh
                    : `http://localhost:5000${item.hinh_anh}`
                }
                alt={item.tieu_de}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <span className="text-xs text-gray-500 mb-2">
                {new Date(item.tao_luc).toLocaleDateString("vi-VN")}
              </span>
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                {item.tieu_de}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {item.noi_dung}
              </p>
            </div>
          </div>
        ))}
        {news.length === 0 && (
          <div className="col-span-full p-8 text-center text-gray-500 bg-white rounded-xl border border-gray-200">
            Chưa có bài viết nào.
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 my-8">
            <h3 className="text-xl font-bold mb-4">
              {editingId ? "Sửa bài viết" : "Viết bài mới"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1 font-medium">
                  Tiêu đề
                </label>
                <input
                  type="text"
                  required
                  value={formData.tieu_de}
                  onChange={(e) =>
                    setFormData({ ...formData, tieu_de: e.target.value })
                  }
                  className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 font-medium">
                  Hình ảnh đại diện
                </label>
                <input
                  type="file"
                  accept="image/*"
                  required={!editingId}
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 font-medium">
                  Nội dung bài viết
                </label>
                <textarea
                  required
                  rows="6"
                  value={formData.noi_dung}
                  onChange={(e) =>
                    setFormData({ ...formData, noi_dung: e.target.value })
                  }
                  className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                ></textarea>
              </div>
              <div className="flex gap-4 justify-end mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-100 rounded-lg"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  {editingId ? "Cập nhật" : "Đăng bài"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNews;
