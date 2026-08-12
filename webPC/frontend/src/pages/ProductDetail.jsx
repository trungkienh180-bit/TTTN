import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addToCart } from "../store/cartSlice";
import ProductCard from "../components/ProductCard";
import {
  ShoppingCart,
  Check,
  Shield,
  Truck,
  RefreshCw,
  Star,
  ThumbsUp,
  MessageSquare,
} from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const [showLightbox, setShowLightbox] = useState(false);
  const [showSpecsModal, setShowSpecsModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showExistsModal, setShowExistsModal] = useState(false);
  const [selectedCombos, setSelectedCombos] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.cart);
  const cart = cartState?.cart;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
        setActiveImage(res.data.hinh_anh);

        // Fetch related products (same category)
        if (res.data.danh_muc_id) {
          const relatedRes = await axios.get(
            `http://localhost:5000/api/products?category=${res.data.danh_muc_id}&limit=4`,
          );
          let related = relatedRes.data.products.filter(
            (p) => p.id !== Number(id),
          );
          if (related.length === 0) {
            // Fallback: Fetch general products if category is empty
            const fallbackRes = await axios.get(
              `http://localhost:5000/api/products?limit=4`,
            );
            related = fallbackRes.data.products
              .filter((p) => p.id !== Number(id))
              .slice(0, 4);
          }
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Error fetching product details", error);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = async (isOrderNow = false) => {
    // Check if already in cart
    const isExists = cart?.chi_tiet?.some(
      (item) => item.san_pham_id === product.id,
    );
    if (isExists) {
      setShowExistsModal(true);
      return;
    }

    setAdding(true);
    await dispatch(
      addToCart({
        san_pham_id: product.id,
        so_luong: quantity,
        san_pham: product,
      }),
    );
    setAdding(false);

    // Show success modal
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
      if (isOrderNow) {
        navigate("/cart");
      }
    }, 2000);
  };

  if (!product)
    return <div className="text-center py-20 text-gray-500">Đang tải...</div>;

  let parsedSpecs = [];
  if (product.mo_ta && product.mo_ta.includes("<strong")) {
    const regex = /<strong[^>]*>([^<]+):?<\/strong>\s*([^<]*)/g;
    let match;
    while ((match = regex.exec(product.mo_ta)) !== null) {
      let name = match[1].replace(":", "").trim();
      let val = match[2].trim();
      if (name && val) {
        parsedSpecs.push({ name, val, bh: "36th" });
      }
    }
  }

  const isComponentOrGear =
    product.danh_muc_id === 5 ||
    product.danh_muc_id === 12 ||
    product.danh_muc?.ten_danh_muc?.toLowerCase().includes("linh kiện") ||
    product.danh_muc?.ten_danh_muc?.toLowerCase().includes("gear");

  const specsFromCols = [
    { name: "CPU", val: product.cpu, bh: "36th" },
    { name: "Mainboard", val: product.mainboard, bh: "36th" },
    { name: "Ram", val: product.ram, bh: "36th" },
    { name: "Ổ cứng", val: product.o_cung, bh: "36th" },
    { name: "Nguồn Máy Tính", val: product.nguon, bh: "36th" },
    { name: "Card Màn Hình", val: product.vga, bh: "36th" },
    { name: "VỎ CASE", val: product.vo_case, bh: "12th" },
    { name: "Tản nhiệt", val: product.tan_nhiet, bh: "12th" },
  ].filter((item) => item.val);

  const specsList = parsedSpecs.length > 0 ? parsedSpecs : specsFromCols;

  const mockCombos = isComponentOrGear
    ? []
    : [
        {
          id: 119,
          name: "Bàn Phím Có Dây Gaming Rapoo V50S",
          price: 285000,
          img: "https://cdn.tgdd.vn/Products/Images/4547/314636/ban-phim-co-day-gaming-rapoo-v50s-1-750x500.jpg",
        },
        {
          id: 107,
          name: "Chuột Có dây Gaming Rapoo V10SE",
          price: 60000,
          img: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/86/339137/chuot-co-day-gaming-rapoo-v10s-den-1-638849072019516231-750x500.jpg",
        },
      ];

  const basePrice = Number(product.gia_khuyen_mai || product.gia_ban || 0);

  // Calculate discounts based on rules
  let totalDiscount = 0;
  selectedCombos.forEach((item) => {
    let itemDiscount = 0;
    if (item.price > 3000000) {
      itemDiscount = item.price * 0.1; // 10% off if > 3tr
    } else if (item.price > 200000 && item.price <= 3000000) {
      itemDiscount = item.price * 0.07; // 7% off if > 200k and <= 3tr
    } else if (item.price <= 200000) {
      if (basePrice > 30000000) {
        itemDiscount = item.price; // Free if PC > 30tr
      } else {
        itemDiscount = Math.min(100000, item.price); // Reduce 100k if PC <= 30tr
      }
    }
    totalDiscount += itemDiscount;
  });

  const comboPrice = selectedCombos.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = basePrice + comboPrice - totalDiscount;

  const toggleCombo = (item) => {
    setSelectedCombos((prev) =>
      prev.find((c) => c.id === item.id)
        ? prev.filter((c) => c.id !== item.id)
        : [...prev, item],
    );
  };

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen pb-12">
      {/* Breadcrumb - Full Width */}
      <div className="bg-[#f1f2f3] border-b border-gray-200">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav
            className="flex text-base text-gray-600 font-medium"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-1">
              <li className="inline-flex items-center">
                <Link to="/" className="hover:text-blue-600 transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400 text-sm">{">"}</span>
                  <Link
                    to={`/products?category=${product.danh_muc_id}`}
                    className="hover:text-blue-600 transition-colors uppercase"
                  >
                    {product.danh_muc?.ten_danh_muc || "Sản phẩm"}
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400 text-sm">{">"}</span>
                  <span className="text-gray-900 font-bold uppercase">
                    {product.ten_san_pham}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Main Detail */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-12">
          <div className="flex flex-col md:flex-row">
            {/* Product Image Gallery */}
            <div className="md:w-1/2 p-4 lg:p-6 bg-white flex flex-col justify-start items-center relative border-r border-gray-100">
              {product.la_giam_gia && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">
                  GIẢM GIÁ
                </span>
              )}

              {/* Main Image */}
              <div
                className="w-full h-[400px] lg:h-[480px] flex items-center justify-center mb-6 bg-white cursor-pointer group relative"
                onClick={() => setShowLightbox(true)}
              >
                <img
                  src={
                    activeImage?.startsWith("http")
                      ? activeImage
                      : `http://localhost:5000${activeImage}`
                  }
                  alt={product.ten_san_pham}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/500?text=No+Image";
                  }}
                  className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white p-3 rounded-full pointer-events-none shadow-lg">
                  <span className="text-sm font-bold tracking-wide">
                    🔍 XEM PHÓNG TO
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4 overflow-x-auto pb-2 w-full justify-center hide-scrollbar mt-4">
                {[
                  product.hinh_anh,
                  product.hinh_anh_1,
                  product.hinh_anh_2,
                  product.hinh_anh_3,
                ]
                  .filter(Boolean)
                  .map((imgSrc, idx) => (
                    <button
                      key={idx}
                      onMouseEnter={() => setActiveImage(imgSrc)}
                      onClick={() => {
                        setActiveImage(imgSrc);
                        setShowLightbox(true);
                      }}
                      className={`shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-xl border-2 overflow-hidden bg-white cursor-pointer ${activeImage === imgSrc ? "border-red-500 shadow-md scale-105" : "border-gray-200 hover:border-red-300 opacity-70 hover:opacity-100"} transition-all`}
                    >
                      <img
                        src={
                          imgSrc.startsWith("http")
                            ? imgSrc
                            : `http://localhost:5000${imgSrc}`
                        }
                        alt={`Góc ${idx + 1}`}
                        onError={(e) => {
                          if (e.target.parentElement) {
                            e.target.parentElement.style.display = "none";
                          }
                        }}
                        className="w-full h-full object-cover mix-blend-multiply pointer-events-none"
                      />
                    </button>
                  ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-8 lg:p-10">
              <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-snug">
                {product.ten_san_pham}
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center text-yellow-400">
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <span className="text-gray-500 text-sm ml-2">
                    (4.9/5 - 24 đánh giá)
                  </span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-green-600 font-medium">
                  Đã bán 100+
                </span>
              </div>

              {/* Price Box */}
              <div className="bg-[#ff6a00] bg-gradient-to-r from-[#ff4d4f] to-[#ff8c00] rounded-lg p-4 mb-4 flex flex-col md:flex-row md:items-center justify-between text-white shadow-md">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold">
                    {Number(
                      product.gia_khuyen_mai || product.gia_ban,
                    ).toLocaleString()}{" "}
                    VNĐ
                  </span>
                  {product.gia_khuyen_mai && (
                    <span className="text-sm font-medium line-through opacity-80">
                      {Number(product.gia_ban).toLocaleString()} đ
                    </span>
                  )}
                </div>
                {product.gia_khuyen_mai && (
                  <div className="text-sm font-bold mt-2 md:mt-0">
                    Tiết kiệm:{" "}
                    {Number(
                      product.gia_ban - product.gia_khuyen_mai,
                    ).toLocaleString()}
                    Đ
                  </div>
                )}
              </div>

              {/* Support Buttons */}
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-6 border-dashed">
                <div className="bg-yellow-400 text-gray-900 font-bold text-sm px-4 py-2 rounded">
                  Bảo hành: 36 Tháng
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 transition-colors text-white font-bold text-sm px-5 py-2 rounded-full flex items-center gap-2 shadow-sm">
                  <RefreshCw size={16} /> TƯ VẤN NÂNG CẤP
                </button>
              </div>

              {/* Product Summary Specs */}
              <h3 className="font-bold text-gray-800 mb-3">Mô tả sản phẩm</h3>
              <ul className="text-sm text-gray-700 space-y-2.5 mb-4">
                {specsList.slice(0, 6).map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="mt-1 min-w-4 text-[#00a896] font-bold">
                      ✔
                    </div>
                    <span>
                      <strong className="font-semibold text-gray-800">
                        {item.name}:
                      </strong>{" "}
                      {item.val}
                    </span>
                  </li>
                ))}
              </ul>

              {specsList.length > 6 && (
                <button
                  onClick={() => setShowSpecsModal(true)}
                  className="text-blue-600 text-sm hover:underline mb-8 font-medium flex items-center gap-1"
                >
                  Xem cấu hình chi tiết <span className="text-[10px]">▼</span>
                </button>
              )}

              {/* Show raw mo_ta only if we didn't parse it into specsList */}
              {!product.cpu && product.mo_ta && parsedSpecs.length === 0 && (
                <div
                  className="text-sm text-gray-700 mb-8 whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: product.mo_ta }}
                />
              )}

              {/* Promotion Box */}
              {!isComponentOrGear && (
                <div className="border border-[#f5c2c7] rounded-md overflow-hidden mb-6 bg-white">
                  <div className="bg-[#f8d7da] text-[#721c24] font-bold px-4 py-2.5 flex items-center gap-2 border-b border-[#f5c2c7]">
                    <span className="text-xl">🎁</span>{" "}
                    <span className="text-[#dc3545]">KHUYẾN MÃI</span>
                  </div>
                  <div className="p-4 text-sm text-gray-800 space-y-3 bg-[#fdfafb]">
                    <p className="flex gap-2">
                      <span className="mt-0.5">🎁</span>
                      <span>
                        *** Lưu ý về Hệ điều hành:{" "}
                        <strong className="text-[#dc3545]">
                          Máy ráp sẵn tại TTG đã bao gồm
                        </strong>{" "}
                        Windows 10/11{" "}
                        <strong className="text-[#dc3545]">
                          bản dùng thử trong 30 ngày.
                        </strong>
                      </span>
                    </p>
                    <p className="flex gap-2">
                      <span className="mt-0.5">🎁</span>
                      <span>
                        <strong className="text-[#dc3545]">
                          Bộ PC này đã áp dụng CTKM SHOCK nên sẽ không được Áp
                          dụng CTKM Chung
                        </strong>
                      </span>
                    </p>
                  </div>
                </div>
              )}

              {/* Actions & Installments */}
              <div className="mt-6 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-bold text-gray-800">Số lượng:</span>
                  <div className="flex items-center border rounded h-9 w-24 justify-between px-2 bg-white">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="text-gray-500 hover:text-black font-medium"
                    >
                      -
                    </button>
                    <span className="font-semibold text-sm">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="text-gray-500 hover:text-black font-medium"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {/* Dat Hang */}
                  <button
                    onClick={() => handleAddToCart(true)}
                    disabled={adding}
                    className="w-full bg-[#ff0000] hover:bg-[#d40000] text-white font-bold py-3 rounded text-lg uppercase transition-colors"
                  >
                    {adding ? "ĐANG XỬ LÝ..." : "ĐẶT HÀNG"}
                  </button>

                  {/* 2x2 Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleAddToCart(false)}
                      className="bg-[#ffe5e5] text-[#ff0000] border border-[#ffb3b3] hover:bg-[#ffcccc] font-bold py-2 px-1 rounded uppercase text-sm transition-colors"
                    >
                      THÊM VÀO GIỎ
                    </button>
                    <button className="bg-[#1877f2] hover:bg-[#166fe5] text-white font-bold py-2 px-1 rounded flex flex-col items-center justify-center transition-colors">
                      <span className="uppercase text-sm">
                        TRẢ GÓP QUA HỒ SƠ
                      </span>
                      <span className="text-[10px] font-normal">
                        Chỉ từ 8.530.667 VNĐ/tháng
                      </span>
                    </button>
                    <button className="bg-[#2d88d3] hover:bg-[#2572b3] text-white font-bold py-2 px-1 rounded flex flex-col items-center justify-center transition-colors">
                      <span className="uppercase text-sm">TRẢ GÓP QUA THẺ</span>
                      <span className="text-[10px] font-normal">
                        Visa, Master, JCB
                      </span>
                    </button>
                    <button className="bg-[#facc15] hover:bg-[#eab308] text-gray-900 font-bold py-2 px-1 rounded uppercase text-sm transition-colors">
                      MUA NGAY - TRẢ SAU
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thông số kỹ thuật (Full Table) */}
        {specsList.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-12">
            <h2 className="text-xl font-bold text-gray-900 p-4 border-b border-gray-200 uppercase">
              THÔNG SỐ KỸ THUẬT
            </h2>
            <div className="p-4 overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm text-left text-gray-700 border-collapse border border-gray-200">
                <thead className="bg-gray-50 text-gray-700 uppercase font-bold text-center">
                  <tr>
                    <th className="border border-gray-200 px-4 py-3 w-16">
                      STT
                    </th>
                    <th className="border border-gray-200 px-4 py-3">
                      Mô tả thiết bị
                    </th>
                    <th className="border border-gray-200 px-4 py-3 w-16">
                      SL
                    </th>
                    <th className="border border-gray-200 px-4 py-3 w-20">
                      BH
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {specsList.slice(0, 6).map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 text-center transition-colors"
                    >
                      <td className="border border-gray-200 px-4 py-3">
                        {index + 1}
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-left">
                        <strong className="font-semibold">{item.name}</strong>{" "}
                        {item.val}
                      </td>
                      <td className="border border-gray-200 px-4 py-3">1</td>
                      <td className="border border-gray-200 px-4 py-3">
                        {item.bh}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {specsList.length > 6 && (
                <div className="text-center mt-4">
                  <button
                    onClick={() => setShowSpecsModal(true)}
                    className="text-red-500 font-medium hover:underline flex items-center justify-center gap-1 mx-auto text-sm"
                  >
                    Xem thêm <span className="text-[10px]">▼</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">
            Đánh giá từ khách hàng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1 text-center bg-gray-50 rounded-xl p-6 flex flex-col justify-center">
              <h3 className="text-5xl font-extrabold text-blue-600">
                4.9
                <span className="text-2xl text-gray-400 font-medium">/5</span>
              </h3>
              <div className="flex justify-center text-yellow-400 my-3">
                <Star size={24} fill="currentColor" />
                <Star size={24} fill="currentColor" />
                <Star size={24} fill="currentColor" />
                <Star size={24} fill="currentColor" />
                <Star size={24} fill="currentColor" />
              </div>
              <p className="text-gray-500">Dựa trên 24 đánh giá</p>
            </div>
            <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
              <div className="border-b pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                      NT
                    </div>
                    <span className="font-semibold">Nguyễn Tiến</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded flex items-center gap-1">
                      <Check size={12} /> Đã mua hàng
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">2 ngày trước</span>
                </div>
                <p className="text-gray-700">
                  Máy chạy siêu êm, render video 4K phà phà. Nhân viên tư vấn
                  nhiệt tình, giao hàng nhanh chóng trong ngày. Tuyệt vời!
                </p>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <button className="flex items-center gap-1 hover:text-blue-600">
                    <ThumbsUp size={16} /> Hữu ích (12)
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-600">
                    <MessageSquare size={16} /> Thảo luận
                  </button>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                      HM
                    </div>
                    <span className="font-semibold">Hoàng Minh</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded flex items-center gap-1">
                      <Check size={12} /> Đã mua hàng
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">1 tuần trước</span>
                </div>
                <p className="text-gray-700">
                  Build PC rất đẹp, đi dây gọn gàng. Chơi mượt các game AAA ở
                  max setting. Rất đáng tiền!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-12">
            <div className="flex items-center justify-between mb-6 border-b pb-4">
              <h2 className="text-xl font-bold text-gray-900 uppercase">
                SẢN PHẨM TƯƠNG TỰ
              </h2>
              <Link
                to={`/products?category=${product.danh_muc_id}`}
                className="text-blue-600 hover:underline font-medium text-sm flex items-center gap-1"
              >
                Xem tất cả <span className="text-[10px]">»</span>
              </Link>
            </div>
            <div
              className="flex gap-4 overflow-x-auto snap-x hide-scrollbar pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Feature Banner at bottom */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 flex flex-col items-center text-center mt-12 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full border-b border-gray-100 pb-8 mb-8">
            <div className="flex flex-col items-center gap-2">
              <Truck className="w-8 h-8 text-[#ff4d4f]" />
              <h4 className="font-bold text-gray-900">GIAO HÀNG TOÀN QUỐC</h4>
              <p className="text-sm text-gray-500">
                Giao hàng trước, trả tiền sau COD
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <RefreshCw className="w-8 h-8 text-[#ff4d4f]" />
              <h4 className="font-bold text-gray-900">ĐỔI TRẢ DỄ DÀNG</h4>
              <p className="text-sm text-gray-500">Đổi mới trong 30 ngày đầu</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Shield className="w-8 h-8 text-[#ff4d4f]" />
              <h4 className="font-bold text-gray-900">THANH TOÁN TIỆN LỢI</h4>
              <p className="text-sm text-gray-500">
                Trả tiền mặt, chuyển khoản, trả góp 0%
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MessageSquare className="w-8 h-8 text-[#ff4d4f]" />
              <h4 className="font-bold text-gray-900">HỖ TRỢ NHIỆT TÌNH</h4>
              <p className="text-sm text-gray-500">
                Tư vấn tổng đài miễn phí 24/7
              </p>
            </div>
          </div>
          <h3 className="text-xl font-medium text-gray-900">
            Trải nghiệm mua sắm tại{" "}
            <span className="text-[#ff4d4f] font-bold">TTGK SHOP</span>
          </h3>
          <h2 className="text-4xl font-black text-gray-900 mt-2">
            Cam Kết 100% <span className="text-[#ff8c00]">Hài Lòng</span>
          </h2>
        </div>

        {/* Lightbox for Image */}
        {showLightbox && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setShowLightbox(false)}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-red-500 bg-black/50 hover:bg-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold transition-all"
              onClick={() => setShowLightbox(false)}
            >
              ×
            </button>
            <img
              src={
                activeImage?.startsWith("http")
                  ? activeImage
                  : `http://localhost:5000${activeImage}`
              }
              alt={product.ten_san_pham}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/800?text=No+Image";
              }}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {/* Specs Modal */}
        {showSpecsModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setShowSpecsModal(false)}
          >
            <div
              className="bg-white rounded w-full max-w-5xl max-h-[90vh] flex flex-col relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-0 right-0 bg-[#ff4d4f] hover:bg-[#d9363e] text-white w-10 h-10 flex items-center justify-center text-xl font-bold transition-colors"
                onClick={() => setShowSpecsModal(false)}
              >
                ×
              </button>
              <div className="p-8 overflow-y-auto mt-4">
                <table className="w-full min-w-[600px] text-sm text-left text-gray-700 border-collapse border border-gray-200">
                  <thead className="bg-gray-50 text-gray-700 font-bold text-center">
                    <tr>
                      <th className="border border-gray-200 px-4 py-3 w-16">
                        STT
                      </th>
                      <th className="border border-gray-200 px-4 py-3">
                        Mô tả thiết bị
                      </th>
                      <th className="border border-gray-200 px-4 py-3 w-16">
                        SL
                      </th>
                      <th className="border border-gray-200 px-4 py-3 w-20">
                        BH
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {specsList.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 text-center transition-colors"
                      >
                        <td className="border border-gray-200 px-4 py-3">
                          {index + 1}
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-left">
                          <strong className="font-semibold">{item.name}</strong>{" "}
                          {item.val}
                        </td>
                        <td className="border border-gray-200 px-4 py-3">1</td>
                        <td className="border border-gray-200 px-4 py-3">
                          {item.bh}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full flex flex-col items-center justify-center text-center">
              <svg className="w-24 h-24 mb-6" viewBox="0 0 52 52">
                <circle
                  className="success-circle"
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                  stroke="#ff4d4f"
                  strokeWidth="2"
                  strokeDasharray="166"
                  strokeDashoffset="166"
                />
                <path
                  className="success-check"
                  fill="none"
                  stroke="#ff4d4f"
                  strokeWidth="4"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  strokeDasharray="48"
                  strokeDashoffset="48"
                />
              </svg>
              <style>{`
              .success-circle {
                animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
              }
              .success-check {
                animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
              }
              @keyframes stroke {
                100% {
                  stroke-dashoffset: 0;
                }
              }
            `}</style>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Thêm sản phẩm vào giỏ hàng thành công!
              </h3>
            </div>
          </div>
        )}

        {/* Exists Modal */}
        {showExistsModal && (
          <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full flex flex-col items-center text-center pb-6">
              <div className="w-full flex justify-end p-2">
                <button
                  onClick={() => setShowExistsModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold px-2"
                >
                  &times;
                </button>
              </div>
              <div className="w-20 h-20 bg-[#f44336] rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 mt-2">
                !
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 px-6">
                Sản phẩm đã trong giỏ hàng!
              </h3>
              <p className="text-gray-600 px-8 mb-8 text-[15px]">
                Vui lòng đến giỏ hàng để thay đổi số lượng hoặc xóa sản phẩm.
              </p>
              <div className="flex justify-center gap-4 w-full px-8">
                <button
                  onClick={() => navigate("/cart")}
                  className="flex-1 bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold py-2.5 rounded text-[15px] transition-colors"
                >
                  Đến giỏ hàng
                </button>
                <button
                  onClick={() => setShowExistsModal(false)}
                  className="flex-1 bg-[#5c5cff] hover:bg-[#4f46e5] text-white font-bold py-2.5 rounded text-[15px] transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
