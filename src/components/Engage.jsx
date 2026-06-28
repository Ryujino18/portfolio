import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Engage() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".engage-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={containerRef} className="py-32 px-8 md:px-16 bg-offwhite">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-sans font-bold text-4xl mb-4">Initialize Connection</h2>
          <p className="font-mono text-black/60 max-w-2xl mx-auto">Engage for project collaboration, hardware design consulting, or to request a full technical resume.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
          {/* Resume Card */}
          <div className="engage-card bg-paper border border-black/10 rounded-[2rem] p-8 text-center flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
            <h3 className="font-sans font-bold text-2xl mb-2">Resume</h3>
            <p className="font-mono text-sm text-black/60 mb-8 flex-grow">Download full technical history and skill inventory.</p>
            <a
              href="/Resume.pdf"
              download="Chirag_Vadrali_Resume.pdf"
              className="px-6 py-3 border-2 border-black rounded-[2rem] font-medium hover:bg-black hover:text-paper transition-colors duration-300 w-full text-center block"
            >
              Download PDF
            </a>
          </div>

          {/* Hire Me (Highlighted) Card */}
          <div className="engage-card bg-black text-paper rounded-[2rem] p-10 text-center flex flex-col items-center shadow-2xl scale-105 relative z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-signal text-paper text-xs font-bold px-4 py-1 rounded-full border-4 border-offwhite">
              OPEN TO OPPORTUNITIES
            </div>
            <h3 className="font-sans font-bold text-3xl mb-4 text-signal">Let's Collaborate</h3>
            <p className="font-mono text-sm text-paper/70 mb-10 flex-grow">Direct engagement for full-time roles or specialized contract work in hardware systems.</p>
            <a href="https://mail.google.com/mail/?view=cm&to=chiragsv18@gmail.com&su=Collaboration+Inquiry" target="_blank" rel="noopener noreferrer" className="btn-primary group bg-signal text-paper px-8 py-4 w-full">
              <span className="btn-primary-bg bg-white"></span>
              <span className="btn-primary-text group-hover:text-signal transition-colors duration-300">Send Email</span>
            </a>
          </div>

          {/* Contact Card */}
          <div className="engage-card bg-paper border border-black/10 rounded-[2rem] p-8 text-center flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
            <h3 className="font-sans font-bold text-2xl mb-2">Connect</h3>
            <p className="font-mono text-sm text-black/60 mb-8 flex-grow">General inquiries, networking, or discussion on embedded systems.</p>
            <a href="https://wa.me/918660412454?text=Hi%20Chirag%2C%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect!" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border-2 border-black rounded-[2rem] font-medium hover:bg-black hover:text-paper transition-colors duration-300 w-full text-center block">
              Send Message
            </a>
          </div>
        </div>
      </div>
    </section >
  );
}
