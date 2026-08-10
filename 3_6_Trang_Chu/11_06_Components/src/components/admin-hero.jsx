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
      return {
        backgroundImage:    `url('${bg.imageUrl}')`,
        backgroundSize:     'cover',
        backgroundPosition: 'center',
        backgroundRepeat:   'no-repeat',
      };
    }
    return { backgroundColor: bg.color || '#ffffff' };
  };

  return (
    <section
      style={{
        position:  'relative',
        padding:   `${layout.paddingY || 80}px ${layout.paddingX || 40}px`,
        overflow:  'hidden',
        minHeight: layout.minHeight || '400px',
        ...getBackgroundStyle(),
      }}
    >
      {/* Wrapper căn vị trí card */}
      <div style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', display: 'flex', ...cardPositionStyle }}>

        {/* Card cụm nội dung */}
        <div style={{
          borderRadius,
          overflow:            'hidden',
          backgroundColor:     'rgba(255,255,255,0.15)',
          backdropFilter:      'blur(12px)',
          WebkitBackdropFilter:'blur(12px)',
          padding:             '48px',
          maxWidth:            '560px',
          width:               '100%',
          textAlign,
          boxSizing:           'border-box',
        }}>

          {/* Chữ trên cùng */}
          {label && (
            <p style={{
              color:          labelColor,
              fontSize:       labelSize,
              fontWeight:     600,
              letterSpacing:  '0.12em',
              textTransform:  'uppercase',
              marginBottom:   '8px',
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
              marginBottom: '12px',
              lineHeight:   1.2,
              margin:       '0 0 12px 0',
            }}>
              {title}
            </h1>
          )}

          {/* Mô tả */}
          {subtitle && (
            <p style={{
              color:        subtitleColor,
              fontSize:     subtitleSize,
              marginBottom: '28px',
              lineHeight:   1.6,
              margin:       '0 0 28px 0',
            }}>
              {subtitle}
            </p>
          )}

          {/* Danh sách nút */}
          {buttons.length > 0 && (
            <div style={{
              display:        'flex',
              flexWrap:       'wrap',
              gap:            '12px',
              marginTop:      '24px',
              justifyContent:
                textAlign === 'center' ? 'center' :
                textAlign === 'right'  ? 'flex-end' : 'flex-start',
            }}>
              {buttons.map((btn, idx) => (
                <a
                  key={idx}
                  href={btn.url || '#'}
                  style={{
                    display:         'inline-flex',
                    alignItems:      'center',
                    gap:             '8px',
                    padding:         `${btn.paddingY || 10}px ${btn.paddingX || 24}px`,
                    borderRadius:    btn.borderRadius || '8px',
                    backgroundColor: btn.bgColor   || '#2563eb',
                    color:           btn.textColor || '#ffffff',
                    fontSize:        btn.fontSize  || '0.95rem',
                    fontWeight:      600,
                    textDecoration:  'none',
                    border:          btn.borderColor
                                       ? `2px solid ${btn.borderColor}`
                                       : '2px solid transparent',
                    cursor:          'pointer',
                    transition:      'opacity 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
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