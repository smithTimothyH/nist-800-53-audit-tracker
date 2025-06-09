import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  AlertCircle, 
  Trash2,
  FileText,
  Calendar,
  Clock
} from 'lucide-react';
import { useControls } from '../context/ControlsContext';
import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import StatusBadge from '../components/controls/StatusBadge';
import RiskRating from '../components/controls/RiskRating';
import FileUpload from '../components/controls/FileUpload';
import { Status, RiskLevel, Evidence } from '../types';

const ControlDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getControl, updateControlStatus, updateControlNotes, updateControlRiskRating, updateControlMitigationPlan, addControlEvidence, removeControlEvidence } = useControls();
  const { hasPermission } = useAuth();
  
  const [control, setControl] = useState(getControl(id || ''));
  const [status, setStatus] = useState<Status>(control?.status || 'not-assessed');
  const [notes, setNotes] = useState(control?.notes || '');
  const [riskRating, setRiskRating] = useState<RiskLevel>(control?.riskRating || 'medium');
  const [mitigationPlan, setMitigationPlan] = useState(control?.mitigationPlan || '');
  const [isSaving, setIsSaving] = useState(false);
  
  const canEdit = hasPermission('contributor');
  
  useEffect(() => {
    const updatedControl = getControl(id || '');
    setControl(updatedControl);
    if (updatedControl) {
      setStatus(updatedControl.status);
      setNotes(updatedControl.notes);
      setRiskRating(updatedControl.riskRating);
      setMitigationPlan(updatedControl.mitigationPlan);
    }
  }, [id, getControl]);
  
  if (!control) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-warning-500 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Control Not Found</h2>
        <p className="text-gray-600 mb-6">The control you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/controls')}>Return to Controls</Button>
      </div>
    );
  }
  
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call delay
    setTimeout(() => {
      updateControlStatus(control.id, status);
      updateControlNotes(control.id, notes);
      updateControlRiskRating(control.id, riskRating);
      updateControlMitigationPlan(control.id, mitigationPlan);
      setIsSaving(false);
    }, 500);
  };
  
  const handleUploadEvidence = (file: { name: string; type: string; url: string }) => {
    addControlEvidence(control.id, {
      name: file.name,
      type: file.type,
      url: file.url,
      dateAdded: new Date().toISOString(),
    });
  };
  
  const handleDeleteEvidence = (evidenceId: string) => {
    if (confirm('Are you sure you want to delete this evidence?')) {
      removeControlEvidence(control.id, evidenceId);
    }
  };
  
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <button
          onClick={() => navigate('/controls')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} className="mr-1" />
          Back to Controls
        </button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <Card className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <div className="flex items-center mb-2">
                  <h1 className="text-2xl font-bold text-gray-900 mr-3">{control.controlId}</h1>
                  <StatusBadge status={control.status} size="large" />
                </div>
                <h2 className="text-xl text-gray-800">{control.title}</h2>
              </div>
              {canEdit && (
                <Button
                  onClick={handleSave}
                  isLoading={isSaving}
                  icon={<Save size={18} />}
                  className="mt-4 md:mt-0"
                >
                  Save Changes
                </Button>
              )}
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg mb-6">
              <p className="text-gray-700">{control.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Family</label>
                <div className="p-2 bg-gray-50 rounded-md border border-gray-200">
                  {control.family}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Updated</label>
                <div className="p-2 bg-gray-50 rounded-md border border-gray-200 flex items-center">
                  <Calendar size={16} className="mr-2 text-gray-500" />
                  {formatDate(control.lastUpdated)}
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
                disabled={!canEdit}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:text-gray-500"
              >
                <option value="compliant">Compliant</option>
                <option value="partial">Partial</option>
                <option value="non-compliant">Non-Compliant</option>
                <option value="not-assessed">Not Assessed</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={!canEdit}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:text-gray-500"
                placeholder="Add your audit notes here..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Risk Rating</label>
                <select
                  value={riskRating}
                  onChange={(e) => setRiskRating(e.target.value as RiskLevel)}
                  disabled={!canEdit}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:text-gray-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Risk Level</label>
                <div className="p-2 bg-gray-50 rounded-md border border-gray-200">
                  <RiskRating rating={control.riskRating} size="large" />
                </div>
              </div>
            </div>
          </Card>
          
          <Card title="Mitigation Plan">
            <textarea
              value={mitigationPlan}
              onChange={(e) => setMitigationPlan(e.target.value)}
              disabled={!canEdit}
              rows={6}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:text-gray-500"
              placeholder="Describe your plan to address any non-compliance issues..."
            />
          </Card>
        </div>
        
        <div className="lg:w-1/3">
          <Card 
            title="Evidence"
            subtitle="Upload documentation to support compliance"
            className="mb-6"
          >
            {canEdit && (
              <div className="mb-4">
                <FileUpload onFileUpload={handleUploadEvidence} />
              </div>
            )}
            
            <div className="space-y-3">
              {control.evidence.length === 0 ? (
                <div className="text-center py-6">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">No evidence uploaded yet</p>
                  {canEdit && (
                    <p className="text-sm text-gray-500 mt-1">
                      Upload files to document compliance
                    </p>
                  )}
                </div>
              ) : (
                control.evidence.map((evidence: Evidence) => (
                  <div key={evidence.id} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <FileText size={20} className="text-gray-500 mr-3" />
                      <div>
                        <div className="font-medium text-gray-800">{evidence.name}</div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock size={12} className="mr-1" />
                          {new Date(evidence.dateAdded).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      <a 
                        href={evidence.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-800 text-sm mr-3"
                      >
                        View
                      </a>
                      {canEdit && (
                        <button
                          onClick={() => handleDeleteEvidence(evidence.id)}
                          className="text-error-600 hover:text-error-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
          
          <Card title="Related Controls">
            <p className="text-gray-600 text-sm">
              No related controls found for this control.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ControlDetailsPage;