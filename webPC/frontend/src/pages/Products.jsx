import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Filter, Search } from "lucide-react";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 1, page: 1 });

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");

  // Sync state with URL params when they change externally (e.g. from Navbar)
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setSort(searchParams.get("sort") || "");
  }, [searchParams]);

  useEffect(() => {
    // Fetch categories
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products?${searchParams.toString()}`,
        );
        setProducts(res.data.products);
        setPagination(res.data.pagination);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, [searchParams]);

  const handleFilter = (e) => {
    e.preventDefault();
    const currentParams = Object.fromEntries([...searchParams]);

    if (search) currentParams.search = search;
    else delete currentParams.search;

    if (minPrice) currentParams.minPrice = minPrice;
    else delete currentParams.minPrice;

    if (maxPrice) currentParams.maxPrice = maxPrice;
    else delete currentParams.maxPrice;

    if (sort) currentParams.sort = sort;
    else delete currentParams.sort;

    // Reset page to 1 on new filter
    currentParams.page = "1";

    setSearchParams(currentParams);
  };

  const handleCategoryClick = (id) => {
    const currentParams = Object.fromEntries([...searchParams]);
    if (id) currentParams.category = id;
    else delete currentParams.category;

    currentParams.page = "1";
    setSearchParams(currentParams);
  };

  const currentCategory = searchParams.get("category");

  return (
    <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner / Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-800 rounded-xl p-8 mb-8 text-white text-center shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Sản Phẩm Của Chúng Tôi</h1>
        <p className="text-lg opacity-90">
          Khám phá hàng ngàn sản phẩm công nghệ với giá tốt nhất thị trường
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-1/4 xl:w-1/5">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6 text-gray-800">
              <Filter className="w-5 h-5" />
              <h2 className="text-xl font-bold">Lọc Sản Phẩm</h2>
            </div>

            <form onSubmit={handleFilter} className="space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tìm kiếm
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Nhập tên sản phẩm..."
                    className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2.5 text-gray-400 hover:text-blue-500"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Danh mục
                </label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(null)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition ${!currentCategory ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
                  >
                    Tất cả sản phẩm
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryClick(cat.id)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition ${currentCategory == cat.id ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                      {cat.ten_danh_muc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Khoảng giá
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="TỪ"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="ĐẾN"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition shadow-md"
              >
                Áp Dụng
              </button>
            </form>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Top Bar Sort */}
          <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
            <span className="text-gray-600">
              Tìm thấy{" "}
              <span className="font-bold text-gray-900">
                {pagination.total}
              </span>{" "}
              sản phẩm
            </span>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Sắp xếp:</label>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setTimeout(
                    () =>
                      document
                        .querySelector("form")
                        .dispatchEvent(
                          new Event("submit", {
                            cancelable: true,
                            bubbles: true,
                          }),
                        ),
                    0,
                  );
                }}
                className="border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Mới nhất</option>
                <option value="price_asc">Giá: Thấp đến Cao</option>
                <option value="price_desc">Giá: Cao xuống Thấp</option>
                <option value="name_asc">Tên: A-Z</option>
                <option value="name_desc">Tên: Z-A</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Empty State */}
          {products.length === 0 && (
            <div className="text-center py-20">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto opacity-20" />
              </div>
              <h3 className="text-xl font-medium text-gray-900">
                Không tìm thấy sản phẩm nào
              </h3>
              <p className="text-gray-500 mt-2">
                Thử điều chỉnh lại bộ lọc hoặc từ khóa tìm kiếm
              </p>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <nav className="flex items-center gap-2">
                {[...Array(pagination.totalPages)].map((_, i) => {
                  const page = i + 1;
                  const isActive = page === pagination.page;
                  return (
                    <button
                      key={page}
                      onClick={() => {
                        const currentParams = Object.fromEntries([
                          ...searchParams,
                        ]);
                        currentParams.page = page.toString();
                        setSearchParams(currentParams);
                      }}
                      className={`w-10 h-10 rounded-lg font-medium transition ${isActive ? "bg-blue-600 text-white shadow-md" : "bg-white text-gray-700 border hover:bg-gray-50"}`}
                    >
                      {page}
                    </button>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
