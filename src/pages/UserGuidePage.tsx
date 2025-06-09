import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Book, 
  Users, 
  CheckSquare, 
  FileText, 
  BarChart, 
  Shield, 
  Search,
  Upload,
  Download,
  UserCog,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Home
} from 'lucide-react';
import Card from '../components/common/Card';

const UserGuidePage: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'getting-started': true,
    'dashboard': false,
    'controls': false,
    'evidence': false,
    'reports': false,
    'users': false,
    'roles': false,
    'faq': false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left sidebar - Table of Contents */}
        <div className="md:w-1/4 lg:w-1/5">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Book className="mr-2 text-primary-600" size={20} />
              Table of Contents
            </h2>
            <nav className="space-y-1">
              <a href="#getting-started" className="block py-2 px-3 rounded-md hover:bg-gray-50 text-primary-700 bg-primary-50 font-medium">Getting Started</a>
              <a href="#dashboard" className="block py-2 px-3 rounded-md hover:bg-gray-50 text-gray-700">Dashboard Overview</a>
              <a href="#controls" className="block py-2 px-3 rounded-md hover:bg-gray-50 text-gray-700">Managing Controls</a>
              <a href="#evidence" className="block py-2 px-3 rounded-md hover:bg-gray-50 text-gray-700">Evidence Management</a>
              <a href="#reports" className="block py-2 px-3 rounded-md hover:bg-gray-50 text-gray-700">Generating Reports</a>
              <a href="#users" className="block py-2 px-3 rounded-md hover:bg-gray-50 text-gray-700">User Management</a>
              <a href="#roles" className="block py-2 px-3 rounded-md hover:bg-gray-50 text-gray-700">User Roles & Permissions</a>
              <a href="#faq" className="block py-2 px-3 rounded-md hover:bg-gray-50 text-gray-700">FAQ</a>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="md:w-3/4 lg:w-4/5 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">NIST 800-53 Audit Tracker User Guide</h1>
                <p className="text-gray-600 mt-2">
                  A comprehensive guide to help you navigate and use the NIST 800-53 Audit Tracker effectively.
                </p>
              </div>
              <Shield className="h-16 w-16 text-primary-600" />
            </div>

            <p className="text-gray-700 mb-4">
              The NIST 800-53 Audit Tracker is designed to help organizations track and document their compliance with 
              NIST 800-53 security controls. This user guide provides detailed instructions on how to use the application 
              to manage controls, upload evidence, generate reports, and more.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
                <div className="flex items-center mb-2">
                  <CheckSquare className="text-primary-600 mr-2" size={20} />
                  <h3 className="font-medium text-primary-800">Track Controls</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Manage and track the status of all NIST 800-53 security controls in one place.
                </p>
              </div>
              
              <div className="bg-secondary-50 p-4 rounded-lg border border-secondary-100">
                <div className="flex items-center mb-2">
                  <Upload className="text-secondary-600 mr-2" size={20} />
                  <h3 className="font-medium text-secondary-800">Manage Evidence</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Upload and organize evidence to document compliance with security controls.
                </p>
              </div>
              
              <div className="bg-accent-50 p-4 rounded-lg border border-accent-100">
                <div className="flex items-center mb-2">
                  <FileText className="text-accent-600 mr-2" size={20} />
                  <h3 className="font-medium text-accent-800">Generate Reports</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Create comprehensive reports to demonstrate compliance status.
                </p>
              </div>
            </div>
          </Card>

          {/* Getting Started Section */}
          <section id="getting-started" className="scroll-mt-4">
            <Card>
              <button 
                onClick={() => toggleSection('getting-started')}
                className="flex items-center justify-between w-full text-left"
              >
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Book className="mr-3 text-primary-600" size={24} />
                  Getting Started
                </h2>
                {expandedSections['getting-started'] ? 
                  <ChevronUp className="text-gray-500" size={20} /> : 
                  <ChevronDown className="text-gray-500" size={20} />
                }
              </button>
              
              {expandedSections['getting-started'] && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Logging In</h3>
                  <p className="mb-4 text-gray-700">
                    To access the NIST 800-53 Audit Tracker, navigate to the login page and enter your credentials. 
                    If you don't have an account, contact your administrator.
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                    <h4 className="font-medium text-gray-800 mb-2">Demo Accounts</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      For demonstration purposes, the following accounts are available:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-700 border border-primary-200 mr-2">Admin</span>
                        <span>admin@example.com</span>
                      </li>
                      <li className="flex items-center">
                        <span className="px-2 py-1 text-xs rounded-full bg-secondary-100 text-secondary-700 border border-secondary-200 mr-2">Contributor</span>
                        <span>contributor@example.com</span>
                      </li>
                      <li className="flex items-center">
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 border border-gray-200 mr-2">Viewer</span>
                        <span>viewer@example.com</span>
                      </li>
                    </ul>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Navigation</h3>
                  <p className="mb-4 text-gray-700">
                    After logging in, you'll be directed to the Home page. The application has a sidebar navigation menu 
                    that provides access to all main features:
                  </p>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <div className="bg-primary-100 p-2 rounded-full mr-3 flex-shrink-0">
                        <Home className="text-primary-700" size={18} />
                      </div>
                      <div>
                        <span className="font-medium text-gray-800">Home</span>
                        <p className="text-sm text-gray-600">The landing page with an overview of the application.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-primary-100 p-2 rounded-full mr-3 flex-shrink-0">
                        <BarChart className="text-primary-700" size={18} />
                      </div>
                      <div>
                        <span className="font-medium text-gray-800">Dashboard</span>
                        <p className="text-sm text-gray-600">Visual overview of compliance status and key metrics.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-primary-100 p-2 rounded-full mr-3 flex-shrink-0">
                        <CheckSquare className="text-primary-700" size={18} />
                      </div>
                      <div>
                        <span className="font-medium text-gray-800">Controls</span>
                        <p className="text-sm text-gray-600">View and manage all NIST 800-53 controls.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-primary-100 p-2 rounded-full mr-3 flex-shrink-0">
                        <Users className="text-primary-700" size={18} />
                      </div>
                      <div>
                        <span className="font-medium text-gray-800">Users</span>
                        <p className="text-sm text-gray-600">Manage user accounts and permissions (Admin only).</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-primary-100 p-2 rounded-full mr-3 flex-shrink-0">
                        <FileText className="text-primary-700" size={18} />
                      </div>
                      <div>
                        <span className="font-medium text-gray-800">Reports</span>
                        <p className="text-sm text-gray-600">Generate and export compliance reports.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </Card>
          </section>

          {/* Dashboard Section */}
          <section id="dashboard" className="scroll-mt-4">
            <Card>
              <button 
                onClick={() => toggleSection('dashboard')}
                className="flex items-center justify-between w-full text-left"
              >
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <BarChart className="mr-3 text-primary-600" size={24} />
                  Dashboard Overview
                </h2>
                {expandedSections['dashboard'] ? 
                  <ChevronUp className="text-gray-500" size={20} /> : 
                  <ChevronDown className="text-gray-500" size={20} />
                }
              </button>
              
              {expandedSections['dashboard'] && (
                <div className="mt-4">
                  <p className="mb-4 text-gray-700">
                    The Dashboard provides a visual overview of your organization's compliance status with NIST 800-53 controls.
                    It displays key metrics and charts to help you quickly assess your security posture.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Features</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2">Compliance Summary</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        The top section displays cards showing the count of controls in each status category:
                      </p>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        <li><span className="text-success-600 font-medium">Compliant</span> - Controls that fully meet requirements</li>
                        <li><span className="text-warning-600 font-medium">Partial</span> - Controls that partially meet requirements</li>
                        <li><span className="text-error-600 font-medium">Non-Compliant</span> - Controls that do not meet requirements</li>
                        <li><span className="text-gray-600 font-medium">Not Assessed</span> - Controls that have not been evaluated</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2">Compliance by Family</h4>
                      <p className="text-sm text-gray-600">
                        A chart showing compliance percentages across different control families (e.g., Access Control, 
                        Audit and Accountability). This helps identify areas that need more attention.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2">High Risk Controls</h4>
                      <p className="text-sm text-gray-600">
                        A list of controls with high or critical risk ratings that require immediate attention.
                        Click on any control to navigate to its details page.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2">Recently Updated Controls</h4>
                      <p className="text-sm text-gray-600">
                        Shows controls that have been recently modified, allowing you to track changes and progress.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
                    <h4 className="font-medium text-primary-800 mb-2 flex items-center">
                      <ArrowRight size={16} className="mr-1" />
                      Pro Tip
                    </h4>
                    <p className="text-sm text-gray-700">
                      Use the Dashboard as your starting point each day to quickly identify areas that need attention.
                      The "High Risk Controls" section is particularly useful for prioritizing your work.
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </section>

          {/* Controls Section */}
          <section id="controls" className="scroll-mt-4">
            <Card>
              <button 
                onClick={() => toggleSection('controls')}
                className="flex items-center justify-between w-full text-left"
              >
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <CheckSquare className="mr-3 text-primary-600" size={24} />
                  Managing Controls
                </h2>
                {expandedSections['controls'] ? 
                  <ChevronUp className="text-gray-500" size={20} /> : 
                  <ChevronDown className="text-gray-500" size={20} />
                }
              </button>
              
              {expandedSections['controls'] && (
                <div className="mt-4">
                  <p className="mb-4 text-gray-700">
                    The Controls page allows you to view, filter, and manage all NIST 800-53 security controls.
                    You can assess compliance status, add notes, and manage evidence for each control.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Viewing Controls</h3>
                  <p className="mb-4 text-gray-700">
                    The Controls page displays a grid of control cards, each showing key information:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1 mb-6">
                    <li>Control ID (e.g., AC-1, AU-2)</li>
                    <li>Control title</li>
                    <li>Brief description</li>
                    <li>Current compliance status</li>
                    <li>Last updated date</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Filtering and Searching</h3>
                  <p className="mb-2 text-gray-700">
                    You can filter the controls list using several options:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                          <Search size={16} className="mr-1 text-gray-500" />
                          Search
                        </h4>
                        <p className="text-sm text-gray-600">
                          Use the search box to find controls by ID, title, or description.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Status Filter</h4>
                        <p className="text-sm text-gray-600">
                          Filter controls by their compliance status (Compliant, Partial, Non-Compliant, Not Assessed).
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Family Filter</h4>
                        <p className="text-sm text-gray-600">
                          Filter controls by their family (e.g., Access Control, Audit and Accountability).
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Control Details</h3>
                  <p className="mb-4 text-gray-700">
                    Click on any control card to view its detailed information page. On the control details page, you can:
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2">Update Compliance Status</h4>
                      <p className="text-sm text-gray-600">
                        Change the control's status to Compliant, Partial, Non-Compliant, or Not Assessed based on your assessment.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2">Add Notes</h4>
                      <p className="text-sm text-gray-600">
                        Document your findings, observations, or any relevant information about the control implementation.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2">Set Risk Rating</h4>
                      <p className="text-sm text-gray-600">
                        Assign a risk level (Low, Medium, High, Critical) to prioritize controls based on their importance.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2">Create Mitigation Plan</h4>
                      <p className="text-sm text-gray-600">
                        Document steps to address any non-compliance issues or areas for improvement.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
                    <h4 className="font-medium text-primary-800 mb-2 flex items-center">
                      <ArrowRight size={16} className="mr-1" />
                      Permission Note
                    </h4>
                    <p className="text-sm text-gray-700">
                      <strong>Viewers</strong> can see all control information but cannot make changes.<br />
                      <strong>Contributors</strong> can update control status, add notes, and upload evidence.<br />
                      <strong>Admins</strong> have full access to all features, including user management.
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </section>

          {/* Evidence Management Section */}
          <section id="evidence" className="scroll-mt-4">
            <Card>
              <button 
                onClick={() => toggleSection('evidence')}
                className="flex items-center justify-between w-full text-left"
              >
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Upload className="mr-3 text-primary-600" size={24} />
                  Evidence Management
                </h2>
                {expandedSections['evidence'] ? 
                  <ChevronUp className="text-gray-500" size={20} /> : 
                  <ChevronDown className="text-gray-500" size={20} />
                }
              </button>
              
              {expandedSections['evidence'] && (
                <div className="mt-4">
                  <p className="mb-4 text-gray-700">
                    Evidence management is a critical part of demonstrating compliance with NIST 800-53 controls.
                    The application allows you to upload, organize, and manage evidence files for each control.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Uploading Evidence</h3>
                  <p className="mb-4 text-gray-700">
                    To upload evidence for a control:
                  </p>
                  <ol className="list-decimal pl-5 text-gray-600 space-y-2 mb-6">
                    <li>Navigate to the control details page by clicking on a control from the Controls list</li>
                    <li>Locate the "Evidence" section on the right side of the page</li>
                    <li>Click on the upload area or drag and drop your file</li>
                    <li>The file will be uploaded and associated with the control</li>
                  </ol>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                    <h4 className="font-medium text-gray-800 mb-2">Supported File Types</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      The following file types are supported for evidence:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      <li>Documents: PDF, DOC, DOCX, TXT</li>
                      <li>Spreadsheets: XLS, XLSX, CSV</li>
                      <li>Images: PNG, JPG, JPEG</li>
                      <li>Maximum file size: 5MB</li>
                    </ul>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Managing Evidence</h3>
                  <p className="mb-4 text-gray-700">
                    After uploading evidence, you can:
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2">View Evidence</h4>
                      <p className="text-sm text-gray-600">
                        Click the "View" link next to any evidence file to open it in a new tab.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2">Delete Evidence</h4>
                      <p className="text-sm text-gray-600">
                        Contributors and Admins can delete evidence by clicking the delete icon next to a file.
                        This action cannot be undone, so use it carefully.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
                    <h4 className="font-medium text-primary-800 mb-2 flex items-center">
                      <ArrowRight size={16} className="mr-1" />
                      Best Practices
                    </h4>
                    <p className="text-sm text-gray-700 mb-2">
                      For effective evidence management:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                      <li>Use descriptive filenames that indicate the control and content</li>
                      <li>Upload the most recent version of documents</li>
                      <li>Include date information in screenshots or documentation</li>
                      <li>Ensure evidence directly supports the control requirements</li>
                      <li>Consider adding notes to explain how the evidence supports compliance</li>
                    </ul>
                  </div>
                </div>
              )}
            </Card>
          </section>

          {/* Reports Section */}
          <section id="reports" className="scroll-mt-4">
            <Card>
              <button 
                onClick={() => toggleSection('reports')}
                className="flex items-center justify-between w-full text-left"
              >
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FileText className="mr-3 text-primary-600" size={24} />
                  Generating Reports
                </h2>
                {expandedSections['reports'] ? 
                  <ChevronUp className="text-gray-500" size={20} /> : 
                  <ChevronDown className="text-gray-500" size={20} />
                }
              </button>
              
              {expandedSections['reports'] && (
                <div className="mt-4">
                  <p className="mb-4 text-gray-700">
                    The Reports page allows you to generate comprehensive compliance reports based on your control assessments.
                    These reports can be used for internal reviews, audits, or sharing with stakeholders.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Creating a Report</h3>
                  <p className="mb-4 text-gray-700">
                    To generate a report:
                  </p>
                  <ol className="list-decimal pl-5 text-gray-600 space-y-2 mb-6">
                    <li>Navigate to the Reports page from the sidebar</li>
                    <li>Use the filters on the left to select which controls to include:
                      <ul className="list-disc pl-5 mt-1 mb-1">
                        <li>Select control families</li>
                        <li>Select compliance statuses</li>
                      </ul>
                    </li>
                    <li>The report preview will update automatically based on your selections</li>
                    <li>Review the preview to ensure it contains the desired information</li>
                    <li>Choose an export format (PDF or Markdown)</li>
                  </ol>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Export Options</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                        <Download size={16} className="mr-1 text-gray-500" />
                        PDF Export
                      </h4>
                      <p className="text-sm text-gray-600">
                        Exports a formatted PDF document with all selected controls, their status, and summary information.
                        This format is ideal for formal documentation and sharing with stakeholders.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                        <Download size={16} className="mr-1 text-gray-500" />
                        Markdown Export
                      </h4>
                      <p className="text-sm text-gray-600">
                        Exports a Markdown (.md) file that can be used in documentation systems, wikis, or version control.
                        This format is ideal for technical teams and integration with other documentation.
                      </p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Report Contents</h3>
                  <p className="mb-4 text-gray-700">
                    Generated reports include:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1 mb-6">
                    <li>Executive summary with overall compliance statistics</li>
                    <li>Breakdown of controls by family</li>
                    <li>Detailed listing of each control with:
                      <ul className="list-disc pl-5 mt-1">
                        <li>Control ID and title</li>
                        <li>Compliance status</li>
                        <li>Risk rating</li>
                        <li>Assessment notes</li>
                        <li>Mitigation plans (for non-compliant controls)</li>
                        <li>Evidence references</li>
                      </ul>
                    </li>
                  </ul>
                  
                  <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
                    <h4 className="font-medium text-primary-800 mb-2 flex items-center">
                      <ArrowRight size={16} className="mr-1" />
                      Pro Tip
                    </h4>
                    <p className="text-sm text-gray-700">
                      For audit preparation, generate separate reports for each control family to make the review process more manageable.
                      You can also create a report of only non-compliant controls to focus on areas that need improvement.
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </section>

          {/* User Management Section */}
          <section id="users" className="scroll-mt-4">
            <Card>
              <button 
                onClick={() => toggleSection('users')}
                className="flex items-center justify-between w-full text-left"
              >
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Users className="mr-3 text-primary-600" size={24} />
                  User Management
                </h2>
                {expandedSections['users'] ? 
                  <ChevronUp className="text-gray-500" size={20} /> : 
                  <ChevronDown className="text-gray-500" size={20} />
                }
              </button>
              
              {expandedSections['users'] && (
                <div className="mt-4">
                  <div className="bg-warning-50 p-4 rounded-lg border border-warning-100 mb-4">
                    <h4 className="font-medium text-warning-800 mb-1">Admin Only Feature</h4>
                    <p className="text-sm text-gray-700">
                      User management is only available to users with the Admin role.
                    </p>
                  </div>
                  
                  <p className="mb-4 text-gray-700">
                    The Users page allows administrators to manage user accounts, including creating new users,
                    editing existing users, and assigning roles.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Adding a New User</h3>
                  <p className="mb-4 text-gray-700">
                    To add a new user to the system:
                  </p>
                  <ol className="list-decimal pl-5 text-gray-600 space-y-2 mb-6">
                    <li>Navigate to the Users page from the sidebar</li>
                    <li>Click the "Add User" button in the top right</li>
                    <li>Fill in the required information:
                      <ul className="list-disc pl-5 mt-1 mb-1">
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Role (Admin, Contributor, or Viewer)</li>
                      </ul>
                    </li>
                    <li>Click "Add User" to create the account</li>
                  </ol>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Editing Users</h3>
                  <p className="mb-4 text-gray-700">
                    To edit an existing user:
                  </p>
                  <ol className="list-decimal pl-5 text-gray-600 space-y-2 mb-6">
                    <li>Find the user in the users table</li>
                    <li>Click the edit (pencil) icon in the Actions column</li>
                    <li>Update the user's information as needed</li>
                    <li>Click the checkmark icon to save changes</li>
                  </ol>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Deleting Users</h3>
                  <p className="mb-4 text-gray-700">
                    To delete a user:
                  </p>
                  <ol className="list-decimal pl-5 text-gray-600 space-y-2 mb-6">
                    <li>Find the user in the users table</li>
                    <li>Click the delete (trash) icon in the Actions column</li>
                    <li>Confirm the deletion when prompted</li>
                  </ol>
                  
                  <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
                    <h4 className="font-medium text-primary-800 mb-2 flex items-center">
                      <ArrowRight size={16} className="mr-1" />
                      Important Note
                    </h4>
                    <p className="text-sm text-gray-700">
                      Deleting a user cannot be undone. Consider changing a user's role to Viewer instead of deleting
                      if you want to restrict access but maintain their account history.
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </section>

          {/* User Roles Section */}
          <section id="roles" className="scroll-mt-4">
            <Card>
              <button 
                onClick={() => toggleSection('roles')}
                className="flex items-center justify-between w-full text-left"
              >
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <UserCog className="mr-3 text-primary-600" size={24} />
                  User Roles & Permissions
                </h2>
                {expandedSections['roles'] ? 
                  <ChevronUp className="text-gray-500" size={20} /> : 
                  <ChevronDown className="text-gray-500" size={20} />
                }
              </button>
              
              {expandedSections['roles'] && (
                <div className="mt-4">
                  <p className="mb-4 text-gray-700">
                    The NIST 800-53 Audit Tracker uses a role-based access control system with three roles:
                    Admin, Contributor, and Viewer. Each role has different permissions and capabilities.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
                      <h4 className="font-medium text-primary-800 mb-2 flex items-center">
                        <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-700 border border-primary-200 mr-2">Admin</span>
                        Administrator
                      </h4>
                      <p className="text-sm text-gray-700 mb-2">
                        Admins have full access to all features and functionality.
                      </p>
                      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                        <li>View all controls and their details</li>
                        <li>Update control status, notes, and risk ratings</li>
                        <li>Upload and delete evidence</li>
                        <li>Generate and export reports</li>
                        <li>Manage users (add, edit, delete)</li>
                        <li>Assign user roles</li>
                      </ul>
                    </div>
                    
                    <div className="bg-secondary-50 p-4 rounded-lg border border-secondary-100">
                      <h4 className="font-medium text-secondary-800 mb-2 flex items-center">
                        <span className="px-2 py-1 text-xs rounded-full bg-secondary-100 text-secondary-700 border border-secondary-200 mr-2">Contributor</span>
                        Contributor
                      </h4>
                      <p className="text-sm text-gray-700 mb-2">
                        Contributors can update control information and manage evidence.
                      </p>
                      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                        <li>View all controls and their details</li>
                        <li>Update control status, notes, and risk ratings</li>
                        <li>Upload and delete evidence</li>
                        <li>Generate and export reports</li>
                        <li><span className="text-gray-400">Cannot manage users</span></li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 border border-gray-200 mr-2">Viewer</span>
                        Viewer
                      </h4>
                      <p className="text-sm text-gray-700 mb-2">
                        Viewers have read-only access to the system.
                      </p>
                      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                        <li>View all controls and their details</li>
                        <li>View evidence (but cannot upload or delete)</li>
                        <li>Generate and export reports</li>
                        <li><span className="text-gray-400">Cannot update control information</span></li>
                        <li><span className="text-gray-400">Cannot manage users</span></li>
                      </ul>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Role Assignment</h3>
                  <p className="mb-4 text-gray-700">
                    Roles are assigned when a user account is created. Only Admins can change a user's role.
                    To change a role, an Admin must:
                  </p>
                  <ol className="list-decimal pl-5 text-gray-600 space-y-2 mb-6">
                    <li>Navigate to the Users page</li>
                    <li>Find the user in the table</li>
                    <li>Click the edit icon</li>
                    <li>Select the new role from the dropdown</li>
                    <li>Save the changes</li>
                  </ol>
                  
                  <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
                    <h4 className="font-medium text-primary-800 mb-2 flex items-center">
                      <ArrowRight size={16} className="mr-1" />
                      Best Practice
                    </h4>
                    <p className="text-sm text-gray-700">
                      Follow the principle of least privilege when assigning roles. Only give users the minimum level
                      of access they need to perform their job functions. Regularly review user roles to ensure they
                      are appropriate.
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="scroll-mt-4">
            <Card>
              <button 
                onClick={() => toggleSection('faq')}
                className="flex items-center justify-between w-full text-left"
              >
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Book className="mr-3 text-primary-600" size={24} />
                  Frequently Asked Questions
                </h2>
                {expandedSections['faq'] ? 
                  <ChevronUp className="text-gray-500" size={20} /> : 
                  <ChevronDown className="text-gray-500" size={20} />
                }
              </button>
              
              {expandedSections['faq'] && (
                <div className="mt-4">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">What is NIST 800-53?</h4>
                      <p className="text-gray-700">
                        NIST Special Publication 800-53 is a set of security and privacy controls for federal information systems
                        and organizations. It provides guidelines for selecting security controls to protect organizational operations,
                        assets, individuals, and other organizations from a diverse set of threats.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">How do I determine the compliance status of a control?</h4>
                      <p className="text-gray-700">
                        Assess each control against your organization's implementation. Use these guidelines:
                      </p>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1 mt-2">
                        <li><strong>Compliant:</strong> All requirements of the control are fully implemented</li>
                        <li><strong>Partial:</strong> Some requirements are implemented, but not all</li>
                        <li><strong>Non-Compliant:</strong> The control is not implemented or is significantly deficient</li>
                        <li><strong>Not Assessed:</strong> The control has not yet been evaluated</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">What kind of evidence should I upload?</h4>
                      <p className="text-gray-700">
                        Evidence should demonstrate implementation of the control. This can include:
                      </p>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1 mt-2">
                        <li>Screenshots of configuration settings</li>
                        <li>Policy and procedure documents</li>
                        <li>System-generated reports</li>
                        <li>Audit logs</li>
                        <li>Training records</li>
                        <li>Meeting minutes related to security decisions</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">How often should controls be reassessed?</h4>
                      <p className="text-gray-700">
                        Best practice is to review controls on a regular schedule based on risk:
                      </p>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1 mt-2">
                        <li>High/Critical risk controls: Quarterly</li>
                        <li>Medium risk controls: Semi-annually</li>
                        <li>Low risk controls: Annually</li>
                      </ul>
                      <p className="text-gray-700 mt-2">
                        Additionally, controls should be reassessed when there are significant changes to systems or the organization.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Can I export data for external auditors?</h4>
                      <p className="text-gray-700">
                        Yes, the Reports feature allows you to generate comprehensive reports in PDF or Markdown format
                        that can be shared with auditors. You can filter the reports to include only the relevant controls
                        for a specific audit.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">How do I handle controls that don't apply to my organization?</h4>
                      <p className="text-gray-700">
                        For controls that are not applicable to your organization, you should:
                      </p>
                      <ol className="list-decimal pl-5 text-gray-600 space-y-1 mt-2">
                        <li>Set the status to "Not Assessed"</li>
                        <li>Add a detailed note explaining why the control is not applicable</li>
                        <li>If possible, upload documentation that supports the non-applicability determination</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </section>

          {/* Support Section */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Additional Help?</h2>
            <p className="text-gray-700 mb-4">
              If you have questions or need assistance that isn't covered in this guide, please contact your system administrator
              or the support team.
            </p>
            
            <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
              <h4 className="font-medium text-primary-800 mb-2">Contact Support</h4>
              <p className="text-sm text-gray-700">
                Email: support@nist-audit-tracker.example.com<br />
                Phone: (555) 123-4567<br />
                Hours: Monday-Friday, 9:00 AM - 5:00 PM Eastern Time
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserGuidePage;