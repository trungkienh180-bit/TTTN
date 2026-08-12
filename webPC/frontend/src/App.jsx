import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import HomeSection from "./components/HomeSection";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import AdminLayout from "./components/AdminLayout";
import AdminGuard from "./components/AdminGuard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminFeedbacks from "./pages/admin/AdminFeedbacks";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminBanners from "./pages/admin/AdminBanners";
import AdminNews from "./pages/admin/AdminNews";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminConfig from "./pages/admin/AdminConfig";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import MockPayment from "./pages/MockPayment";
import Profile from "./pages/Profile";
import SecondaryBanner from "./assets/banners/banner_collection_pc_i7_e7abf2d206134e7caaaee853c53a4d3c.webp";

// Home Page Component
const Home = () => {
  return (
    <>
      <HeroSection />

      {/* Dynamic Homepage Layout */}
      <div className="max-w-[1700px] mx-auto px-1 sm:px-2 lg:px-4 py-12">
        {/* Banner Khuyến Mãi (Mock visual) */}
        <div className="w-full mb-8 rounded-xl overflow-hidden shadow-sm">
          <img
            src={SecondaryBanner}
            alt="Khuyen Mai"
            className="w-full h-auto object-contain"
          />
        </div>

        <HomeSection
          title="PC MỚI NHẤT"
          isNewest={true}
          headerColor="bg-[#4caf50]"
        />
        <HomeSection
          title="PC BÁN CHẠY NHẤT"
          isBestSeller={true}
          headerColor="bg-[#e53935]"
        />
        <HomeSection
          title="DEAL HOT MỖI NGÀY"
          isHotDeal={true}
          headerColor="bg-gradient-to-r from-orange-500 to-yellow-400"
        />
        <HomeSection
          title="PC GAMING"
          categoryName="PC Gaming"
          headerColor="bg-[#ff4d4f]"
        />
        <HomeSection
          title="PC WORKSTATION 2D 3D"
          categoryName="Workstation"
          headerColor="bg-[#ff5722]"
        />
        <HomeSection
          title="PC VĂN PHÒNG"
          categoryName="Văn Phòng"
          headerColor="bg-[#ff6b6b]"
        />
        <HomeSection
          title="LINH KIỆN MÁY TÍNH"
          categoryName="Linh Kiện"
          headerColor="bg-[#fa541c]"
        />
        <HomeSection
          title="GAMING GEAR"
          categoryName="Gaming Gear"
          headerColor="bg-[#ff8c00]"
        />
        <HomeSection
          title="MÀN HÌNH MÁY TÍNH"
          categoryName="Màn hình"
          headerColor="bg-[#e65100]"
        />
      </div>
    </>
  );
};

// Client Layout Component
const ClientLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Routes>
        {/* Client Routes */}
        <Route
          path="/"
          element={
            <ClientLayout>
              <Home />
            </ClientLayout>
          }
        />
        <Route
          path="/login"
          element={
            <ClientLayout>
              <Login />
            </ClientLayout>
          }
        />
        <Route
          path="/register"
          element={
            <ClientLayout>
              <Register />
            </ClientLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <ClientLayout>
              <Cart />
            </ClientLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <ClientLayout>
              <Checkout />
            </ClientLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <ClientLayout>
              <Profile />
            </ClientLayout>
          }
        />
        <Route
          path="/products"
          element={
            <ClientLayout>
              <Products />
            </ClientLayout>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ClientLayout>
              <ProductDetail />
            </ClientLayout>
          }
        />
        <Route
          path="/news"
          element={
            <ClientLayout>
              <News />
            </ClientLayout>
          }
        />
        <Route
          path="/news/:id"
          element={
            <ClientLayout>
              <NewsDetail />
            </ClientLayout>
          }
        />

        {/* Fake Payment Gateway for testing */}
        <Route path="/mock-payment" element={<MockPayment />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminGuard />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="feedbacks" element={<AdminFeedbacks />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="banners" element={<AdminBanners />} />
            <Route path="news" element={<AdminNews />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="config" element={<AdminConfig />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
