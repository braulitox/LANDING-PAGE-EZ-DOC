import React, { useState, useEffect, useCallback } from 'react';

const EzDocLogo: React.FC = () => (
    <svg height="28" viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg" className="inline-block" aria-label="EZ DOC Logo">
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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" 
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div 
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
          onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 id="modal-title" className="text-xl font-bold text-gray-800">{title}</h2>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0056b3] rounded-full p-1"
              aria-label="Cerrar modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-6 overflow-y-auto text-gray-700 space-y-4">
            {children}
          </div>
        </div>
      </div>
    );
};


const Footer: React.FC = () => {
    const [modalContent, setModalContent] = useState<'privacy' | 'terms' | null>(null);

    const openModal = (type: 'privacy' | 'terms') => setModalContent(type);
    const closeModal = useCallback(() => setModalContent(null), []);
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        if (modalContent) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [modalContent, closeModal]);


  return (
    <>
      <footer className="bg-[#0056b3] text-white">
        <div className="container mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <div className="text-xl font-bold flex items-center">
                  <EzDocLogo />
              </div>
              <p className="text-sm text-gray-50 mt-1">&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
            </div>
            <div className="flex space-x-6">
              <button 
                onClick={() => openModal('privacy')}
                className="text-gray-50 hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded transition-colors duration-300"
              >
                Política de Privacidad
              </button>
              <button
                onClick={() => openModal('terms')}
                className="text-gray-50 hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded transition-colors duration-300"
              >
                Términos del Servicio
              </button>
            </div>
          </div>
        </div>
      </footer>
      
      <Modal isOpen={modalContent === 'privacy'} onClose={closeModal} title="Política de Privacidad">
        <p><strong>Última actualización:</strong> {new Date().toLocaleDateString()}</p>
        <h3 className="font-bold text-lg">1. Introducción</h3>
        <p>En EZ DOC ("nosotros", "nuestro"), respetamos su privacidad y nos comprometemos a proteger sus datos personales. Esta política de privacidad le informará sobre cómo cuidamos sus datos personales cuando visita nuestro sitio web (independientemente de dónde lo visite) y le informará sobre sus derechos de privacidad y cómo la ley lo protege.</p>
        
        <h3 className="font-bold text-lg">2. Información que recopilamos</h3>
        <p>Podemos recopilar, usar, almacenar y transferir diferentes tipos de datos personales sobre usted, que hemos agrupado de la siguiente manera:</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Datos de Identidad:</strong> Incluye nombre y apellido que nos proporciona a través de nuestros canales de comunicación.</li>
          <li><strong>Datos de Contacto:</strong> Incluye dirección de correo electrónico y número de teléfono (proporcionado vía WhatsApp o formulario de contacto).</li>
          <li><strong>Datos de la Transacción:</strong> Incluye detalles sobre los servicios que nos ha solicitado, como el número de partida registral o placa del vehículo a analizar. Esta información se trata con la máxima confidencialidad.</li>
          <li><strong>Datos Técnicos:</strong> Incluye la dirección del protocolo de Internet (IP), tipo y versión del navegador, y datos de ubicación anónimos para mejorar nuestro servicio.</li>
        </ul>

        <h3 className="font-bold text-lg">3. ¿Cómo usamos su información?</h3>
        <p>Usamos sus datos personales estricta y únicamente para los siguientes propósitos:</p>
        <ul className="list-disc list-inside space-y-2">
            <li>Para procesar y entregar el servicio de dictamen legal solicitado, incluyendo la gestión de pagos y la comunicación directa con usted sobre el estado de su solicitud.</li>
            <li>Para gestionar nuestra relación con usted, lo que incluirá responder a sus consultas y notificarle sobre cambios en nuestros términos o política de privacidad.</li>
            <li>Para administrar y proteger nuestro negocio y este sitio web (incluida la solución de problemas, el análisis de datos, las pruebas y el mantenimiento del sistema).</li>
        </ul>

        <h3 className="font-bold text-lg">4. Divulgación de sus datos</h3>
        <p>No vendemos, distribuimos ni alquilamos su información personal a terceros bajo ninguna circunstancia, a menos que tengamos su permiso explícito o la ley nos exija hacerlo. Su información se mantiene estrictamente confidencial y se utiliza únicamente para el propósito del servicio contratado.</p>

        <h3 className="font-bold text-lg">5. Seguridad de los datos</h3>
        <p>Hemos implementado medidas de seguridad técnicas y organizativas apropiadas para evitar que sus datos personales se pierdan accidentalmente, se usen o se acceda a ellos de forma no autorizada, se alteren o se divulguen. El acceso a sus datos personales está limitado a aquellos empleados o agentes que tienen una necesidad comercial de conocerlos.</p>

        <h3 className="font-bold text-lg">6. Sus derechos legales</h3>
        <p>Bajo ciertas circunstancias, usted tiene derechos bajo las leyes de protección de datos en relación con sus datos personales, incluido el derecho a solicitar acceso, corrección, eliminación o restricción del procesamiento de sus datos personales.</p>

        <h3 className="font-bold text-lg">7. Contacto</h3>
        <p>Si tiene alguna pregunta sobre esta política de privacidad, no dude en contactarnos en ezdoclegal@gmail.com.</p>
      </Modal>

      <Modal isOpen={modalContent === 'terms'} onClose={closeModal} title="Términos del Servicio">
        <p><strong>Última actualización:</strong> {new Date().toLocaleDateString()}</p>
        <h3 className="font-bold text-lg">1. Aceptación de los Términos</h3>
        <p>Al acceder y utilizar los servicios de EZ DOC (el "Servicio"), usted acepta y está de acuerdo con estar sujeto a los términos y disposiciones de este acuerdo. Si no está de acuerdo con alguno de estos términos, tiene prohibido usar o acceder a este sitio.</p>

        <h3 className="font-bold text-lg">2. Descripción del Servicio</h3>
        <p>EZ DOC proporciona análisis de riesgo y dictámenes legales basados en la información pública disponible en registros públicos (como la partida registral de un inmueble o vehículo) en el momento de la solicitud. Nuestro servicio consiste en la revisión, interpretación y resumen de dicha información para facilitar al cliente la toma de decisiones informadas.</p>

        <h3 className="font-bold text-lg">3. Responsabilidades del Usuario</h3>
        <p>Usted se compromete a proporcionar información veraz, completa y precisa (número de partida registral, placa de vehículo, etc.) para la prestación del servicio. Usted reconoce y acepta que es el único responsable de las decisiones de inversión o transacción que tome. El informe proporcionado por EZ DOC es una herramienta de diligencia y análisis, pero no constituye una garantía de inversión ni elimina todos los riesgos inherentes a una transacción inmobiliaria o vehicular.</p>

        <h3 className="font-bold text-lg">4. Limitación de Responsabilidad</h3>
        <p>El servicio de EZ DOC se basa en la información disponible en fuentes públicas en la fecha y hora del análisis. Por lo tanto, no nos hacemos responsables de: a) información que no sea de acceso público; b) información que sea errónea, incompleta o desactualizada en la propia fuente original (registros públicos); c) eventos, cargas, gravámenes o inscripciones que ocurran o se registren después de la fecha y hora de emisión de nuestro dictamen. Nuestro servicio es una opinión legal informativa basada en nuestra experiencia y no debe considerarse un sustituto de una asesoría legal completa para una transacción específica o de la validación notarial correspondiente. La responsabilidad máxima de EZ DOC por cualquier reclamación que surja del servicio se limitará, en todos los casos, al monto total pagado por el cliente por dicho servicio específico.</p>

        <h3 className="font-bold text-lg">5. Propiedad Intelectual</h3>
        <p>El contenido del sitio web (logo, diseño, textos) así como los informes y dictámenes generados, son propiedad intelectual de EZ DOC. Los informes son para uso exclusivo del cliente que los solicita y no pueden ser reproducidos, distribuidos o revendidos sin nuestro consentimiento explícito por escrito.</p>

        <h3 className="font-bold text-lg">6. Modificaciones a los Términos</h3>
        <p>EZ DOC se reserva el derecho de modificar estos términos en cualquier momento. Le notificaremos de cualquier cambio publicando los nuevos Términos del Servicio en esta página. Se le aconseja revisar estos Términos periódicamente para cualquier cambio.</p>

        <h3 className="font-bold text-lg">7. Ley Aplicable</h3>
        <p>Estos términos se regirán e interpretarán de acuerdo con las leyes de la República del Perú, sin tener en cuenta sus disposiciones sobre conflicto de leyes.</p>
      </Modal>
    </>
  );
};

export default Footer;