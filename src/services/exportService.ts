import jsPDF from 'jspdf';
import { Control } from '../types';

export const exportToPDF = (controls: Control[]): void => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.text('NIST 800-53 Compliance Report', 105, 15, { align: 'center' });
  
  // Add generation date
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 105, 22, { align: 'center' });
  
  // Add summary
  doc.setFontSize(14);
  doc.text('Summary', 14, 30);
  
  doc.setFontSize(10);
  doc.text(`Total Controls: ${controls.length}`, 14, 38);
  doc.text(`Compliant: ${controls.filter(c => c.status === 'compliant').length}`, 14, 44);
  doc.text(`Partial: ${controls.filter(c => c.status === 'partial').length}`, 14, 50);
  doc.text(`Non-Compliant: ${controls.filter(c => c.status === 'non-compliant').length}`, 14, 56);
  doc.text(`Not Assessed: ${controls.filter(c => c.status === 'not-assessed').length}`, 14, 62);
  
  // Save the PDF
  doc.save('nist-800-53-compliance-report.pdf');
};

export const exportToMarkdown = (controls: Control[]): string => {
  let markdown = '# NIST 800-53 Compliance Report\n\n';
  markdown += `Generated on: ${new Date().toLocaleString()}\n\n`;
  
  // Summary
  markdown += '## Summary\n\n';
  markdown += `Total Controls: ${controls.length}\n`;
  markdown += `Compliant: ${controls.filter(c => c.status === 'compliant').length}\n`;
  markdown += `Partial: ${controls.filter(c => c.status === 'partial').length}\n`;
  markdown += `Non-Compliant: ${controls.filter(c => c.status === 'non-compliant').length}\n`;
  markdown += `Not Assessed: ${controls.filter(c => c.status === 'not-assessed').length}\n\n`;
  
  // Controls by family
  const families = [...new Set(controls.map(c => c.family))];
  
  families.forEach(family => {
    markdown += `## ${family}\n\n`;
    
    const familyControls = controls.filter(c => c.family === family);
    
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
  
  return markdown;
};