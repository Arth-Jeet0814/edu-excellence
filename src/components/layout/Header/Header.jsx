import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';
import logoIcon from '@/assets/images/logo-icon.png';
import logoFull from '@/assets/images/logo.png';

const Header = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Study Destinations', path: '/study-destinations' },
    { name: 'Course Finder', path: '/course-finder' },
    { name: 'Contact', path: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 80 && !isMobileMenuOpen) {
        setIsVisible(false); // Hide on scroll down
      } else {
        setIsVisible(true); // Show on scroll up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      
      {/* Top Announcement Bar */}
      <div className="w-full bg-primary py-[7px] px-[15px] lg:px-[20px] text-center shadow-sm">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between text-white text-[11px] lg:text-[12.5px] font-medium">
          <p className="m-0 tracking-[0.2px] truncate">
            ✨ <span className="font-bold text-[#f4d160]">Education eXcellence Services</span> — Guiding Students. Creating Futures. Changing Lives.
          </p>
          <a href="tel:+221338483812" className="hidden sm:inline-flex items-center gap-1.5 text-white hover:text-[#f4d160] transition-colors font-semibold ml-4">
            <Phone size={13} />
            <span>+221 33 848 38 12</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#f0eaf2]' : 'bg-white/90 backdrop-blur-sm'}`}>
        <div className="flex items-center justify-between px-[20px] md:px-[50px] py-[14px] max-w-[1400px] mx-auto">
        
          {/* Brand Logo */}
          <div className="flex-none">
            <Link to="/" className="flex items-center gap-3 text-decoration-none group">
              <img 
                src={logoIcon} 
                alt="Education eXcellence Services" 
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105" 
              />
              <div className="flex flex-col">
                <span className="font-sans font-extrabold text-[17px] lg:text-[19px] text-[#0f2444] tracking-tight leading-tight">
                  Education eXcellence
                </span>
                <span className="text-[10px] uppercase font-bold text-primary tracking-widest">
                  Services
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center">
            <ul className="flex items-center gap-[22px] lg:gap-[32px] list-none m-0 p-0">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.path || (item.path === '/about' && location.pathname === '/about-us');
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`text-[14.5px] font-semibold no-underline transition-all duration-200 relative py-1 ${
                        isActive ? 'text-primary font-bold' : 'text-[#444] hover:text-primary'
                      }`}
                    >
                      {item.name}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full"></span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/contact"  
              className={buttonVariants({ 
                variant: "custom", 
                className: "inline-flex items-center gap-2 text-[14px] font-bold text-white no-underline whitespace-nowrap bg-primary hover:bg-primary-hover px-[22px] py-[10px] rounded-[8px] transition-all duration-300 shadow-md hover:shadow-lg h-auto" 
              })}
            >
              Get Free Consultation
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex-none md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2 text-[#161616] hover:text-primary rounded-lg bg-gray-100/80 transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden bg-white/98 backdrop-blur-lg border-b border-gray-100 shadow-xl transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[380px] opacity-100 py-4 px-6' : 'max-h-0 opacity-0 py-0 px-6'
        }`}>
          <nav className="flex flex-col gap-3">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path || (item.path === '/about' && location.pathname === '/about-us');
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-2 text-[15px] font-semibold border-b border-gray-50 transition-colors ${
                    isActive ? 'text-primary font-bold' : 'text-[#333]'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link 
                to="/contact"  
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 text-[14px] font-bold text-white bg-primary hover:bg-primary-hover py-3 rounded-[8px] text-center"
              >
                Get Free Consultation
                <ArrowRight size={16} />
              </Link>
            </div>
          </nav>
        </div>

      </div>
    </header>
  );
};

export default Header;
