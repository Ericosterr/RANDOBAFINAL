export function ModernEqualizer() {
  // Create 40 bars for a fuller, more modern look
  const bars = Array.from({ length: 40 }, (_, i) => i);

  return (
    <>
      {/* Global CSS for modern equalizer animations */}
      <style>
        {`
          @keyframes modern-eq-1 {
            0%, 100% {
              transform: scaleY(0.2);
            }
            25% {
              transform: scaleY(1);
            }
            50% {
              transform: scaleY(0.6);
            }
            75% {
              transform: scaleY(0.8);
            }
          }
          @keyframes modern-eq-2 {
            0%, 100% {
              transform: scaleY(0.4);
            }
            20% {
              transform: scaleY(0.9);
            }
            40% {
              transform: scaleY(1);
            }
            60% {
              transform: scaleY(0.3);
            }
            80% {
              transform: scaleY(0.7);
            }
          }
          @keyframes modern-eq-3 {
            0%, 100% {
              transform: scaleY(0.3);
            }
            30% {
              transform: scaleY(0.95);
            }
            60% {
              transform: scaleY(0.2);
            }
            90% {
              transform: scaleY(1);
            }
          }
          @keyframes modern-eq-4 {
            0%, 100% {
              transform: scaleY(0.5);
            }
            15% {
              transform: scaleY(0.25);
            }
            35% {
              transform: scaleY(1);
            }
            55% {
              transform: scaleY(0.6);
            }
            75% {
              transform: scaleY(0.85);
            }
          }
          @keyframes modern-eq-5 {
            0%, 100% {
              transform: scaleY(0.15);
            }
            25% {
              transform: scaleY(0.8);
            }
            50% {
              transform: scaleY(1);
            }
            75% {
              transform: scaleY(0.45);
            }
          }
          @keyframes modern-eq-6 {
            0%, 100% {
              transform: scaleY(0.35);
            }
            33% {
              transform: scaleY(0.9);
            }
            66% {
              transform: scaleY(0.6);
            }
          }

          .modern-equalizer-bar {
            transform-origin: bottom;
            background: linear-gradient(to top, #a1a1aa, #d4d4d8, #f4f4f5, #ffffff);
            background-size: 100% 400%;
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
          }

          .modern-equalizer-container {
            filter: drop-shadow(0 4px 20px rgba(255, 255, 255, 0.2));
          }

          @keyframes glow-pulse {
            0%, 100% { filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3)); }
            50% { filter: drop-shadow(0 0 25px rgba(255, 255, 255, 0.6)); }
          }
        `}
      </style>

      {/* Modern Equalizer bars */}
      <div className="modern-equalizer-container flex items-end justify-center space-x-1">
        {bars.map((bar, index) => {
          const animationName = `modern-eq-${(index % 6) + 1}`;
          const duration = 0.6 + (Math.random() * 1.2); // 0.6s to 1.8s
          const delay = Math.random() * 2; // 0 to 2s delay
          const height = 30 + (index % 3) * 20; // Varying heights: 30px, 50px, 70px

          return (
            <div
              key={bar}
              className="modern-equalizer-bar rounded-t-lg"
              style={{
                width: '3px',
                height: `${height}px`,
                animationName: `${animationName}, glow-pulse`,
                animationDuration: `${duration}s, 3s`,
                animationTimingFunction: 'ease-in-out, ease-in-out',
                animationIterationCount: 'infinite, infinite',
                animationDelay: `${delay}s, 0s`,
                backgroundPosition: `0 ${(index % 4) * 25}%`,
              }}
            />
          );
        })}
      </div>
    </>
  );
}
