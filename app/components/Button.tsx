import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  backgroundColor = 'bg-primary',
  textColor = 'text-secondary',
  disabled = false,
  onClick,
  className = '',
}) => {
  const baseClasses = 'w-full inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none';
  
  const sizeClasses = 'h-[52px] text-[16px] px-6 text-base rounded-full';
  
  const stateClasses = disabled 
    ? 'opacity-80 cursor-not-allowed' 
    : 'hover:opacity-90 active:opacity-75 cursor-pointer';
  
  const classes = [
    baseClasses,
    sizeClasses,
    backgroundColor,
    textColor,
    stateClasses,
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </button>
  );
};

export default Button;
