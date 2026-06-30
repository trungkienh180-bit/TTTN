import React, { useState, useEffect, useRef, useMemo, memo } from 'react';

/**
 * admin-section.jsx — file section/layout chính của Puck CMS
 *
 * Export:
 *   default AdminSection   — section đa variant (departments, stats, news, values, contact-cta, footer…)
 *   AdminHeader            — header cố định + scroll effect
 *   AdminPartners          — marquee logo hội viên (hover logo → dừng)
 *   AdminFooter            — footer đầy đủ vector + link
 *
 * Variants AdminSection: intro, hop, departments, info-cards, stats, news, values, contact-cta, footer
 */

// ==========================================
// Nội dung "Danh sách các Ban"
// ==========================================
const DepartmentsContent = ({ title, titleColor, subtitle, subtitleColor, items }) => (
  <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {title && (
      <h2 className="section-title" style={{ color: titleColor, fontSize: '1.5rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px', textAlign: 'center' }}>
        {title}
      </h2>
    )}
    {subtitle && (
      <h3 style={{ color: subtitleColor, fontSize: '1.1rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '48px', textAlign: 'center' }}>
        {subtitle}
      </h3>
    )}
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center', width: '100%', maxWidth: '1000px' }}>
      {items && items.map((item, idx) => {
        return (
          <div key={idx} style={{
            background: 'linear-gradient(135deg, #2ba0e5 0%, #174b85 100%)',
            borderRadius: '80px 0px 80px 0px', padding: '32px 20px', width: '100%', maxWidth: '300px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', boxSizing: 'border-box'
          }}>
            {item.iconUrl && (
              <div style={{ height: '64px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={item.iconUrl} alt={item.title || 'Icon'} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
              </div>
            )}
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 600, textAlign: 'center', marginBottom: '24px', lineHeight: 1.4 }}>
              {item.title}
            </h4>
            <a href={item.url || '#'} style={{
              marginTop: 'auto', display: 'inline-block', padding: '8px 24px', borderRadius: item.buttonBorderRadius || '20px',
              border: '1px solid rgba(255, 255, 255, 0.6)', color: '#ffffff', fontSize: '0.85rem', textDecoration: 'none', transition: 'all 0.2s ease-in-out'
            }}>
              {item.buttonText || 'Xem hoạt động →'}
            </a>
          </div>
        );
      })}
    </div>
  </div>
);

// ==========================================
// Nội dung "Khối Thông Tin"
// ==========================================
const CardBlock = ({ card, index }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const hasMembers = card.members && card.members.length > 0;
  const totalPages = hasMembers ? Math.ceil(card.members.length / itemsPerPage) : 0;
  const currentMembers = hasMembers ? card.members.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) : [];

  return (
    <div className={`about-card ${index === 0 ? 'left-card' : 'right-card'}`}>
      {card.title && <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#0b2447', textTransform: 'uppercase', marginBottom: '24px', zIndex: 2, position: 'relative' }}>{card.title}</h3>}
      {card.description && <div style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.8', marginBottom: '24px', zIndex: 2, position: 'relative', whiteSpace: 'pre-wrap' }}>{card.description}</div>}

      {card.decorationImage && (
        <div style={{ position: 'absolute', bottom: '0', left: '0', width: '55%', zIndex: 1, pointerEvents: 'none' }}>
          <img src={card.decorationImage} alt="Decoration" style={{ width: '100%', height: 'auto', mixBlendMode: 'multiply', display: 'block' }} />
        </div>
      )}

      {hasMembers && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', zIndex: 2, position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
            {currentMembers.map((member, mIdx) => (
              <div key={mIdx} style={{
                display: 'flex', alignItems: 'center', gap: '20px',
                backgroundColor: '#ffffff', padding: '16px', borderRadius: '16px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9'
              }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, backgroundColor: '#f8fafc', border: '2px solid #e2e8f0' }}>
                  {member.avatar ? <img src={member.avatar} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', color: '#94a3b8' }}>Ảnh</div>}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.6' }}>
                  <div><strong style={{ color: '#0b2447' }}>Họ tên:</strong> {member.name}</div>
                  {member.roleCLB && <div><strong style={{ color: '#0b2447' }}>Chức vụ CLB:</strong> {member.roleCLB}</div>}
                  {member.roleEnterprise && <div><strong style={{ color: '#0b2447' }}>Chức vụ Doanh nghiệp:</strong> {member.roleEnterprise}</div>}
                  {member.enterpriseName && <div><strong style={{ color: '#0b2447' }}>Doanh nghiệp:</strong> {member.enterpriseName}</div>}
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '24px', gap: '15px', position: 'relative', zIndex: 50, pointerEvents: 'auto' }}>
              <button
                onPointerDownCapture={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setCurrentPage(p => Math.max(0, p - 1));
                }}
                onClick={(e) => e.stopPropagation()}
                disabled={currentPage === 0}
                style={{
                  cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                  width: '28px', height: '28px', borderRadius: '8px',
                  backgroundColor: currentPage === 0 ? '#f1f5f9' : '#e0f2fe',
                  color: currentPage === 0 ? '#94a3b8' : '#0b2447',
                  fontWeight: 'bold', pointerEvents: 'auto',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: 'none', transition: 'all 0.2s', fontSize: '0.9rem'
                }}
              >
                &lt;
              </button>
              <div style={{ display: 'flex', gap: '6px' }}>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <div
                    key={i}
                    onPointerDownCapture={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setCurrentPage(i);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      width: i === currentPage ? '20px' : '8px',
                      height: '8px', borderRadius: '4px', cursor: 'pointer',
                      backgroundColor: i === currentPage ? '#0b2447' : '#cbd5e1',
                      transition: 'all 0.3s', pointerEvents: 'auto'
                    }}
                  />
                ))}
              </div>
              <button
                onPointerDownCapture={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setCurrentPage(p => Math.min(totalPages - 1, p + 1));
                }}
                onClick={(e) => e.stopPropagation()}
                disabled={currentPage === totalPages - 1}
                style={{
                  cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
                  width: '28px', height: '28px', borderRadius: '8px',
                  backgroundColor: currentPage === totalPages - 1 ? '#f1f5f9' : '#e0f2fe',
                  color: currentPage === totalPages - 1 ? '#94a3b8' : '#0b2447',
                  fontWeight: 'bold', pointerEvents: 'auto',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: 'none', transition: 'all 0.2s', fontSize: '0.9rem'
                }}
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const InfoCardsContent = ({ cards }) => (
  <div style={{ maxWidth: '1200px', width: '100%', display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(350px, 1fr))`, gap: '30px', margin: '0 auto', fontFamily: '"Inter", "Segoe UI", sans-serif' }}>
    {cards && cards.map((card, idx) => <CardBlock key={idx} card={card} index={idx} />)}
  </div>
);

// ==========================================
// Nội dung "Giới thiệu Doanh nhân Đồng Tháp"
// ==========================================
const IntroContent = ({
  title,
  titleColor,
  subtitle,
  imageUrl,
  paragraph1,
  paragraph2,
  vision,
  mission,
  stats = []
}) => (
  <div className="intro-content">
    <div className="intro-header">
      <h2 className="intro-title" style={{ color: titleColor || '#0b4c8c' }}>{title}</h2>
      <div className="intro-title-line" />
    </div>

    <div className="intro-main">
      <div className="intro-image-wrap">
        {imageUrl && (
          <img src={imageUrl} alt={title || 'Giới thiệu'} className="intro-image" />
        )}
      </div>
      <div className="intro-text">
        {subtitle && <h3 className="intro-subtitle">{subtitle}</h3>}
        {paragraph1 && <p className="intro-paragraph">{paragraph1}</p>}
        {paragraph2 && <p className="intro-paragraph">{paragraph2}</p>}
        {(vision || mission) && (
          <div className="intro-highlight">
            {vision && (
              <p className="intro-highlight-item">
                <strong>Tầm nhìn:</strong> {vision}
              </p>
            )}
            {mission && (
              <p className="intro-highlight-item">
                <strong>Sứ mệnh:</strong> {mission}
              </p>
            )}
          </div>
        )}
      </div>
    </div>

    {stats.length > 0 && (
      <div className="intro-stats">
        {stats.map((item, idx) => (
          <div key={idx} className="intro-stat-card">
            <div className="intro-stat-number">{item.number}</div>
            <div className="intro-stat-label">{item.label}</div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// ==========================================
// Nội dung "HOP — Hội viên"
// ==========================================
const HopContent = ({
  title,
  titleColor,
  subtitle,
  imageUrl,
  paragraph1,
  paragraph2,
  benefitsTitle,
  benefits = [],
  stats = []
}) => (
  <div className="hop-content">
    <div className="hop-header">
      <h2 className="hop-title" style={{ color: titleColor || '#0b4c8c' }}>{title}</h2>
      <div className="hop-title-line" />
    </div>

    <div className="hop-main">
      <div className="hop-image-wrap">
        {imageUrl && <img src={imageUrl} alt={title || 'Hội viên'} className="hop-image" />}
      </div>
      <div className="hop-text">
        {subtitle && <h3 className="hop-subtitle">{subtitle}</h3>}
        {paragraph1 && <p className="hop-paragraph">{paragraph1}</p>}
        {paragraph2 && <p className="hop-paragraph">{paragraph2}</p>}
        {benefits.length > 0 && (
          <div className="hop-benefits">
            {benefitsTitle && <h4 className="hop-benefits-title">{benefitsTitle}</h4>}
            <ul className="hop-benefits-list">
              {benefits.map((item, idx) => (
                <li key={idx} className="hop-benefits-item">
                  <span className="hop-check" aria-hidden="true">✓</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>

    {stats.length > 0 && (
      <div className="hop-stats">
        {stats.map((item, idx) => (
          <div key={idx} className="hop-stat-card">
            <div className="hop-stat-number">{item.number}</div>
            <div className="hop-stat-label">{item.label}</div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// ==========================================
// Nội dung "Thống Kê / Hành Trình"
// ==========================================
const StatsContent = ({ title, titleColor, items }) => (
  <div className="stats-container container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {title && (
      <h2 style={{ color: titleColor || 'var(--color-primary)', fontSize: '1.8rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '80px', letterSpacing: '1px' }}>
        {title}
      </h2>
    )}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '80px 40px', width: '100%', maxWidth: '900px' }}>
      {items && items.map((item, idx) => (
        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
          <div style={{ color: 'var(--color-secondary)', fontSize: '4rem', fontWeight: '800', marginBottom: '16px', lineHeight: 1 }}>
            {item.number}
          </div>
          <div style={{ color: 'var(--color-text-main)', fontSize: '1rem', lineHeight: '1.6', fontWeight: '500', maxWidth: '300px' }}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ==========================================
// Nội dung "Giá trị khi tham gia"
// ==========================================
const ValuesContent = ({ title, titleColor, viewMoreText, viewMoreUrl, cards }) => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', padding: '0 20px' }}>
        <h2 style={{ color: titleColor || '#0b4c8c', fontSize: '1.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
          {title}
        </h2>
        <a href={viewMoreUrl || '#'} style={{ color: '#0b4c8c', fontSize: '1rem', fontWeight: '600', textDecoration: 'none' }}>
          {viewMoreText} &rarr;
        </a>
      </div>

      <div className="values-cards-container" style={{ padding: '0 20px' }}>
        {cards && cards.map((card, idx) => (
          <div key={idx} className={`value-card value-card-${idx}`}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#ffffff', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <img src={card.iconUrl} alt={card.title} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
            </div>
            <h3 style={{ color: '#0b4c8c', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '12px' }}>
              {card.title}
            </h3>
            <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.6 }}>
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// Nội dung "Tin tức & Sự kiện"
// ==========================================
const NewsCard = ({ item, large }) => (
  <div style={{
    backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column'
  }}>
    <div style={{ position: 'relative', width: '100%', paddingTop: large ? '50%' : '60%' }}>
      <img src={item.imageUrl} alt={item.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      {item.tag && (
        <div style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: '#fbbf24', color: '#000', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
          {item.tag}
        </div>
      )}
    </div>
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '8px' }}>{item.date}</div>
      <h3 style={{ color: '#0b4c8c', fontSize: large ? '1.25rem' : '1.1rem', fontWeight: 'bold', marginBottom: '12px', lineHeight: 1.4 }}>
        {item.title}
      </h3>
      <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
        {item.description}
      </p>
      <a href={item.url || '#'} style={{ color: '#0b4c8c', fontSize: '0.95rem', fontWeight: 'bold', textDecoration: 'none', display: 'inline-block', marginTop: 'auto' }}>
        Xem thêm &rarr;
      </a>
    </div>
  </div>
);

const NewsContent = ({ title, titleColor, viewMoreText, viewMoreUrl, items }) => (
  <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
      <h2 style={{ color: titleColor || '#0b4c8c', fontSize: '1.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
        {title}
      </h2>
      <a href={viewMoreUrl || '#'} style={{ color: '#0b4c8c', fontSize: '1rem', fontWeight: '600', textDecoration: 'none' }}>
        {viewMoreText} &rarr;
      </a>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '30px' }}>
      {items && items.slice(0, 2).map((item, idx) => (
        <NewsCard key={`large-${idx}`} item={item} large={true} />
      ))}
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
      {items && items.slice(2).map((item, idx) => (
        <NewsCard key={`small-${idx}`} item={item} large={false} />
      ))}
    </div>
  </div>
);

// ==========================================
// MAIN COMPONENT
// ==========================================
const containerMap = { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px', full: '100%' };

const AdminSection = ({
  variant = 'default',
  container = 'lg',
  background = {},
  padding_x = 4,
  padding_y = 4,
  // props for departments
  deptTitle = '', deptTitleColor = '#1e3a8a', deptSubtitle = '', deptSubtitleColor = '#1e3a8a', deptItems = [],
  // props for intro
  introTitle = '', introTitleColor = '#0b4c8c', introSubtitle = '', introImageUrl = '', introParagraph1 = '', introParagraph2 = '', introVision = '', introMission = '', introStats = [],
  // props for hop (hội viên)
  hopTitle = '', hopTitleColor = '#0b4c8c', hopSubtitle = '', hopImageUrl = '', hopParagraph1 = '', hopParagraph2 = '', hopBenefitsTitle = '', hopBenefits = [], hopStats = [],
  // props for info cards
  infoCards = [],
  // props for stats
  statsTitle = '', statsTitleColor = '#0B5077', statsItems = [],
  // props for news
  newsTitle = '', newsTitleColor = '#0b4c8c', newsViewMoreText = '', newsViewMoreUrl = '', newsItems = [],
  // props for values
  valuesTitle = '', valuesTitleColor = '#0b4c8c', valuesViewMoreText = '', valuesViewMoreUrl = '', valuesCards = [],
  // contact cta props
  contactTitle = '', contactEmailIcon = '', contactEmailText = '', contactPhoneIcon = '', contactPhoneText = '', contactButtonText = '', contactButtonUrl = '',
  // footer props
  footerLogoUrl = '', footerClubName = '', footerAddress = '', footerEmail = '', footerPhone = '', footerMainLinks = [], footerOtherLinks = [], footerSocialLinks = [], footerCopyright = '', footerVectorImage = '', footerVectorRightImage = '', footerEffectRightImage = '',
  children
}) => {
  const bgStyle = {};
  if (background.type === 'color') bgStyle.backgroundColor = background.color || 'transparent';
  if (background.type === 'image' && background.bg_image) {
    bgStyle.backgroundImage = `url(${background.bg_image})`;
    bgStyle.backgroundSize = 'cover';
    bgStyle.backgroundPosition = 'center';
  }
  if (background.type === 'gradient') {
    bgStyle.background = background.gradient || `linear-gradient(${background.direction || 'to right'}, ${background.fromColor || '#fff'}, ${background.toColor || '#000'})`;
  }
  if (background.opacity !== undefined) bgStyle.opacity = background.opacity;

  const contactCtaBgStyle = variant === 'contact-cta' ? {
    backgroundColor: background?.color || '#f5e0f8'
  } : {};

  const getClassName = () => {
    if (variant === 'info-cards') return 'about-section';
    if (variant === 'intro') return 'intro-section';
    if (variant === 'hop') return 'hop-section';
    if (variant === 'stats') return 'stats-section';
    if (variant === 'departments') return 'teams-section';
    if (variant === 'news') return 'news-section';
    if (variant === 'values') return 'values-section';
    if (variant === 'contact-cta') return 'contact-cta-section';
    if (variant === 'footer') return 'footer-section-wrapper';
    return '';
  };

  return (
    <section
      id={variant === 'info-cards' ? 'gioi-thieu' : undefined}
      className={getClassName()}
      style={{
        ...(variant !== 'info-cards' && variant !== 'stats' && variant !== 'contact-cta' && variant !== 'values' && variant !== 'news' && variant !== 'intro' && variant !== 'hop' ? bgStyle : {}),
        ...contactCtaBgStyle,
        padding: (variant === 'info-cards' || variant === 'stats' || variant === 'values' || variant === 'footer' || variant === 'contact-cta' || variant === 'departments' || variant === 'news' || variant === 'intro' || variant === 'hop') ? undefined : `${(padding_y || 0) * 4}px ${(padding_x || 0) * 4}px`,
        minHeight: (variant === 'default' || variant === 'departments' || variant === 'intro' || variant === 'hop') ? 'auto' : '400px',
        position: 'relative'
      }}
    >
      {variant === 'stats' && background.bg_image && background.type !== 'image' && (
        <div className="stats-bg" style={{ position: 'absolute', inset: 0, zIndex: 1, background: `url('${background.bg_image}') center center / contain no-repeat`, mixBlendMode: 'screen', opacity: 0.8 }} />
      )}
      {variant === 'values' && (
        <div className="values-bg-overlay" style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          backgroundImage: `url('${background.bg_image || '/bg-giatri.png'}')`,
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          opacity: 0.45,
          pointerEvents: 'none',
          zIndex: 1
        }} />
      )}
      {variant === 'departments' && (
        <DepartmentsContent title={deptTitle} titleColor={deptTitleColor} subtitle={deptSubtitle} subtitleColor={deptSubtitleColor} items={deptItems} />
      )}

      {variant === 'info-cards' && (
        <InfoCardsContent cards={infoCards} />
      )}

      {variant === 'intro' && (
        <IntroContent
          title={introTitle}
          titleColor={introTitleColor}
          subtitle={introSubtitle}
          imageUrl={introImageUrl}
          paragraph1={introParagraph1}
          paragraph2={introParagraph2}
          vision={introVision}
          mission={introMission}
          stats={introStats}
        />
      )}

      {variant === 'hop' && (
        <HopContent
          title={hopTitle}
          titleColor={hopTitleColor}
          subtitle={hopSubtitle}
          imageUrl={hopImageUrl}
          paragraph1={hopParagraph1}
          paragraph2={hopParagraph2}
          benefitsTitle={hopBenefitsTitle}
          benefits={hopBenefits}
          stats={hopStats}
        />
      )}

      {variant === 'stats' && (
        <StatsContent title={statsTitle} titleColor={statsTitleColor} items={statsItems} />
      )}

      {variant === 'news' && (
        <NewsContent title={newsTitle} titleColor={newsTitleColor} viewMoreText={newsViewMoreText} viewMoreUrl={newsViewMoreUrl} items={newsItems} />
      )}

      {variant === 'values' && (
        <ValuesContent title={valuesTitle} titleColor={valuesTitleColor} viewMoreText={valuesViewMoreText} viewMoreUrl={valuesViewMoreUrl} cards={valuesCards} />
      )}

      {variant === 'contact-cta' && (
        <>
          <div
            className="contact-cta-bg-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(180deg, rgba(245, 224, 248, 0.92) 0%, rgba(245, 224, 248, 0.55) 25%, rgba(245, 224, 248, 0.35) 55%, rgba(245, 224, 248, 0.85) 100%), url('${background?.bg_image || '/bg-lienhe.png'}') center center / cover no-repeat`,
              pointerEvents: 'none',
              zIndex: 1
            }}
          />
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2, padding: '40px 20px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0B5077', textTransform: 'uppercase', marginBottom: '40px', lineHeight: '1.4', whiteSpace: 'pre-wrap' }}>
              {contactTitle || 'QUAN TÂM VÀ HỢP TÁC\nVỚI CÁC CHƯƠNG TRÌNH HOẠT ĐỘNG\nCỦA CLB DOANH NHÂN ĐỒNG THÁP TẠI TP.HCM'}
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '40px', flexWrap: 'wrap' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                backgroundColor: '#ffffff',
                padding: '12px 28px',
                borderRadius: '9999px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                <img src={contactEmailIcon || '/mail.svg'} alt="Email" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                <div style={{ width: '1px', height: '20px', backgroundColor: '#e2e8f0' }} />
                <span style={{ fontSize: '1.05rem', fontWeight: '600', color: '#0B5077' }}>{contactEmailText || 'info@dte.hunghau.vn'}</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                backgroundColor: '#ffffff',
                padding: '12px 28px',
                borderRadius: '9999px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                <img src={contactPhoneIcon || '/phone.svg'} alt="Phone" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                <div style={{ width: '1px', height: '20px', backgroundColor: '#e2e8f0' }} />
                <span style={{ fontSize: '1.05rem', fontWeight: '600', color: '#0B5077' }}>{contactPhoneText || '1800 1568'}</span>
              </div>
            </div>
            <a href={contactButtonUrl || '#'} style={{
              display: 'inline-block',
              padding: '16px 48px',
              backgroundColor: '#0B5077',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '9999px',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              boxShadow: '0 10px 20px rgba(11, 80, 119, 0.2)',
              transition: 'all 0.3s ease'
            }}
              className="cta-register-btn"
            >
              {contactButtonText || 'Đăng ký hội viên'}
            </a>
          </div>
          {background.type === 'image' && (
            <div className="contact-bottom-mask" style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '45px',
              backgroundColor: background.color || '#f5e0f8',
              zIndex: 1,
              pointerEvents: 'none'
            }} />
          )}
        </>
      )}

      {variant === 'footer' && (
        <AdminFooter
          footerLogoUrl={footerLogoUrl}
          footerClubName={footerClubName}
          footerAddress={footerAddress}
          footerEmail={footerEmail}
          footerPhone={footerPhone}
          footerMainLinks={footerMainLinks}
          footerOtherLinks={footerOtherLinks}
          footerSocialLinks={footerSocialLinks}
          footerCopyright={footerCopyright}
          footerVectorImage={footerVectorImage}
          footerVectorRightImage={footerVectorRightImage}
          footerEffectRightImage={footerEffectRightImage}
        />
      )}

      {variant === 'default' && (
        <div style={{ maxWidth: containerMap[container] || '1280px', margin: '0 auto' }}>
          {children}
        </div>
      )}
    </section>
  );
};
export default AdminSection;

// ==========================================
// AdminHeader (Moved from admin-header.jsx)
// ==========================================
export const AdminHeader = memo(({ logoUrl, clubName, subName, links = [], showLanguageToggle, scrolledBgColor, headerStyle = 'transparent' }) => {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    // Tìm container cuộn thực sự (trong Puck iframe, có thể là một div wrapper)
    const getScrollParent = (el) => {
      if (!el) return null;
      let parent = el.parentElement;
      while (parent) {
        const style = getComputedStyle(parent);
        if (/(auto|scroll)/.test(style.overflow + style.overflowY)) {
          return parent;
        }
        parent = parent.parentElement;
      }
      return null;
    };

    const scrollParent = getScrollParent(headerRef.current);

    const handleScroll = () => {
      let scrollTop = 0;
      if (scrollParent) {
        scrollTop = scrollParent.scrollTop;
      } else {
        scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      }
      setScrolled(scrollTop > 20);
    };

    const target = scrollParent || window;
    target.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      target.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {headerStyle === 'solid' && <div style={{ height: '80px', width: '100%' }} />}
      <header ref={headerRef} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        transition: 'all 0.4s ease',
        background: scrolled
          ? (scrolledBgColor || '#234988')
          : (headerStyle === 'solid' ? (scrolledBgColor || '#234988') : 'linear-gradient(180deg, rgba(11, 53, 91, 0.45) 0%, rgba(11, 53, 91, 0.08) 100%)'),
        boxShadow: scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
        zIndex: 50,
        color: '#ffffff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {logoUrl && <img src={logoUrl} alt="Logo" style={{ height: '50px', objectFit: 'contain' }} />}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.1rem', textTransform: 'uppercase', textShadow: scrolled ? 'none' : '0 1px 2px rgba(0,0,0,0.3)' }}>{clubName}</span>
            <span style={{ fontSize: '0.8rem', opacity: 0.9, textShadow: scrolled ? 'none' : '0 1px 2px rgba(0,0,0,0.3)' }}>{subName}</span>
          </div>
        </div>

        <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          {links.map((link, idx) => (
            <a key={idx} href={link.url || '#'} style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: link.active ? 'bold' : '500',
              borderBottom: link.active ? '2px solid #fff' : '2px solid transparent',
              paddingBottom: '5px',
              cursor: 'pointer',
              textShadow: scrolled ? 'none' : '0 1px 2px rgba(0,0,0,0.3)'
            }}>
              {link.label}
            </a>
          ))}

          {showLanguageToggle && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#facc15',
              borderRadius: '20px',
              padding: '4px',
              color: '#1e3a8a',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: scrolled ? 'none' : '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              <div style={{ backgroundColor: '#1e3a8a', color: '#facc15', borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>VN</div>
              <div style={{ padding: '0 10px 0 6px' }}>EN</div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
});

// ==========================================
// AdminPartners (Moved from admin-partners.jsx)
// ==========================================
export const AdminPartners = memo(({ title, titleColor, background, logos = [] }) => {
  const bgStyle = {};
  if (background?.type === 'color') bgStyle.backgroundColor = background.color || 'transparent';
  if (background?.type === 'image' && background.imageUrl) {
    bgStyle.backgroundImage = `url(${background.imageUrl})`;
    bgStyle.backgroundSize = 'cover';
    bgStyle.backgroundPosition = 'center';
  }
  if (background?.type === 'gradient') {
    bgStyle.background = background.gradient || 'linear-gradient(to bottom, #dbeafe, #bfdbfe)';
    if (bgStyle.background.includes('url')) {
      bgStyle.backgroundSize = 'cover, cover';
      bgStyle.backgroundPosition = 'center, center';
      bgStyle.backgroundRepeat = 'no-repeat, no-repeat';
      bgStyle.backgroundBlendMode = 'screen';
    }
  }

  const displayLogos = useMemo(() => {
    if (!logos.length) return [];
    return [...logos, ...logos];
  }, [logos]);

  return (
    <section
      className="sponsor-bar"
      style={{ ...bgStyle, width: '100%', boxSizing: 'border-box' }}
    >
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {title && (
          <h2 className="sponsor-title" style={{ color: titleColor }}>
            {title}
          </h2>
        )}

        <div className="logo-marquee-container" style={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          padding: '20px 0',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}>
          <div className="logo-marquee" style={{ display: 'flex', gap: '30px' }}>
            {displayLogos.map((logo, idx) => (
              <div key={idx} className="logo-item" style={{
                flexShrink: 0,
                width: '180px',
                height: '100px',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                cursor: 'pointer'
              }}>
                {logo.imageUrl ? (
                  <img src={logo.imageUrl} alt={logo.name || 'Logo'} loading="lazy" decoding="async" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                ) : (
                  <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{logo.name || 'Logo'}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export const AdminFooter = ({ footerLogoUrl, footerClubName, footerAddress, footerEmail, footerPhone, footerMainLinks, footerOtherLinks, footerCopyright, footerSocialLinks, footerVectorImage, footerVectorRightImage, footerEffectRightImage }) => (
  <footer className="footer-section">
    {footerVectorImage && <img src={footerVectorImage} alt="" className="footer-vector" loading="lazy" decoding="async" />}
    {(footerVectorRightImage || footerEffectRightImage) && (
      <div className="footer-mountain-group">
        {footerEffectRightImage && <img src={footerEffectRightImage} alt="" className="footer-effect-right" loading="lazy" decoding="async" />}
        {footerVectorRightImage && <img src={footerVectorRightImage} alt="" className="footer-vector-right" loading="lazy" decoding="async" />}
      </div>
    )}
    <div className="footer-content">
      <div className="footer-grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
            {footerLogoUrl && <img src={footerLogoUrl} alt="Logo" style={{ height: '60px', objectFit: 'contain' }} />}
            <span style={{ fontWeight: 'bold', fontSize: '0.95rem', textTransform: 'uppercase', maxWidth: '250px', whiteSpace: 'pre-wrap' }}>{footerClubName}</span>
          </div>
          <div style={{ fontWeight: '700', marginBottom: '16px', fontSize: '0.95rem' }}>TRỤ SỞ CHÍNH</div>
          <div className="footer-contact-item">
            <img src="/map.svg" alt="Address" />
            <span>{footerAddress}</span>
          </div>
          <div className="footer-contact-item">
            <img src="/mail.svg" alt="Email" />
            <span>Email: {footerEmail}</span>
          </div>
          <div className="footer-contact-item">
            <img src="/phone.svg" alt="Phone" />
            <span>Hotline: {footerPhone}</span>
          </div>
        </div>
        <div>
          <h4 className="footer-col-title">Liên kết trang</h4>
          {footerMainLinks && footerMainLinks.map((link, index) => (
            <a key={index} href={link.url || '#'} className="footer-link">{link.label}</a>
          ))}
        </div>
        <div>
          <h4 className="footer-col-title">Khác</h4>
          {footerOtherLinks && footerOtherLinks.map((link, index) => (
            <a key={index} href={link.url || '#'} className="footer-link">{link.label}</a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <div>{footerCopyright}</div>
        <div className="social-icons">
          {footerSocialLinks && footerSocialLinks.map((social, index) => (
            <a key={index} href={social.url || '#'} className="social-icon">
              <img src={social.icon} alt="Social" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);


