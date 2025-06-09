import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PieChart, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Clock, 
  ArrowUpRight,
  ShieldAlert,
  FileWarning,
  BarChart3
} from 'lucide-react';
import { useControls } from '../context/ControlsContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Dashboard: React.FC = () => {
  const { controls, getComplianceStats, getControlFamilies } = useControls();
  const navigate = useNavigate();
  
  const stats = getComplianceStats();
  const families = getControlFamilies();
  
  // Calculate percentages for the chart
  const totalAssessed = stats.total - stats.notAssessed;
  const compliantPercentage = totalAssessed > 0 
    ? Math.round((stats.compliant / totalAssessed) * 100) 
    : 0;
  const partialPercentage = totalAssessed > 0 
    ? Math.round((stats.partial / totalAssessed) * 100) 
    : 0;
  const nonCompliantPercentage = totalAssessed > 0 
    ? Math.round((stats.nonCompliant / totalAssessed) * 100) 
    : 0;
    
  // Get high-risk controls
  const highRiskControls = controls.filter(control => 
    control.riskRating === 'high' || control.riskRating === 'critical'
  );
  
  // Get recently updated controls
  const recentlyUpdated = [...controls]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 5);
    
  // Get compliance by family
  const familyCompliance = families.map(family => {
    const familyControls = controls.filter(control => control.family === family);
    const compliant = familyControls.filter(c => c.status === 'compliant').length;
    const total = familyControls.length;
    const percentage = total > 0 ? Math.round((compliant / total) * 100) : 0;
    
    return {
      family,
      compliant,
      total,
      percentage
    };
  });
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Dashboard</h1>
        <Button 
          onClick={() => navigate('/controls')}
          icon={<ArrowUpRight size={18} />}
        >
          View All Controls
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-primary-50 border-primary-100">
          <div className="flex items-center">
            <div className="p-3 bg-primary-100 rounded-full mr-4">
              <CheckCircle className="h-6 w-6 text-primary-700" />
            </div>
            <div>
              <p className="text-sm text-primary-700 font-medium">Compliant</p>
              <h3 className="text-2xl font-bold text-primary-900">{stats.compliant}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-warning-50 border-warning-100">
          <div className="flex items-center">
            <div className="p-3 bg-warning-100 rounded-full mr-4">
              <AlertCircle className="h-6 w-6 text-warning-700" />
            </div>
            <div>
              <p className="text-sm text-warning-700 font-medium">Partial</p>
              <h3 className="text-2xl font-bold text-warning-900">{stats.partial}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-error-50 border-error-100">
          <div className="flex items-center">
            <div className="p-3 bg-error-100 rounded-full mr-4">
              <XCircle className="h-6 w-6 text-error-700" />
            </div>
            <div>
              <p className="text-sm text-error-700 font-medium">Non-Compliant</p>
              <h3 className="text-2xl font-bold text-error-900">{stats.nonCompliant}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-gray-50 border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-gray-100 rounded-full mr-4">
              <Clock className="h-6 w-6 text-gray-700" />
            </div>
            <div>
              <p className="text-sm text-gray-700 font-medium">Not Assessed</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.notAssessed}</h3>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2" title="Compliance Summary">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 mb-4 md:mb-0 md:mr-6">
              <div className="h-40 flex justify-center items-center">
                <PieChart size={140} className="text-gray-400" />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="text-center">
                  <div className="inline-block w-3 h-3 bg-success-500 rounded-full mr-1"></div>
                  <span className="text-sm text-gray-600">{compliantPercentage}% Compliant</span>
                </div>
                <div className="text-center">
                  <div className="inline-block w-3 h-3 bg-warning-500 rounded-full mr-1"></div>
                  <span className="text-sm text-gray-600">{partialPercentage}% Partial</span>
                </div>
                <div className="text-center">
                  <div className="inline-block w-3 h-3 bg-error-500 rounded-full mr-1"></div>
                  <span className="text-sm text-gray-600">{nonCompliantPercentage}% Non-Compliant</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <h4 className="font-medium text-gray-700 mb-3">Compliance by Family</h4>
              <div className="space-y-3">
                {familyCompliance.slice(0, 5).map((item) => (
                  <div key={item.family}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{item.family}</span>
                      <span className="font-medium">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              {familyCompliance.length > 5 && (
                <button 
                  className="text-primary-600 text-sm font-medium mt-3 hover:text-primary-800"
                  onClick={() => navigate('/controls')}
                >
                  View all families
                </button>
              )}
            </div>
          </div>
        </Card>
        
        <Card title="High Risk Controls" subtitle="Controls requiring immediate attention">
          {highRiskControls.length === 0 ? (
            <div className="text-center py-6">
              <ShieldAlert className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">No high risk controls found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {highRiskControls.slice(0, 5).map((control) => (
                <div 
                  key={control.id}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/controls/${control.id}`)}
                >
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-800">{control.controlId}</span>
                    <span className="text-xs px-2 py-0.5 bg-error-100 text-error-700 rounded-full border border-error-200">
                      {control.riskRating.charAt(0).toUpperCase() + control.riskRating.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-1 mt-1">{control.title}</p>
                </div>
              ))}
              
              {highRiskControls.length > 5 && (
                <button 
                  className="text-primary-600 text-sm font-medium hover:text-primary-800"
                  onClick={() => navigate('/controls')}
                >
                  View all high risk controls
                </button>
              )}
            </div>
          )}
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card 
          title="Recently Updated Controls" 
          headerAction={
            <button 
              className="text-primary-600 text-sm font-medium hover:text-primary-800"
              onClick={() => navigate('/controls')}
            >
              View all
            </button>
          }
        >
          {recentlyUpdated.length === 0 ? (
            <div className="text-center py-6">
              <FileWarning className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">No recently updated controls</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentlyUpdated.map((control) => (
                <div 
                  key={control.id}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/controls/${control.id}`)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-800 mr-2">{control.controlId}</span>
                        {control.status === 'compliant' && <CheckCircle size={16} className="text-success-500" />}
                        {control.status === 'partial' && <AlertCircle size={16} className="text-warning-500" />}
                        {control.status === 'non-compliant' && <XCircle size={16} className="text-error-500" />}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-1 mt-1">{control.title}</p>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(control.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
        
        <Card title="Control Status by Family">
          <div className="h-60 flex justify-center items-center">
            <BarChart3 size={200} className="text-gray-300" />
          </div>
          <div className="text-center text-sm text-gray-600 mt-2">
            Chart showing control status distribution by family
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;