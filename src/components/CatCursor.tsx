import React, { useEffect, useRef } from 'react';
import { useBirthday } from '../context/BirthdayContext';

export const CatCursor: React.FC = () => {
  const { isCatCursorActive } = useBirthday();
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let isPointer = false;
    let rafId: number;

    // Trail particles pool (10 reusable DOM nodes, zero React state re-renders)
    const trailPoolSize = 10;
    const trails: Array<{ el: HTMLSpanElement; x: number; y: number; alpha: number }> = [];

    const container = trailContainerRef.current;
    if (container) {
      container.innerHTML = '';
      for (let i = 0; i < trailPoolSize; i++) {
        const span = document.createElement('span');
        span.className = 'absolute rounded-full pointer-events-none';
        span.style.width = '4px';
        span.style.height = '4px';
        span.style.backgroundColor = '#fb7185';
        span.style.boxShadow = '0 0 6px #f43f5e';
        span.style.opacity = '0';
        span.style.transform = 'translate(-50%, -50%)';
        span.style.willChange = 'transform, opacity';
        container.appendChild(span);
        trails.push({ el: span, x: -100, y: -100, alpha: 0 });
      }
    }

    let trailIdx = 0;
    let frameCount = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Extremely fast check without getComputedStyle (which causes massive browser layout thrashing)
      const target = e.target as HTMLElement | null;
      if (target) {
        isPointer = !!(
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button, a, label, [role="button"], .cursor-pointer')
        );
      }
    };

    const animate = () => {
      frameCount++;

      // Update cursor position directly on DOM with GPU transform
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0) scale(${isPointer ? 1.25 : 1})`;
      }

      // Add trail point every 2 frames when mouse is moving
      if (frameCount % 2 === 0 && mouseX > 0 && mouseY > 0) {
        const t = trails[trailIdx];
        if (t) {
          t.x = mouseX;
          t.y = mouseY;
          t.alpha = 0.8;
          t.el.style.left = `${t.x}px`;
          t.el.style.top = `${t.y}px`;
          t.el.style.opacity = '0.8';
          trailIdx = (trailIdx + 1) % trailPoolSize;
        }
      }

      // Fade out trail particles
      for (let i = 0; i < trails.length; i++) {
        const t = trails[i];
        if (t.alpha > 0) {
          t.alpha -= 0.04;
          if (t.alpha <= 0) {
            t.alpha = 0;
            t.el.style.opacity = '0';
          } else {
            t.el.style.opacity = t.alpha.toFixed(2);
          }
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isCatCursorActive]);

  if (!isCatCursorActive) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* High-performance trail container */}
      <div ref={trailContainerRef} className="absolute inset-0 pointer-events-none" />

      {/* Hardware-accelerated cat cursor */}
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 pointer-events-none transition-transform duration-75 ease-out"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
          willChange: 'transform',
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_8px_rgba(244,63,94,0.6)]"
        >
          <path
            d="M5 4L8 8C9.2 7.4 10.6 7 12 7C13.4 7 14.8 7.4 16 8L19 4L18.5 9.5C20.1 11.2 21 13.5 21 16C21 19.3 17 22 12 22C7 22 3 19.3 3 16C3 13.5 3.9 11.2 5.5 9.5L5 4Z"
            fill="#180a11"
            stroke="#f43f5e"
            strokeWidth="1.4"
          />
          <path d="M6.5 5.5L8.5 8" stroke="#fda4af" strokeWidth="1" strokeLinecap="round" />
          <path d="M17.5 5.5L15.5 8" stroke="#fda4af" strokeWidth="1" strokeLinecap="round" />
          <circle cx="12" cy="14.5" r="1.3" fill="#fb7185" />
          <line x1="8" y1="14" x2="5" y2="13" stroke="#fecdd3" strokeWidth="0.8" />
          <line x1="8" y1="15.5" x2="5.5" y2="16.5" stroke="#fecdd3" strokeWidth="0.8" />
          <line x1="16" y1="14" x2="19" y2="13" stroke="#fecdd3" strokeWidth="0.8" />
          <line x1="16" y1="15.5" x2="18.5" y2="16.5" stroke="#fecdd3" strokeWidth="0.8" />
        </svg>
      </div>
    </div>
  );
};
