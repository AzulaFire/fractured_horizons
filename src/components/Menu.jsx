'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Menu({ choices }) {
  const [feedback, setFeedback] = useState('');

  const handleChoice = async (choice) => {
    const result = await choice.action();
    if (typeof result === 'string') setFeedback(result);
  };

  return (
    <div className='flex flex-col gap-2'>
      {choices.map((choice) => (
        <motion.div
          key={choice.label}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button
            variant='secondary'
            className='w-full justify-start bg-blue-600 hover:bg-blue-700 text-white'
            onClick={() => handleChoice(choice)}
          >
            {choice.label}
          </Button>
        </motion.div>
      ))}
      {feedback && <div className='text-sm mt-3 text-blue-300'>{feedback}</div>}
    </div>
  );
}
