import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PenTool, Hammer, TestTube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const RotatingGeometry = () => (
  <div className="relative w-64 h-64 flex items-center justify-center">
    <div className="absolute inset-0 border border-signal rounded-full animate-[spin_10s_linear_infinite] opacity-50"></div>
    <div className="absolute w-48 h-48 border border-paper rotate-45 animate-[spin_15s_linear_infinite_reverse] opacity-50"></div>
    <PenTool size={48} className="text-signal" />
  </div>
);

const ScanningLine = () => (
  <div className="relative w-64 h-64 bg-black border border-paper/20 rounded-xl overflow-hidden flex items-center justify-center">
    <div className="absolute top-0 left-0 w-full h-1 bg-signal shadow-[0_0_15px_#E63B2E] animate-[ping_2s_ease-in-out_infinite]" style={{ animation: 'scan 3s ease-in-out infinite' }}></div>
    <Hammer size={48} className="text-paper/50" />
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes scan {
        0% { transform: translateY(0); }
        50% { transform: translateY(256px); }
        100% { transform: translateY(0); }
      }
    `}} />
  </div>
);

const Waveform = () => (
  <div className="relative w-64 h-32 flex items-center justify-between gap-1">
    {[...Array(20)].map((_, i) => (
      <div 
        key={i} 
        className="w-2 bg-signal rounded-full"
        style={{ 
          height: '20%',
          animation: `pulse-wave 1s ease-in-out infinite alternate`,
          animationDelay: `${i * 0.1}s`
        }}
      ></div>
    ))}
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes pulse-wave {
        0% { height: 20%; opacity: 0.3; }
        100% { height: 100%; opacity: 1; }
      }
    `}} />
  </div>
);

export default function Protocol() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          gsap.to(card, {
            scrollTrigger: {
              trigger: card,
              start: "top top",
              endTrigger: cards[i + 1],
              end: "top top",
              scrub: true,
              pin: true,
              pinSpacing: false
            },
            scale: 0.9,
            opacity: 0.5,
            filter: "blur(20px)",
            ease: "none"
          });
        } else {
          // Last card just pins for a bit to show
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            end: "+=100%",
            pin: true
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" ref={containerRef} className="bg-paper relative">
      <div className="sticky top-0 h-0 z-10 pt-24 px-8 md:px-16 pointer-events-none">
        <h2 className="font-sans font-bold text-4xl mb-4 text-black">Engineering Workflow</h2>
      </div>

      <div className="protocol-card h-screen w-full flex items-center justify-center p-8 bg-paper relative z-[1]">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="font-mono text-signal font-bold mb-4">PHASE 01</div>
            <h3 className="font-serif italic text-5xl md:text-7xl mb-6">Design</h3>
            <p className="font-mono text-black/70 text-lg">Schematics, architecture, and structural foundations. Mapping the logic before laying the copper.</p>
          </div>
          <div className="flex justify-center">
            <RotatingGeometry />
          </div>
        </div>
      </div>

      <div className="protocol-card h-screen w-full flex items-center justify-center p-8 bg-[#DCD8D2] relative z-[2] shadow-2xl rounded-t-[3rem]">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="font-mono text-signal font-bold mb-4">PHASE 02</div>
            <h3 className="font-serif italic text-5xl md:text-7xl mb-6">Build</h3>
            <p className="font-mono text-black/70 text-lg">PCB routing, component placement, and firmware integration. Translating theory into tangible hardware.</p>
          </div>
          <div className="flex justify-center">
            <ScanningLine />
          </div>
        </div>
      </div>

      <div className="protocol-card h-screen w-full flex items-center justify-center p-8 bg-black text-paper relative z-[3] shadow-2xl rounded-t-[3rem]">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="font-mono text-signal font-bold mb-4">PHASE 03</div>
            <h3 className="font-serif italic text-5xl md:text-7xl mb-6">Validate</h3>
            <p className="font-mono text-paper/70 text-lg">Debugging, optimization, and real-world stress testing. Ensuring the system operates reliably under all conditions.</p>
          </div>
          <div className="flex justify-center">
            <Waveform />
          </div>
        </div>
      </div>
    </section>
  );
}
