import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SharinganLoader from './components/ui/SharinganLoader';
import Hero from './components/sections/Hero';
import Chapter from './components/sections/Chapter';
import Footer from './components/sections/Footer';
import Navbar from './components/navigation/Navbar';
import CrowParticles from './components/ui/CrowParticles';
import GenjutsuCursor from './components/ui/GenjutsuCursor'; // Import Cursor
import { CHAPTERS } from './constants';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Custom Cursor acts globally */}
      <GenjutsuCursor />

      <AnimatePresence mode="wait">
        {loading && (
          <SharinganLoader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div 
          className="bg-uchihablack min-h-screen text-white selection:bg-crimson selection:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Global SVG Noise Overlay - Uses filter defined in index.html */}
          <div 
             className="fixed inset-0 pointer-events-none z-[999] opacity-[0.07]"
             style={{ filter: 'url(#noiseFilter)' }}
          />

          {/* Particles Background */}
          <CrowParticles density={25} />
          
          <Navbar />
          
          <main>
            <Hero />
            
            {/* Chapters with specific spacing */}
            <div className="relative z-10 bg-uchihablack/90 backdrop-blur-[2px]">
              {CHAPTERS.map((chapter, index) => (
                <Chapter key={chapter.id} data={chapter} index={index} />
              ))}
            </div>
            
            <Footer />
          </main>
        </motion.div>
      )}
    </>
  );
};

export default App;
