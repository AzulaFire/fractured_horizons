import { useGameStore } from '@/state/gameStore';
import { Button } from './ui/button';

export default function FragmentInventory() {
  const fragments = useGameStore((state) => state.fragments);
  const toggleInventory = useGameStore((state) => state.toggleInventory);
  const show = useGameStore((state) => state.showInventory);

  if (!show) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'>
      <div className='bg-gray-900 text-white p-6 rounded-lg w-96 max-w-full'>
        <h2 className='text-xl mb-4'>Fragments</h2>
        {fragments.length ? (
          <ul className='mb-4'>
            {fragments.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        ) : (
          <p className='mb-4'>No fragments collected.</p>
        )}
        <Button
          className='bg-cyan-700/30 hover:bg-cyan-600/60 text-cyan-200 border border-cyan-500/50 rounded-xl'
          onClick={toggleInventory}
        >
          test
        </Button>
      </div>
    </div>
  );
}
