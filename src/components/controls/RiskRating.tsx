import React from 'react';
import { RiskLevel } from '../../types';

interface RiskRatingProps {
  rating: RiskLevel;
  size?: 'small' | 'medium' | 'large';
}

const RiskRating: React.FC<RiskRatingProps> = ({ rating, size = 'medium' }) => {
  const getRatingConfig = () => {
    switch (rating) {
      case 'low':
        return {
          text: 'Low',
          bgColor: 'bg-success-100',
          textColor: 'text-success-700',
          borderColor: 'border-success-200',
        };
      case 'medium':
        return {
          text: 'Medium',
          bgColor: 'bg-warning-100',
          textColor: 'text-warning-700',
          borderColor: 'border-warning-200',
        };
      case 'high':
        return {
          text: 'High',
          bgColor: 'bg-error-100',
          textColor: 'text-error-700',
          borderColor: 'border-error-200',
        };
      case 'critical':
        return {
          text: 'Critical',
          bgColor: 'bg-error-200',
          textColor: 'text-error-800',
          borderColor: 'border-error-300',
        };
      default:
        return {
          text: 'Unknown',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-200',
        };
    }
  };

  const { text, bgColor, textColor, borderColor } = getRatingConfig();

  const sizeClasses = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-2.5 py-1 text-xs',
    large: 'px-3 py-1.5 text-sm',
  };

  return (
    <div className={`inline-flex items-center rounded-full ${bgColor} ${textColor} ${borderColor} border ${sizeClasses[size]}`}>
      <span className="font-medium">{text}</span>
    </div>
  );
};

export default RiskRating;