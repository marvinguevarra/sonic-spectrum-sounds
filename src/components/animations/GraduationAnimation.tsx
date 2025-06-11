
import React, { useEffect, useState } from 'react';

interface GraduationAnimationProps {
  isActive: boolean;
  onComplete: () => void;
}

const GraduationAnimation = ({ isActive, onComplete }: GraduationAnimationProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; delay: number }>>([]);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    if (isActive) {
      // Show graduation image first
      setShowImage(true);
      
      // Then trigger confetti after a short delay
      setTimeout(() => {
        const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF'];
        const newParticles = Array.from({ length: 60 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 0.5
        }));
        
        setParticles(newParticles);
      }, 500);
      
      // Clean up after animation
      setTimeout(() => {
        setParticles([]);
        setShowImage(false);
        onComplete();
      }, 4000);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden bg-black/20 backdrop-blur-sm">
      {/* Graduation Photo */}
      {showImage && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div 
            className="animate-scale-in bg-white p-2 sm:p-4 rounded-lg shadow-2xl border-4 border-yellow-400 max-w-[90vw] max-h-[90vh] flex flex-col items-center"
            style={{
              animation: 'graduationPhoto 3.5s ease-out forwards'
            }}
          >
            <img 
              src="/lovable-uploads/385fb211-82fd-423c-b8ea-20cbb5017091.png" 
              alt="Angelo's Graduation" 
              className="w-full h-auto max-w-[280px] sm:max-w-xs md:max-w-sm rounded-lg object-contain"
            />
            <div className="text-center mt-2 font-bold text-sm sm:text-lg md:text-xl text-yellow-600 px-2">
              🎓 Congratulations Angelo! 🎓
            </div>
          </div>
        </div>
      )}

      {/* Confetti */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            animation: 'confettiFall 3s ease-out forwards',
            transform: 'rotate(45deg)',
          }}
        />
      ))}

      <style>{`
        @keyframes graduationPhoto {
          0% {
            transform: scale(0) rotate(-10deg);
            opacity: 0;
          }
          20% {
            transform: scale(1.1) rotate(2deg);
            opacity: 1;
          }
          40% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          90% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(0.8) rotate(0deg);
            opacity: 0;
          }
        }
        
        @keyframes confettiFall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default GraduationAnimation;
