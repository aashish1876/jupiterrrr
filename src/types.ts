export type ServiceCategory = 'BUILD' | 'INTELLIGENCE' | 'TRANSFORM' | 'OPERATE';

export interface SystemNode {
  id: string;
  name: string;
  layer: 'hardware' | 'network' | 'compute' | 'database' | 'logic' | 'api' | 'ui' | 'intelligence' | 'telemetry';
  label: string;
  description: string;
  specs: string;
  connectedTo: string[];
  status: 'optimal' | 'active' | 'syncing';
  throughput: string;
  latency: string;
}

export interface CapabilityItem {
  id: ServiceCategory;
  title: string;
  subtitle: string;
  descriptor: string;
  badge: string;
  leadParagraph: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  pillars: {
    title: string;
    description: string;
  }[];
  deliverables: string[];
  techFocus: string[];
  operationalStandard: string;
}

export interface ApproachStep {
  number: string;
  phase: string;
  title: string;
  durationEstimate: string;
  description: string;
  keyOutputs: string[];
  engineeringControls: string;
}

export interface ArchitectureLayer {
  id: string;
  level: number;
  name: string;
  role: string;
  description: string;
  components: string[];
  resilienceMechanism: string;
  securityBoundary: string;
}

export interface EnterpriseProblem {
  id: string;
  name: string;
  challenge: string;
  traditionalFailureMode: string;
  jupiterEngineeredRemedy: string;
  technicalImpact: string;
}

export interface ArchitecturalCaseStudy {
  id: string;
  classification: string;
  domain: string;
  headline: string;
  context: string;
  architecturalChallenge: string;
  engineeringApproach: string;
  technicalExecution: string[];
  systemReliabilityImpact: string;
}

export interface InquiryFormData {
  name: string;
  organization: string;
  email: string;
  interestArea: string;
  systemScope: string;
  technicalRequirements: string;
}
