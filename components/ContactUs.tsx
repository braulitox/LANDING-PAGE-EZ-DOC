import React, { useState } from 'react';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [submissionState, setSubmissionState] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    message: string;
  }>({
    status: 'idle',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const encode = (data: { [key: string]: string }) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        setSubmissionState({ status: 'error', message: 'Por favor, completa todos los campos para continuar.' });
        setTimeout(() => setSubmissionState({ status: 'idle', message: '' }), 5000);
        return;
    }
    
    setSubmissionState({ status: 'submitting', message: '' });

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...formData })
    })
    .then(() => {
        setSubmissionState({ status: 'success', message: '¡Mensaje Enviado! Gracias por contactarnos.' });
        setFormData({ name: '', email: '', message: '' }); // Reset form
        setTimeout(() => setSubmissionState({ status: 'idle', message: '' }), 5000);
    })
    .catch((error) => {
        setSubmissionState({ status: 'error', message: 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.' });
        console.error("Form submission error:", error);
        setTimeout(() => setSubmissionState({ status: 'idle', message: '' }), 5000);
    });
  };

  const isSubmitting = submissionState.status === 'submitting';

  return (
    <section id="contact-us" aria-labelledby="contact-us-heading" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="contact-us-heading" className="text-3xl md:text-4xl font-bold text-gray-900">Contáctanos</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o necesitas un análisis personalizado? Escríbenos.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <form 
              name="contact" 
              method="POST" 
              data-netlify="true" 
              onSubmit={handleSubmit} 
              className="space-y-6" 
              noValidate
            >
              <input type="hidden" name="form-name" value="contact" />
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-[#0056b3] focus:ring-[#0056b3] sm:text-sm text-gray-900"
                  placeholder="Tu nombre completo"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-[#0056b3] focus:ring-[#0056b3] sm:text-sm text-gray-900"
                  placeholder="tu@correo.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-[#0056b3] focus:ring-[#0056b3] sm:text-sm text-gray-900"
                  placeholder="Escribe tu consulta aquí..."
                ></textarea>
              </div>
              
              { (submissionState.status === 'success' || submissionState.status === 'error') && (
                <div 
                  className={`p-4 rounded-md text-center text-sm font-medium transition-opacity duration-300 ${submissionState.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                  role="alert"
                >
                  {submissionState.message}
                </div>
              )}
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-[#0056b3] hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </div>
            </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;