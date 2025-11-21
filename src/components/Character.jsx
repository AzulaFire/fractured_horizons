'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Character({
  name, // "kai" or "airi"
  emotion, // "smile", "angry", etc
  position = 'center', // left | right | center
  visible = true,
  scale = 1, // optional: adjust character size
}) {
  // image path
  const imgSrc = `/characters/${name}/${emotion}.png`;

  // positioning presets
  const positions = {
    left: 'left-4 bottom-0',
    right: 'right-4 bottom-0',
    center: 'left-1/2 -translate-x-1/2 bottom-0',
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={`${name}-${emotion}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.45 }}
          className={`absolute ${positions[position]} z-20 pointer-events-none`}
          style={{ transformOrigin: 'bottom center', scale }}
        >
          <Image
            src={imgSrc}
            alt={`${name}-${emotion}`}
            width={700}
            height={900}
            className='object-contain'
            priority
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
