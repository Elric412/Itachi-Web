import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="relative py-24 px-4 bg-void text-center overflow-hidden">
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="w-16 h-[1px] bg-crimson mx-auto mb-8" />
          
          <h2 className="font-cormorant text-3xl md:text-5xl text-white italic mb-6">
            "Forgive me, Sasuke."
          </h2>
          
          <p className="font-geist text-xs text-stone-600 uppercase tracking-[0.3em] mb-12">
            The Truth within the Darkness
          </p>
          
          <div className="flex justify-center gap-8 mb-12">
             {/* Tomoe-like Social placeholders */}
             {[1, 2, 3].map(i => (
               <div key={i} className="w-3 h-3 bg-stone-800 rounded-full hover:bg-crimson transition-colors duration-300 cursor-pointer" />
             ))}
          </div>

          <div className="text-stone-800 text-[10px] font-mono">
            DESIGN SYSTEM: TSUKUYOMI v1.0 <br/>
            PROJECT: ITACHI MEMORIAL
          </div>
        </motion.div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </footer>
  );
};

export default Footer;
