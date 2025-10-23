
import React, { useState, useRef, useEffect, useCallback } from 'react';

// Interfaces for message structure
interface Message {
  id: number;
  text: React.ReactNode;
  sender: 'bot' | 'user';
}

// Conversation Tree Structure
interface ChatOption {
  text: string;
  nextId: string;
  isLink?: boolean;
  url?: string;
}

interface ConversationNode {
  message: React.ReactNode;
  options?: ChatOption[];
}

const ScrollToLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetId = href.substring(1); // remove '#'
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <a href={href} onClick={handleClick} className="text-blue-600 underline">
      {children}
    </a>
  );
};

const conversationTree: Record<string, ConversationNode> = {
  start: {
    message: "¡Hola! Soy tu asistente virtual de EZ DOC. Para ayudarte mejor, ¿cuál es tu interés principal?",
    options: [
      { text: "Comprar un inmueble 🏡", nextId: "property_menu" },
      { text: "Comprar un vehículo 🚗", nextId: "vehicle_menu" },
      { text: "Tengo otra consulta 🤔", nextId: "general_menu" },
    ],
  },
  property_menu: {
    message: "¡Excelente! Proteger tu inversión en un inmueble es clave. ¿Qué te gustaría saber?",
    options: [
      { text: "¿Cómo funciona el análisis?", nextId: "process_property" },
      { text: "¿Cuánto tiempo demora?", nextId: "time_property" },
      { text: "Ver precios", nextId: "pricing" },
      { text: "¡Quiero iniciar ya!", nextId: "start_analysis" },
    ],
  },
  vehicle_menu: {
    message: "¡Perfecto! Asegurar la compra de un vehículo es muy importante. ¿Sobre qué te gustaría informarte en nuestro análisis vehicular?",
    options: [
      { text: "¿Cómo funciona el análisis?", nextId: "process_vehicle" },
      { text: "¿Cuánto tiempo demora?", nextId: "time_vehicle" },
      { text: "Ver precios", nextId: "pricing" },
      { text: "¡Quiero iniciar ya!", nextId: "start_analysis" },
    ],
  },
  general_menu: {
    message: "Claro, aquí tienes las preguntas más frecuentes:",
    options: [
      { text: "Proceso para inmuebles", nextId: "process_property" },
      { text: "Proceso para vehículos", nextId: "process_vehicle" },
      { text: "Tiempo de entrega (Inmuebles)", nextId: "time_property" },
      { text: "Tiempo de entrega (Vehículos)", nextId: "time_vehicle" },
      { text: "Precios", nextId: "pricing" },
    ],
  },
  process_property: {
    message: (
      <>
        Para un inmueble, el proceso es muy sencillo:
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li><strong>Nos envías el N° de Partida Registral</strong> por WhatsApp al +51 970696676.</li>
          <li><strong>Realizas el pago</strong> de S/ 300 vía Yape/Plin.</li>
          <li>Una vez confirmado el depósito, ¡iniciamos el análisis!</li>
          <li><strong>Recibes tu dictamen completo</strong> en tu correo en hasta 24 horas.</li>
        </ol>
      </>
    ),
  },
  process_vehicle: {
     message: (
      <>
        Para un vehículo, el proceso es rapidísimo:
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li><strong>Nos envías la Placa</strong> por WhatsApp al +51 970696676.</li>
          <li><strong>Realizas el pago</strong> de S/ 75 vía Yape/Plin.</li>
          <li>Una vez confirmado el depósito, ¡iniciamos el análisis!</li>
          <li><strong>Recibes tu dictamen vehicular</strong> en tu correo en hasta 2 horas.</li>
        </ol>
      </>
    ),
  },
  time_property: {
    message: "Para inmuebles, el plazo de entrega es de hasta 24 horas. Este tiempo es referencial, ya que priorizamos un análisis profundo y exhaustivo.",
  },
  time_vehicle: {
    message: "Para vehículos (muebles), el plazo de entrega es de hasta 2 horas. Es un proceso muy ágil para que puedas decidir tu compra con rapidez.",
  },
  pricing: {
    message: (
      <>
        Nuestros precios son transparentes. El análisis de inmuebles es de S/ 300 y el de vehículos S/ 75. Puedes ver el detalle completo en la sección de precios. <ScrollToLink href="#pricing">Ver Precios ahora</ScrollToLink>.
      </>
    ),
  },
  start_analysis: {
    message: (
        <>
            ¡Excelente decisión! Puedes iniciar tu análisis ahora mismo hablando con un asesor por WhatsApp al <strong>+51 970696676</strong>. <a href="https://wa.me/51970696676?text=Hola,%20quisiera%20iniciar%20un%20análisis%20de%20riesgo." target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Haz clic aquí para iniciar el chat</a>.
        </>
    )
  },
  default: {
      message: "No estoy seguro de haber entendido. ¿Puedes intentar con otra pregunta? También puedes elegir una de estas opciones:",
  }
};

const keywordMap: Record<string, string[]> = {
  general_menu: ['proceso', 'funciona', 'pasos', 'necesito', 'cómo es', 'hacer'],
  time_property: ['tiempo inmueble', 'demora depa', 'plazo casa'],
  time_vehicle: ['tiempo vehiculo', 'demora auto', 'plazo carro'],
  pricing: ['precio', 'costo', 'vale', 'cuesta', 'tarifa', 'precios', 'cuanto es'],
  start_analysis: ['iniciar', 'empezar', 'comenzar', 'quiero', 'solicitar', 'ya'],
};

function getKeywordResponseId(userText: string): string | null {
  const lowerCaseText = userText.toLowerCase();
  for (const responseId in keywordMap) {
    for (const keyword of keywordMap[responseId]) {
      if (lowerCaseText.includes(keyword)) {
        return responseId;
      }
    }
  }
  return null;
}

const BotAvatar: React.FC = () => (
    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mr-3">
      <svg className="w-5 h-5 text-[#0056b3]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.835 18.272C18.419 17.033 19.5 15.116 19.5 13C19.5 9.41 16.09 6.5 12 6.5C7.91 6.5 4.5 9.41 4.5 13C4.5 15.116 5.581 17.033 7.165 18.272M12 21.5C8.634 21.5 5.768 19.531 4.5 16.5M12 21.5C15.366 21.5 18.232 19.531 19.5 16.5M12 21.5V19M15 13.5C15 14.328 14.328 15 13.5 15C12.672 15 12 14.328 12 13.5C12 12.672 12.672 12 13.5 12C14.328 12 15 12.672 15 13.5ZM9 13.5C9 14.328 8.328 15 7.5 15C6.672 15 6 14.328 6 13.5C6 12.672 6.672 12 7.5 12C8.328 12 9 12.672 9 13.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 6V2.5C12 2.224 12.224 2 12.5 2C12.776 2 13 2.224 13 2.5V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
);


const BotTypingIndicator: React.FC = () => (
    <div className="flex items-end justify-start animate-message-appear">
        <BotAvatar />
        <div className="px-4 py-3 rounded-2xl max-w-[80%] bg-gray-200 text-gray-800 rounded-bl-none">
            <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-typing-bubble" style={{ animationDelay: '0s' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-typing-bubble" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-typing-bubble" style={{ animationDelay: '0.4s' }}></span>
            </div>
        </div>
    </div>
);


const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [conversationPath, setConversationPath] = useState<string[]>(['start']);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const addMessage = useCallback((text: React.ReactNode, sender: 'bot' | 'user') => {
      setMessages(prev => [...prev, { id: Date.now() + Math.random(), text, sender }]);
  }, []);

  const handleOptionClick = useCallback((option: ChatOption) => {
    addMessage(option.text, 'user');
    
    let newPath = [...conversationPath];
    if (option.nextId === 'back') {
        newPath.pop();
    } else if (option.nextId === 'main_menu') {
        newPath = ['start'];
    } else {
        newPath.push(option.nextId);
    }
    setConversationPath(newPath);

    const nextNodeId = newPath[newPath.length - 1] || 'start';
    const nextNode = conversationTree[nextNodeId];
    addBotMessageWithActions(nextNode, newPath);
  }, [conversationPath, addMessage]);

  function OptionsButtons({ node, path, onOptionClick }: { node: ConversationNode, path: string[], onOptionClick: (option: ChatOption) => void }) {
    const isNotStart = path.length > 1;
    
    const allOptions: ChatOption[] = [...(node.options || [])];
    if (isNotStart) {
        allOptions.push({ text: "⬅️ Volver", nextId: 'back' });
        allOptions.push({ text: "🏠 Menú Principal", nextId: 'main_menu' });
    }

    return (
        <div className="flex flex-wrap gap-2 pt-3 animate-message-appear" style={{ animationDelay: '0.2s' }}>
            {allOptions.map((option, index) => (
                <button 
                    key={`${option.nextId}-${index}`} 
                    onClick={() => onOptionClick(option)} 
                    className="text-sm bg-white border border-blue-200 text-blue-700 rounded-full px-4 py-1.5 hover:bg-blue-100 hover:border-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transition-all duration-200"
                >
                    {option.text}
                </button>
            ))}
        </div>
    );
  }

  const addBotMessageWithActions = useCallback((node: ConversationNode, path: string[]) => {
    setIsBotTyping(true);
    setTimeout(() => {
      setIsBotTyping(false);
      const messageContent = (
        <div>
          {node.message}
          <OptionsButtons node={node} path={path} onOptionClick={handleOptionClick} />
        </div>
      );
      addMessage(messageContent, 'bot');
    }, 800);
  }, [addMessage, handleOptionClick]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const startNode = conversationTree.start;
      addBotMessageWithActions(startNode, ['start']);
    }
  }, [isOpen, messages.length, addBotMessageWithActions]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotTyping]);
  

  const handleSendMessage = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const trimmedInput = userInput.trim();
    if (!trimmedInput || isBotTyping) return;

    addMessage(trimmedInput, 'user');
    setUserInput('');
    
    const responseId = getKeywordResponseId(trimmedInput);
    const currentNodeId = conversationPath[conversationPath.length - 1] || 'start';
    const currentNode = conversationTree[currentNodeId];
    
    if (responseId) {
        const newNode = conversationTree[responseId];
        const newPath = [...conversationPath, responseId];
        setConversationPath(newPath);
        addBotMessageWithActions(newNode, newPath);
    } else {
        const defaultNode = conversationTree.default;
        const messageContent = <div>{defaultNode.message} <OptionsButtons node={currentNode} path={conversationPath} onOptionClick={handleOptionClick} /></div>;
        
        setIsBotTyping(true);
        setTimeout(() => {
            setIsBotTyping(false);
            addMessage(messageContent, 'bot');
        }, 1000);
    }
  };
  
  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <>
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 bg-[#0056b3] text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition-transform transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0056b3] z-50"
          aria-label="Abrir chat de ayuda"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-full max-w-md h-auto max-h-[80vh] sm:max-h-[70vh] bg-white rounded-2xl shadow-2xl flex flex-col z-50 animate-fade-in-up origin-bottom-right">
          <div className="bg-gradient-to-r from-[#0056b3] to-blue-700 text-white p-4 flex justify-between items-center rounded-t-2xl shadow-sm">
            <div className="flex items-center">
                <BotAvatar />
                <div>
                    <h3 className="font-bold text-lg">Asistente Virtual</h3>
                    <p className="text-xs text-blue-200">EZ DOC</p>
                </div>
            </div>
            <button onClick={toggleChat} aria-label="Cerrar chat" className="p-1 rounded-full hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="flex flex-col space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-end ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-message-appear`}>
                  {msg.sender === 'bot' && <BotAvatar />}
                  <div className={`px-4 py-3 rounded-2xl max-w-[80%] shadow-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isBotTyping && <BotTypingIndicator />}
              <div ref={chatEndRef} />
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                disabled={isBotTyping}
                className="flex-1 w-full px-4 py-2 text-sm text-gray-800 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                aria-label="Escribe tu mensaje"
              />
              <button
                type="submit"
                disabled={isBotTyping || !userInput.trim()}
                className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-110 active:scale-100"
                aria-label="Enviar mensaje"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes message-appear {
            from { opacity: 0; transform: translateY(10px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes typing-bubble {
            0%, 100% { transform: scale(0.7); opacity: 0.5; }
            50% { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
        .animate-message-appear {
            animation: message-appear 0.4s ease-out forwards;
        }
        .animate-typing-bubble {
            animation: typing-bubble 1.2s infinite ease-in-out;
        }
      `}</style>
    </>
  );
};

export default Chatbot;
