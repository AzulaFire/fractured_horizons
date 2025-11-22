'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ChapterOne() {
  const [screenIndex, setScreenIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayText, setDisplayText] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // SCREEN DATA
  const screens = [
    {
      bg: '/chapter1/bg1.webp',
      character: '',
      text: [
        'Fragments of static hum under neon ruins…',
        'Memory and reality blur in the glow of old Tokyo.',
        'You take your first step into the Collapse.',
      ],
    },
    {
      bg: '/chapter1/bg2.webp',
      character: '/chapter1/kai.webp',
      characterBottom: 10,
      text: [
        'Kai: Another signal spike… Airi, is that you?',
        'The interference grows sharper—a voice trying to break through.',
      ],
    },
    {
      bg: '/chapter1/bg3.webp',
      character: '/chapter1/airi.webp',
      characterBottom: 5,
      text: [
        'Airi: Papa… I’m here…',
        'But the voice fractures, unstable and distant.',
      ],
    },
  ];

  const screen = screens[screenIndex];

  // TYPEWRITER
  useEffect(() => {
    setIsTyping(true);
    setDisplayText('');

    const fullText = screen.text[textIndex];
    let i = 0;

    const interval = setInterval(() => {
      setDisplayText((prev) => prev + fullText[i]);
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [screen.text, screenIndex, textIndex]);

  // ADVANCE LOGIC
  const handleAdvance = () => {
    if (isTyping) return;

    if (textIndex < screen.text.length - 1) {
      setTextIndex((t) => t + 1);
    } else if (screenIndex < screens.length - 1) {
      setScreenIndex((s) => s + 1);
      setTextIndex(0);
    }
  };

  // CHARACTER MOBILE POSITION FIX
  const MOBILE_OFFSET = isMobile ? 120 : 0;
  const CHARACTER_ADJUST = isMobile ? -120 : 0;

  const raisedBottom =
    screen.characterBottom !== undefined
      ? `calc(${screen.characterBottom}% + ${
          20 + MOBILE_OFFSET + CHARACTER_ADJUST
        }px)`
      : 'auto';

  return (
    <div className='relative w-full h-screen overflow-hidden bg-black'>
      {/* Background */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={screen.bg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className='absolute inset-0'
        >
          <Image
            src={screen.bg}
            alt='Background'
            fill
            className='object-cover'
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* CHARACTER */}
      <AnimatePresence mode='wait'>
        {screen.character && (
          <motion.div
            key={screen.character}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className='absolute left-1/2 transform -translate-x-1/2'
            style={{
              bottom: raisedBottom,
              height: isMobile ? '44vh' : '80vh',
              width: 'auto',
            }}
          >
            <Image
              src={screen.character}
              alt='Character'
              height={isMobile ? 600 : 1200}
              width={isMobile ? 600 : 1200}
              className='object-contain'
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* TAP-TO-ADVANCE (mobile only) */}
      {/* FIXED: overlay disappears at final modal so buttons work */}
      {!(
        screenIndex === screens.length - 1 &&
        textIndex === screen.text.length - 1 &&
        !isTyping
      ) && (
        <button
          className='absolute inset-0 z-30 block md:hidden'
          style={{ background: 'transparent' }}
          onClick={(e) => {
            e.stopPropagation();
            handleAdvance();
          }}
        />
      )}

      {/* TEXTBOX */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={screenIndex + '-' + textIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className='absolute left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] lg:w-[60%] z-20'
          style={{
            bottom: isMobile ? 140 : 32,
          }}
        >
          <div className='p-4 md:p-6 rounded-xl backdrop-blur-md bg-black/60 border border-white/10'>
            <p className='text-white text-base md:text-xl leading-relaxed'>
              {displayText}
              {isTyping && <span className='blink'>▌</span>}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* FINAL BOOK MODAL */}
      {screenIndex === screens.length - 1 &&
        textIndex === screen.text.length - 1 &&
        !isTyping && (
          <motion.div
            initial={false} // ← FIX: eliminates flicker
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className='absolute inset-0 flex items-center justify-center z-40'
          >
            <div className='p-8 bg-black/80 backdrop-blur-md rounded-xl border border-white/10 text-center'>
              <p className='text-white text-lg mb-6'>Chapter One Complete</p>

              <Link href='/chapters/chapter2'>
                <button className='px-6 py-3 bg-white text-black font-semibold rounded-md'>
                  Continue
                </button>
              </Link>
            </div>
          </motion.div>
        )}
    </div>
  );
}
