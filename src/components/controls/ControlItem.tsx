import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Control } from '../../types';
import StatusBadge from './StatusBadge';

interface ControlItemProps {
  control: Control;
}

const ControlItem: React.FC<ControlItemProps> = ({ control }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/controls/${control.id}`);
  };
  
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer animate-fade-in"
      onClick={handleClick}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{control.controlId}</h3>
          <StatusBadge status={control.status} />
        </div>
        <h4 className="font-medium text-gray-800 mb-2">{control.title}</h4>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{control.description}</p>
        
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            Last updated: {formatDate(control.lastUpdated)}
          </div>
          <button 
            className="flex items-center text-primary-600 text-sm font-medium hover:text-primary-800"
            onClick={handleClick}
          >
            Details
            <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlItem;