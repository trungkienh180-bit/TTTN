import {
  Globe,
  MessageCircle,
  Share2,
  Video,
  Mail,
  MapPin,
  Phone,
  Gamepad2,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center group gap-1 mb-6 cursor-pointer">
              <Gamepad2
                className="text-[#ff5722] w-12 h-12 mr-1 rotate-12 group-hover:rotate-0 transition-transform"
                strokeWidth={1.5}
              />
              <div className="flex flex-col justify-center leading-none">
                <span className="font-black text-3xl tracking-tighter flex items-center">
                  <span
                    className="text-[#ff5722]"
                    style={{ WebkitTextStroke: "1px #c62828" }}
                  >
                    TTGK
                  </span>
                  <span
                    className="text-white"
                    style={{ WebkitTextStroke: "1px #333" }}
                  >
                    SHOP
                  </span>
                </span>
                <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase mt-1 pl-0.5">
                  Gaming & Technology
                </span>
              </div>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Trải nghiệm mua sắm thiết bị công nghệ đỉnh cao. Chúng tôi cam kết
              mang đến những sản phẩm chất lượng nhất với giá thành tốt nhất
              trên thị trường.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1"
              >
                <Globe size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all transform hover:-translate-y-1"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all transform hover:-translate-y-1"
              >
                <Share2 size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all transform hover:-translate-y-1"
              >
                <Video size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Danh Mục</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  PC Gaming
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  PC Đồ Họa
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  PC Văn Phòng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Linh Kiện Máy Tính
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Phụ Kiện Chính Hãng
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Liên Hệ</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-blue-500 shrink-0 mt-1" />
                <span className="text-sm">
                  CS1: Số 83 - 85 Thái Hà - Đống Đa - HN
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-blue-500 shrink-0 mt-1" />
                <span className="text-sm">
                  CS2: Số 83A Cửu Long - Phường 15 - Q10 - TP.HCM
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-blue-500 shrink-0" />
                <span className="text-sm">098.655.2233</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-blue-500 shrink-0" />
                <span className="text-sm">contact@ttgkshop.com</span>
              </li>
            </ul>
          </div>

          {/* Feedback Form */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-6">
              Gửi Phản Hồi
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Chúng tôi luôn lắng nghe ý kiến của bạn.
            </p>
            <form
              className="space-y-3"
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                try {
                  const res = await fetch(
                    "http://localhost:5000/api/feedbacks",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        ho_ten: formData.get("ho_ten"),
                        email: formData.get("email"),
                        noi_dung: formData.get("noi_dung"),
                      }),
                    },
                  );
                  if (res.ok) {
                    alert("Cảm ơn bạn đã gửi phản hồi!");
                    e.target.reset();
                  } else {
                    alert("Có lỗi xảy ra, vui lòng thử lại.");
                  }
                } catch (err) {
                  alert("Không thể kết nối đến server.");
                }
              }}
            >
              <input
                type="text"
                name="ho_ten"
                required
                placeholder="Tên của bạn..."
                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email của bạn..."
                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
              />
              <textarea
                name="noi_dung"
                required
                placeholder="Nội dung phản hồi..."
                rows="2"
                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                Gửi phản hồi
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © 2026 TTGKShop. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex gap-4 text-gray-400">
            <a href="#" className="hover:text-white transition-colors">
              <span className="sr-only">Facebook</span>FB
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <span className="sr-only">Youtube</span>YT
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <span className="sr-only">Tiktok</span>TK
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
