import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import Engage from './components/Engage';
import Footer from './components/Footer';

/* ── Cursor ambient aura ── */
function CursorAura() {
  const auraRef = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const target = useRef({ x: -200, y: -200 });
  const rafRef = useRef(null);
  const clickRef = useRef(false);

  useEffect(() => {
    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    const onDown = () => { clickRef.current = true; };
    const onUp   = () => { clickRef.current = false; };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    window.addEventListener('mouseup',   onUp,   { passive: true });

    const tick = () => {
      // Lerp towards target (smooth lag)
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;

      if (auraRef.current) {
        const size = clickRef.current ? 360 : 280;
        auraRef.current.style.transform =
          `translate(${pos.current.x - size / 2}px, ${pos.current.y - size / 2}px)`;
        auraRef.current.style.width  = `${size}px`;
        auraRef.current.style.height = `${size}px`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={auraRef}
      className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
      style={{
        width: '280px',
        height: '280px',
        background: 'radial-gradient(circle, rgba(230,59,46,0.07) 0%, rgba(230,59,46,0.02) 50%, transparent 70%)',
        transition: 'width 0.4s cubic-bezier(0.25,0.46,0.45,0.94), height 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
        willChange: 'transform',
        mixBlendMode: 'screen',
      }}
    />
  );
}

function App() {
  return (
    <>
      <div className="noise-overlay" />
      <CursorAura />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Philosophy />
        <Protocol />
        <Engage />
      </main>
      <Footer />
    </>
  );
}

export default App;
