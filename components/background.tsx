export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pokemon-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/80 backdrop-blur-[8px]" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
    </div>
  );
}
