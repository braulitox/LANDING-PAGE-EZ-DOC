import React from 'react';

const MissionIcon: React.FC = () => (
    <svg className="w-12 h-12 text-[#0056b3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
        <circle cx="12" cy="12" r="6" strokeWidth="2"></circle>
        <circle cx="12" cy="12" r="2" strokeWidth="2"></circle>
    </svg>
);

const VisionIcon: React.FC = () => (
     <svg className="w-12 h-12 text-[#0056b3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
    </svg>
);

const TeamIcon: React.FC = () => (
    <svg className="w-12 h-12 text-[#0056b3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path>
    </svg>
);


const InfoCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 flex flex-col items-center text-center h-full">
    <div className="flex-shrink-0">{icon}</div>
    <div className="mt-4">
        <h3 className="text-xl font-bold text-[#0056b3] mb-2">{title}</h3>
        <p className="text-gray-600">{children}</p>
    </div>
  </div>
);


const AboutUs: React.FC = () => {
    return (
        <section id="about-us" aria-labelledby="about-us-heading" className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 id="about-us-heading" className="text-3xl md:text-4xl font-bold text-gray-900">Sobre Nosotros</h2>
                    <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                        Nacimos para democratizar la seguridad legal en el sector inmobiliario, combinando tecnología de punta con experiencia legal.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <InfoCard icon={<MissionIcon />} title="Nuestra Misión">
                        Hacer que cada inversión inmobiliaria sea 100% segura y transparente, eliminando la incertidumbre y protegiendo el patrimonio de nuestros clientes a través de análisis de riesgo accesibles y confiables.
                    </InfoCard>
                    <InfoCard icon={<VisionIcon />} title="Nuestra Visión">
                        Ser la plataforma LegalTech líder y de mayor confianza en Latinoamérica para la verificación y aseguramiento de transacciones inmobiliarias, estableciendo un nuevo estándar de diligencia debida en el sector.
                    </InfoCard>
                    <InfoCard icon={<TeamIcon />} title="Nuestro Equipo">
                        Somos un equipo multidisciplinario de abogados expertos en derecho inmobiliario y registral, junto a ingenieros y desarrolladores apasionados por crear soluciones tecnológicas que resuelven problemas reales.
                    </InfoCard>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;