import { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Edit2,
  Trash2,
  Package,
  Tag,
  Layers,
  Cpu,
  HardDrive,
  Monitor,
  Activity,
} from "lucide-react";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    ten_san_pham: "",
    danh_muc_id: "",
    gia_ban: "",
    gia_khuyen_mai: "",
    so_luong: "",
    mo_ta: "",
    hinh_anh: "",
    hinh_anh_1: "",
    hinh_anh_2: "",
    hinh_anh_3: "",
    la_moi: false,
    la_ban_chay: false,
    la_giam_gia: false,
    hang_san_xuat: "",
    mainboard: "",
    cpu: "",
    ram: "",
    vga: "",
    o_cung: "",
    tan_nhiet: "",
    vo_case: "",
    nguon: "",
    he_dieu_hanh: "",
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products?limit=100",
      );
      setProducts(res.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setFormData({
      ten_san_pham: product.ten_san_pham,
      danh_muc_id: product.danh_muc_id,
      gia_ban: product.gia_ban,
      gia_khuyen_mai: product.gia_khuyen_mai || "",
      so_luong: product.so_luong,
      mo_ta: product.mo_ta || "",
      hinh_anh: product.hinh_anh || "",
      hinh_anh_1: product.hinh_anh_1 || "",
      hinh_anh_2: product.hinh_anh_2 || "",
      hinh_anh_3: product.hinh_anh_3 || "",
      la_moi: product.la_moi || false,
      la_ban_chay: product.la_ban_chay || false,
      la_giam_gia: product.la_giam_gia || false,
      hang_san_xuat: product.hang_san_xuat || "",
      mainboard: product.mainboard || "",
      cpu: product.cpu || "",
      ram: product.ram || "",
      vga: product.vga || "",
      o_cung: product.o_cung || "",
      tan_nhiet: product.tan_nhiet || "",
      vo_case: product.vo_case || "",
      nguon: product.nguon || "",
      he_dieu_hanh: product.he_dieu_hanh || "",
    });
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setEditingId(null);
    setFormData({
      ten_san_pham: "",
      danh_muc_id: "",
      gia_ban: "",
      gia_khuyen_mai: "",
      so_luong: "",
      mo_ta: "",
      hinh_anh: "",
      hinh_anh_1: "",
      hinh_anh_2: "",
      hinh_anh_3: "",
      la_moi: false,
      la_ban_chay: false,
      la_giam_gia: false,
      hang_san_xuat: "",
      mainboard: "",
      cpu: "",
      ram: "",
      vga: "",
      o_cung: "",
      tan_nhiet: "",
      vo_case: "",
      nguon: "",
      he_dieu_hanh: "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    // Validation for tech specs
    const requiredSpecs = [
      "mainboard",
      "cpu",
      "ram",
      "vga",
      "o_cung",
      "tan_nhiet",
      "vo_case",
      "nguon",
      "he_dieu_hanh",
    ];
    const missingSpecs = requiredSpecs.filter(
      (key) => !formData[key] || formData[key].toString().trim() === "",
    );

    if (missingSpecs.length > 0) {
      alert(
        '⚠️ CẢNH BÁO: Vui lòng điền đầy đủ các THÔNG SỐ CẤU HÌNH (Mainboard, CPU, RAM, VGA, Ổ cứng, Tản nhiệt, Case, Nguồn, Hệ điều hành). Chỉ duy nhất ô "Hãng sản xuất" là được phép để trống!',
      );
      setIsSubmitting(false);
      return;
    }

    // Check for duplicate name
    const isDuplicate = products.some(
      (p) =>
        p.ten_san_pham.trim().toLowerCase() ===
          formData.ten_san_pham.trim().toLowerCase() && p.id !== editingId,
    );

    if (isDuplicate) {
      alert(
        `⚠️ CẢNH BÁO: Sản phẩm có tên "${formData.ten_san_pham.trim()}" đã tồn tại trong kho!\nVui lòng nhập một tên khác để tránh trùng lặp.`,
      );
      setIsSubmitting(false);
      return;
    }

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/products/${editingId}`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
      } else {
        await axios.post("http://localhost:5000/api/products", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      alert("Lỗi: " + error.response?.data?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const isDuplicateNameUI =
    formData.ten_san_pham.trim() !== "" &&
    products.some(
      (p) =>
        p.ten_san_pham.trim().toLowerCase() ===
          formData.ten_san_pham.trim().toLowerCase() && p.id !== editingId,
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Quản lý Sản phẩm</h2>
          <p className="text-gray-500 text-sm mt-1">
            Thêm, sửa, xóa và quản lý kho hàng
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 shadow-sm transition-all"
        >
          <Plus size={20} />
          <span>Thêm Sản phẩm</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Tổng sản phẩm</p>
            <h3 className="text-2xl font-bold text-gray-900">
              {products.length}
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Sắp hết hàng</p>
            <h3 className="text-2xl font-bold text-gray-900">
              {products.filter((p) => p.so_luong < 5).length}
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
            <Layers size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Danh mục</p>
            <h3 className="text-2xl font-bold text-gray-900">
              {categories.length}
            </h3>
          </div>
        </div>
      </div>

      {/* Category Tags with Product Counts */}
      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm"
          >
            {cat.ten_danh_muc}
            <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-lg font-bold">
              {cat._count?.san_phams || 0}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
                <th className="p-4 font-semibold w-24">Hình ảnh</th>
                <th className="p-4 font-semibold">Tên sản phẩm</th>
                <th className="p-4 font-semibold">Danh mục</th>
                <th className="p-4 font-semibold">Giá bán</th>
                <th className="p-4 font-semibold">Tồn kho</th>
                <th className="p-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    Chưa có sản phẩm nào. Hãy bấm thêm mới.
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  // Check if image is external link or local
                  const imgSrc = product.hinh_anh?.startsWith("http")
                    ? product.hinh_anh
                    : `http://localhost:5000${product.hinh_anh}`;

                  return (
                    <tr
                      key={product.id}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="p-4">
                        <img
                          src={imgSrc}
                          alt=""
                          className="w-16 h-16 object-cover rounded-xl border border-gray-100"
                        />
                      </td>
                      <td className="p-4 font-medium text-gray-900">
                        <div className="flex items-center gap-2">
                          <span
                            className="max-w-[250px] truncate block"
                            title={product.ten_san_pham}
                          >
                            {product.ten_san_pham}
                          </span>
                          {product.so_luong < 5 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 flex-shrink-0">
                              Sắp hết
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {product.danh_muc?.ten_danh_muc || "Không có"}
                        </span>
                      </td>
                      <td className="p-4 text-gray-900 font-medium">
                        {Number(product.gia_ban).toLocaleString("vi-VN")}đ
                      </td>
                      <td className="p-4 text-gray-600 font-medium">
                        {product.so_luong}
                      </td>
                      <td className="p-4 flex justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(product)}
                          className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                          title="Sửa"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Thêm/Sửa sản phẩm */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl">
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">
                {editingId ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-8">
              {/* Section 1: Thông tin cơ bản */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Tag size={16} /> THÔNG TIN CƠ BẢN
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên sản phẩm *
                    </label>
                    <input
                      type="text"
                      value={formData.ten_san_pham}
                      className={`w-full border px-4 py-2.5 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all ${isDuplicateNameUI ? "border-red-500 focus:ring-red-500 bg-red-50" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                      required
                      placeholder="Nhập tên sản phẩm..."
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ten_san_pham: e.target.value,
                        })
                      }
                    />
                    {isDuplicateNameUI && (
                      <p className="text-red-500 text-sm mt-1.5 font-medium flex items-center gap-1">
                        ⚠️ Tên sản phẩm này đã tồn tại trong kho!
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Danh mục *
                    </label>
                    <select
                      value={formData.danh_muc_id}
                      className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      required
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          danh_muc_id: e.target.value,
                        })
                      }
                    >
                      <option value="">-- Chọn danh mục --</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.ten_danh_muc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Giá bán (VNĐ) *
                    </label>
                    <input
                      type="number"
                      value={formData.gia_ban}
                      className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      required
                      placeholder="Ví dụ: 15000000"
                      onChange={(e) =>
                        setFormData({ ...formData, gia_ban: e.target.value })
                      }
                    />
                    {formData.gia_ban && (
                      <p className="text-sm text-blue-600 mt-1.5 font-medium ml-1">
                        ≈ {Number(formData.gia_ban).toLocaleString("vi-VN")} VNĐ
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số lượng trong kho *
                    </label>
                    <input
                      type="number"
                      value={formData.so_luong}
                      className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      required
                      placeholder="100"
                      onChange={(e) =>
                        setFormData({ ...formData, so_luong: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ảnh đại diện (URL) *
                    </label>
                    <input
                      type="text"
                      value={formData.hinh_anh}
                      className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      required
                      placeholder="https://..."
                      onChange={(e) =>
                        setFormData({ ...formData, hinh_anh: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Góc 1 (URL)
                      </label>
                      <input
                        type="text"
                        value={formData.hinh_anh_1}
                        className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="https://..."
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hinh_anh_1: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Góc 2 (URL)
                      </label>
                      <input
                        type="text"
                        value={formData.hinh_anh_2}
                        className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="https://..."
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hinh_anh_2: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Góc 3 (URL)
                      </label>
                      <input
                        type="text"
                        value={formData.hinh_anh_3}
                        className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="https://..."
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hinh_anh_3: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Cấu hình kỹ thuật */}
              <div className="pt-6 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Cpu size={16} /> THÔNG SỐ CẤU HÌNH (Tùy chọn)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                      <HardDrive size={16} className="text-gray-400" /> Hãng sản
                      xuất
                    </label>
                    <input
                      type="text"
                      value={formData.hang_san_xuat}
                      className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="VD: ASUS, MSI..."
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hang_san_xuat: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                      <Cpu size={16} className="text-gray-400" /> Mainboard *
                    </label>
                    <input
                      type="text"
                      value={formData.mainboard}
                      className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                      placeholder="VD: B760M"
                      onChange={(e) =>
                        setFormData({ ...formData, mainboard: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                      <Cpu size={16} className="text-gray-400" /> CPU *
                    </label>
                    <input
                      type="text"
                      value={formData.cpu}
                      className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                      placeholder="VD: Core i5 12400F"
                      onChange={(e) =>
                        setFormData({ ...formData, cpu: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                      <HardDrive size={16} className="text-gray-400" /> RAM *
                    </label>
                    <input
                      type="text"
                      value={formData.ram}
                      className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                      placeholder="VD: 16GB DDR4 3200MHz"
                      onChange={(e) =>
                        setFormData({ ...formData, ram: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                      <HardDrive size={16} className="text-gray-400" /> Ổ cứng *
                    </label>
                    <input
                      type="text"
                      value={formData.o_cung}
                      className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                      placeholder="VD: 500GB SSD NVMe"
                      onChange={(e) =>
                        setFormData({ ...formData, o_cung: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                      <Monitor size={16} className="text-gray-400" /> Card Đồ
                      Họa (VGA) *
                    </label>
                    <input
                      type="text"
                      value={formData.vga}
                      className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                      placeholder="VD: RTX 4060 8GB"
                      onChange={(e) =>
                        setFormData({ ...formData, vga: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                      <Activity size={16} className="text-gray-400" /> Tản nhiệt
                      *
                    </label>
                    <input
                      type="text"
                      value={formData.tan_nhiet}
                      className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                      placeholder="VD: Tản khí Jonsbo"
                      onChange={(e) =>
                        setFormData({ ...formData, tan_nhiet: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                      <Layers size={16} className="text-gray-400" /> Case (Vỏ
                      máy) *
                    </label>
                    <input
                      type="text"
                      value={formData.vo_case}
                      className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                      placeholder="VD: Xigmatek"
                      onChange={(e) =>
                        setFormData({ ...formData, vo_case: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                      <Activity size={16} className="text-gray-400" /> Nguồn
                      (PSU) *
                    </label>
                    <input
                      type="text"
                      value={formData.nguon}
                      className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                      placeholder="VD: 650W 80 Plus"
                      onChange={(e) =>
                        setFormData({ ...formData, nguon: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                      <Layers size={16} className="text-gray-400" /> Hệ điều
                      hành *
                    </label>
                    <input
                      type="text"
                      value={formData.he_dieu_hanh}
                      className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                      placeholder="VD: Windows 11 Pro"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          he_dieu_hanh: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <label className="flex items-center gap-3 cursor-pointer group p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors w-max mb-6">
                  <input
                    type="checkbox"
                    checked={formData.la_giam_gia}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        la_giam_gia: e.target.checked,
                      })
                    }
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                    Đánh dấu là hàng "DEAL HOT"
                  </span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả sản phẩm chi tiết
                  </label>
                  <textarea
                    value={formData.mo_ta}
                    rows="5"
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="Viết mô tả chi tiết, tính năng nổi bật của sản phẩm..."
                    onChange={(e) =>
                      setFormData({ ...formData, mo_ta: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white pt-4 pb-2 border-t border-gray-100 flex gap-4 justify-end mt-8">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2.5 text-white font-medium rounded-xl shadow-sm transition-colors ${isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                  {isSubmitting
                    ? "Đang xử lý..."
                    : editingId
                      ? "Cập nhật thay đổi"
                      : "Lưu sản phẩm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
