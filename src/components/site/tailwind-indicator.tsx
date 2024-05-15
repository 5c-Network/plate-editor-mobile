export function TailwindIndicator() {
  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed bottom-1 left-1 z-50 flex size-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white">
      <h6>5C</h6>
    </div>
  );
}
