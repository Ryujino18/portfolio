import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const containerRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Split text manually for word-by-word animation (simplified without split-text plugin)
      const animateText = (ref) => {
        const words = ref.current.querySelectorAll('.word');
        gsap.from(words, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          },
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out"
        });
      };
      
      animateText(textRef1);
      
      // Delay second sentence slightly
      const words2 = textRef2.current.querySelectorAll('.word');
      gsap.from(words2, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        delay: 0.4,
        ease: "power3.out"
      });

      // Parallax bg
      gsap.to(".philo-bg", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        y: 100,
        ease: "none"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const wrapWords = (text) => {
    return text.split(' ').map((word, idx) => (
      <span key={idx} className="word inline-block mr-[0.3em]">{word}</span>
    ));
  };

  return (
    <section id="philosophy" ref={containerRef} className="relative py-48 px-8 md:px-16 bg-black text-paper overflow-hidden">
      <div className="philo-bg absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center -top-[100px] h-[calc(100%+200px)]"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-12">
        <h2 ref={textRef1} className="font-serif italic text-4xl md:text-6xl lg:text-7xl leading-tight opacity-70">
          {wrapWords("Most engineers focus on: tools and theory.")}
        </h2>
        <h2 ref={textRef2} className="font-serif italic text-4xl md:text-6xl lg:text-7xl leading-tight text-signal">
          {wrapWords("I focus on: building real systems.")}
        </h2>
      </div>
    </section>
  );
}
