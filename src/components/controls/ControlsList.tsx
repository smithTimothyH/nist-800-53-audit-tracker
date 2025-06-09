import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Control } from '../../types';
import ControlItem from './ControlItem';

interface ControlsListProps {
  controls: Control[];
  title?: string;
}

const ControlsList: React.FC<ControlsListProps> = ({ controls, title = 'Controls' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [familyFilter, setFamilyFilter] = useState<string>('all');
  
  // Get unique families from controls
  const families = [...new Set(controls.map(control => control.family))];
  
  // Filter controls based on search term and filters
  const filteredControls = controls.filter(control => {
    const matchesSearch = 
      control.controlId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      control.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      control.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || control.status === statusFilter;
    const matchesFamily = familyFilter === 'all' || control.family === familyFilter;
    
    return matchesSearch && matchesStatus && matchesFamily;
  });

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">{title}</h2>
        
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search controls..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center">
          <Filter size={18} className="text-gray-500 mr-2" />
          <span className="text-sm font-medium text-gray-700 mr-2">Status:</span>
          <select
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="compliant">Compliant</option>
            <option value="partial">Partial</option>
            <option value="non-compliant">Non-Compliant</option>
            <option value="not-assessed">Not Assessed</option>
          </select>
        </div>
        
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-2">Family:</span>
          <select
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={familyFilter}
            onChange={(e) => setFamilyFilter(e.target.value)}
          >
            <option value="all">All Families</option>
            {families.map(family => (
              <option key={family} value={family}>{family}</option>
            ))}
          </select>
        </div>
      </div>
      
      {filteredControls.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-600">No controls found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredControls.map(control => (
            <ControlItem key={control.id} control={control} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ControlsList;