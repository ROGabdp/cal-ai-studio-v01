import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick, className = '', disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        h-16 sm:h-20 rounded-2xl text-xl sm:text-2xl font-semibold transition-all duration-100 active:scale-95 flex items-center justify-center shadow-lg
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {label}
    </button>
  );
};
