import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Globe, ExternalLink } from 'lucide-react';
import './Footer.css';
import logoIcon from '@/assets/images/logo-icon.png';

const Footer = () => {
  return (
    <footer className="footer-gray relative overflow-hidden">
      
      {/* Decorative lavender gradient circle */}
      <div 
          className="absolute pointer-events-none z-0"
          style={{
              width: '1400px',
              height: '1400px',
              top: '-600px',
              right: '-400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(5,150,105,0.22) 0%, rgba(5,150,105,0.08) 40%, transparent 70%)',
          }}
      ></div>

      <div className="relative z-10 max-w-[1300px] mx-auto">
        {/* Top Contact Bar */}
        <div className="footer-contact-row-gray">
          <div className="footer-contact-item-gray">
            <Mail size={18} />
            <a href="mailto:support@edu-xservices.com">support@edu-xservices.com</a>
          </div>
          <div className="footer-contact-item-gray">
            <Phone size={18} />
            <a href="tel:+221338483812">+221 33 848 38 12</a>
          </div>
          <div className="footer-contact-item-gray">
            <Globe size={18} />
            <a href="http://www.edu-xservices.com" target="_blank" rel="noopener noreferrer">www.edu-xservices.com</a>
          </div>
          <div className="footer-contact-item-gray">
            <Clock size={18} />
            <span>Mon - Sat: 10:00 AM - 6:00 PM</span>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-6 text-left">
          {/* Col 1: Brand & Tagline */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-3">
              <img src={logoIcon} alt="Education eXcellence Services Logo" className="h-9 w-auto object-contain bg-white/10 p-1 rounded-lg" />
              <div className="flex flex-col">
                <span className="font-extrabold text-[16px] text-white tracking-tight leading-tight">
                  Education eXcellence
                </span>
                <span className="text-[10px] text-[#f4d160] font-bold uppercase tracking-widest">
                  Services
                </span>
              </div>
            </div>
            <p className="text-[#a0a0a0] text-[13.5px] leading-relaxed mb-3">
              Guiding Students. Creating Futures. Changing Lives. Empowering African and international students to access premier global university education.
            </p>
            <div className="flex items-start gap-2 text-[#999] text-[13px]">
              <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
              <span>Av Malick Sy, Dakar Plateau, Dakar Senegal</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h3 className="text-white text-[16px] font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2.5 p-0 m-0 list-none">
              <li>
                <Link to="/" className="text-[#999] hover:text-primary transition-colors text-[14px] no-underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#999] hover:text-primary transition-colors text-[14px] no-underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/study-destinations" className="text-[#999] hover:text-primary transition-colors text-[14px] no-underline">
                  Study Destinations
                </Link>
              </li>
              <li>
                <Link to="/course-finder" className="text-[#999] hover:text-primary transition-colors text-[14px] no-underline">
                  Course Finder
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#999] hover:text-primary transition-colors text-[14px] no-underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Facts */}
          <div>
            <h3 className="text-white text-[16px] font-bold mb-4">Why Choose Us</h3>
            <ul className="space-y-2.5 p-0 m-0 list-none text-[#999] text-[14px]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>189 Partner Universities</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>25 Global Destinations</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>98% Visa Success Rate</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>100% Free Initial Assessment</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Map Location Embed */}
          <div>
            <h3 className="text-white text-[16px] font-bold mb-4">Our Office in Dakar</h3>
            <div className="rounded-xl overflow-hidden border border-white/10 h-[140px] bg-[#1a1a1a]">
              <iframe
                title="Education eXcellence Services Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15437.362142278918!2d-17.447576!3d14.678121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec1724a7378d3eb%3A0x6b4f7a75069279ea!2sAvenue%20Malick%20Sy%2C%20Dakar%2C%20Senegal!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom-gray">
          <p>© 2026 Education eXcellence Services (Edu-X). All Rights Reserved. Guiding Students. Creating Futures. Changing Lives.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
