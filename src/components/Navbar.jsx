import React, { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* At the top: dark pill (hero is a dark image, so we flip to paper text)
     Scrolled:   light frosted pill (standard offwhite sections below) */
  const navBg = scrolled
    ? 'bg-offwhite/85 backdrop-blur-md border border-black/10 shadow-lg'
    : 'bg-black/40 backdrop-blur-sm border border-paper/10';

  const textColor      = scrolled ? 'text-black'        : 'text-paper';
  const linkColor      = scrolled ? 'text-black/70 hover:text-black' : 'text-paper/80 hover:text-paper';
  const brandHover     = scrolled ? 'hover:text-signal' : 'hover:text-signal';
  const ctaBg          = scrolled ? 'bg-black text-paper' : 'bg-paper text-black';
  const ctaSlide       = scrolled ? 'bg-signal'           : 'bg-signal';

  return (
    <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-[2rem] px-6 py-4 flex items-center gap-8 ${navBg}`}>

      {/* Brand → smooth scroll to top */}
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className={`font-sans font-bold tracking-tight text-xl transition-colors duration-300 cursor-pointer select-none ${textColor} ${brandHover}`}
      >
        CHIRAG
      </a>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-6">
        <a href="#projects"   className={`font-mono text-sm transition-all duration-300 hover:-translate-y-[1px] ${linkColor}`}>Projects</a>
        <a href="#philosophy" className={`font-mono text-sm transition-all duration-300 hover:-translate-y-[1px] ${linkColor}`}>Philosophy</a>
        <a href="#protocol"   className={`font-mono text-sm transition-all duration-300 hover:-translate-y-[1px] ${linkColor}`}>Workflow</a>
      </div>

      {/* CTA */}
      <a
        href="#contact"
        className={`relative overflow-hidden inline-flex items-center justify-center px-6 py-2 rounded-[2rem] font-medium text-sm ml-4 group transition-transform duration-300 hover:scale-[1.03] ${ctaBg}`}
      >
        <span className={`absolute inset-0 ${ctaSlide} translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0 rounded-[2rem]`} />
        <span className="relative z-10 group-hover:text-paper transition-colors duration-300">Contact Me</span>
      </a>

    </nav>
  );
}
