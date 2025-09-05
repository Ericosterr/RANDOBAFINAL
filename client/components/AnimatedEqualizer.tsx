export function AnimatedEqualizer() {
  // Create 25 bars for a fuller look
  const bars = Array.from({ length: 25 }, (_, i) => i);

  return (
    <>
      {/* Global CSS for equalizer animations */}
      <style>
        {`
          @keyframes eq-1 {
            0%, 100% { transform: scaleY(0.3); }
            25% { transform: scaleY(1); }
            50% { transform: scaleY(0.6); }
            75% { transform: scaleY(0.8); }
          }
          @keyframes eq-2 {
            0%, 100% { transform: scaleY(0.5); }
            20% { transform: scaleY(0.8); }
            40% { transform: scaleY(1); }
            60% { transform: scaleY(0.4); }
            80% { transform: scaleY(0.7); }
          }
          @keyframes eq-3 {
            0%, 100% { transform: scaleY(0.4); }
            30% { transform: scaleY(0.9); }
            60% { transform: scaleY(0.2); }
            90% { transform: scaleY(1); }
          }
          @keyframes eq-4 {
            0%, 100% { transform: scaleY(0.6); }
            15% { transform: scaleY(0.3); }
            35% { transform: scaleY(1); }
            55% { transform: scaleY(0.5); }
            75% { transform: scaleY(0.9); }
          }
          @keyframes eq-5 {
            0%, 100% { transform: scaleY(0.2); }
            25% { transform: scaleY(0.7); }
            50% { transform: scaleY(1); }
            75% { transform: scaleY(0.4); }
          }

          .equalizer-bar {
            transform-origin: bottom;
          }
        `}
      </style>

      {/* Equalizer bars */}
      <div className="flex items-end space-x-1">
        {bars.map((bar, index) => {
          const animationName = `eq-${(index % 5) + 1}`;
          const duration = 0.8 + (Math.random() * 0.8); // 0.8s to 1.6s
          const delay = Math.random() * 1; // 0 to 1s delay

          return (
            <div
              key={bar}
              className="bg-white rounded-t-sm equalizer-bar"
              style={{
                width: '2px',
                height: '40px',
                animationName: animationName,
                animationDuration: `${duration}s`,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>
    </>
  );
}
