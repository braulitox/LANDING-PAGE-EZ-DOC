
import React, { useState } from 'react';

const QuoteIcon: React.FC = () => (
    <svg className="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
    </svg>
);

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  imageUrl: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, role, imageUrl }) => (
    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 flex flex-col h-full mx-2">
        <QuoteIcon />
        <p className="text-gray-600 my-4 flex-grow">"{quote}"</p>
        <div className="flex items-center mt-auto">
            <img className="w-12 h-12 rounded-full mr-4 object-cover" src={imageUrl} alt={name} />
            <div>
                <p className="font-bold text-[#0056b3]">{name}</p>
                <p className="text-sm text-gray-500">{role}</p>
            </div>
        </div>
    </div>
);

const Testimonials: React.FC = () => {
  const testimonialsData: TestimonialCardProps[] = [
    {
      quote: "Como primerizo en la compra de un depa, estaba lleno de dudas. EZ DOC me dio la seguridad que necesitaba con un informe clarísimo. El proceso fue increíblemente rápido y 100% digital. ¡Totalmente recomendado!",
      name: "Carlos Mendoza",
      role: "Comprador de Primera Vivienda",
      imageUrl: "https://i.pravatar.cc/150?img=12"
    },
    {
      quote: "En el mundo de las inversiones inmobiliarias, el tiempo es oro y el riesgo es alto. EZ DOC se ha vuelto mi aliado indispensable. Sus análisis son exhaustivos y me los entregan en menos de 24 horas. Impecable.",
      name: "Sofía Valcárcel",
      role: "Inversionista Inmobiliaria",
      imageUrl: "https://i.pravatar.cc/150?img=32"
    },
    {
      quote: "He recomendado EZ DOC a varios de mis clientes para agilizar el cierre de operaciones. La tranquilidad que les da el dictamen legal no tiene precio. Es un servicio eficiente que aporta un valor inmenso al proceso de compra-venta.",
      name: "Javier Torres",
      role: "Agente Inmobiliario",
      imageUrl: "https://i.pravatar.cc/150?img=60"
    },
    {
      quote: "Como abogada, valoro la precisión y la rapidez. EZ DOC cumple con ambos. Lo uso para verificar propiedades en casos de divorcio y sucesiones. Su servicio es confiable y me permite asesorar mejor a mis clientes.",
      name: "Ana Gomez",
      role: "Abogada de Familia",
      imageUrl: "https://i.pravatar.cc/150?img=35"
    },
    {
      quote: "Quería comprar un local comercial y el análisis de EZ DOC fue clave. Detectaron una anotación de demanda que el vendedor no mencionó. Me salvaron de una muy mala inversión. ¡Servicio 100% recomendado!",
      name: "Marco Rivera",
      role: "Pequeño empresario",
      imageUrl: "https://i.pravatar.cc/150?img=68"
    },
    {
      quote: "El proceso fue transparente y muy profesional. Tenía muchas dudas sobre la titularidad de un terreno familiar y su informe me dio toda la claridad que necesitaba para proceder con la construcción. ¡Gracias EZ DOC!",
      name: "Daniela Paredes",
      role: "Comprando un terreno",
      imageUrl: "https://i.pravatar.cc/150?img=49"
    },
    {
      quote: "Recomiendo EZ DOC a mis clientes que buscan invertir en bienes raíces. Es una herramienta de bajo costo que mitiga un riesgo enorme. La diligencia debida es fundamental y ellos la hacen fácil y accesible para todos.",
      name: "Ricardo Solis",
      role: "Consultor Financiero",
      imageUrl: "https://i.pravatar.cc/150?img=53"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? testimonialsData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === testimonialsData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };


  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-gray-900">Lo que dicen nuestros clientes</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            La confianza y seguridad de nuestros clientes es nuestro mayor logro.
          </p>
        </div>
        
        <div 
          className="relative max-w-3xl mx-auto"
          role="region"
          aria-roledescription="carousel"
          aria-labelledby="testimonials-heading"
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform ease-in-out duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonialsData.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="w-full flex-shrink-0 p-1"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Testimonio ${index + 1} de ${testimonialsData.length}`}
                  aria-hidden={currentIndex !== index}
                >
                   <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={prevSlide} 
            aria-label="Testimonio anterior"
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 transform p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0056b3]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide} 
            aria-label="Siguiente testimonio"
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 transform p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0056b3]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <div className="flex justify-center mt-6">
            {testimonialsData.map((_, slideIndex) => (
              <button
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`w-3 h-3 rounded-full mx-1.5 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0056b3] ${currentIndex === slideIndex ? 'bg-[#0056b3]' : 'bg-gray-500 hover:bg-gray-600'}`}
                aria-label={`Ir al testimonio ${slideIndex + 1}`}
                aria-current={currentIndex === slideIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;