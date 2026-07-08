import React from 'react';
import { useLanguage } from '../src/contexts/LanguageContext';

// Header component added into Section file as requested
export const AdminHeader = ({ logoText, logoSrc, backgroundColor, menuItems }) => {
  const { currentLang, switchLanguage } = useLanguage();
  const isEnglish = currentLang === 'en';

  const handleLanguageSwitch = (lang) => {
    switchLanguage(lang);
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const pathIsEnglish = currentPath.endsWith('en');
      
      // Do not redirect if in Editor mode
      if (currentPath.includes('/editor/')) return;

      if (lang === 'en' && !pathIsEnglish) {
        window.location.href = currentPath === '/' ? '/en' : currentPath + 'en';
      } else if (lang === 'vi' && pathIsEnglish) {
        const newPath = currentPath.slice(0, -2);
        window.location.href = newPath === '' ? '/' : newPath;
      }
    }
  };

  return (
    <header style={{ 
      width: '100%', 
      backgroundColor: backgroundColor || '#1A6B49', 
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: '0 24px', 
        height: '64px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
      }}>
        {/* Logo Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {(!logoSrc || logoSrc === '/favicon.svg') ? (
            <img src="https://beta.hexagon.xyz/assets/images/logo-hhc.png" alt="Hexagon Logo" style={{ height: '40px', width: 'auto' }} />
          ) : (
            <img src={logoSrc} alt="Logo" style={{ height: '40px', width: 'auto' }} />
          )}
          {logoText && <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '20px', letterSpacing: '1px' }}>{logoText}</span>}
        </div>

        {/* Desktop Menu & Language */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* Menu Items */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {menuItems && menuItems.length > 0 ? (
              menuItems.map((item, index) => (
                <a key={index} href={item.url || '#'} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>
                  {item.text}
                </a>
              ))
            ) : (
              <>
                <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Trang chủ</a>
                <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Giới thiệu</a>
                <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Dịch vụ</a>
                <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Hỗ trợ</a>
                <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Liên hệ</a>
              </>
            )}
          </nav>

          {/* Language Flags */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '16px' }}>
            <button 
              type="button" 
              title="Tiếng Việt" 
              onClick={() => handleLanguageSwitch('vi')}
              style={{ opacity: !isEnglish ? 1 : 0.45, transition: 'opacity 0.2s', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" style={{ width: '24px', height: '16px', objectFit: 'cover', borderRadius: '2px' }}>
                <defs>
                  <clipPath id="vn-a">
                    <path fillOpacity=".7" d="M-88 0h682.7v512H-88z"/>
                  </clipPath>
                </defs>
                <g fillRule="evenodd" clipPath="url(#vn-a)" transform="translate(80) scale(.9375)">
                  <path fill="#da251d" d="M-128 0h768v512h-768z"/>
                  <path fill="#ff0" d="M349.6 381 260 314.3l-89 67.3L204 272l-89-67.7 110.1-1 34.2-109.4L294 203l110.1 1-88.5 68.4 33.9 109.6z"/>
                </g>
              </svg>
            </button>
            <button 
              type="button" 
              title="English" 
              onClick={() => handleLanguageSwitch('en')}
              style={{ opacity: isEnglish ? 1 : 0.45, transition: 'opacity 0.2s', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" style={{ width: '24px', height: '16px', objectFit: 'cover', borderRadius: '2px' }}>
                <path fill="#012169" d="M0 0h640v480H0z"/>
                <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
                <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-184 20 6 35L22 480H0v-50l240-129zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"/>
                <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
                <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

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

// About component added as requested
export const AdminAbout = ({ 
  title, 
  description, 
  imageSrc, 
  quoteText, 
  quoteAuthor, 
  cards 
}) => {
  const [showTopBtn, setShowTopBtn] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section style={{ 
      padding: '100px 24px', 
      backgroundColor: '#fff', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'nowrap', // Bắt buộc nằm ngang
        gap: '60px',
        alignItems: 'center'
      }}>
        {/* Left Column (Image & Quote) */}
        <div style={{ flex: '1 1 50%', minWidth: 0, position: 'relative' }}>
          {/* Light green block rotated */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            bottom: '-20px',
            left: '-20px',
            right: '-20px',
            backgroundColor: '#D1FAE5', // light mint green
            transform: 'rotate(-3deg)',
            borderRadius: '16px',
            zIndex: 0
          }}></div>
          
          <img src={imageSrc} alt="About Hexagon" style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
            position: 'relative',
            zIndex: 1,
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }} />

          {/* Floating Quote */}
          <div style={{
            position: 'absolute',
            bottom: '-20px',
            right: '-30px', // overlaps right column slightly
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            zIndex: 2,
            maxWidth: '300px',
            border: '1px solid rgba(0,0,0,0.05)'
          }}>
            <p style={{ fontStyle: 'italic', fontSize: '15px', color: '#1F2937', marginBottom: '16px', lineHeight: '1.6' }}>
              "{quoteText}"
            </p>
            <div style={{ textAlign: 'right', fontSize: '13px', fontWeight: 'bold', color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '1px' }}>
              — {quoteAuthor}
            </div>
          </div>
        </div>

        {/* Right Column (Text & Grid) */}
        <div style={{ flex: '1 1 500px', zIndex: 1 }}>
          <h2 style={{ fontSize: '42px', fontWeight: 'bold', color: '#0F172A', marginBottom: '24px' }}>
            {title}
          </h2>
          <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.8', marginBottom: '48px' }}>
            {description}
          </p>
          
          {/* 2x2 Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {cards && cards.map((card, idx) => (
              <div key={idx} style={{
                backgroundColor: '#F8FAFC',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid #F1F5F9'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1A6B49', marginBottom: '12px' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: '1.6' }}>
                  {card.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to top / floating action button */}
      <div style={{ 
        position: 'fixed', 
        bottom: '40px', 
        right: '40px', 
        zIndex: 50,
        opacity: showTopBtn ? 1 : 0,
        visibility: showTopBtn ? 'visible' : 'hidden',
        transform: showTopBtn ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.3s ease-in-out'
      }}>
        <button onClick={goToTop} style={{
          width: '56px',
          height: '56px',
          backgroundColor: '#F59E0B',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          boxShadow: '0 10px 25px rgba(245, 158, 11, 0.4)',
          border: 'none',
          cursor: 'pointer',
          outline: 'none'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" style={{ width: '24px', height: '24px' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
          </svg>
        </button>
      </div>
    </section>
  );
};

// ServiceCard component for individual hover effects
const ServiceCard = ({ card }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        height: '440px',
        boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.15)' : '0 10px 30px rgba(0,0,0,0.08)',
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Base Green Background */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `url(${card.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: isHovered ? 0 : 1,
        transition: 'opacity 0.4s ease',
        zIndex: 0
      }} />

      {/* Hover Background (Orange) */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `url(https://beta-api.hexagon.xyz/uploads/hovermyc-1-1782467371060-195987948.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
        zIndex: 1
      }} />

      <div style={{ padding: '28px', zIndex: 2, position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: 'bold', 
          color: '#F59E0B', 
          marginBottom: '20px',
          lineHeight: '1.4'
        }}>
          {card.title}
        </h3>
        
        {/* Animated Text Container */}
        <div style={{
           opacity: isHovered ? 1 : 0,
           transform: isHovered ? 'translateY(0)' : 'translateY(-20px)',
           transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
           transitionDelay: '0.1s', // Slight delay for the text to slide down after card lifts
           flex: 1
        }}>
          {card.description && (
            <p style={{ 
              fontSize: '15px', 
              color: '#111827', 
              lineHeight: '1.6', 
              marginBottom: '20px',
            }}>
              {card.description}
            </p>
          )}
          {card.linkText && (
            <a href={card.linkUrl || '#'} style={{ 
              fontSize: '15px', 
              fontWeight: 'bold', 
              color: '#2563EB', 
              textDecoration: 'none',
              display: 'inline-block'
            }}>
              {card.linkText} &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Services component
export const AdminServices = ({
  title,
  subtitle,
  cards
}) => {
  const defaultCards = [
    {
      title: 'Giải pháp công nghệ',
      description: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt mọi nhu cầu đặc thù.',
      image: 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg',
      linkText: 'Xem chi tiết',
      linkUrl: '#'
    },
    {
      title: 'Giải pháp thi công & lắp đặt',
      description: 'Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và tăng trưởng bền vững.',
      image: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg',
      linkText: 'Xem chi tiết',
      linkUrl: '#'
    },
    {
      title: 'Cung cấp thiết bị CNTT',
      description: 'Cung cấp giải pháp trí tuệ nhân tạo và phân tích dữ liệu, hỗ trợ ra quyết định thông minh, tự động hóa quy trình và khám phá tiềm năng.',
      image: 'https://beta-api.hexagon.xyz/uploads/dv-2-1782723514900-716634177.jpg',
      linkText: 'Xem chi tiết',
      linkUrl: '#'
    },
    {
      title: 'Dịch vụ Công nghệ thông tin',
      description: 'Thi công và lắp đặt hệ thống camera giám sát, mạng wifi chuyên nghiệp, đảm bảo an ninh, ổn định kết nối và phù hợp với mọi nhu cầu.',
      image: 'https://beta-api.hexagon.xyz/uploads/dv-1-1782723514912-477828992.jpg',
      linkText: 'Xem chi tiết',
      linkUrl: '#'
    }
  ];

  const displayCards = cards?.map((card, index) => {
    const defaultCard = defaultCards[index] || {};
    return {
      ...card,
      description: card.description || defaultCard.description || '',
      linkText: card.linkText || defaultCard.linkText || 'Xem chi tiết',
    };
  }) || defaultCards;

  return (
    <section style={{ 
      padding: '80px 24px', 
      backgroundColor: '#FAFAFA', 
      fontFamily: 'system-ui, -apple-system, sans-serif' 
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            {title}
          </h2>
          <p style={{ fontSize: '16px', color: '#4B5563' }}>
            {subtitle}
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: '24px' 
        }}>
          {displayCards.map((card, idx) => (
            <ServiceCard key={idx} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

// NewsCard component
const NewsCard = ({ article }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <a
      href={article.url || '#'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#fff',
        border: '1px solid #F3F4F6',
        boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 4px 6px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: 'pointer',
        textDecoration: 'none'
      }}
    >
      <div style={{ width: '100%', height: '240px', overflow: 'hidden' }}>
        <img 
          src={article.image} 
          alt={article.title} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.5s ease'
          }} 
        />
      </div>
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: 'bold', 
          color: isHovered ? '#F59E0B' : '#111827', 
          marginBottom: '12px',
          lineHeight: '1.4',
          transition: 'color 0.3s ease',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {article.title}
        </h3>
        <p style={{ 
          fontSize: '14px', 
          color: '#6B7280', 
          lineHeight: '1.6', 
          marginBottom: '24px',
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {article.summary}
        </p>
        
        <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9CA3AF', fontSize: '13px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#F59E0B" style={{ width: '16px', height: '16px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            {article.date}
          </div>
          <div style={{ color: '#F59E0B', fontSize: '14px', fontWeight: 'bold' }}>
            Xem chi tiết &rarr;
          </div>
        </div>
      </div>
    </a>
  );
};

// AdminNews component
export const AdminNews = ({ title, subtitle, articles, buttonText, buttonUrl }) => {
  return (
    <section style={{ padding: '80px 24px', backgroundColor: '#FAFAFA', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>{title}</h2>
          <p style={{ fontSize: '16px', color: '#4B5563', marginBottom: '24px' }}>{subtitle}</p>
          <div style={{ width: '40px', height: '3px', backgroundColor: '#F59E0B' }}></div>
        </div>
        
        {/* Grid (2 cards span 3 cols, next 3 cards span 2 cols) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '24px', marginBottom: '48px' }}>
          {articles && articles.map((article, idx) => {
            const span = idx < 2 ? 3 : 2; // Đầu tiên là 2 cột lớn, sau đó là 3 cột nhỏ
            return (
              <div key={idx} style={{ gridColumn: `span ${span}` }}>
                 <NewsCard article={article} />
              </div>
            )
          })}
        </div>

        {/* View All Button */}
        {buttonText && (
          <div style={{ textAlign: 'center' }}>
            <a href={buttonUrl || '#'} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 32px',
              backgroundColor: '#16A34A', // Green button
              backgroundImage: 'linear-gradient(to right, #16A34A, #34D399)', // Slight gradient for polish
              color: 'white',
              fontSize: '15px',
              fontWeight: '600',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 10px 25px rgba(22, 163, 74, 0.3)'
            }}>
              {buttonText} 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" style={{ width: '16px', height: '16px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

// Partners component
export const AdminPartners = ({ title, partners }) => {
  return (
    <section style={{ 
      padding: '60px 0', 
      background: 'linear-gradient(to bottom, #115E59, #6EE7B7)', // Dark green to lighter green gradient
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflow: 'hidden'
    }}>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-192px * ${partners?.length || 6})); } /* 160px width + 32px gap = 192px */
        }
        .marquee-wrapper {
          display: flex;
          overflow: hidden;
          width: 100%;
          position: relative;
        }
        .marquee-wrapper::before,
        .marquee-wrapper::after {
          content: "";
          position: absolute;
          top: 0;
          width: 150px;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }
        .marquee-wrapper::before {
          left: 0;
          background: linear-gradient(to right, rgba(17, 94, 89, 0.8), transparent);
        }
        .marquee-wrapper::after {
          right: 0;
          background: linear-gradient(to left, rgba(17, 94, 89, 0.8), transparent);
        }
        .marquee-track {
          display: flex;
          gap: 32px;
          padding: 20px 0;
          animation: scroll 25s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .partner-card {
          width: 160px;
          height: 90px;
          background-color: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          padding: 16px;
          flex-shrink: 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .partner-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        }
      `}</style>
      
      <div style={{ maxWidth: '1280px', margin: '0 auto 40px auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#000000' }}>{title}</h2>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-track">
          {/* Double the list for seamless infinite scroll loop */}
          {partners && [...partners, ...partners].map((partner, idx) => (
            <div key={idx} className="partner-card">
              <img 
                src={partner.logo} 
                alt={partner.name || `Partner ${idx}`} 
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const AdminContact = ({ 
  title, 
  subtitle, 
  addressLabel = 'Trụ sở chính',
  address, 
  emailLabel = 'Email',
  email, 
  phoneLabel = 'Hotline',
  phone,
  facebookUrl,
  linkedinUrl,
  youtubeUrl,
  zaloUrl,
  mapEmbedUrl
}) => {
  return (
    <section style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#FAFAFA', padding: '80px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '60px' }}>
        
        {/* Left Column */}
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>{title}</h2>
          <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.6', marginBottom: '40px', maxWidth: '480px' }}>
            {subtitle}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#10B981' }}>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '20px', height: '20px' }}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                   <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                 </svg>
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>{addressLabel}</div>
                <div style={{ fontSize: '14px', color: '#4B5563' }}>{address}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#10B981' }}>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '20px', height: '20px' }}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                 </svg>
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>{emailLabel}</div>
                <div style={{ fontSize: '14px', color: '#4B5563' }}>{email}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#10B981' }}>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '20px', height: '20px' }}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                 </svg>
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>{phoneLabel}</div>
                <div style={{ fontSize: '14px', color: '#4B5563' }}>{phone}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {[
              { name: 'Facebook', url: facebookUrl },
              { name: 'LinkedIn', url: linkedinUrl },
              { name: 'YouTube', url: youtubeUrl },
              { name: 'Zalo', url: zaloUrl },
            ].map(social => (
              social.url && (
                <a key={social.name} href={social.url} style={{
                  padding: '8px 16px',
                  backgroundColor: '#E6F4EA',
                  color: '#064E3B',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  border: '1px solid #D1FAE5',
                  transition: 'all 0.2s ease'
                }}>
                  {social.name}
                </a>
              )
            ))}
          </div>
        </div>

        {/* Right Column: Google Maps */}
        <div style={{ flex: '1 1 500px', display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            width: '100%', 
            height: '400px', 
            borderRadius: '12px', 
            overflow: 'hidden', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
          }}>
            <iframe 
              src={mapEmbedUrl} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export const AdminFooter = ({ copyrightText }) => {
  return (
    <footer style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ backgroundColor: '#115E59', padding: '16px 24px', textAlign: 'center' }}>
        <p style={{ color: '#A7F3D0', fontSize: '13px', margin: 0 }}>
          {copyrightText}
        </p>
      </div>
    </footer>
  );
};

// 1. Service Hero
export const ServiceHero = ({ breadcrumb, title, description, buttonText, buttonUrl, image }) => {
  return (
    <section style={{ padding: '80px 24px', backgroundColor: '#FAFAFA', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '24px' }}>{breadcrumb}</div>
          <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: '#F59E0B', marginBottom: '24px' }}>{title}</h1>
          <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.6', marginBottom: '40px' }}>{description}</p>
          <a href={buttonUrl || '#'} style={{
            display: 'inline-block',
            padding: '12px 32px',
            backgroundColor: '#F59E0B',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '8px',
            textDecoration: 'none',
            boxShadow: '0 4px 6px rgba(245, 158, 11, 0.2)',
            transition: 'all 0.2s ease'
          }}>
            {buttonText}
          </a>
        </div>
        <div style={{ flex: '1 1 500px' }}>
          <img src={image} alt={title} style={{ width: '100%', aspectRatio: '16/9', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', objectFit: 'cover' }} />
        </div>
      </div>
    </section>
  );
};

// 2. Solutions
export const Solutions = ({ title, cards }) => {
  const defaultCards = [
    { title: 'Phát triển phần mềm theo yêu cầu', description: 'Thiết kế và xây dựng phần mềm "đo ni đóng giày" theo quy trình vận hành riêng của doanh nghiệp.' },
    { title: 'Giải pháp chuyển đổi số doanh nghiệp', description: 'Tích hợp công nghệ vào toàn bộ hoạt động (quản lý, bán hàng, vận hành), giúp doanh nghiệp tự động hóa.' },
    { title: 'Xây dựng hệ thống nền tảng & tích hợp', description: 'Phát triển hệ thống trung tâm (CRM, ERP, Dashboard...) và kết nối các nền tảng hiện có.' }
  ];
  const displayCards = cards && cards.length > 0 ? cards : defaultCards;

  return (
    <section style={{ padding: '80px 24px', backgroundColor: '#FAFAFA', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>{title}</h2>
          <div style={{ width: '60px', height: '3px', backgroundColor: '#F59E0B', margin: '0 auto' }}></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {displayCards.map((card, idx) => (
            <div key={idx} style={{
              backgroundColor: 'white',
              padding: '32px',
              borderRadius: '12px',
              border: '1px solid #F3F4F6',
              boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
            }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#D1FAE5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" style={{ width: '20px', height: '20px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px', lineHeight: '1.4' }}>{card.title}</h3>
              <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.6' }}>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 3. Process
export const Process = ({ title, subtitle, steps }) => {
  const defaultSteps = [
    { number: '01', text: 'Khảo sát & phân tích yêu cầu' },
    { number: '02', text: 'Thiết kế giải pháp & kiến trúc hệ thống' },
    { number: '03', text: 'Phát triển & Thử nghiệm' },
    { number: '04', text: 'Triển khai & Bảo trì' }
  ];
  const displaySteps = steps && steps.length > 0 ? steps : defaultSteps;

  return (
    <section style={{ padding: '80px 24px', backgroundColor: '#FAFAFA', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>{title}</h2>
          <p style={{ fontSize: '16px', color: '#6B7280' }}>{subtitle}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          {displaySteps.map((step, idx) => (
            <div key={idx} style={{
              backgroundColor: 'white',
              padding: '32px 24px',
              borderRadius: '12px',
              border: '1px solid #F3F4F6',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
            }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#F59E0B', marginBottom: '16px' }}>{step.number}</div>
              <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#111827', lineHeight: '1.4' }}>{step.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 4. CTA
export const CTA = ({ title, subtitle, primaryButtonText, primaryButtonUrl, secondaryButtonText, secondaryButtonUrl }) => {
  return (
    <section style={{ padding: '80px 24px', backgroundColor: '#FAFAFA', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', backgroundColor: '#064E3B', borderRadius: '16px', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '24px' }}>{title}</h2>
        <p style={{ fontSize: '16px', color: '#D1FAE5', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto', lineHeight: '1.6' }}>{subtitle}</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={secondaryButtonUrl || '#'} style={{
            padding: '12px 32px',
            backgroundColor: '#065F46',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '8px',
            textDecoration: 'none',
            border: '1px solid #047857',
            transition: 'all 0.2s ease'
          }}>
            {secondaryButtonText}
          </a>
          <a href={primaryButtonUrl || '#'} style={{
            padding: '12px 32px',
            backgroundColor: '#F59E0B',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '8px',
            textDecoration: 'none',
            transition: 'all 0.2s ease'
          }}>
            {primaryButtonText}
          </a>
        </div>
      </div>
    </section>
  );
};

// 5. News Article Layout
export const NewsArticleLayout = (props) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  
  const services = props.widgetServices || [];
  const currentService = services[currentSlide] || {};
  
  const handleNext = (e) => {
    e.preventDefault();
    if (services.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }
  };
  
  const handlePrev = (e) => {
    e.preventDefault();
    if (services.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
    }
  };
  return (
    <section style={{ backgroundColor: '#FAFAFA', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        
        {/* Main Content Grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
          
          {/* Left Column (Article) */}
          <div style={{ flex: '1 1 700px', backgroundColor: 'white', borderRadius: '12px', padding: '40px', border: '1px solid #E5E7EB' }}>
            <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '32px' }}>{props.breadcrumb}</div>
            
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '24px', lineHeight: '1.3' }}>
              {props.articleTitle}
            </h1>
            
            <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: '#6B7280', marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid #E5E7EB' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                {props.metaDate}
              </span>
              {props.metaTime && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  {props.metaTime}
                </span>
              )}
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#F59E0B' }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
                {props.metaLanguage}
              </span>
            </div>
            
            <p style={{ fontSize: '16px', color: '#111827', lineHeight: '1.6', marginBottom: '32px' }}>
              {props.summary}
            </p>
            
            {props.image && (
              <img src={props.image} alt="Article Image" style={{ width: '100%', borderRadius: '8px', marginBottom: '32px', objectFit: 'cover' }} />
            )}
            
            <div style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', marginBottom: '32px' }}>
              {typeof props.content === 'string' && props.content.split('\n').map((para, i) => (
                <p key={i} style={{ marginBottom: '16px' }}>{para}</p>
              ))}
            </div>
            
            <div style={{ fontSize: '14px', color: '#4B5563', marginBottom: '32px' }}>
              {props.tags}
            </div>
            
            <div style={{ borderTop: '2px solid #E5E7EB', paddingTop: '24px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#111827', marginBottom: '8px' }}>{props.companyName}</div>
              <div style={{ fontSize: '14px', color: '#4B5563', marginBottom: '4px' }}>Address: {props.companyAddress}</div>
              <div style={{ fontSize: '14px', color: '#4B5563' }}>Hotline: {props.companyHotline}</div>
            </div>
            
          </div>
          
          {/* Right Column (Sidebar) */}
          <div style={{ flex: '1 1 300px', maxWidth: '380px' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F59E0B', fontWeight: 'bold', fontSize: '14px', textDecoration: 'none', marginBottom: '16px' }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path></svg>
              Quay lại danh sách
            </a>
            
            <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ backgroundColor: '#115E59', color: 'white', padding: '16px', textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}>
                {props.widgetTitle}
              </div>
              <div style={{ position: 'relative' }}>
                <img src={currentService.image} alt={currentService.title} style={{ width: '100%', height: '200px', objectFit: 'cover', transition: 'all 0.3s ease' }} />
                
                {/* Simulated slider arrows */}
                {services.length > 1 && (
                  <>
                    <div onClick={handlePrev} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', width: '32px', height: '32px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#111827" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path></svg>
                    </div>
                    <div onClick={handleNext} style={{ position: 'absolute', top: '50%', right: '12px', transform: 'translateY(-50%)', width: '32px', height: '32px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#111827" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg>
                    </div>
                  </>
                )}
              </div>
              <div style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '12px' }}>{currentService.title}</h3>
                <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: '1.5', marginBottom: '20px' }}>{currentService.description}</p>
                <a href={currentService.link || '#'} style={{ color: '#F59E0B', fontWeight: 'bold', fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {currentService.linkText || 'Tìm hiểu thêm'}
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg>
                </a>
                
                {/* Simulated pagination dots */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '24px', marginBottom: '16px' }}>
                  {services.map((_, idx) => (
                    <div key={idx} style={{ width: currentSlide === idx ? '16px' : '4px', height: '4px', backgroundColor: currentSlide === idx ? '#F59E0B' : '#D1D5DB', borderRadius: '2px', transition: 'all 0.3s ease' }}></div>
                  ))}
                </div>
              </div>
              <div style={{ borderTop: '1px solid #E5E7EB', padding: '16px', textAlign: 'center' }}>
                <a href="#" style={{ color: '#F59E0B', fontWeight: 'bold', fontSize: '13px', textDecoration: 'none' }}>
                  Xem tất cả dịch vụ &gt;
                </a>
              </div>
            </div>
            
          </div>
        </div>
        
        {/* Related Articles Row */}
        <div style={{ marginTop: '80px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '4px', height: '24px', backgroundColor: '#F59E0B', display: 'inline-block' }}></span>
            {props.relatedTitle}
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {Array.isArray(props.relatedArticles) && props.relatedArticles.map((article, idx) => (
              <a key={idx} href={article.link || '#'} style={{ display: 'block', backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E5E7EB', textDecoration: 'none', transition: 'box-shadow 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'} onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}>
                <img src={article.image} alt={article.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#111827', marginBottom: '12px', lineHeight: '1.4' }}>{article.title}</h3>
                  <div style={{ fontSize: '12px', color: '#6B7280' }}>{article.date}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};
