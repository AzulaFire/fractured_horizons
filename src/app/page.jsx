'use client';

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { ChevronDown, Zap, Shield, Cpu, Eye } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Page() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: Zap,
      title: 'Neural Speed',
      desc: 'Quantum processing architecture',
    },
    {
      icon: Shield,
      title: 'Stack Security',
      desc: 'Military-grade encryption',
    },
    { icon: Cpu, title: 'Bio-Integration', desc: 'Seamless human interface' },
    {
      icon: Eye,
      title: 'Augmented Vision',
      desc: 'Enhanced reality perception',
    },
  ];

  return (
    <div className='relative min-h-screen bg-black overflow-hidden'>
      {/* Animated Grid Background */}
      <div
        className='absolute inset-0 opacity-30'
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `perspective(500px) rotateX(60deg) translateY(-50%)`,
          transformOrigin: 'center top',
        }}
      />

      {/* Gradient Overlays */}
      <div className='absolute inset-0 bg-linear-to-b from-purple-900/20 via-transparent to-cyan-900/20' />
      <div
        className='absolute inset-0 opacity-50 transition-all duration-300'
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Floating Particles */}
      {isLoaded &&
        [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-1 h-1 bg-cyan-400 rounded-full'
            initial={{
              // eslint-disable-next-line react-hooks/purity
              x: Math.random() * window.innerWidth,
              // eslint-disable-next-line react-hooks/purity
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              // eslint-disable-next-line react-hooks/purity
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              // eslint-disable-next-line react-hooks/purity
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
              // eslint-disable-next-line react-hooks/purity
              delay: Math.random() * 5,
            }}
          />
        ))}

      {/* Hero Section */}
      <motion.div
        className='relative z-10 flex flex-col items-center justify-center min-h-screen px-6'
        style={{ opacity, scale }}
      >
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className='mb-8'
        >
          <div className='relative'>
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(0, 255, 255, 0.5)',
                  '0 0 60px rgba(0, 255, 255, 0.8)',
                  '0 0 20px rgba(0, 255, 255, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className='text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-red-600 to-cyan-400'
            >
              FRACTURED HORIZONS
            </motion.div>
            <div className='absolute -inset-1 bg-linear-to-r from-cyan-600 to-purple-600 opacity-30 blur-xl' />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className='text-center mb-12'
        >
          <h2 className='text-xl md:text-3xl font-light text-cyan-300 mb-4 tracking-wider uppercase'>
            Echoes of Airi
          </h2>
          <p className='text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed'>
            In the ruins of tomorrow, every memory is a doorway—and every
            doorway leads back to her.
          </p>
        </motion.div>

        {/* Holographic Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className='relative mb-12'
        >
          <div className='relative border border-cyan-500/30 bg-black/50 backdrop-blur-sm p-8 rounded-lg'>
            {/* Corner Decorations */}
            {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(
              (corner) => (
                <div
                  key={corner}
                  className={`absolute w-4 h-4 border-cyan-400 ${
                    corner.includes('top') ? 'border-t-2' : 'border-b-2'
                  } ${corner.includes('left') ? 'border-l-2' : 'border-r-2'} ${
                    corner.includes('top') ? 'top-0' : 'bottom-0'
                  } ${corner.includes('left') ? 'left-0' : 'right-0'}`}
                />
              )
            )}

            <div className='flex gap-6'>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 30px rgba(0, 255, 255, 0.6)',
                }}
                whileTap={{ scale: 0.95 }}
                className='px-8 py-4 bg-linear-to-r from-cyan-500 to-blue-600 text-black font-bold rounded-md relative overflow-hidden group flex justify-center items-center
'
              >
                <Link href='/chapter1'>
                  <span className='relative z-10'>INITIALIZE</span>
                </Link>
                <motion.div
                  className='absolute inset-0 bg-linear-to-r from-cyan-300 to-blue-400'
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='px-8 py-4 border-2 border-cyan-500 text-cyan-400 font-bold rounded-md hover:bg-cyan-500/10 transition-colors'
              >
                LEARN MORE
              </motion.button>
            </div>
          </div>

          {/* Glow Effect */}
          <div className='absolute inset-0 bg-cyan-500/20 blur-2xl -z-10' />
        </motion.div>

        {/* Scroll Indicator */}
        {/* <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className='absolute bottom-8'
        >
          <ChevronDown className='w-8 h-8 text-cyan-400' />
        </motion.div> */}
      </motion.div>

      {/* Features Section */}
      <div className='relative z-10 py-32 px-6'>
        <div className='max-w-7xl mx-auto'>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className='text-4xl md:text-5xl font-bold text-center mb-20 text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400'
          >
            STACK CAPABILITIES
          </motion.h3>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className='relative group'
              >
                <div className='border border-cyan-500/30 bg-black/50 backdrop-blur-sm p-6 rounded-lg h-full hover:border-cyan-400/60 transition-all duration-300'>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className='w-16 h-16 bg-linear-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center mb-4'
                  >
                    <feature.icon className='w-8 h-8 text-black' />
                  </motion.div>

                  <h4 className='text-xl font-bold text-cyan-300 mb-2'>
                    {feature.title}
                  </h4>
                  <p className='text-gray-400 text-sm'>{feature.desc}</p>

                  {/* Hover Glow */}
                  <div className='absolute inset-0 bg-linear-to-br from-cyan-500/0 to-purple-600/0 group-hover:from-cyan-500/10 group-hover:to-purple-600/10 rounded-lg transition-all duration-300 -z-10' />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Stream Effect */}
      <div className='fixed top-0 right-0 h-full w-px opacity-20'>
        <motion.div
          animate={{ y: ['0%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className='w-full h-32 bg-linear-to-b from-transparent via-cyan-400 to-transparent'
        />
      </div>

      {/* Scanline Effect */}
      <motion.div
        animate={{ y: ['0%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className='fixed inset-x-0 h-px bg-linear-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none'
      />
    </div>
  );
}
