import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Plus, Trash2, Image } from "lucide-react";

const AdminBanners = () => {
  const [banners, setBanners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ tieu_de: "", lien_ket: "" });
  const [imageFile, setImageFile] = useState(null);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/banners");
      setBanners(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Chắc chắn xóa banner này?")) {
      try {
        await axios.delete(`http://localhost:5000/api/banners/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchBanners();
      } catch (error) {
        alert("Lỗi xóa banner");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Vui lòng chọn ảnh");

    const data = new FormData();
    data.append("tieu_de", formData.tieu_de);
    data.append("lien_ket", formData.lien_ket);
    data.append("hinh_anh", imageFile);

    try {
      await axios.post("http://localhost:5000/api/banners", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setIsModalOpen(false);
      setImageFile(null);
      setFormData({ tieu_de: "", lien_ket: "" });
      fetchBanners();
    } catch (error) {
      alert("Lỗi thêm banner: " + error.response?.data?.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý Banner</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          <span>Thêm Banner</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group"
          >
            <div className="relative h-48 bg-gray-100 flex items-center justify-center">
              <img
                src={`http://localhost:5000${banner.hinh_anh}`}
                alt={banner.tieu_de}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handleDelete(banner.id)}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-1">{banner.tieu_de}</h3>
              <p className="text-sm text-blue-600 truncate">
                {banner.lien_ket || "Không có liên kết"}
              </p>
            </div>
          </div>
        ))}
        {banners.length === 0 && (
          <div className="col-span-full p-8 text-center text-gray-500 bg-white rounded-xl border border-gray-200">
            Chưa có banner nào.
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4">Thêm Banner Mới</h3>
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
                  Đường dẫn liên kết (tùy chọn)
                </label>
                <input
                  type="text"
                  value={formData.lien_ket}
                  onChange={(e) =>
                    setFormData({ ...formData, lien_ket: e.target.value })
                  }
                  className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm mb-1 font-medium">
                  Hình ảnh
                </label>
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="flex gap-4 justify-end mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 rounded-lg"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Tải lên
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBanners;
