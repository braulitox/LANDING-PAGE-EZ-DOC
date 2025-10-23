import React from 'react';

const CheckIcon: React.FC = () => (
  <svg className="w-8 h-8 text-[#00cc66]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const ClockIcon: React.FC = () => (
    <svg className="w-8 h-8 text-[#00cc66]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
);

const ShieldIcon: React.FC = () => (
    <svg className="w-8 h-8 text-[#00cc66]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
    </svg>
);

const BenefitCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-[#0056b3] mb-2">{title}</h3>
    <p className="text-gray-600">{children}</p>
  </div>
);

const Benefits: React.FC = () => {
  return (
    <section id="benefits" aria-labelledby="benefits-heading" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="benefits-heading" className="text-3xl md:text-4xl font-bold text-gray-900">Tu tranquilidad es nuestra prioridad</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            Con EZ DOC, obtienes un análisis legal profundo que te protege de sorpresas y asegura tu patrimonio.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <BenefitCard icon={<ShieldIcon />} title="Verificación de Cargas">
            Identificamos hipotecas, embargos, y cualquier gravamen oculto que pueda afectar tu propiedad. Cero riesgos.
          </BenefitCard>
          <BenefitCard icon={<ClockIcon />} title="Entrega Rápida y Garantizada">
            Recibe tu dictamen de inmueble en hasta 24 horas, o el de tu mueble en solo 2 horas. Agilidad para tu inversión.
          </BenefitCard>
          <BenefitCard icon={<CheckIcon />} title="Dictamen Claro y Directo">
            Traducimos el lenguaje legal complejo a un reporte fácil de entender, con conclusiones claras para que tomes la mejor decisión.
          </BenefitCard>
        </div>
      </div>
    </section>
  );
};

export default Benefits;