
import React from 'react';

export const Scanlines: React.FC = () => {
  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.3) 0px, rgba(0, 0, 0, 0.3) 1px, transparent 1px, transparent 3px)',
        zIndex: 1,
      }}
    />
  );
};
