import React, { useState } from 'react';
import { FileText, Download, FileDown, Check, ExternalLink } from 'lucide-react';
import { useControls } from '../context/ControlsContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import StatusBadge from '../components/controls/StatusBadge';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ReportsPage: React.FC = () => {
  const { controls, getControlFamilies, getControlsByFamily } = useControls();
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['compliant', 'partial', 'non-compliant', 'not-assessed']);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingMarkdown, setIsGeneratingMarkdown] = useState(false);
  
  const families = getControlFamilies();
  
  const toggleFamily = (family: string) => {
    if (selectedFamilies.includes(family)) {
      setSelectedFamilies(selectedFamilies.filter(f => f !== family));
    } else {
      setSelectedFamilies([...selectedFamilies, family]);
    }
  };
  
  const toggleStatus = (status: string) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter(s => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };
  
  const filteredControls = controls.filter(control => {
    const matchesFamily = selectedFamilies.length === 0 || selectedFamilies.includes(control.family);
    const matchesStatus = selectedStatuses.includes(control.status);
    return matchesFamily && matchesStatus;
  });
  
  const handleSelectAllFamilies = () => {
    if (selectedFamilies.length === families.length) {
      setSelectedFamilies([]);
    } else {
      setSelectedFamilies([...families]);
    }
  };
  
  const generatePDF = async () => {
    if (filteredControls.length === 0) return;
    
    setIsGeneratingPDF(true);
    
    const reportElement = document.getElementById('report-content');
    if (!reportElement) return;
    
    try {
      const canvas = await html2canvas(reportElement, { scale: 1 });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 20;
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('nist-800-53-compliance-report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };
  
  const generateMarkdown = () => {
    if (filteredControls.length === 0) return;
    
    setIsGeneratingMarkdown(true);
    
    try {
      let markdown = '# NIST 800-53 Compliance Report\n\n';
      markdown += `Generated on: ${new Date().toLocaleString()}\n\n`;
      
      // Summary
      markdown += '## Summary\n\n';
      markdown += `Total Controls: ${filteredControls.length}\n`;
      markdown += `Compliant: ${filteredControls.filter(c => c.status === 'compliant').length}\n`;
      markdown += `Partial: ${filteredControls.filter(c => c.status === 'partial').length}\n`;
      markdown += `Non-Compliant: ${filteredControls.filter(c => c.status === 'non-compliant').length}\n`;
      markdown += `Not Assessed: ${filteredControls.filter(c => c.status === 'not-assessed').length}\n\n`;
      
      // Controls by family
      const familiesInReport = [...new Set(filteredControls.map(c => c.family))];
      
      familiesInReport.forEach(family => {
        markdown += `## ${family}\n\n`;
        
        const familyControls = filteredControls.filter(c => c.family === family);
        
        familyControls.forEach(control => {
          markdown += `### ${control.controlId}: ${control.title}\n\n`;
          markdown += `Status: ${control.status}\n\n`;
          markdown += `Description: ${control.description}\n\n`;
          
          if (control.notes) {
            markdown += `Notes: ${control.notes}\n\n`;
          }
          
          markdown += `Risk Rating: ${control.riskRating}\n\n`;
          
          if (control.mitigationPlan) {
            markdown += `Mitigation Plan: ${control.mitigationPlan}\n\n`;
          }
          
          if (control.evidence.length > 0) {
            markdown += 'Evidence:\n';
            control.evidence.forEach(e => {
              markdown += `- ${e.name} (Added: ${new Date(e.dateAdded).toLocaleDateString()})\n`;
            });
            markdown += '\n';
          }
          
          markdown += '---\n\n';
        });
      });
      
      // Create a download link
      const blob = new Blob([markdown], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'nist-800-53-compliance-report.md';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating Markdown:', error);
    } finally {
      setIsGeneratingMarkdown(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Reports</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card title="Report Options" className="mb-6">
            <div className="mb-4">
              <h3 className="font-medium text-gray-800 mb-2">Control Families</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="all-families"
                    checked={selectedFamilies.length === families.length}
                    onChange={handleSelectAllFamilies}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="all-families" className="ml-2 text-sm text-gray-700">
                    All Families
                  </label>
                </div>
                
                {families.map(family => (
                  <div key={family} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`family-${family}`}
                      checked={selectedFamilies.includes(family)}
                      onChange={() => toggleFamily(family)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`family-${family}`} className="ml-2 text-sm text-gray-700">
                      {family} ({getControlsByFamily(family).length})
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Status Filter</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="status-compliant"
                    checked={selectedStatuses.includes('compliant')}
                    onChange={() => toggleStatus('compliant')}
                    className="h-4 w-4 text-success-600 focus:ring-success-500 border-gray-300 rounded"
                  />
                  <label htmlFor="status-compliant" className="ml-2 text-sm text-gray-700 flex items-center">
                    <StatusBadge status="compliant" size="small" />
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="status-partial"
                    checked={selectedStatuses.includes('partial')}
                    onChange={() => toggleStatus('partial')}
                    className="h-4 w-4 text-warning-600 focus:ring-warning-500 border-gray-300 rounded"
                  />
                  <label htmlFor="status-partial" className="ml-2 text-sm text-gray-700 flex items-center">
                    <StatusBadge status="partial" size="small" />
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="status-non-compliant"
                    checked={selectedStatuses.includes('non-compliant')}
                    onChange={() => toggleStatus('non-compliant')}
                    className="h-4 w-4 text-error-600 focus:ring-error-500 border-gray-300 rounded"
                  />
                  <label htmlFor="status-non-compliant" className="ml-2 text-sm text-gray-700 flex items-center">
                    <StatusBadge status="non-compliant" size="small" />
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="status-not-assessed"
                    checked={selectedStatuses.includes('not-assessed')}
                    onChange={() => toggleStatus('not-assessed')}
                    className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                  />
                  <label htmlFor="status-not-assessed" className="ml-2 text-sm text-gray-700 flex items-center">
                    <StatusBadge status="not-assessed" size="small" />
                  </label>
                </div>
              </div>
            </div>
          </Card>
          
          <Card title="Export Options">
            <div className="space-y-3">
              <Button
                onClick={generatePDF}
                isLoading={isGeneratingPDF}
                icon={<FileDown size={18} />}
                className="w-full justify-center"
                disabled={filteredControls.length === 0}
              >
                Export as PDF
              </Button>
              
              <Button
                onClick={generateMarkdown}
                isLoading={isGeneratingMarkdown}
                variant="outline"
                icon={<Download size={18} />}
                className="w-full justify-center"
                disabled={filteredControls.length === 0}
              >
                Export as Markdown
              </Button>
              
              <div className="p-3 bg-primary-50 rounded-lg border border-primary-100 mt-4">
                <h4 className="text-sm font-medium text-primary-800 flex items-center">
                  <ExternalLink size={14} className="mr-1" />
                  External Export Options
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  Connect with Notion, Jira, or other platforms for automated exports.
                </p>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card title="Report Preview">
            {filteredControls.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">No Controls Selected</h3>
                <p className="text-gray-600">
                  Select at least one control family and status to generate a report.
                </p>
              </div>
            ) : (
              <div id="report-content" className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">NIST 800-53 Compliance Report</h2>
                  <p className="text-sm text-gray-600">Generated on: {new Date().toLocaleString()}</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="text-sm text-gray-500">Total</div>
                      <div className="text-2xl font-bold text-gray-900">{filteredControls.length}</div>
                    </div>
                    <div className="bg-success-50 p-3 rounded-lg border border-success-200">
                      <div className="text-sm text-success-700">Compliant</div>
                      <div className="text-2xl font-bold text-success-800">
                        {filteredControls.filter(c => c.status === 'compliant').length}
                      </div>
                    </div>
                    <div className="bg-warning-50 p-3 rounded-lg border border-warning-200">
                      <div className="text-sm text-warning-700">Partial</div>
                      <div className="text-2xl font-bold text-warning-800">
                        {filteredControls.filter(c => c.status === 'partial').length}
                      </div>
                    </div>
                    <div className="bg-error-50 p-3 rounded-lg border border-error-200">
                      <div className="text-sm text-error-700">Non-Compliant</div>
                      <div className="text-2xl font-bold text-error-800">
                        {filteredControls.filter(c => c.status === 'non-compliant').length}
                      </div>
                    </div>
                  </div>
                </div>
                
                {[...new Set(filteredControls.map(c => c.family))].map(family => (
                  <div key={family} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h3 className="font-medium text-gray-800">{family}</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {filteredControls
                        .filter(c => c.family === family)
                        .map(control => (
                          <div key={control.id} className="p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                              <div className="flex items-center mb-2 sm:mb-0">
                                <span className="font-medium text-gray-900 mr-2">{control.controlId}</span>
                                <StatusBadge status={control.status} size="small" />
                              </div>
                              <div className="text-xs text-gray-500">
                                Last updated: {new Date(control.lastUpdated).toLocaleDateString()}
                              </div>
                            </div>
                            <h4 className="font-medium text-gray-800 mb-2">{control.title}</h4>
                            
                            {control.notes && (
                              <div className="mt-2">
                                <p className="text-sm text-gray-600">{control.notes}</p>
                              </div>
                            )}
                            
                            {control.evidence.length > 0 && (
                              <div className="mt-2 flex items-center text-xs text-gray-500">
                                <Check size={14} className="text-success-500 mr-1" />
                                <span>{control.evidence.length} evidence item(s) attached</span>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;