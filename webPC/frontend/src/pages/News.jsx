import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Calendar, ChevronRight } from "lucide-react";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/news");
        setNews(res.data);
      } catch (error) {
        console.error("Error fetching news", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) return <div className="text-center py-20">Đang tải...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Tin Tức Công Nghệ
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Cập nhật những thông tin mới nhất về thị trường máy tính, linh kiện và
          các xu hướng công nghệ nổi bật.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item) => (
          <Link
            key={item.id}
            to={`/news/${item.id}`}
            className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={
                  item.hinh_anh?.startsWith("http")
                    ? item.hinh_anh
                    : `http://localhost:5000${item.hinh_anh}`
                }
                alt={item.tieu_de}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-3 gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(item.tao_luc).toLocaleDateString("vi-VN")}
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {item.tieu_de}
              </h2>

              <p className="text-gray-600 line-clamp-3 mb-4 text-sm leading-relaxed">
                {/* Lấy 1 đoạn text ngắn từ nội dung, có thể dùng regex remove tag HTML nếu có */}
                {item.noi_dung.replace(/<[^>]+>/g, "").substring(0, 150)}...
              </p>

              <div className="flex items-center text-blue-600 font-medium text-sm group-hover:underline">
                Đọc tiếp <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default News;
