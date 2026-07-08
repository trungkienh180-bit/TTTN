import React, { useState, useEffect } from 'react';

export default function AdminHero({ 
  badge, 
  titlePart1,
  titlePart2, 
  titleHighlight, 
  subtitle, 
  buttons = [], 
  rightImage,
  backgroundColor 
}) {
  // Split titlePart1 by newlines to get phrases, or use default if empty
  const phrases = titlePart1 
    ? titlePart1.split('\n').map(s => s.trim()).filter(s => s) 
    : [
        "Giải pháp công nghệ",
        "Cung cấp thiết bị CNTT",
        "Thi công & lắp đặt",
        "Dịch vụ CNTT"
      ];
  
  // Prevent empty array crash
  if (phrases.length === 0) {
    phrases.push(" ");
  }
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(60);

  useEffect(() => {
    let timer;
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setDisplayText(isDeleting 
        ? fullText.substring(0, displayText.length - 1) 
        : fullText.substring(0, displayText.length + 1)
      );

      // Tốc độ gõ 100ms, xóa 60ms
      setTypingSpeed(isDeleting ? 60 : 100);

      if (!isDeleting && displayText === fullText) {
        setTypingSpeed(3000); // Giữ yên 3 giây sau khi gõ xong
        setIsDeleting(true);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); // Nghỉ 0.5s trước câu tiếp theo
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed]);

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      paddingTop: '120px',
      paddingBottom: '80px',
      minHeight: '600px',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: backgroundColor || '#1A6B49',
      backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(0, 255, 170, 0.15) 0%, transparent 60%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <style>{`
        @keyframes blink-cursor {
          50% { opacity: 0; }
        }
        @keyframes bounce-mattress {
          0%, 100% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(-12px);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
      `}</style>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        
        {/* Left Content */}
        <div style={{ flex: '1 1 50%', minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', paddingRight: '40px' }}>
          {badge && (
            <div style={{
              padding: '6px 16px',
              borderRadius: '999px',
              border: '1px solid #FBBF24',
              color: '#FBBF24',
              fontSize: '13px',
              fontWeight: '600',
              letterSpacing: '1px',
              marginBottom: '32px',
              textTransform: 'uppercase',
              display: 'inline-block'
            }}>
              {badge}
            </div>
          )}
          
          <h1 style={{
            fontSize: '56px',
            fontWeight: 'bold',
            color: '#fff',
            lineHeight: '1.2',
            marginBottom: '24px',
            margin: '0 0 24px 0'
          }}>
            <div style={{ 
              marginBottom: '8px', 
              minHeight: '135px', 
              display: 'flex', 
              alignItems: 'flex-end' 
            }}>
              <div style={{ width: '100%' }}>
                <span>{displayText}</span>
                <span style={{
                  display: 'inline-block',
                  width: '4px',
                  height: '48px',
                  backgroundColor: 'white',
                  marginLeft: '6px',
                  verticalAlign: 'text-bottom',
                  animation: 'blink-cursor 0.8s step-end infinite'
                }}></span>
              </div>
            </div>
            <div>
              {titlePart2} <span style={{ color: '#FBBF24' }}>{titleHighlight}</span>
            </div>
          </h1>
          
          {subtitle && (
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '18px',
              maxWidth: '550px',
              marginBottom: '40px',
              lineHeight: '1.6',
              margin: '0 0 40px 0'
            }}>
              {subtitle}
            </p>
          )}

          {buttons && buttons.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
              {buttons.map((btn, idx) => {
                if (btn.style === 'primary') {
                  return (
                    <a key={idx} href={btn.url || '#'} style={{
                      padding: '14px 32px',
                      backgroundColor: '#FBBF24',
                      color: '#fff',
                      fontWeight: '600',
                      borderRadius: '8px',
                      border: '1px solid transparent',
                      textDecoration: 'none',
                      boxShadow: '0 4px 14px 0 rgba(251, 191, 36, 0.39)',
                      display: 'inline-block'
                    }}>
                      {btn.text}
                    </a>
                  );
                }
                return (
                  <a key={idx} href={btn.url || '#'} style={{
                    padding: '14px 32px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.4)',
                    color: '#fff',
                    fontWeight: '600',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    display: 'inline-block'
                  }}>
                    {btn.text}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Graphic */}
        <div style={{ flex: '1 1 50%', minWidth: '300px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
          {rightImage ? (
            <img src={rightImage} alt="Hero Graphic" style={{
              maxWidth: '100%',
              height: 'auto',
              width: '110%',
              objectFit: 'contain',
              transform: 'scale(1.1)',
              filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.2)) hue-rotate(10deg) brightness(1.2)'
            }} />
          ) : (
            <div style={{
              width: '384px',
              height: '384px',
              borderRadius: '50%',
              border: '1px dashed rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.4)'
            }}>
              [Graphic Trái đất]
            </div>
          )}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '0',
        right: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'rgba(255,255,255,0.7)',
        animation: 'bounce-mattress 1.5s infinite'
      }}>
        <span style={{ fontSize: '14px', marginBottom: '8px' }}>Cuộn xuống để khám phá</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '20px', height: '20px' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  );
}
