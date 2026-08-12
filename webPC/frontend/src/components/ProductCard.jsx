import { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

const ProductCard = ({ product, isHotDeal }) => {
  const dispatch = useDispatch();
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });

  const handleAddToCart = () => {
    dispatch(
      addToCart({ san_pham_id: product.id, so_luong: 1, san_pham: product }),
    );
  };

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      top: rect.top,
      left: rect.right + 10,
    });
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const giaBan = Number(product.gia_ban);
  let giaKhuyenMai = product.gia_khuyen_mai
    ? Number(product.gia_khuyen_mai)
    : null;

  // Apply 5% discount if it's a Hot Deal
  if (isHotDeal) {
    const hotDealPrice = giaBan * 0.95;
    if (!giaKhuyenMai || hotDealPrice < giaKhuyenMai) {
      giaKhuyenMai = hotDealPrice;
    }
  }

  const isSale = !!giaKhuyenMai;
  const currentPrice = isSale ? giaKhuyenMai : giaBan;
  const discountPercent = isSale
    ? Math.round(((giaBan - giaKhuyenMai) / giaBan) * 100)
    : 0;

  const TooltipContent = () => {
    // If tooltip goes off-screen to the right, we could adjust it, but for demo keep it simple.
    return (
      <div
        className="fixed z-50 bg-white rounded-lg shadow-2xl border border-gray-200 w-[420px] text-base overflow-hidden pointer-events-none"
        style={{ top: tooltipPos.top, left: tooltipPos.left }}
      >
        <div className="bg-[#ff4d4f] text-white font-bold p-4 text-lg">
          {product.ten_san_pham}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2 text-[17px]">
            <span className="font-bold">Giá bán:</span>
            <span className="text-red-600 font-bold">
              {currentPrice.toLocaleString("vi-VN")} VNĐ
            </span>
          </div>
          <div className="flex items-center gap-2 mb-4 text-[15px]">
            <span className="font-bold">Bảo hành:</span>
            <span>36 Tháng</span>
          </div>

          <div className="bg-[#ff4d4f] text-white text-sm font-bold px-3 py-1.5 inline-block rounded mb-3">
            Mô tả tóm tắt:
          </div>
          <ul className="text-[15px] space-y-2 text-gray-800 font-medium leading-snug">
            {product.cpu && (
              <li>
                <span className="text-[#045c5a] mr-1">✔</span> {product.cpu}
              </li>
            )}
            {product.ram && (
              <li>
                <span className="text-[#045c5a] mr-1">✔</span> {product.ram}
              </li>
            )}
            {product.vga && (
              <li>
                <span className="text-[#045c5a] mr-1">✔</span> {product.vga}
              </li>
            )}
            {product.o_cung && (
              <li>
                <span className="text-[#045c5a] mr-1">✔</span> {product.o_cung}
              </li>
            )}
            {product.hang_san_xuat && (
              <li>
                <span className="text-[#045c5a] mr-1">✔</span> Hãng:{" "}
                {product.hang_san_xuat}
              </li>
            )}
            {!product.cpu && product.mo_ta && (
              <div
                dangerouslySetInnerHTML={{ __html: product.mo_ta }}
                className="space-y-2"
              />
            )}
          </ul>

          {isHotDeal && (
            <div className="mt-4">
              <div className="bg-[#ff4d4f] text-white text-sm font-bold px-3 py-1.5 inline-block rounded mb-3 shadow-sm">
                Khuyến mãi:
              </div>
              <ul className="text-[15px] space-y-2.5 text-gray-900 font-medium leading-snug">
                <li className="flex items-start gap-1.5">
                  <span className="text-red-600 mt-0.5">🎁</span>
                  <span>
                    <span className="text-red-600 font-bold">Giảm ngay 5%</span>{" "}
                    giá trị sản phẩm (đã trừ vào giá).
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-red-600 mt-0.5">🎁</span>
                  <span>
                    <span className="font-bold">Miễn phí giao hàng</span> và lắp
                    đặt tận nhà trên toàn quốc.
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-red-600 mt-0.5">🎁</span>
                  <span>
                    Ưu đãi HSSV: Xuất trình thẻ Sinh viên{" "}
                    <span className="text-red-600 font-bold">giảm thêm 2%</span>{" "}
                    (áp dụng tại thanh toán).
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-red-600 mt-0.5">🎁</span>
                  <span>
                    Tặng gói{" "}
                    <span className="font-bold">
                      Bảo dưỡng, vệ sinh PC miễn phí 5 năm đầu
                    </span>
                    .
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-red-600 mt-0.5">🎁</span>
                  <span>
                    Tặng{" "}
                    <span className="font-bold text-red-600">
                      Voucher 500.000đ
                    </span>{" "}
                    khi mua kèm Màn hình / Gaming Gear.
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-red-600 mt-0.5">🎁</span>
                  <span>
                    Hỗ trợ{" "}
                    <span className="font-bold">trả góp 0% lãi suất</span> xét
                    duyệt siêu tốc.
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className="group/card bg-white dark:bg-gray-800 rounded-sm border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col flex-1 min-w-[240px] md:min-w-[260px] max-w-[340px] flex-shrink-0 snap-start overflow-hidden relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={`/products/${product.id}`}
        className="relative block h-[230px] p-4 bg-white dark:bg-gray-800 flex items-center justify-center"
      >
        <img
          src={
            product.hinh_anh?.startsWith("http")
              ? product.hinh_anh
              : `http://localhost:5000${product.hinh_anh}`
          }
          alt={product.ten_san_pham}
          className="max-h-full max-w-full object-contain"
        />
      </Link>

      <div className="p-3 flex flex-col flex-1 border-t border-gray-100 dark:border-gray-700">
        <Link to={`/products/${product.id}`} className="mb-2">
          <h3
            className="font-medium text-gray-800 dark:text-white text-[13px] leading-snug line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title={product.ten_san_pham}
          >
            {product.ten_san_pham}
          </h3>
        </Link>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-[#e30019] dark:text-red-400 font-bold text-[15px]">
                {currentPrice.toLocaleString("vi-VN")} VNĐ
              </div>
              {isSale && (
                <div className="text-gray-400 dark:text-gray-500 text-[11px] line-through mt-0.5">
                  {giaBan.toLocaleString("vi-VN")} VNĐ
                </div>
              )}
            </div>
            {isSale && (
              <div className="bg-[#e30019] text-white text-[11px] font-bold px-1.5 py-0.5 rounded">
                -{discountPercent}%
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-3">
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1.5 text-[#1c3f7e] dark:text-blue-400 hover:text-blue-700 font-bold text-[11px] transition-colors"
            >
              <div className="bg-[#1c3f7e] text-white p-1 rounded-full flex items-center justify-center">
                <ShoppingCart size={12} strokeWidth={2.5} />
              </div>
              THÊM VÀO GIỎ
            </button>
            <span className="bg-[#dcfce7] text-[#16a34a] text-[10px] font-bold px-2 py-0.5 rounded-full">
              Còn hàng
            </span>
          </div>
        </div>
      </div>

      {/* Tooltip Portal */}
      {showTooltip && createPortal(<TooltipContent />, document.body)}
    </div>
  );
};

export default ProductCard;
