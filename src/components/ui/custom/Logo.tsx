
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
        <span className="font-heading text-lg font-bold text-black">P</span>
      </div>
      <span className="font-heading text-xl font-semibold">Paradocs</span>
    </div>
  );
};

export default Logo;
