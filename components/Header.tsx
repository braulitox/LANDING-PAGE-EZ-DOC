import React, { useState, useEffect } from 'react';

const EzDocLogo: React.FC = () => (
  <svg height="64" viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg" className="mb-4" aria-label="EZ DOC Logo">
    <g transform="translate(0,-2)">
        {/* Magnifying glass */}
        <g strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Circle. */}
            <circle cx="20" cy="20" r="16" stroke="white" strokeWidth="4"/>
            {/* Handle */}
            <line x1="32" y1="32" x2="42" y2="42" stroke="white" strokeWidth="4.5"/>
        </g>
        {/* House icon */}
        <path d="M15 26v-6h10v6z M12 19l8-6 8 6z" fill="#00cc66"/>
    </g>
    <text x="50" y="29" fontFamily="sans-serif" fontSize="24" fontWeight="bold" fill="white">
      EZ DOC
    </text>
  </svg>
);

const StickyEzDocLogo: React.FC = () => (
    <svg height="32" viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg" aria-label="EZ DOC Logo">
        <g transform="translate(0,-2)">
            <g strokeLinecap="round" strokeLinejoin="round" fill="none">
                <circle cx="20" cy="20" r="16" stroke="#0056b3" strokeWidth="4"/>
                <line x1="32" y1="32" x2="42" y2="42" stroke="#0056b3" strokeWidth="4.5"/>
            </g>
            <path d="M15 26v-6h10v6z M12 19l8-6 8 6z" fill="#00cc66"/>
        </g>
        <text x="50" y="29" fontFamily="sans-serif" fontSize="24" fontWeight="bold" fill="#0056b3">
          EZ DOC
        </text>
    </svg>
);


const WhatsAppIcon: React.FC = () => (
    <svg
      className="w-6 h-6 mr-3"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2 22L7.32 20.61C8.75 21.39 10.36 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 9.27 20.92 6.8 19.17 4.96C17.42 3.12 14.86 2 12.04 2ZM12.04 20.13C10.56 20.13 9.12 19.74 7.84 19L7.4 18.76L4.53 19.53L5.3 16.75L5.04 16.3C4.24 14.95 3.82 13.41 3.82 11.91C3.82 7.37 7.5 3.69 12.04 3.69C14.28 3.69 16.3 4.54 17.84 6.08C19.38 7.62 20.26 9.64 20.26 11.91C20.26 16.45 16.58 20.13 12.04 20.13ZM16.56 14.45C16.32 14.33 15.11 13.75 14.89 13.67C14.67 13.59 14.52 13.55 14.36 13.79C14.2 14.03 13.76 14.55 13.6 14.71C13.44 14.87 13.28 14.89 13.04 14.77C12.8 14.65 11.99 14.39 11.02 13.54C10.25 12.87 9.77 12.04 9.61 11.76C9.45 11.48 9.58 11.36 9.7 11.24C9.81 11.13 9.96 10.95 10.12 10.79C10.28 10.63 10.32 10.51 10.44 10.27C10.56 10.03 10.52 9.87 10.44 9.75C10.36 9.63 10.04 8.83 9.88 8.43C9.72 8.03 9.56 8.1 9.44 8.1C9.32 8.1 9.16 8.1 9 8.1C8.84 8.1 8.6 8.14 8.4 8.38C8.2 8.62 7.68 9.1 7.68 10.2C7.68 11.3 8.44 12.32 8.56 12.48C8.68 12.64 10.03 14.82 12.18 15.7C12.75 15.96 13.18 16.1 13.51 16.2C13.98 16.34 14.37 16.3 14.65 16.22C14.97 16.12 15.99 15.53 16.23 14.91C16.47 14.3 16.47 13.81 16.4 13.71C16.32 13.61 16.16 13.55 16.04 13.51C15.92 13.47 15.76 13.43 15.64 13.39C15.52 13.35 15.36 13.31 15.24 13.27L16.56 14.45Z" />
    </svg>
);

const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const heroImageUrl = "https://picsum.photos/seed/realestate/1200/900";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
        setIsMobileMenuOpen(false); // Close mobile menu when scrolling to top
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#benefits', text: 'Beneficios' },
    { href: '#how-it-works', text: '¿Cómo Funciona?' },
    { href: '#pricing', text: 'Precios' },
    { href: '#about-us', text: 'Nosotros' },
    { href: '#contact-us', text: 'Contacto' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };


  return (
    <>
      <header className="relative w-full max-h-[600px] overflow-hidden bg-[#0056b3]">
        <div className="container mx-auto px-6 lg:px-8 h-full">
          <div className="grid md:grid-cols-2 items-center h-full max-h-[600px]">
            {/* Left Column: Text Content */}
            <div className="text-white z-10 py-12 md:py-16">
              <EzDocLogo />
              <h1 className="text-lg font-semibold uppercase tracking-wider text-green-300 mb-2">
                Análisis de Riesgo y Dictamen Legal Inmobiliario
              </h1>
              <p className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-shadow">
                Garantía de Cero Riesgo en tu Inversión Inmobiliaria
              </p>
              <p className="text-lg md:text-xl mb-8 text-white">
                Analizamos la partida registral de tu futura propiedad y te entregamos un dictamen legal completo en un plazo de hasta 24 horas. Invierte con total seguridad.
              </p>
              <a
                href="https://wa.me/51970696676?text=Hola,%20quisiera%20iniciar%20un%20análisis%20de%20riesgo%20inmobiliario."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#00cc66] text-gray-900 font-bold text-lg py-4 px-8 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300"
              >
                <WhatsAppIcon />
                <span>¡INICIAR ANÁLISIS!</span>
                <span className="sr-only">(se abre en una nueva pestaña)</span>
              </a>
            </div>

            {/* Right Column: Image */}
            <div className="hidden md:block absolute top-0 right-0 h-full w-1/2">
              <img 
                src={heroImageUrl} 
                alt="Inversión inmobiliaria segura" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0056b3] to-transparent"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Navigation */}
      <nav 
          aria-label="Navegación principal"
          className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${isSticky ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}
      >
          <div className="bg-white/90 backdrop-blur-sm shadow-md">
              <div className="container mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
                  {/* Logo */}
                  <a href="#" className="flex-shrink-0" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
                      <StickyEzDocLogo />
                      <span className="sr-only">EZ DOC - Volver al inicio</span>
                  </a>

                  {/* Desktop Navigation */}
                  <div className="hidden lg:flex items-center space-x-6">
                      {navLinks.map(link => (
                          <a 
                            key={link.href} 
                            href={link.href} 
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-gray-700 hover:text-[#0056b3] font-medium transition-colors text-sm cursor-pointer"
                          >
                            {link.text}
                          </a>
                      ))}
                  </div>

                  {/* Desktop CTA */}
                  <a 
                      href="https://wa.me/51970696676?text=Hola,%20quisiera%20iniciar%20un%20análisis%20de%20riesgo%20inmobiliario."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden lg:inline-flex items-center bg-[#00cc66] text-gray-900 font-bold py-2 px-5 rounded-lg shadow-md transition-transform transform hover:scale-105"
                  >
                      ¡Iniciar Análisis!
                  </a>

                  {/* Mobile Menu Button */}
                  <div className="lg:hidden">
                      <button
                          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                          className="text-gray-800 hover:text-[#0056b3] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0056b3] p-2 rounded-md"
                          aria-expanded={isMobileMenuOpen}
                          aria-controls="mobile-menu"
                      >
                          <span className="sr-only">Abrir menú principal</span>
                          {isMobileMenuOpen ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                          ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                              </svg>
                          )}
                      </button>
                  </div>
              </div>
          </div>

          {/* Mobile Menu Panel */}
          {isMobileMenuOpen && (
              <div id="mobile-menu" className="lg:hidden bg-white shadow-lg">
                  <div className="px-4 pt-2 pb-4 space-y-1">
                      {navLinks.map(link => (
                          <a 
                              key={link.href} 
                              href={link.href} 
                              onClick={(e) => handleNavClick(e, link.href)}
                              className="text-gray-700 hover:bg-gray-100 hover:text-[#0056b3] block px-3 py-2 rounded-md text-base font-medium"
                          >
                              {link.text}
                          </a>
                      ))}
                      <a 
                          href="https://wa.me/51970696676?text=Hola,%20quisiera%20iniciar%20un%20análisis%20de%20riesgo%20inmobiliario."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#00cc66] text-gray-900 block w-auto text-center mt-4 mx-3 py-3 px-4 rounded-md text-base font-bold shadow-md"
                      >
                          ¡Iniciar Análisis!
                      </a>
                  </div>
              </div>
          )}
      </nav>
    </>
  );
};

export default Header;