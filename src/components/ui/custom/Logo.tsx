
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-paradocs-text">
        <span className="font-heading text-lg font-bold text-white">P</span>
      </div>
      <span className="font-heading text-xl font-semibold text-paradocs-text">Paradocs</span>
    </div>
  );
};

export default Logo;
