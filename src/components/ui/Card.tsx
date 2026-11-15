import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, hoverable = false }) => {
  return (
    <div 
      className={`glass-card p-6 ${hoverable ? 'cursor-pointer hover:shadow-lg' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
