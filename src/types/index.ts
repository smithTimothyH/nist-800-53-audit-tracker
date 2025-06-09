export type Role = 'admin' | 'contributor' | 'viewer';

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
};

export type Status = 'compliant' | 'partial' | 'non-compliant' | 'not-assessed';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export type Evidence = {
  id: string;
  name: string;
  dateAdded: string;
  type: string;
  url: string; // For demo purposes, in a real app this would be a file reference
};

export type Control = {
  id: string;
  controlId: string; // e.g., AC-2, AU-6
  title: string;
  description: string;
  family: string;
  status: Status;
  assignedTo?: string;
  lastUpdated: string;
  notes: string;
  riskRating: RiskLevel;
  mitigationPlan: string;
  evidence: Evidence[];
};

export type Framework = {
  id: string;
  name: string;
  description: string;
  version: string;
  controlFamilies: string[];
};

export type ControlFamily = {
  id: string;
  name: string;
  description: string;
  controls: string[]; // Array of control IDs
};