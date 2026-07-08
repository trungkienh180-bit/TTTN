import React from 'react';
import facebookIcon from '../src/facebook.svg';
import linkedinIcon from '../src/linkedin.svg';

// Section component — container có background, padding, và children (slot).
const containerMap = { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' };

const AdminSection = ({ container = 'lg', background = {}, padding_x = 4, padding_y = 4, children }) => {
  const bgStyle = {};
  if (background.type === 'color') bgStyle.backgroundColor = background.color || 'transparent';
  if (background.type === 'image' && background.bg_image) {
    bgStyle.backgroundImage = `url(${background.bg_image})`;
    bgStyle.backgroundSize = 'cover';
  }
  if (background.type === 'gradient') {
    bgStyle.background = `linear-gradient(${background.direction || 'to right'}, ${background.fromColor || '#fff'}, ${background.toColor || '#000'})`;
  }
  if (background.opacity !== undefined) bgStyle.opacity = background.opacity;

  return (
    <section style={{ ...bgStyle, padding: `${(padding_y || 0) * 4}px ${(padding_x || 0) * 4}px` }}>
      <div style={{ maxWidth: containerMap[container] || '1280px', margin: '0 auto' }}>
        {children}
      </div>
    </section>
  );
};

export default AdminSection;

// ==========================================
// TÍCH HỢP CÁC COMPONENT KHÁC VÀO ĐÂY ĐỂ KHÔNG TẠO FILE MỚI
// ==========================================

// 1. Thành phần Danh sách sản phẩm
export const AdminProducts = ({ title = 'SẢN PHẨM MỚI', products = [] }) => {
  return (
    <section className="py-16 w-full bg-[#fcf9f2]">
      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        {/* Tiêu đề */}
        {title && (
          <div className="mb-10">
            <h2 className="text-2xl md:text-[28px] font-bold text-[#388e3c] uppercase relative z-10 tracking-wide inline-block">
              {title}
              {/* Dải màu vàng phía sau chữ */}
              <span className="absolute bottom-1 right-[-10px] w-[80%] h-[12px] bg-[#ffc107] -z-10"></span>
            </h2>
          </div>
        )}

        {/* Danh sách sản phẩm */}
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          {products.map((product, idx) => (
            <div key={idx} className="bg-white flex-1 overflow-hidden transition-shadow duration-300 group cursor-pointer flex flex-col border border-[#eaeaea] hover:shadow-md">
              {/* Vùng chứa ảnh */}
              <div className="w-full aspect-square bg-white relative overflow-hidden">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                    <span className="text-sm font-medium opacity-60">Chưa có hình</span>
                  </div>
                )}
              </div>
              {/* Tên sản phẩm */}
              <div className="py-4 px-2 text-center text-[#f08121] font-bold text-[16px]">
                {product.name || 'Tên sản phẩm'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


// 1b. Thành phần Danh sách sản phẩm (Trang Sản phẩm)
export const AdminProductsBreadcrumb = ({ breadcrumbs = ['TRANG CHỦ', 'SẢN PHẨM'], products = [] }) => {
  return (
    <section className="py-16 w-full bg-white">
      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-8 text-[15px] flex items-center gap-1">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-gray-400 mx-2">/</span>}
                <span className={idx === breadcrumbs.length - 1 ? "text-gray-900 font-bold uppercase" : "text-gray-500 uppercase"}>
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Danh sách sản phẩm */}
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          {products.map((product, idx) => (
            <div key={idx} className="bg-white flex-1 overflow-hidden transition-shadow duration-300 group cursor-pointer flex flex-col border border-[#eaeaea] hover:shadow-md">
              {/* Vùng chứa ảnh */}
              <div className="w-full aspect-square bg-white relative overflow-hidden">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                    <span className="text-sm font-medium opacity-60">Chưa có hình</span>
                  </div>
                )}
              </div>
              {/* Tên sản phẩm */}
              <div className="py-4 px-2 text-center text-[#f08121] font-bold text-[16px]">
                {product.name || 'Tên sản phẩm'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 2. Thành phần Giới thiệu về thương hiệu
export const AdminAbout = ({ title = 'GIỚI THIỆU VỀ METIK', introText = '', sections = [] }) => {
  const renderContent = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    return (
      <div className="text-gray-600 leading-relaxed text-[18px] space-y-4">
        {typeof text === 'string' ? text.split('\n').map((line, i) => {
          const trimmed = line.trim();
          if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
            return (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[#388e3c] mt-[2px] font-bold">•</span>
                <span>{trimmed.replace(/^[-•]\s*/, '')}</span>
              </div>
            );
          }
          if (trimmed === '') return <div key={i} className="h-2"></div>;
          return <p key={i}>{trimmed}</p>;
        }) : text}
      </div>
    );
  };

  return (
    <section className="py-20 w-full bg-[#fcf9f2]">
      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        <div className="mb-16">
          {title && (
            <h2 className="text-2xl md:text-[28px] font-bold text-[#388e3c] uppercase mb-4 inline-block relative tracking-wide z-10">
              {title}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[80%] h-[12px] bg-[#ffc107] -z-10"></span>
            </h2>
          )}
          {introText && (
            <p className="text-gray-600 text-[18px] leading-[1.8] max-w-5xl">
              {introText}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          {sections.map((sec, idx) => {
            const isImageLeft = sec.imagePosition === 'left';
            return (
              <div key={idx} className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${isImageLeft ? '' : 'md:flex-row-reverse'}`}>
                <div className="w-full md:w-[45%]">
                  <div className="w-full rounded-[40px] overflow-hidden relative">
                    {sec.imageUrl ? (
                      <img src={sec.imageUrl} alt="Giới thiệu" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center text-gray-400">
                        <span className="text-base font-medium opacity-60">Chưa có hình</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full md:w-[55%] flex flex-col justify-center">
                  {sec.heading && (
                    <h3 className="text-xl md:text-2xl font-bold text-[#f08121] mb-4 leading-tight">
                      {sec.heading}
                    </h3>
                  )}
                  {renderContent(sec.content)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


// 3. Thành phần Về Chúng Tôi (Giới thiệu và Video cạnh nhau)
export const AdminAboutUs = ({ title = 'VỀ CHÚNG TÔI', introText = '', videoUrl = '' }) => {
  return (
    <section className="py-24 w-full" style={{ background: 'linear-gradient(to bottom, #fcf9f2, #fff3cd)' }}>
      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            {title && (
              <div className="mb-8">
                <h2 className="text-2xl md:text-[28px] font-bold text-[#388e3c] uppercase relative z-10 tracking-wide inline-block">
                  {title}
                  <span className="absolute bottom-1 right-[-10px] w-[70%] h-[12px] bg-[#ffc107] -z-10"></span>
                </h2>
              </div>
            )}

            {introText && (
              <div className="text-gray-800 text-[18px] leading-[1.8] whitespace-pre-wrap space-y-4">
                {typeof introText === 'string' ? introText.split('\n').map((paragraph, idx) => {
                  if (!paragraph.trim()) return null;
                  return (
                    <p key={idx}>
                      {paragraph.split(/(metik)/i).map((part, i) =>
                        part.toLowerCase() === 'metik' ? <strong key={i} className="font-bold text-gray-900">{part}</strong> : part
                      )}
                    </p>
                  );
                }) : introText}
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2">
            <div className="w-full aspect-[16/9] bg-[#333] rounded-2xl overflow-hidden shadow-lg relative group">
              {videoUrl ? (
                videoUrl.toLowerCase().endsWith('.mp4') ? (
                  <video
                    src={videoUrl}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    muted
                    loop
                  />
                ) : (
                  <iframe
                    src={videoUrl}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Video giới thiệu"
                  ></iframe>
                )
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 cursor-pointer">
                  <div className="w-16 h-16 rounded-full border-[3px] border-white flex items-center justify-center z-10 bg-white/20 group-hover:bg-white/30 transition-colors backdrop-blur-sm">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>

                  {/* Fake controls bar */}
                  <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-black/90 to-transparent flex items-center px-4 gap-3 z-10 pb-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    <span className="text-white text-[10px] font-mono">00:00</span>
                    <div className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
                      <div className="w-[40%] h-full bg-white"></div>
                    </div>
                    <span className="text-white text-[10px] font-mono">00:18</span>
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};


// 4. Thành phần Khách Hàng Nói Gì (Đánh giá của khách hàng)
export const AdminTestimonials = ({ title = 'KHÁCH HÀNG NÓI GÌ?', testimonials = [] }) => {
  return (
    <section className="py-20 w-full" style={{ background: 'linear-gradient(to bottom, #fff3cd, #ffe69c)' }}>
      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        {/* Tiêu đề */}
        {title && (
          <div className="mb-16">
            <h2 className="text-2xl md:text-[28px] font-bold text-[#388e3c] uppercase relative z-10 tracking-wide inline-block">
              {title}
              <span className="absolute bottom-1 right-[-10px] w-[60%] h-[12px] bg-[#ffc107] -z-10"></span>
            </h2>
          </div>
        )}

        {/* Danh sách Đánh giá */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {testimonials.map((test, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full border-[4px] border-[#ffc107] overflow-hidden bg-white flex items-center justify-center">
                  {test.avatarUrl ? (
                    <img src={test.avatarUrl} alt={test.author} className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-12 h-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Nội dung */}
              <div className="flex flex-col mt-2 sm:mt-0">
                {/* 5 Stars */}
                <div className="flex text-[#ffc107] mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-[18px] h-[18px] mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-600 italic text-[15px] leading-relaxed mb-4">
                  "{test.content}"
                </p>

                {/* Author */}
                <p className="text-gray-900 font-bold text-[15px]">
                  {test.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


// 5. Thành phần Footer
export const AdminFooter = ({
  logoUrl = '',
  introText = 'METIK - một thế giới snack dành cho những ai yêu sự giòn giòn ngất ngây, hương vị trẻ trung, đầy cảm hứng để mỗi ngày đều căng tràn sức sống.',
  phone = '(+84) 79 721 3333',
  email = 'sale@ochao.vn',
  address = 'Lô C3-1, Đường D2-N7, KCN Tân Phú Trung, Xã Củ Chi, TP.HCM..',
  copyrightText = 'Copyright 2026 © METIK. All rights reserved'
}) => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full flex flex-col font-sans">
      {/* Nền vàng chính */}
      <div className="w-full bg-[#fbbc04] py-16">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">

          {/* Cột trái: Logo và Intro */}
          <div className="flex flex-col gap-6 items-start">
            <div className="h-20 w-auto">
              {logoUrl ? (
                <img src={logoUrl} alt="Metik Logo" className="h-full object-contain drop-shadow-md" />
              ) : (
                <div className="text-[50px] font-extrabold text-[#f08121] tracking-tight drop-shadow-md" style={{ WebkitTextStroke: '1px white' }}>
                  metik
                </div>
              )}
            </div>
            <p className="text-gray-900 text-[16px] leading-[1.7] max-w-sm">
              {introText.split(/(METIK)/i).map((part, i) =>
                part.toUpperCase() === 'METIK' ? <strong key={i} className="font-bold">{part}</strong> : part
              )}
            </p>
          </div>

          {/* Cột phải: Thông tin liên hệ */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h3 className="text-[17px] font-bold text-[#388e3c] uppercase mb-3">
                THÔNG TIN LIÊN HỆ
              </h3>
              <div className="w-full h-[1px] bg-[#388e3c]/30"></div>
            </div>

            <div className="flex flex-col gap-4 text-gray-900 text-[15px]">
              {/* Điện thoại */}
              {phone && (
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
                  <span className="mt-0.5">{phone}</span>
                </div>
              )}
              {/* Email */}
              {email && (
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                  <span className="mt-0.5">{email}</span>
                </div>
              )}
              {/* Địa chỉ */}
              {address && (
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                  <span className="leading-[1.5]">{address}</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Thanh bản quyền màu cam */}
      <div className="w-full bg-[#f08121] py-4 relative">
        <div className="max-w-[1100px] mx-auto px-4 flex justify-center items-center">
          <p className="text-white text-[13px] font-medium">
            {copyrightText.split(/(METIK)/i).map((part, i) =>
              part.toUpperCase() === 'METIK' ? <strong key={i} className="font-bold">{part}</strong> : part
            )}
          </p>
        </div>
      </div>

      {/* Nút cuộn lên đầu trang (Floating) */}
      <button
        onClick={scrollToTop}
        className={`fixed right-6 bottom-6 md:right-10 md:bottom-10 w-10 h-10 rounded-full border border-gray-400 bg-transparent flex items-center justify-center text-gray-500 hover:text-[#f08121] hover:border-[#f08121] transition-all duration-300 z-50 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
        aria-label="Cuộn lên đầu trang"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
      </button>
    </footer>
  );
};

// 6. Thành phần Header
export const AdminHeader = ({ logoUrl, navItems = [], facebookUrl, tiktokUrl, linkedinUrl }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 bg-white transition-all duration-300 ${isScrolled ? 'shadow-md py-2' : 'shadow-sm py-4'}`}>
      {/* Logo */}
      <div className="flex-shrink-0 cursor-pointer">
        {logoUrl ? (
          <img src={logoUrl} alt="Metik Logo" className={`${isScrolled ? 'h-10 md:h-12' : 'h-16 md:h-20'} object-contain drop-shadow-md transition-all duration-300`} />
        ) : (
          <div className={`${isScrolled ? 'text-2xl md:text-3xl' : 'text-4xl md:text-5xl'} font-extrabold text-[#fec107] drop-shadow-sm transition-all duration-300`} style={{ WebkitTextStroke: '1.5px #ea580c' }}>
            metik
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex space-x-10">
        {navItems.map((item, index) => {
          const isActive = item.isActive === true || item.isActive === 'true';
          return (
            <a
              key={index}
              href={item.url || '#'}
              className={`text-[15px] font-bold uppercase tracking-wide transition-colors ${isActive
                  ? 'text-gray-900 border-b-[3px] border-[#f08121] pb-1'
                  : 'text-gray-500 hover:text-[#f08121]'
                }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* Social Icons */}
      <div className="flex items-center space-x-3">
        {facebookUrl && (
          <a href={facebookUrl} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#3b5998] hover:opacity-80 transition-opacity">
            <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
          </a>
        )}
        {tiktokUrl && (
          <a href={tiktokUrl} className="w-8 h-8 flex items-center justify-center rounded-full bg-black hover:opacity-80 transition-opacity">
            <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.8-5.46-.4-2.51.56-5.23 2.57-6.9 1.11-.91 2.52-1.48 3.99-1.67v4.11c-1.12.2-2.18.91-2.74 1.91-.49.98-.48 2.21.08 3.16.59 1.04 1.83 1.63 3.03 1.53 1.09-.07 2.1-.73 2.62-1.7.27-.49.43-1.07.45-1.64.06-2.5.02-5.01.03-7.51.01-4.14-.01-8.29.02-12.43z" />
            </svg>
          </a>
        )}
        {linkedinUrl && (
          <a href={linkedinUrl} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0077b5] hover:opacity-80 transition-opacity">
            <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
          </a>
        )}
      </div>
    </header>
  );
};

// 7. Phần giới thiệu công ty (Video trái, chữ phải)
export const AdminCompanyIntro = ({ videoUrl = '', content = '' }) => {
  return (
    <section className="py-16 w-full bg-white">
      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Cột trái: Video */}
          <div className="w-full md:w-1/2">
            <div className="w-full aspect-[16/9] bg-[#333] rounded-sm overflow-hidden shadow-md relative group">
              {videoUrl ? (
                videoUrl.toLowerCase().endsWith('.mp4') ? (
                  <video
                    src={videoUrl}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    muted
                    loop
                  />
                ) : (
                  <iframe
                    src={videoUrl}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Video giới thiệu công ty"
                  ></iframe>
                )
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 cursor-pointer">
                  <div className="w-[68px] h-[68px] rounded-full flex items-center justify-center z-10 bg-white group-hover:scale-105 transition-transform shadow-lg">
                    <svg className="w-8 h-8 text-[#f08121] ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>

                  {/* Fake controls bar */}
                  <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-black/90 to-transparent flex items-center px-4 gap-3 z-10 pb-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    <span className="text-white text-[10px] font-mono">00:00</span>
                    <div className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
                      <div className="w-[30%] h-full bg-white"></div>
                    </div>
                    <span className="text-white text-[10px] font-mono">00:18</span>
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cột phải: Text */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            {content && (
              <div className="text-gray-800 text-[18px] leading-[1.8] whitespace-pre-wrap space-y-4">
                {typeof content === 'string' ? content.split('\n').map((paragraph, idx) => {
                  if (!paragraph.trim()) return null;
                  return (
                    <p key={idx}>
                      {paragraph.split(/(metik)/i).map((part, i) =>
                        part.toLowerCase() === 'metik' ? <strong key={i} className="font-bold text-gray-900">{part}</strong> : part
                      )}
                    </p>
                  );
                }) : content}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// 8. Thành phần Bản đồ (Chỉ có Google Maps)
export const AdminContact = ({
  mapUrl = 'https://maps.google.com/maps?q=Công%20ty%20Cổ%20Phần%20OCHAO,%20Tân%20Phú%20Trung,%20Củ%20Chi&t=&z=16&ie=UTF8&iwloc=&output=embed'
}) => {
  return (
    <section className="w-full bg-[#fdfaf5]">
      <div className="w-full h-[500px] md:h-[650px] relative">
        {mapUrl ? (
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bản đồ"
          ></iframe>
        ) : (
          <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center text-gray-400">
            <svg className="w-16 h-16 mb-4 opacity-30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span>Chưa có bản đồ</span>
          </div>
        )}
      </div>
    </section>
  );
};
