import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { fetchProducts } from "../store/productSlice";
import { addToCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductGrid = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isLoading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 8 }));
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({ san_pham_id: product.id, so_luong: 1, san_pham: product }),
    );
    alert("Đã thêm vào giỏ hàng!");
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Sản Phẩm Nổi Bật
            </h2>
            <p className="text-gray-500">
              Khám phá những dòng PC được ưa chuộng nhất hiện nay.
            </p>
          </div>
          <button className="hidden sm:block text-blue-600 font-medium hover:text-blue-700 transition-colors">
            Xem tất cả &rarr;
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-10">Đang tải sản phẩm...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative aspect-w-4 aspect-h-3 overflow-hidden bg-white flex items-center justify-center p-4">
                  <img
                    src={`http://localhost:5000${product.hinh_anh}`}
                    alt={product.ten_san_pham}
                    className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.la_giam_gia && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      Giảm giá
                    </div>
                  )}
                  {product.la_moi && (
                    <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      Mới
                    </div>
                  )}
                  <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-500 hover:text-red-500 hover:bg-white transition-all shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                    <Heart size={18} />
                  </button>
                </div>

                <div className="p-5 border-t border-gray-50">
                  <div className="flex items-center gap-1 mb-2">
                    <Star
                      size={14}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      5.0
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
                    {product.ten_san_pham}
                  </h3>
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-xl font-bold text-blue-600">
                      {Number(product.gia_ban).toLocaleString("vi-VN")}đ
                    </span>
                    {product.gia_khuyen_mai && (
                      <span className="text-sm text-gray-400 line-through mb-1">
                        {Number(product.gia_khuyen_mai).toLocaleString("vi-VN")}
                        đ
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-900 text-white font-medium hover:bg-blue-600 transition-colors active:scale-95"
                  >
                    <ShoppingCart size={18} />
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button className="mt-8 w-full sm:hidden py-3 text-blue-600 font-medium border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors">
          Xem tất cả sản phẩm
        </button>
      </div>
    </section>
  );
};

export default ProductGrid;
