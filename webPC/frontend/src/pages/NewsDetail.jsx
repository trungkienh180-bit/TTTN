import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Calendar, ArrowLeft } from "lucide-react";

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/news/${id}`);
        setNews(res.data);
      } catch (error) {
        console.error("Error fetching news details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="text-center py-20">Đang tải...</div>;
  if (!news)
    return (
      <div className="text-center py-20 text-gray-500">
        Bài viết không tồn tại
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/news"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại danh sách tin
      </Link>

      <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="rounded-2xl overflow-hidden mb-12 shadow-lg">
          <img
            src={
              news.hinh_anh?.startsWith("http")
                ? news.hinh_anh
                : `http://localhost:5000${news.hinh_anh}`
            }
            alt={news.tieu_de}
            className="w-full max-h-[500px] object-cover"
          />
        </div>
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Calendar className="w-5 h-5" />
            <span>
              Đăng ngày: {new Date(news.tao_luc).toLocaleDateString("vi-VN")}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 leading-tight">
            {news.tieu_de}
          </h1>

          <div
            className="prose prose-lg prose-blue max-w-none text-gray-700 mb-12"
            dangerouslySetInnerHTML={{ __html: news.noi_dung }}
          />

          {news.san_pham && (
            <div className="mt-12 p-6 bg-blue-50 border border-blue-100 rounded-2xl">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                🛒 Sản phẩm được nhắc đến trong bài:
              </h3>
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-white p-4 rounded-xl shadow-sm">
                <div className="w-32 h-32 flex-shrink-0 p-2 bg-gray-50 rounded-lg border border-gray-100">
                  <img
                    src={
                      news.san_pham.hinh_anh?.startsWith("http")
                        ? news.san_pham.hinh_anh
                        : `http://localhost:5000${news.san_pham.hinh_anh}`
                    }
                    alt={news.san_pham.ten_san_pham}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-grow text-center sm:text-left">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {news.san_pham.ten_san_pham}
                  </h4>
                  <div className="text-[#ff4d4f] font-black text-2xl mb-4">
                    {Number(
                      news.san_pham.gia_khuyen_mai || news.san_pham.gia_ban,
                    ).toLocaleString("vi-VN")}{" "}
                    VNĐ
                  </div>
                  <Link
                    to={`/products/${news.san_pham.id}`}
                    className="inline-block bg-[#ff4d4f] hover:bg-[#d9363e] text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all transform hover:-translate-y-1"
                  >
                    Xem Chi Tiết & Đặt Mua Ngay
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default NewsDetail;
