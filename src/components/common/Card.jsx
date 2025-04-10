// Card.jsx
import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  title, 
  subtitle, 
  footer, 
  headerAction,
  hoverable = false,
  onClick
}) => {
  const baseClasses = "bg-dark-card rounded-lg overflow-hidden shadow-lg";
  const hoverClasses = hoverable ? "transition-transform hover:scale-102 cursor-pointer" : "";
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {(title || subtitle || headerAction) && (
        <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
          <div>
            {title && <h3 className="text-lg font-medium text-white">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      
      <div className="px-6 py-4">
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-3 bg-dark-lighter border-t border-gray-700">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;