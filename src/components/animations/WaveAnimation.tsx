
import React, { useEffect, useState } from 'react';

interface WaveAnimationProps {
  isActive: boolean;
  onComplete: () => void;
}

const WaveAnimation = ({ isActive, onComplete }: WaveAnimationProps) => {
  const [waves, setWaves] = useState<Array<{ id: number; delay: number }>>([]);

  useEffect(() => {
    if (isActive) {
      const newWaves = Array.from({ length: 3 }, (_, i) => ({
        id: i,
        delay: i * 0.3
      }));
      
      setWaves(newWaves);
      
      // Clean up after animation
      setTimeout(() => {
        setWaves([]);
        onComplete();
      }, 2500);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-50 flex items-end justify-center">
        {waves.map((wave) => (
          <div
            key={wave.id}
            className="absolute bottom-0 w-full h-20 opacity-60"
            style={{
              background: 'linear-gradient(to top, #4FC3F7, transparent)',
              borderRadius: '50%',
              animationDelay: `${wave.delay}s`,
              animation: 'wave-rise 2s ease-out forwards'
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes wave-rise {
          0% {
            transform: translateY(100px) scaleX(0.5);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-50px) scaleX(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default WaveAnimation;
