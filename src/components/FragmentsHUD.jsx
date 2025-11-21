'use client';
import { useGameStore } from '@/state/gameStore';
import { motion } from 'framer-motion';
import { Puzzle } from 'lucide-react';

export default function FragmentsHUD() {
  const fragments = useGameStore((s) => s.fragments);
  const toggleInventory = useGameStore((s) => s.toggleInventory);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className='absolute top-4 right-6 flex items-center gap-2 cursor-pointer select-none'
      onClick={toggleInventory}
    >
      <Puzzle className='text-blue-300' size={20} />
      <span className='text-sm font-medium text-blue-200'>
        Fragments: {fragments.length}
      </span>
    </motion.div>
  );
}
