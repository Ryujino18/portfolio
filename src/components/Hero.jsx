import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.2
      });
      gsap.from(".hero-cta", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.8
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) setScrolled(true);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden flex items-end pb-24 px-8 md:px-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
          alt="Hardware PCB Close up"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start text-paper">
        <div className="overflow-hidden">
          <h1 className="hero-text font-sans font-bold text-3xl md:text-5xl uppercase tracking-wider mb-2">
            Engineering the
          </h1>
        </div>
        <div className="overflow-hidden mb-8">
          <h2 className="hero-text font-serif italic text-6xl md:text-8xl lg:text-[10rem] leading-none text-paper">
            Hardware System.
          </h2>
        </div>

        <div className="hero-text font-mono text-paper/80 max-w-xl mb-10 text-sm md:text-base">
          Chirag Vadrali — Hardware System Design Engineer.
        </div>

        <a href="#projects" className="hero-cta btn-primary group bg-signal text-paper px-10 py-5">
          <span className="btn-primary-bg bg-white"></span>
          <span className="btn-primary-text group-hover:text-signal transition-colors duration-300">Explore Systems</span>
        </a>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-all duration-700 pointer-events-none"
        style={{ opacity: scrolled ? 0 : 1, transform: `translateX(-50%) translateY(${scrolled ? '12px' : '0'})` }}
      >
        <span className="font-mono text-[9px] text-paper/50 tracking-[0.25em] uppercase">Scroll</span>
        <div
          className="w-6 h-10 rounded-full border border-paper/30 flex items-start justify-center pt-2"
        >
          <div
            className="w-1 h-2 rounded-full bg-paper/60"
            style={{ animation: 'scroll-dot 1.6s cubic-bezier(0.65,0,0.35,1) infinite' }}
          />
        </div>
        <style>{`
          @keyframes scroll-dot {
            0%   { transform: translateY(0);   opacity: 1; }
            70%  { transform: translateY(14px); opacity: 0; }
            71%  { transform: translateY(0);   opacity: 0; }
            100% { transform: translateY(0);   opacity: 1; }
          }
        `}</style>
      </div>
    </section>
  );
}
