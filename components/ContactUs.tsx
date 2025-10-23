import React, { useState } from 'react';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const validateForm = (): boolean => {
    const newErrors = { name: '', email: '', message: '' };
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio.';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres.';
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El formato del email no es válido.';
      isValid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es obligatorio.';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    // Clear error on change for better user experience
    if (errors[name as keyof typeof errors]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const { name, email, message } = formData;
      const subject = encodeURIComponent(`Consulta desde la web de: ${name}`);
      const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`);
      const mailtoLink = `mailto:ezdoclegal@gmail.com?subject=${subject}&body=${body}`;
      
      window.location.href = mailtoLink;

      // Reset form after a short delay
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          message: '',
        });
        setErrors({
          name: '',
          email: '',
          message: '',
        });
      }, 500);
    }
  };

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
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
                className={`block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-[#0056b3] focus:ring-[#0056b3] sm:text-sm text-gray-900 ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Tu nombre completo"
                aria-invalid={!!errors.name}
                aria-describedby="name-error"
              />
              {errors.name && <p id="name-error" className="mt-2 text-sm text-red-600">{errors.name}</p>}
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
                className={`block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-[#0056b3] focus:ring-[#0056b3] sm:text-sm text-gray-900 ${errors.email ? 'border-red-500' : ''}`}
                placeholder="tu@correo.com"
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
              />
              {errors.email && <p id="email-error" className="mt-2 text-sm text-red-600">{errors.email}</p>}
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
                className={`block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-[#0056b3] focus:ring-[#0056b3] sm:text-sm text-gray-900 ${errors.message ? 'border-red-500' : ''}`}
                placeholder="Escribe tu consulta aquí..."
                aria-invalid={!!errors.message}
                aria-describedby="message-error"
              ></textarea>
              {errors.message && <p id="message-error" className="mt-2 text-sm text-red-600">{errors.message}</p>}
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-[#0056b3] hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Enviar Mensaje
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;