import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChapterDataWithKanji } from '../../constants';
import { revealText, lineGrow, staggerContainer, fadeUp } from '../../utils/animations';
import Amaterasu from '../ui/Amaterasu';

interface ChapterProps {
  data: ChapterDataWithKanji;
  index: number;
}

const Chapter: React.FC<ChapterProps> = ({ data, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const [isHovered, setIsHovered] = useState(false);

  const isEven = index % 2 === 0;
  
  // Parallax elements
  const yKanji = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Theme Specific styles
  const isMassacre = data.id === 'massacre';
  const isAkatsuki = data.id === 'akatsuki';
  const isTechniques = data.id === 'techniques';

  // Techniques Layout (Centered)
  if (isTechniques) {
    return (
        <section 
        id={data.id} 
        ref={ref} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="min-h-screen relative py-32 px-4 flex flex-col items-center justify-center border-b border-white/5 overflow-hidden transition-colors duration-1000"
      >
        {/* Background Element */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-crimson/5 to-transparent opacity-50 pointer-events-none" />

        {/* Amaterasu Effect Layer */}
        <AnimatePresence>
          {isHovered && <Amaterasu />}
        </AnimatePresence>

        <div className="container mx-auto relative z-10 text-center max-w-4xl">
           <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={staggerContainer}
             className="space-y-12"
           >
              <motion.div variants={fadeUp} className="flex flex-col items-center gap-4">
                 <span className="text-crimson font-cinzel text-xl font-bold">{data.number}</span>
                 <h2 className="text-6xl md:text-8xl font-cormorant text-white relative z-10">{data.title}</h2>
                 <p className="font-cinzel text-sm tracking-[0.5em] text-stone-500 uppercase">{data.subtitle}</p>
              </motion.div>

              {/* Central Eye Graphic Simulation */}
              <motion.div 
                className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full border border-crimson/30 flex items-center justify-center relative group z-10"
                variants={revealText}
              >
                  <div className="absolute inset-0 rounded-full border border-crimson/20 scale-125 group-hover:scale-110 transition-transform duration-1000" />
                  <div className="w-full h-full rounded-full bg-gradient-radial from-red-900/20 to-transparent flex items-center justify-center backdrop-blur-sm">
                     <span className="font-cinzel text-4xl text-crimson opacity-80">{data.kanji}</span>
                  </div>
                  {/* Rotating Tomoe Ring */}
                  <div className="absolute inset-0 animate-spin-slow border-t border-crimson/40 rounded-full" />
              </motion.div>

              <motion.p variants={fadeUp} className="text-stone-400 font-cormorant text-xl leading-relaxed max-w-2xl mx-auto relative z-10 mix-blend-plus-lighter">
                {data.description}
              </motion.p>
           </motion.div>
        </div>
      </section>
    )
  }

  // Standard / Massacre / Akatsuki Layouts
  return (
    <section 
      id={data.id} 
      ref={ref} 
      className={`min-h-screen relative py-32 px-6 md:px-16 lg:px-32 flex items-center overflow-hidden border-b border-white/5 
        ${isMassacre ? 'bg-gradient-to-b from-uchihablack via-black to-uchihablack shadow-[inset_0_0_100px_rgba(50,0,0,0.2)]' : ''}
      `}
    >
      {/* Dynamic Backgrounds */}
      {isAkatsuki && (
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] mix-blend-overlay"></div>
      )}
      {isMassacre && (
        <div className="absolute inset-0 bg-red-900/5 mix-blend-color-dodge pointer-events-none" />
      )}

      {/* Background Kanji Watermark */}
      <motion.div 
        style={{ y: yKanji }}
        className="absolute top-10 md:top-20 right-4 md:right-10 font-cinzel text-[15rem] md:text-[25rem] text-white/[0.02] pointer-events-none select-none z-0 leading-none writing-mode-vertical"
      >
        {data.kanji}
      </motion.div>

      <div className={`container mx-auto relative z-10 flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-32 items-center`}>
        
        {/* Content Side */}
        <motion.div 
          className="flex-1 space-y-8 relative"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Decorative vertical line */}
          <div className={`absolute ${isEven ? '-left-8' : '-right-8'} top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block`} />

          <div className="flex items-center gap-4">
            <motion.span variants={fadeUp} className="text-crimson font-cinzel text-2xl font-bold">
              {data.number}
            </motion.span>
            <motion.div variants={lineGrow} className="h-[1px] w-12 bg-crimson" />
            <motion.span variants={fadeUp} className="text-stone-500 font-geist text-xs uppercase tracking-[0.2em]">
              {data.subtitle}
            </motion.span>
          </div>

          <motion.h2 
            variants={revealText} 
            className={`text-5xl md:text-8xl font-cormorant text-white leading-[0.9] ${isMassacre ? 'text-glow' : ''}`}
          >
            {data.title}
          </motion.h2>

          <motion.p variants={fadeUp} className="text-stone-400 font-cormorant text-xl md:text-2xl leading-relaxed max-w-lg">
            {data.description}
          </motion.p>

          <motion.div variants={fadeUp} className="pt-4">
             <p className="text-stone-300/60 font-cinzel text-sm uppercase tracking-widest mb-4">
                Analysis
             </p>
             <div className="flex flex-wrap gap-4">
                {data.stats?.map((stat, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/5 px-4 py-2 hover:bg-crimson/10 transition-colors duration-300">
                    <span className="text-xs text-stone-500 block uppercase">{stat.label}</span>
                    <span className="text-white font-cinzel">{stat.value}</span>
                  </div>
                ))}
                {!data.stats && (
                    <div className="text-xs text-stone-600 font-mono border border-stone-800 px-3 py-2">
                        NO DATA AVAILABLE
                    </div>
                )}
             </div>
          </motion.div>
        </motion.div>

        {/* Visual Side */}
        <motion.div 
          className="flex-1 w-full aspect-[4/5] md:aspect-square relative group perspective-1000"
          style={{ y: yVisual }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <div className="relative w-full h-full overflow-hidden border border-white/10 bg-stone-900/50 backdrop-blur-sm transition-all duration-700 group-hover:border-crimson/30">
            {/* Inner Content */}
            <div className={`absolute inset-0 flex items-center justify-center 
                ${isMassacre ? 'bg-gradient-to-br from-black via-red-950/20 to-black' : ''}
            `}>
               {/* Abstract Geometric Representation */}
               <div className="w-[80%] h-[80%] border border-white/5 relative rotate-45 group-hover:rotate-0 transition-transform duration-[1.5s] ease-in-out">
                   <div className="absolute inset-0 border border-white/5 scale-90" />
                   <div className="absolute inset-0 border border-white/5 scale-75" />
                   
                   {/* Center Kanji */}
                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 group-hover:rotate-0 transition-transform duration-[1.5s]">
                       <span className="font-cinzel text-6xl text-white/20">{data.kanji}</span>
                   </div>
               </div>
            </div>

            {/* Glitch Overlay for Massacre */}
            {isMassacre && (
                 <div className="absolute inset-0 bg-red-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-100 animate-pulse" />
            )}
          </div>
          
          {/* Tech lines */}
          <div className="absolute -bottom-4 -right-4 text-[10px] font-mono text-stone-600 writing-mode-vertical">
             // ARCHIVE_REF_{data.id.toUpperCase()}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Chapter;
