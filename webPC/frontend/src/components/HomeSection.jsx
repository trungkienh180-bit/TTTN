import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

// Helper function to get 5 pseudo-random items based on a date seed
const getDailyRandomProducts = (products, count) => {
  if (!products || products.length === 0) return [];

  // Create a seed based on current date (YYYYMMDD)
  const today = new Date();
  const dateSeed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();

  // Simple pseudo-random number generator (Mulberry32)
  let m = dateSeed;
  const random = () => {
    m |= 0;
    m = (m + 0x6d2b79f5) | 0;
    let t = Math.imul(m ^ (m >>> 15), 1 | m);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  // Clone and shuffle using our seeded random
  const shuffled = [...products];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
};

const HomeSection = ({
  title,
  categoryName,
  isHotDeal,
  isBestSeller,
  isNewest,
  headerColor = "bg-[#ff4d4f]",
}) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const handleViewAll = () => {
    if (isHotDeal) {
      navigate("/products?sort=hot");
    } else if (allProducts.length > 0 && allProducts[0].danh_muc_id) {
      navigate(`/products?category=${allProducts[0].danh_muc_id}`);
    } else {
      navigate("/products");
    }
  };

  // Countdown timer effect
  useEffect(() => {
    if (!isHotDeal) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59,
      );
      const diff = endOfDay - now;

      if (diff > 0) {
        return {
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        };
      }
      return { hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [isHotDeal]);

  useEffect(() => {
    fetchProducts();
  }, [categoryName, isHotDeal, isBestSeller, isNewest]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:5000/api/products?limit=100",
      );
      let data = res.data.products;

      if (isHotDeal) {
        // Chỉ lấy các sản phẩm thuộc danh mục PC/Laptop/Workstation cho Deal Mỗi Ngày
        const pcProducts = data.filter(
          (p) =>
            p.danh_muc &&
            (p.danh_muc.ten_danh_muc.toUpperCase().includes("PC") ||
              p.danh_muc.ten_danh_muc.toUpperCase().includes("LAPTOP") ||
              p.danh_muc.ten_danh_muc.toUpperCase().includes("WORKSTATION")),
        );
        data = getDailyRandomProducts(
          pcProducts.length > 0 ? pcProducts : data,
          6,
        );
      } else if (isBestSeller) {
        // Lấy các sản phẩm có la_ban_chay = true
        data = data.filter((p) => p.la_ban_chay === true);
        if (data.length === 0) {
          data = getDailyRandomProducts(res.data.products, 8);
        }
      } else if (isNewest) {
        // Lấy PC mới nhất
        const pcProducts = data.filter(
          (p) =>
            p.danh_muc &&
            (p.danh_muc.ten_danh_muc.toUpperCase().includes("PC") ||
              p.danh_muc.ten_danh_muc.toUpperCase().includes("LAPTOP") ||
              p.danh_muc.ten_danh_muc.toUpperCase().includes("WORKSTATION")),
        );
        // Sort theo ID giảm dần (mới thêm vào) hoặc tao_luc nếu có
        data = pcProducts.sort((a, b) => b.id - a.id).slice(0, 10);
      } else if (categoryName) {
        data = data.filter((p) =>
          p.danh_muc?.ten_danh_muc
            ?.toLowerCase()
            .includes(categoryName.toLowerCase()),
        );
      }

      setAllProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const slide = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isHovered || allProducts.length === 0) return;

    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          // Reset to beginning
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          slide("right");
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, allProducts.length]);

  const displayProducts = allProducts.filter((p) => {
    if (isHotDeal) return true; // Hot deal ignores tabs
    if (activeTab === "cheap") return Number(p.gia_ban) < 30000000;
    if (activeTab === "premium") return Number(p.gia_ban) >= 30000000;
    if (activeTab === "ultra") return p.cpu?.toLowerCase().includes("ultra");
    return true; // 'all'
  });

  // Removed duplicate timeLeft state and effect

  if (loading)
    return (
      <div className="h-64 animate-pulse bg-gray-100 rounded-xl mb-8"></div>
    );

  const containerClasses = isHotDeal
    ? "bg-gradient-to-r from-[#3b82f6] via-[#60a5fa] to-[#93c5fd] rounded-xl shadow-md overflow-hidden mb-8 relative pt-2 border border-blue-200"
    : "bg-white border-2 border-gray-100 shadow-sm rounded-xl mb-8 overflow-hidden";

  return (
    <div className={containerClasses}>
      {/* Header Bar */}
      {isHotDeal ? (
        <div className="px-6 py-2 pt-3 flex flex-col md:flex-row items-start md:items-center justify-between mb-2 gap-4">
          <h2
            className="text-[28px] md:text-[34px] font-black tracking-tighter uppercase"
            style={{
              background: "linear-gradient(180deg, #fff200 0%, #ff9800 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              WebkitTextStroke: "1px #b71c1c",
              filter: "drop-shadow(2px 2px 0px #b71c1c)",
            }}
          >
            {title} - KHUYẾN MÃI LIỀN TAY
          </h2>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2">
            <span className="text-white font-bold uppercase mr-2 animate-pulse text-[15px]">
              Kết thúc trong:
            </span>
            <div className="bg-black text-white font-mono font-bold text-xl px-3 py-1.5 rounded-md shadow-lg border border-gray-700">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <span className="text-white font-bold text-xl">:</span>
            <div className="bg-black text-white font-mono font-bold text-xl px-3 py-1.5 rounded-md shadow-lg border border-gray-700">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <span className="text-white font-bold text-xl">:</span>
            <div className="bg-black text-white font-mono font-bold text-xl px-3 py-1.5 rounded-md shadow-lg border border-gray-700">
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-white border-b border-gray-100 mb-4">
          <div className="flex items-center w-full md:w-auto overflow-x-auto hide-scrollbar">
            {/* Main Title Tab with Slanted Edge */}
            <div
              onClick={() => setActiveTab("all")}
              className={`relative ${headerColor} text-white font-bold pl-5 pr-8 py-2.5 text-[18px] md:text-[22px] uppercase tracking-wide flex items-center z-10 w-fit cursor-pointer flex-shrink-0 whitespace-nowrap`}
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 20px) 0, 100% 100%, 0 100%)",
              }}
            >
              <span>{title}</span>
            </div>
            {/* Dark Shadow Slant */}
            <div
              className="bg-[#222] w-6 h-full -ml-8 -z-10 flex-shrink-0"
              style={{ clipPath: "polygon(0 0, 100% 0, 0 100%, 0 100%)" }}
            ></div>

            {/* Sub-categories */}
            {categoryName && !isHotDeal && (
              <div className="hidden lg:flex items-center ml-8 gap-2">
                {categoryName.toUpperCase().includes("LINH KIỆN") ? (
                  <>
                    <span
                      onClick={() => {
                        const catId =
                          allProducts.length > 0
                            ? allProducts[0].danh_muc_id
                            : "";
                        if (catId)
                          navigate(`/products?category=${catId}&search=VGA`);
                      }}
                      className="text-[12px] font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 hover:text-blue-600 border border-gray-200 px-3 py-1.5 cursor-pointer uppercase transition-colors rounded-sm whitespace-nowrap"
                    >
                      VGA - Card Màn Hình
                    </span>
                    <span
                      onClick={() => {
                        const catId =
                          allProducts.length > 0
                            ? allProducts[0].danh_muc_id
                            : "";
                        if (catId)
                          navigate(
                            `/products?category=${catId}&search=Mainboard`,
                          );
                      }}
                      className="text-[12px] font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 hover:text-blue-600 border border-gray-200 px-3 py-1.5 cursor-pointer uppercase transition-colors rounded-sm whitespace-nowrap"
                    >
                      Mainboard
                    </span>
                    <span
                      onClick={() => {
                        const catId =
                          allProducts.length > 0
                            ? allProducts[0].danh_muc_id
                            : "";
                        if (catId)
                          navigate(`/products?category=${catId}&search=SSD`);
                      }}
                      className="text-[12px] font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 hover:text-blue-600 border border-gray-200 px-3 py-1.5 cursor-pointer uppercase transition-colors rounded-sm whitespace-nowrap"
                    >
                      Ổ cứng SSD
                    </span>
                    <span
                      onClick={() => {
                        const catId =
                          allProducts.length > 0
                            ? allProducts[0].danh_muc_id
                            : "";
                        if (catId)
                          navigate(
                            `/products?category=${catId}&search=Tản%20nhiệt`,
                          );
                      }}
                      className="text-[12px] font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 hover:text-blue-600 border border-gray-200 px-3 py-1.5 cursor-pointer uppercase transition-colors rounded-sm whitespace-nowrap"
                    >
                      Tản nhiệt
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      onClick={() => {
                        const catId =
                          allProducts.length > 0
                            ? allProducts[0].danh_muc_id
                            : "";
                        if (catId)
                          navigate(
                            `/products?category=${catId}&maxPrice=30000000`,
                          );
                      }}
                      className="text-[12px] font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 hover:text-blue-600 border border-gray-200 px-3 py-1.5 cursor-pointer uppercase transition-colors rounded-sm whitespace-nowrap"
                    >
                      {categoryName} GIÁ RẺ
                    </span>
                    <span
                      onClick={() => {
                        const catId =
                          allProducts.length > 0
                            ? allProducts[0].danh_muc_id
                            : "";
                        if (catId)
                          navigate(
                            `/products?category=${catId}&minPrice=30000000`,
                          );
                      }}
                      className="text-[12px] font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 hover:text-blue-600 border border-gray-200 px-3 py-1.5 cursor-pointer uppercase transition-colors rounded-sm whitespace-nowrap"
                    >
                      {categoryName} CAO CẤP
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          <div
            onClick={handleViewAll}
            className="px-4 py-2 text-teal-800 text-[13px] font-bold flex items-center gap-1 cursor-pointer hover:text-[#ff5722] transition-colors whitespace-nowrap"
          >
            Xem tất cả <ChevronsRight size={14} />
          </div>
        </div>
      )}

      {/* Slider Area */}
      <div
        className={`relative group ${isHotDeal ? "px-4 pb-0 pt-2" : "p-4 pt-4"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {displayProducts.length > 0 ? (
          <>
            <button
              onClick={() => slide("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-0 text-gray-800 dark:text-gray-200 hover:text-black opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft size={36} strokeWidth={1} />
            </button>

            <div
              ref={sliderRef}
              className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar pb-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {displayProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isHotDeal={isHotDeal}
                />
              ))}
            </div>

            <button
              onClick={() => slide("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-0 text-gray-800 dark:text-gray-200 hover:text-black opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight size={36} strokeWidth={1} />
            </button>
          </>
        ) : (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            Đang cập nhật sản phẩm...
          </div>
        )}
      </div>

      {/* Bottom Button for Hot Deal */}
      {isHotDeal && (
        <div className="flex justify-center pb-5 mt-2">
          <button
            onClick={handleViewAll}
            className="bg-[#ff5722] hover:bg-[#e64a19] text-white px-6 py-2 rounded-full font-bold text-[14px] shadow-sm transition-colors flex items-center gap-1"
          >
            Xem tất cả <ChevronsRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeSection;
