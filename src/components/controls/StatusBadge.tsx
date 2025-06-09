import React from 'react';
import { CheckCircle, AlertCircle, XCircle, HelpCircle } from 'lucide-react';
import { Status } from '../../types';

interface StatusBadgeProps {
  status: Status;
  size?: 'small' | 'medium' | 'large';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'medium' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'compliant':
        return {
          icon: <CheckCircle size={size === 'small' ? 14 : 16} />,
          text: 'Compliant',
          bgColor: 'bg-success-100',
          textColor: 'text-success-700',
          borderColor: 'border-success-200',
        };
      case 'partial':
        return {
          icon: <AlertCircle size={size === 'small' ? 14 : 16} />,
          text: 'Partial',
          bgColor: 'bg-warning-100',
          textColor: 'text-warning-700',
          borderColor: 'border-warning-200',
        };
      case 'non-compliant':
        return {
          icon: <XCircle size={size === 'small' ? 14 : 16} />,
          text: 'Non-Compliant',
          bgColor: 'bg-error-100',
          textColor: 'text-error-700',
          borderColor: 'border-error-200',
        };
      default:
        return {
          icon: <HelpCircle size={size === 'small' ? 14 : 16} />,
          text: 'Not Assessed',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-200',
        };
    }
  };

  const { icon, text, bgColor, textColor, borderColor } = getStatusConfig();

  const sizeClasses = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-2.5 py-1 text-xs',
    large: 'px-3 py-1.5 text-sm',
  };

  return (
    <div className={`flex items-center space-x-1 rounded-full ${bgColor} ${textColor} ${borderColor} border ${sizeClasses[size]}`}>
      {icon}
      <span className="font-medium">{text}</span>
    </div>
  );
};

export default StatusBadge;