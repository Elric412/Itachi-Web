import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const moonY = useTransform(scrollYProgress, [0, 1], [-50, 200]); // Reduced parallax movement for stability
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const fogX = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="hero" ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-uchihablack">
      {/* 1. Base Deep Space Background */}
      <div className="absolute inset-0 bg-[#030303] z-0" />
      
      {/* 2. The Moon - Centered & Glowing */}
      <motion.div 
        style={{ y: moonY, opacity }}
        className="absolute top-[40%] md:top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[650px] md:h-[650px] rounded-full z-10 pointer-events-none"
      >
         {/* Glow Layer behind the moon */}
         <div className="absolute inset-0 rounded-full bg-white/5 blur-[80px] scale-150" />
         
         {/* Moon Body */}
         <div className="w-full h-full rounded-full bg-[#f0f2eb] relative overflow-hidden shadow-[0_0_60px_rgba(255,255,255,0.15)] border border-white/10">
            {/* Texture - Subtle & Clean */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] mix-blend-multiply scale-125" />
            
            {/* Crater Details - Soft shadows */}
            <div className="absolute top-[35%] left-[25%] w-[12%] h-[12%] bg-[#d1d5cb] rounded-full blur-[2px] opacity-60" />
            <div className="absolute bottom-[30%] right-[20%] w-[18%] h-[18%] bg-[#d1d5cb] rounded-full blur-[4px] opacity-50" />
            <div className="absolute top-[20%] right-[30%] w-[8%] h-[8%] bg-[#d1d5cb] rounded-full blur-[1px] opacity-40" />

            {/* Inner Sphere Volume (Gives it 3D shape without dimming center) */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,transparent_40%,rgba(0,0,0,0.1)_70%,rgba(0,0,0,0.4)_100%)]" />
         </div>
      </motion.div>

      {/* 3. Fog/Cloud Layers - Depth */}
      <motion.div 
        style={{ x: fogX, opacity: 0.3 }}
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/foggy-birds.png')] mix-blend-screen bg-repeat z-10 pointer-events-none"
      />

      {/* 4. The Void Stage - Gradient from bottom ONLY */}
      {/* This ensures the text is legible while the moon remains bright at the top */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-uchihablack via-uchihablack/90 via-transparent to-transparent" />

      {/* 5. Hero Content */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-30 text-center px-4 w-full max-w-7xl flex flex-col items-center justify-end h-full pb-32 md:pb-24"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col items-center gap-4 mb-6"
        >
           <span className="h-12 w-[1px] bg-gradient-to-b from-transparent via-crimson to-transparent shadow-[0_0_8px_#dc2626]"></span>
           <span className="font-cinzel text-crimson tracking-[0.6em] text-xs md:text-sm uppercase font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
             The Shadow Hokage
           </span>
        </motion.div>

        {/* Main Title - Metallic Finish */}
        <motion.h1 
          className="font-cormorant text-7xl md:text-[11rem] lg:text-[15rem] text-transparent bg-clip-text bg-gradient-to-b from-stone-200 via-stone-400 to-stone-600 mb-8 leading-[0.8] tracking-tighter relative"
          initial={{ opacity: 0, scale: 0.95, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          style={{ 
            dropShadow: "0 20px 40px rgba(0,0,0,0.8)",
          }}
        >
          ITACHI
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="relative mt-2"
        >
          <p className="font-geist text-stone-400 text-xs md:text-sm tracking-[0.25em] uppercase max-w-xl mx-auto leading-relaxed drop-shadow-md">
            "We do not know what kind of people we truly are until the moment before our deaths."
          </p>
        </motion.div>
      </motion.div>

      {/* Side Aesthetics - Vertical Text */}
      <div className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-6 z-30 opacity-40 mix-blend-difference">
        <div className="h-24 w-[1px] bg-stone-500" />
        <span className="vertical-text font-cinzel text-[10px] tracking-[0.4em] text-stone-300">SHARINGAN LEGACY</span>
        <div className="h-24 w-[1px] bg-stone-500" />
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 z-30 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-stone-500 font-geist">Scroll</span>
        <div className="h-10 w-[1px] bg-stone-700 overflow-hidden relative">
          <motion.div 
             className="absolute top-0 left-0 w-full bg-crimson"
             animate={{ height: ['0%', '100%', '0%'], top: ['0%', '100%', '100%'] }}
             transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
