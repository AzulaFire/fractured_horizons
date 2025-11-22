'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { screens } from '../data/intro_screens.json';
import Link from 'next/link';

export default function ChapterOne() {
  const [screenIndex, setScreenIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [hideBox, setHideBox] = useState(false);
  const [finalScreenReady, setFinalScreenReady] = useState(false);

  // MOBILE DETECTION
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const MOBILE_OFFSET = isMobile ? 60 : 0; // slightly increased for positioning
  const CHARACTER_ADJUST = isMobile ? -80 : 0;

  const screen = screens[screenIndex];
  const fullText = screen.text[textIndex];

  // --- TYPEWRITER EFFECT ---
  useEffect(() => {
    let cancelled = false;

    async function typeText() {
      setDisplayedText('');
      setIsTyping(true);

      for (let i = 0; i < fullText.length; i++) {
        if (cancelled) return;
        setDisplayedText((prev) => prev + fullText.charAt(i));
        await new Promise((r) => setTimeout(r, 35));
      }

      setIsTyping(false);
      // Do NOT automatically show final screen here
    }

    if (fullText) typeText();
    return () => {
      cancelled = true;
    };
  }, [fullText, screenIndex, textIndex]);

  // --- ADVANCE LOGIC ---
  const handleAdvance = () => {
    if (isTyping) return;

    const isLastText = textIndex === screen.text.length - 1;
    const isLastScreen = screenIndex === screens.length - 1;

    if (!isLastText) {
      setTextIndex(textIndex + 1);
      return;
    }

    if (!isLastScreen) {
      setScreenIndex(screenIndex + 1);
      setTextIndex(0);
      return;
    }

    // Last text of last screen -> user must advance
    if (isLastScreen && isLastText) {
      setFinalScreenReady(true);
    }
  };

  // --- KEYBOARD SUPPORT ---
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter') handleAdvance();
      if (e.key.toLowerCase() === 'h') setHideBox((prev) => !prev);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // --- GET CHARACTER DATA ---
  const getCharacter = (name) => {
    if (!screen.character || screen.character.name !== name) return null;
    const expressions = screen.character.expressions || [];
    const expression = expressions[textIndex] || 'normal';
    return { name, expression };
  };

  const kai = getCharacter('kai');
  const airi = getCharacter('airi');

  // --- CHARACTER POSITION FIX ---
  const characterBottom = hideBox ? 0 : isMobile ? 24 : 12;
  const raisedBottom = `calc(${characterBottom}% + ${
    20 + MOBILE_OFFSET + CHARACTER_ADJUST
  }px)`;

  return (
    <div
      className='relative w-full h-screen bg-black overflow-hidden text-white'
      onClick={handleAdvance}
    >
      {/* MOBILE TAP-TO-ADVANCE FIX: only before final screen */}
      {!finalScreenReady && (
        <button
          className='absolute inset-0 z-30 block md:hidden'
          style={{ background: 'transparent' }}
          onClick={(e) => {
            e.stopPropagation();
            handleAdvance();
          }}
        />
      )}

      {/* BACKGROUND */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={`screen-${screenIndex}`}
          className='absolute inset-0 w-full h-full'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.8 } }}
        >
          <Image
            src={
              screen.background.startsWith('/')
                ? screen.background
                : `/images/${screen.background}`
            }
            alt='Scene Background'
            width={1920}
            height={1080}
            className='absolute inset-0 w-full h-full object-cover opacity-70'
            loading='eager'
          />

          {/* --- KAI --- */}
          <AnimatePresence mode='wait'>
            {kai && (
              <motion.img
                key={`kai-${kai.expression}`}
                src={`/characters/kai/${kai.expression}.png`}
                alt='Kai'
                className='absolute h-[70%] object-contain z-10 left-1/2 -translate-x-1/2 md:left-48 md:translate-x-0'
                style={{ bottom: raisedBottom }}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{
                  opacity: { duration: 0.5 },
                  x: { duration: 0.4 },
                }}
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </AnimatePresence>

          {/* --- AIRI --- */}
          <AnimatePresence mode='wait'>
            {airi && (
              <motion.img
                key={`airi-${airi.expression}`}
                src={`/characters/airi/${airi.expression}.png`}
                alt='Airi'
                className='absolute h-[70%] object-contain z-10 left-1/2 -translate-x-1/2 md:right-24 md:left-auto md:translate-x-0'
                style={{ bottom: raisedBottom }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{
                  opacity: { duration: 0.5 },
                  x: { duration: 0.4 },
                }}
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* --- TEXTBOX & FINAL SCREEN --- */}
      <AnimatePresence>
        {!hideBox && (
          <motion.div
            className='absolute left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] bg-black/70 border border-cyan-500/50 rounded-2xl p-6 text-lg leading-relaxed font-light backdrop-blur-md shadow-lg z-20'
            style={{ bottom: isMobile ? 80 : 32 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className='whitespace-pre-line text-cyan-50'>{displayedText}</p>

            {finalScreenReady && (
              <motion.div
                className='mt-6 flex flex-col items-center gap-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Image
                  src='/images/book_cover.png'
                  alt='Fractured Horizons Book Cover'
                  width={260}
                  height={380}
                  className='rounded-xl shadow-xl'
                />
                <Button
                  className='bg-cyan-700/30 hover:bg-cyan-600/60 text-cyan-200 border border-cyan-500/50 rounded-xl px-6 py-3 text-lg'
                  onClick={() => (window.location.href = '/book')}
                >
                  Learn More / Buy the Book
                </Button>
                <Link href='/'>
                  <Button className='bg-cyan-700/30 hover:bg-cyan-600/60 text-cyan-200 border border-cyan-500/50 rounded-xl px-6 py-3 text-lg'>
                    Home
                  </Button>
                </Link>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
