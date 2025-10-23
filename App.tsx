
import React from 'react';
import Header from './components/Header';
import Benefits from './components/Benefits';
import ConversionFlow from './components/ConversionFlow';
import TitleVerification from './components/TitleVerification';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  return (
    <div className="bg-white text-gray-800 font-sans">
      <Header />
      <main>
        <Benefits />
        <ConversionFlow />
        <TitleVerification />
        <Pricing />
        <Testimonials />
        <AboutUs />
        <ContactUs />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;