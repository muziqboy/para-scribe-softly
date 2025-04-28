
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`w-10 h-10 ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M50 10C32.8 10 19 23.8 19 41c0 14.3 9.8 26.3 23 29.7V80c0 2.2 1.8 4 4 4s4-1.8 4-4v-9.3c13.2-3.4 23-15.4 23-29.7 0-17.2-13.8-31-31-31zm0 54c-12.7 0-23-10.3-23-23s10.3-23 23-23 23 10.3 23 23-10.3 23-23 23z"
          fill="#F7F7F2"
        />
      </svg>
    </div>
  );
};

export default Logo;
