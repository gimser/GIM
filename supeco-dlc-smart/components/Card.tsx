
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, className = '', icon }) => {
  return (
    <div className={`bg-supeco-dark p-6 rounded-lg shadow-lg border border-supeco-light-gray ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
        {icon && <div className="text-supeco-yellow">{icon}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Card;
