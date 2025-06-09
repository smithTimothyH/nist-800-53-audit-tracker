import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Control, Evidence, Status, RiskLevel } from '../types';
import { controls as initialControls } from '../data/controls';

interface ControlsContextType {
  controls: Control[];
  getControl: (id: string) => Control | undefined;
  updateControlStatus: (id: string, status: Status) => void;
  updateControlNotes: (id: string, notes: string) => void;
  updateControlRiskRating: (id: string, riskRating: RiskLevel) => void;
  updateControlMitigationPlan: (id: string, plan: string) => void;
  addControlEvidence: (controlId: string, evidence: Omit<Evidence, 'id'>) => void;
  removeControlEvidence: (controlId: string, evidenceId: string) => void;
  getControlsByFamily: (family: string) => Control[];
  getControlFamilies: () => string[];
  getComplianceStats: () => { compliant: number; partial: number; nonCompliant: number; notAssessed: number; total: number };
}

const ControlsContext = createContext<ControlsContextType>({
  controls: [],
  getControl: () => undefined,
  updateControlStatus: () => {},
  updateControlNotes: () => {},
  updateControlRiskRating: () => {},
  updateControlMitigationPlan: () => {},
  addControlEvidence: () => {},
  removeControlEvidence: () => {},
  getControlsByFamily: () => [],
  getControlFamilies: () => [],
  getComplianceStats: () => ({ compliant: 0, partial: 0, nonCompliant: 0, notAssessed: 0, total: 0 }),
});

export function useControls() {
  return useContext(ControlsContext);
}

export const ControlsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [controls, setControls] = useState<Control[]>([]);

  useEffect(() => {
    // Load controls from localStorage or use initial data
    const storedControls = localStorage.getItem('controls');
    if (storedControls) {
      setControls(JSON.parse(storedControls));
    } else {
      setControls(initialControls);
    }
  }, []);

  // Save controls to localStorage whenever they change
  useEffect(() => {
    if (controls.length > 0) {
      localStorage.setItem('controls', JSON.stringify(controls));
    }
  }, [controls]);

  const getControl = (id: string) => {
    return controls.find(control => control.id === id);
  };

  const updateControlStatus = (id: string, status: Status) => {
    setControls(prevControls => 
      prevControls.map(control => 
        control.id === id 
          ? { ...control, status, lastUpdated: new Date().toISOString() } 
          : control
      )
    );
  };

  const updateControlNotes = (id: string, notes: string) => {
    setControls(prevControls => 
      prevControls.map(control => 
        control.id === id 
          ? { ...control, notes, lastUpdated: new Date().toISOString() } 
          : control
      )
    );
  };

  const updateControlRiskRating = (id: string, riskRating: RiskLevel) => {
    setControls(prevControls => 
      prevControls.map(control => 
        control.id === id 
          ? { ...control, riskRating, lastUpdated: new Date().toISOString() } 
          : control
      )
    );
  };

  const updateControlMitigationPlan = (id: string, mitigationPlan: string) => {
    setControls(prevControls => 
      prevControls.map(control => 
        control.id === id 
          ? { ...control, mitigationPlan, lastUpdated: new Date().toISOString() } 
          : control
      )
    );
  };

  const addControlEvidence = (controlId: string, evidence: Omit<Evidence, 'id'>) => {
    const newEvidence: Evidence = {
      ...evidence,
      id: uuidv4(),
    };
    
    setControls(prevControls => 
      prevControls.map(control => 
        control.id === controlId 
          ? { 
              ...control, 
              evidence: [...control.evidence, newEvidence],
              lastUpdated: new Date().toISOString()
            } 
          : control
      )
    );
  };

  const removeControlEvidence = (controlId: string, evidenceId: string) => {
    setControls(prevControls => 
      prevControls.map(control => 
        control.id === controlId 
          ? { 
              ...control, 
              evidence: control.evidence.filter(e => e.id !== evidenceId),
              lastUpdated: new Date().toISOString()
            } 
          : control
      )
    );
  };

  const getControlsByFamily = (family: string) => {
    return controls.filter(control => control.family === family);
  };

  const getControlFamilies = () => {
    const families = controls.map(control => control.family);
    return [...new Set(families)];
  };

  const getComplianceStats = () => {
    const total = controls.length;
    const compliant = controls.filter(c => c.status === 'compliant').length;
    const partial = controls.filter(c => c.status === 'partial').length;
    const nonCompliant = controls.filter(c => c.status === 'non-compliant').length;
    const notAssessed = controls.filter(c => c.status === 'not-assessed').length;
    
    return {
      compliant,
      partial,
      nonCompliant,
      notAssessed,
      total
    };
  };

  const value = {
    controls,
    getControl,
    updateControlStatus,
    updateControlNotes,
    updateControlRiskRating,
    updateControlMitigationPlan,
    addControlEvidence,
    removeControlEvidence,
    getControlsByFamily,
    getControlFamilies,
    getComplianceStats,
  };

  return <ControlsContext.Provider value={value}>{children}</ControlsContext.Provider>;
};