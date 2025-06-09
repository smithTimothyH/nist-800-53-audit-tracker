import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckSquare, FileText, BarChart, Users } from 'lucide-react';
import { frameworks } from '../data/frameworks';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">NIST 800-53 Audit Tracker</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Track and document compliance with NIST 800-53 security controls, manage evidence, and generate comprehensive reports.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <div className="flex items-start space-x-4">
            <div className="bg-primary-100 p-3 rounded-lg">
              <Shield className="h-6 w-6 text-primary-700" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Get Started</h3>
              <p className="text-gray-600 mb-4">
                Begin tracking your compliance with NIST 800-53 security controls. Select a framework version to get started.
              </p>
              <div className="space-y-2">
                {frameworks.map((framework) => (
                  <div 
                    key={framework.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-colors"
                    onClick={() => navigate('/dashboard')}
                  >
                    <h4 className="font-medium text-gray-800">{framework.name}</h4>
                    <p className="text-sm text-gray-600">{framework.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start space-x-4">
            <div className="bg-secondary-100 p-3 rounded-lg">
              <CheckSquare className="h-6 w-6 text-secondary-700" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Quick Actions</h3>
              <p className="text-gray-600 mb-4">Common tasks and shortcuts to help you navigate the application.</p>
              <div className="grid grid-cols-1 gap-3">
                <Button 
                  className="justify-start"
                  variant="outline"
                  onClick={() => navigate('/controls')}
                  icon={<CheckSquare size={18} />}
                >
                  View all controls
                </Button>
                <Button 
                  className="justify-start"
                  variant="outline"
                  onClick={() => navigate('/reports')}
                  icon={<FileText size={18} />}
                >
                  Generate reports
                </Button>
                <Button 
                  className="justify-start"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  icon={<BarChart size={18} />}
                >
                  View dashboard
                </Button>
                <Button 
                  className="justify-start"
                  variant="outline"
                  onClick={() => navigate('/users')}
                  icon={<Users size={18} />}
                >
                  Manage users
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-2">About This Application</h3>
        <p className="text-gray-600 mb-4">
          The NIST 800-53 Audit Tracker is designed to help organizations track and document their compliance with the NIST 800-53 security controls framework. This application provides:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
          <li>A comprehensive dashboard to monitor compliance status</li>
          <li>Detailed control tracking with evidence management</li>
          <li>Risk assessment capabilities</li>
          <li>Role-based access control</li>
          <li>Export functionality for documentation and reporting</li>
        </ul>
        <p className="text-gray-600">
          This application is perfect for security professionals, compliance officers, and IT teams who need to maintain and demonstrate compliance with NIST 800-53 requirements.
        </p>
      </Card>
    </div>
  );
};

export default Home;