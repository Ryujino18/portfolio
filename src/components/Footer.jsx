import React from 'react';
import { Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-paper rounded-t-[4rem] pt-24 pb-12 px-8 md:px-16 mt-[-4rem] relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

        {/* Brand */}
        <div className="md:col-span-2">
          <h2 className="font-sans font-bold text-3xl mb-2">CHIRAG VADRALI</h2>
          <p className="font-mono text-sm text-paper/60 max-w-sm mb-6">
            Hardware System Design Engineer.
          </p>
          <div className="inline-flex items-center gap-2 bg-paper/10 px-4 py-2 rounded-full border border-paper/20">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
            <span className="font-mono text-xs text-paper/80">System Operational</span>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-mono text-signal font-bold mb-6 text-sm">NAVIGATION</h4>
          <ul className="space-y-4 font-sans text-paper/80">
            <li><a href="#projects" className="hover:text-signal transition-colors duration-300">Projects</a></li>
            <li><a href="#philosophy" className="hover:text-signal transition-colors duration-300">Philosophy</a></li>
            <li><a href="#protocol" className="hover:text-signal transition-colors duration-300">Workflow</a></li>
            <li><a href="#contact" className="hover:text-signal transition-colors duration-300">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-mono text-signal font-bold mb-6 text-sm">CONTACT</h4>
          <ul className="space-y-5 text-paper/70 text-sm">
            <li>
              <a
                href="https://mail.google.com/mail/?view=cm&to=chiragsv18@gmail.com&su=Hello+Chirag"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-signal transition-colors duration-300 font-mono text-xs break-all"
              >
                <Mail size={13} className="shrink-0 text-signal" />
                chiragsv18@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/918660412454"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-signal transition-colors duration-300 font-mono text-xs"
              >
                <Phone size={13} className="shrink-0 text-signal" />
                +91 8660412454
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-paper/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-mono text-xs text-paper/40">
          &copy; {new Date().getFullYear()} Chirag Vadrali. All rights reserved.
        </div>
        <div className="font-mono text-xs text-paper/40">
          BUILT WITH PRECISION.
        </div>
      </div>
    </footer>
  );
}
