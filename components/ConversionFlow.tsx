
import React from 'react';

const UploadIcon: React.FC = () => (
  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center border-4 border-white shadow-md">
    <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
    </svg>
  </div>
);

const PaymentIcon: React.FC = () => (
  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center border-4 border-white shadow-md">
    <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
    </svg>
  </div>
);

const ReportIcon: React.FC = () => (
  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center border-4 border-white shadow-md">
    <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  </div>
);


const Step: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center md:items-start md:text-left relative z-10">
    <div className="mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-[#0056b3] mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ConversionFlow: React.FC = () => {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-heading" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-bold text-gray-900">¿Cómo Funciona?</h2>
          <p className="text-lg text-gray-600 mt-4">Obtén tu dictamen legal en 3 simples pasos, de forma 100% digital.</p>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-gray-300" aria-hidden="true"></div>
          <div className="relative grid md:grid-cols-3 gap-12 md:gap-8">
            <Step
              icon={<UploadIcon />}
              title="Envía la Partida o Placa"
              description="Sube o envíanos por WhatsApp el número de la partida registral del inmueble o la placa del vehículo que quieres analizar."
            />
            <Step
              icon={<PaymentIcon />}
              title="Paga Vía Yape/Plin"
              description="Realiza el pago de forma segura y rápida a través de las billeteras digitales más populares del Perú."
            />
            <Step
              icon={<ReportIcon />}
              title="Recibe tu Dictamen"
              description="Recibirás un informe legal completo en tu correo, listo para tu tranquilidad, en el plazo acordado."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConversionFlow;