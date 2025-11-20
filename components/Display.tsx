import React from 'react';
import { MAX_DIGITS } from '../constants';

interface DisplayProps {
  value: string;
  previousValue: string | null;
  operator: string | null;
  error: string | null;
}

export const Display: React.FC<DisplayProps> = ({ value, previousValue, operator, error }) => {
  // Dynamic font size based on length
  const getFontSize = (text: string) => {
    if (text.length > 10) return 'text-4xl';
    if (text.length > 7) return 'text-5xl';
    return 'text-6xl';
  };

  return (
    <div className="w-full bg-calc-display rounded-3xl p-6 mb-4 flex flex-col items-end justify-end shadow-inner min-h-[140px]">
      <div className="text-calc-textSec text-lg min-h-[1.5rem] font-mono opacity-70">
        {previousValue} {operator}
      </div>
      <div className={`font-mono font-bold text-white break-all ${getFontSize(value)} transition-all`}>
        {error ? <span className="text-red-400 text-4xl">{error}</span> : value}
      </div>
    </div>
  );
};
