'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function TextBox({
  text = '',
  onNext,
  children,
  visible = true,
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [typing, setTyping] = useState(true);
  const [showBox, setShowBox] = useState(visible);
  const skipRef = useRef(false);

  // Typing effect (fixed off-by-one + undefined)
  useEffect(() => {
    if (!text) {
      setDisplayedText('');
      return;
    }
    setDisplayedText('');
    setTyping(true);
    skipRef.current = false;
    let i = 0;

    const interval = setInterval(() => {
      if (skipRef.current) {
        setDisplayedText(text);
        setTyping(false);
        clearInterval(interval);
        return;
      }
      if (i < text.length) {
        setDisplayedText((prev) => prev + text[i]);
        i++;
      } else {
        setTyping(false);
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [text]);

  // Handle keys
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key.toLowerCase() === 'h') setShowBox((s) => !s);
      if (e.key === 'Enter') {
        if (typing) skipRef.current = true;
        else onNext && onNext();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [typing, onNext]);

  // Prevent scrollbar flicker when hiding textbox
  useEffect(() => {
    if (showBox) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'hidden'; // still hidden
  }, [showBox]);

  const handleClick = () => {
    if (typing) skipRef.current = true;
    else onNext && onNext();
  };

  return (
    <AnimatePresence>
      {showBox && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          className='absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl
                     bg-black/70 text-white rounded-2xl p-6 shadow-xl select-none cursor-pointer'
          onClick={handleClick}
        >
          <div className='text-lg leading-relaxed min-h-20 whitespace-pre-line'>
            {displayedText}
          </div>
          {children && <div className='mt-4'>{children}</div>}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
