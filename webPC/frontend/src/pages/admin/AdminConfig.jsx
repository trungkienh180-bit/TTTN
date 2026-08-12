import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Settings, Save, Layout, Palette } from "lucide-react";

const AdminConfig = () => {
  const [configs, setConfigs] = useState({
    logo_url: "",
    primary_color: "#2563eb",
    show_new_products: "true",
    show_sale_products: "true",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/configs");
        if (Object.keys(res.data).length > 0) {
          setConfigs((prev) => ({ ...prev, ...res.data }));
        }
      } catch (error) {
        console.error("Error fetching configs", error);
      }
    };
    fetchConfigs();
  }, []);

  const handleChange = (key, value) => {
    setConfigs((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (key) => {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/configs",
        { khoa: key, gia_tri: configs[key] },
        { headers: { Authorization: `Bearer ${user.token}` } },
      );
      alert("Đã lưu cấu hình!");
    } catch (error) {
      console.error(error);
      alert("Lỗi khi lưu cấu hình");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="w-6 h-6 text-blue-600" />
          Cấu Hình Giao Diện
        </h1>
        <p className="text-gray-500 mt-2">
          Tùy chỉnh màu sắc, logo và các khối hiển thị trên website.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Brand Config */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-6 border-b pb-2">
            <Palette className="w-5 h-5 text-gray-500" /> Nhận Diện Thương Hiệu
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Đường dẫn Logo
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={configs.logo_url || ""}
                  onChange={(e) => handleChange("logo_url", e.target.value)}
                  className="flex-1 p-2 border rounded-md"
                  placeholder="https://..."
                />
                <button
                  onClick={() => handleSave("logo_url")}
                  className="p-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                >
                  <Save className="w-5 h-5" />
                </button>
              </div>
              {configs.logo_url && (
                <img
                  src={configs.logo_url}
                  alt="Logo Preview"
                  className="h-12 mt-3 object-contain border p-1 rounded bg-gray-50"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Màu chủ đạo (Primary Color)
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={configs.primary_color || "#2563eb"}
                  onChange={(e) =>
                    handleChange("primary_color", e.target.value)
                  }
                  className="w-12 h-10 p-1 border rounded-md cursor-pointer"
                />
                <input
                  type="text"
                  value={configs.primary_color || ""}
                  onChange={(e) =>
                    handleChange("primary_color", e.target.value)
                  }
                  className="flex-1 p-2 border rounded-md uppercase"
                />
                <button
                  onClick={() => handleSave("primary_color")}
                  className="p-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                >
                  <Save className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Layout Config */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-6 border-b pb-2">
            <Layout className="w-5 h-5 text-gray-500" /> Bố Cục Trang Chủ
          </h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
              <div>
                <h3 className="font-medium text-gray-900">Sản Phẩm Mới</h3>
                <p className="text-sm text-gray-500">
                  Hiển thị danh sách sản phẩm mới
                </p>
              </div>
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={configs.show_new_products === "true"}
                    onChange={(e) =>
                      handleChange(
                        "show_new_products",
                        e.target.checked ? "true" : "false",
                      )
                    }
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <button
                  onClick={() => handleSave("show_new_products")}
                  className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                >
                  Lưu
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
              <div>
                <h3 className="font-medium text-gray-900">
                  Sản Phẩm Khuyến Mãi
                </h3>
                <p className="text-sm text-gray-500">
                  Hiển thị mục giảm giá giá shock
                </p>
              </div>
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={configs.show_sale_products === "true"}
                    onChange={(e) =>
                      handleChange(
                        "show_sale_products",
                        e.target.checked ? "true" : "false",
                      )
                    }
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <button
                  onClick={() => handleSave("show_sale_products")}
                  className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminConfig;
