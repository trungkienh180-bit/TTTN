import React from 'react';

// Hero component — tất cả thuộc tính đều cấu hình được qua props, không hardcode.
const AdminHero = ({
  // Chữ trên cùng (tagline)
  label        = '',
  labelColor   = '#ffffff',
  labelSize    = '12px',
  // Tiêu đề chính
  title        = '',
  titleColor   = '#ffffff',
  titleSize    = '2.5rem',
  // Mô tả
  subtitle      = '',
  subtitleColor = 'rgba(255,255,255,0.85)',
  subtitleSize  = '1rem',
  // Bo góc cụm card
  borderRadius  = '16px',
  // Nút bấm
  buttons       = [],
  // Nền & bố cục
  background    = {},
  layout        = {},
}) => {
  const position = layout.align || 'left';

  const cardPositionStyle = {
    left:   { justifyContent: 'flex-start' },
    center: { justifyContent: 'center'     },
    right:  { justifyContent: 'flex-end'   },
  }[position] || { justifyContent: 'flex-start' };

  const textAlign =
    position === 'center' ? 'center' :
    position === 'right'  ? 'right'  : 'left';

  // ── Nền section ────────────────────────────────────────────────────
  const getBackgroundStyle = () => {
    const bg = background || {};
    if (bg.type === 'gradient') {
      return {
        background: `linear-gradient(${bg.gradientDirection || 'to bottom right'}, ${bg.gradientFrom || '#667eea'}, ${bg.gradientTo || '#764ba2'})`,
      };
    }
    if (bg.type === 'image' && bg.imageUrl) {
      const gradient = `linear-gradient(0deg, #a8dfff 0%, #cdeeff 25%, #66aaff 60%, #3399ff 100%)`;
      return {
        backgroundImage:      `url('${bg.imageUrl}'), ${gradient}`,
        backgroundBlendMode:  'screen',
        backgroundSize:       'cover',
        backgroundPosition:   'center',
        backgroundRepeat:     'no-repeat',
      };
    }
    return { backgroundColor: bg.color || '#ffffff' };
  };

  return (
    <section
      style={{
        position:   'relative',
        height:     '100vh',
        minHeight:  '700px',
        padding:    `80px ${layout.paddingX || 40}px ${layout.paddingY || 120}px ${layout.paddingX || 40}px`, // Adjusted padding-top as in screenshot
        overflow:   'hidden',
        display:    'flex',
        alignItems: 'center',
        boxSizing:  'border-box',
        ...getBackgroundStyle(),
      }}
    >
      {/* Wrapper căn vị trí card */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '1280px', margin: '0 auto', display: 'flex', ...cardPositionStyle }}>

        {/* Card cụm nội dung */}
        <div style={{
          borderRadius:        '24px 120px 24px 24px', // Leaf shape top-right
          overflow:            'hidden',
          background:          'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
          backdropFilter:      'blur(16px)',
          WebkitBackdropFilter:'blur(16px)',
          border:              '1px solid rgba(255,255,255,0.5)',
          boxShadow:           '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
          padding:             '60px 48px',
          maxWidth:            '600px',
          width:               '100%',
          textAlign,
          boxSizing:           'border-box',
          animation:           'fadeInUp 0.8s ease-out forwards',
        }}>
          <style>
            {`
              @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .hero-button {
                transition: all 0.3s ease !important;
              }
              .hero-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 20px rgba(0, 157, 255, 0.4) !important;
                opacity: 1 !important;
              }
            `}
          </style>

          {/* Chữ trên cùng */}
          {label && (
            <p style={{
              color:          labelColor,
              fontSize:       labelSize,
              fontWeight:     700,
              letterSpacing:  '0.15em',
              textTransform:  'uppercase',
              marginBottom:   '12px',
            }}>
              {label}
            </p>
          )}

          {/* Tiêu đề */}
          {title && (
            <h1 style={{
              color:        titleColor,
              fontSize:     titleSize,
              fontWeight:   'bold',
              marginBottom: '16px',
              lineHeight:   1.2,
              margin:       '0 0 16px 0',
              textShadow:   '0 2px 10px rgba(253, 224, 71, 0.3)', // Glow effect for Sen Hồng
            }}>
              {title}
            </h1>
          )}

          {/* Mô tả */}
          {subtitle && (
            <p style={{
              color:        subtitleColor,
              fontSize:     subtitleSize,
              marginBottom: '32px',
              lineHeight:   1.8,
              margin:       '0 0 32px 0',
            }}>
              {subtitle}
            </p>
          )}

          {/* Danh sách nút */}
          {buttons.length > 0 && (
            <div style={{
              display:        'flex',
              flexWrap:       'wrap',
              gap:            '16px',
              marginTop:      '32px',
              justifyContent:
                textAlign === 'center' ? 'center' :
                textAlign === 'right'  ? 'flex-end' : 'flex-start',
            }}>
              {buttons.map((btn, idx) => (
                <a
                  key={idx}
                  href={btn.url || '#'}
                  className="hero-button"
                  style={{
                    display:         'inline-flex',
                    alignItems:      'center',
                    justifyContent:  'center',
                    gap:             '8px',
                    padding:         `${btn.paddingY || 14}px ${btn.paddingX || 32}px`,
                    borderRadius:    btn.borderRadius || '9999px',
                    background:      `linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)`, // Overriding with premium gradient
                    color:           btn.textColor || '#ffffff',
                    fontSize:        btn.fontSize  || '1rem',
                    fontWeight:      600,
                    textDecoration:  'none',
                    border:          'none',
                    cursor:          'pointer',
                    boxShadow:       '0 4px 15px rgba(0, 157, 255, 0.3)',
                  }}
                >
                  {btn.text}
                </a>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default AdminHero;
