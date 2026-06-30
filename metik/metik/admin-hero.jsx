import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Hero component — banner với slider
const AdminHero = ({ title, subtitle, buttons = [], background = {}, layout = {} }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const alignClass = layout.align === 'left' ? 'text-left' : layout.align === 'right' ? 'text-right' : 'text-center';
  const alignFlex = layout.align === 'left' ? 'justify-start' : layout.align === 'right' ? 'justify-end' : 'justify-center';
  const alignItems = layout.align === 'left' ? 'items-start' : layout.align === 'right' ? 'items-end' : 'items-center';

  const getBackgroundStyle = () => {
    const bg = background || {};
    if (bg.type === 'gradient') {
      return { background: `linear-gradient(${bg.gradientDirection || 'to bottom right'}, ${bg.gradientFrom || '#667eea'}, ${bg.gradientTo || '#764ba2'})` };
    }
    if (bg.type === 'color') {
      return { backgroundColor: bg.color || '#ffffff' };
    }
    return {};
  };

  const getButtonClass = (style) => {
    const base = 'inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all';
    switch (style) {
      case 'primary': return `${base} bg-blue-600 text-white hover:bg-blue-700`;
      case 'outline': return `${base} border-2 border-white text-white hover:bg-white hover:text-gray-900`;
      default: return `${base} bg-gray-200 text-gray-800 hover:bg-gray-300`;
    }
  };

  const images = background?.images || [];
  if (background?.imageUrl && images.length === 0) {
    images.push({ imageUrl: background.imageUrl }); // backward compatibility
  }

  const hasContent = title || subtitle || (buttons && buttons.length > 0);
  const isSlider = background?.type === 'image' && images.length > 0;

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative overflow-hidden w-full flex flex-col items-center justify-center group" style={getBackgroundStyle()}>
      {isSlider && (
        <div className="absolute inset-0 w-full h-full">
          {images.map((img, idx) => (
             <div 
               key={idx}
               className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
             >
                 <img 
                   src={img.imageUrl} 
                   alt={`Slide ${idx + 1}`} 
                   className={hasContent ? "absolute inset-0 w-full h-full object-cover z-0" : "w-full h-auto object-cover"} 
                 />
             </div>
          ))}
          
          {/* Navigation Arrows & Dots */}
          {images.length > 1 && (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                onPointerDown={(e) => { e.stopPropagation(); }}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/95 shadow-lg hover:scale-110 hover:bg-white transition-all cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft size={32} className="text-orange-500 -ml-1" strokeWidth={2.5} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                onPointerDown={(e) => { e.stopPropagation(); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/95 shadow-lg hover:scale-110 hover:bg-white transition-all cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight size={32} className="text-orange-500 -mr-1" strokeWidth={2.5} />
              </button>
              
              {/* Pagination Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setCurrentSlide(idx); }}
                    onPointerDown={(e) => { e.stopPropagation(); }}
                    className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${idx === currentSlide ? 'bg-white scale-110 shadow-sm' : 'bg-transparent border-2 border-white/90'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Since images are absolute, we need to ensure the section has height if there's no content but there are images */}
      {!hasContent && isSlider && (
        <div className="w-full opacity-0 pointer-events-none">
          <img src={images[0]?.imageUrl} alt="Spacer" className="w-full h-auto" />
        </div>
      )}

      {hasContent && (
        <div className={`relative z-30 mx-auto max-w-7xl py-32 px-4 ${alignClass} flex flex-col ${alignItems} w-full`}>
          {title && <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">{title}</h1>}
          {subtitle && <p className="text-lg md:text-xl mb-6 opacity-90 text-white max-w-3xl">{subtitle}</p>}
          {buttons && buttons.length > 0 && (
            <div className={`flex flex-wrap ${alignFlex} gap-4 mb-8`}>
              {buttons.map((btn, idx) => (
                <a key={idx} href={btn.url || '#'} className={getButtonClass(btn.style || 'primary')}>
                  {btn.text}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default AdminHero;
