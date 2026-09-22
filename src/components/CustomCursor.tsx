import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let currentAuraX = -100;
    let currentAuraY = -100;
    let animId: number;

    const render = () => {
      // Smooth lerp for aura without lag
      currentAuraX += (mouseX - currentAuraX) * 0.22;
      currentAuraY += (mouseY - currentAuraY) * 0.22;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${currentAuraX}px, ${currentAuraY}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest(
        '[data-cursor-text], [data-cursor-hover], button, a, input, textarea, [role="button"]'
      );

      if (interactiveEl) {
        const text = interactiveEl.getAttribute('data-cursor-text') || '';
        setIsHovered(true);
        setCursorText(text);
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Precision center dot */}
      <div
        ref={dotRef}
        style={{ willChange: 'transform' }}
        className={`fixed top-0 left-0 -ml-[3px] -mt-[3px] w-1.5 h-1.5 bg-[#E5C388] rounded-full shadow-[0_0_8px_rgba(229,195,136,0.8)] transition-opacity duration-150 ${
          cursorText ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Trailing aura */}
      <div
        ref={auraRef}
        style={{ willChange: 'transform' }}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full border transition-all duration-200 ${
          cursorText
            ? 'w-20 h-8 -ml-10 -mt-4 bg-[#E5C388]/15 border-[#E5C388]/50 backdrop-blur-xs text-[#FFF5E4] shadow-lg shadow-black/40'
            : isHovered
            ? 'w-10 h-10 -ml-5 -mt-5 border-[#E5C388]/40 bg-[#E5C388]/10'
            : 'w-6 h-6 -ml-3 -mt-3 border-[#E5C388]/20 bg-transparent'
        }`}
      >
        {cursorText && (
          <span className="font-mono-tech text-[9px] tracking-widest font-bold uppercase text-[#FFF5E4]">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
