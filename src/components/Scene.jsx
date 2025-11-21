export default function Scene({ background, children }) {
  return (
    <div
      className='w-screen h-screen bg-cover bg-center relative'
      style={{ backgroundImage: `url(${background})` }}
    >
      {children}
    </div>
  );
}
