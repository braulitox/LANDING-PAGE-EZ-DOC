
import React from 'react';

const TitleSearchIcon: React.FC = () => (
    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Main document shape */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        {/* Magnifying glass, using a different color for accent */}
        <g className="text-green-400">
             <circle cx="14.5" cy="15.5" r="3.5" stroke="currentColor" strokeWidth="2" />
             <line x1="17" y1="18" x2="19" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </g>
    </svg>
);


const TitleVerification: React.FC = () => {
  const backgroundImageUrl = "https://picsum.photos/seed/modern-house/1920/1080";

  return (
    <section 
      id="title-verification" 
      aria-labelledby="title-verification-heading" 
      className="py-24 md:py-32 bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <TitleSearchIcon />
          </div>
          <h2 id="title-verification-heading" className="text-3xl md:text-4xl font-bold text-white">Verificación de Títulos</h2>
          <p className="text-lg text-gray-200 mt-4">
            No te quedes solo con la partida registral. Profundizamos en el historial del inmueble para una seguridad absoluta.
          </p>
          <div className="mt-8 text-left text-gray-200 bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20">
             <p>
                Muchos problemas legales no son visibles en la información básica del registro. Se esconden en los <strong className="text-white font-semibold">'títulos archivados'</strong>, que son los documentos originales (minutas, escrituras públicas, resoluciones) que dieron origen a cada inscripción en la historia de la propiedad.
             </p>
             <p className="mt-4">
                Nuestro equipo de expertos revisa minuciosamente este historial para detectar inconsistencias, fraudes, suplantaciones de identidad o disputas antiguas que podrían poner en jaque tu inversión. Es la capa de protección más profunda que te garantiza que el vendedor tiene el derecho legítimo e indiscutible de transferir la propiedad.
             </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TitleVerification;
