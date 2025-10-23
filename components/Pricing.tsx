import React, { useState } from 'react';

const CheckListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start">
    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <span>{children}</span>
  </li>
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

const Spinner: React.FC = () => (
    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


const Pricing: React.FC = () => {
  const [assetType, setAssetType] = useState<'inmueble' | 'mueble'>('inmueble');
  const [isLoading, setIsLoading] = useState(false);

  const pricingData = {
    inmueble: {
      title: "Análisis Completo de Inmueble",
      price: "S/ 300",
      description: "El análisis más completo para una compra de inmueble segura y sin preocupaciones.",
      features: [
        "Análisis de Partida Registral",
        "Detección de Cargas y Gravámenes",
        "Análisis de Títulos Archivados",
        "Verificación de Propietarios Anteriores",
        "Revisión de Parámetros Urbanísticos",
        "Informe Legal Detallado con Recomendaciones"
      ],
      delivery: "Hasta 24 horas"
    },
    mueble: {
      title: "Análisis Rápido de Mueble",
      price: "S/ 75",
      description: "Ideal para bienes muebles registrables (vehículos, etc.). Un dictamen sencillo para una transferencia segura.",
      features: [
        "Análisis de Partida Registral Vehicular",
        "Detección de Gravámenes y Cargas",
        "Verificación de Propietario",
        "Informe Legal Sencillo"
      ],
      delivery: "2 horas"
    }
  };

  const selectedData = pricingData[assetType];
  const whatsappLink = `https://wa.me/51970696676?text=Hola,%20quisiera%20solicitar%20un%20${selectedData.title}%20con%20precio%20de%20${selectedData.price.replace('S/ ', 'S/')}.`;

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isLoading) return;
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      window.open(e.currentTarget.href, '_blank', 'noopener,noreferrer');
      setIsLoading(false);
    }, 1200);
  };

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="pricing-heading" className="text-3xl md:text-4xl font-bold text-gray-900">Calcula el Costo de tu Análisis</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Selecciona el tipo de bien para ver el precio y plazo de entrega.</p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {/* Selector */}
          <div className="flex justify-center mb-8 bg-gray-200 rounded-full p-1.5 shadow-inner">
            <button
              onClick={() => setAssetType('inmueble')}
              className={`w-1/2 py-3 px-4 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-200 focus-visible:ring-[#0056b3] ${assetType === 'inmueble' ? 'bg-[#0056b3] text-white shadow-md' : 'text-gray-700 hover:bg-white/50'}`}
              aria-pressed={assetType === 'inmueble'}
            >
              Bien Inmueble
            </button>
            <button
              onClick={() => setAssetType('mueble')}
              className={`w-1/2 py-3 px-4 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-200 focus-visible:ring-[#0056b3] ${assetType === 'mueble' ? 'bg-[#0056b3] text-white shadow-md' : 'text-gray-700 hover:bg-white/50'}`}
              aria-pressed={assetType === 'mueble'}
            >
              Bien Mueble
            </button>
          </div>

          {/* Pricing Card */}
          <div className="bg-white rounded-2xl p-8 flex flex-col shadow-xl border border-gray-200 overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedData.title}</h3>
                <p className="text-gray-500 mt-2">{selectedData.description}</p>
              </div>
              <div className="text-left sm:text-right mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
                 <p className="text-sm font-bold text-[#008241] uppercase tracking-wider">Entrega en</p>
                 <p className="text-3xl font-bold text-[#0056b3]">{selectedData.delivery}</p>
              </div>
            </div>
            
            <div className="my-6 text-center bg-gray-50 py-6 rounded-lg">
              <span className="text-5xl font-extrabold text-gray-900">{selectedData.price}</span>
              <span className="text-gray-500 text-lg"> / análisis</span>
            </div>
            <ul className="space-y-4 text-gray-600 mb-8 flex-grow">
              {selectedData.features.map((feature, index) => (
                <CheckListItem key={index}>{feature}</CheckListItem>
              ))}
            </ul>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCtaClick}
              className={`w-full flex items-center justify-center font-bold text-lg py-4 px-6 rounded-lg bg-[#00cc66] text-gray-900 shadow-lg transform transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300 ${isLoading ? 'opacity-75 cursor-wait' : ''}`}
            >
              {isLoading ? (
                <>
                  <Spinner />
                  <span>SOLICITANDO...</span>
                </>
              ) : (
                <>
                  <WhatsAppIcon />
                  <span>Solicitar Análisis</span>
                </>
              )}
               <span className="sr-only">(se abre en una nueva pestaña)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;