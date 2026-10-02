import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { CareerOpportunity, CareerApplication, ApplicationStatus } from './types';

interface DatabaseSchema {
  opportunities: CareerOpportunity[];
  applications: CareerApplication[];
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'careers_data.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed opportunities
const SEED_OPPORTUNITIES: CareerOpportunity[] = [
  {
    id: 'opp_sec_01',
    title: 'Senior Cybersecurity & AI Security Architect',
    department: 'Cybersecurity & Data Protection',
    location: 'Wilmington, DE / Hybrid',
    employmentType: 'Full-time',
    experienceLevel: 'Senior',
    description: 'Lead the security architecture and defensive engineering for mission-critical enterprise systems, AI model isolation environments, and zero-trust data protection frameworks.',
    responsibilities: [
      'Design and audit enterprise zero-trust security architectures across hybrid cloud and on-premise environments.',
      'Implement AI security controls for prompt injection mitigation, model parameter isolation, and API gateway hardening.',
      'Lead comprehensive risk, vulnerability, and cryptographic assessments against ISO 27001 and SOC 2 Type II benchmarks.',
      'Collaborate with enterprise clients to architect ransomware resilience, data privacy, and sovereign backup strategies.'
    ],
    requirements: [
      '7+ years of experience in enterprise cybersecurity architecture, cloud security, and threat modeling.',
      'Deep expertise with zero-trust architectures, HSM key management, and cryptographic standards (AES-256, TLS 1.3).',
      'Demonstrated experience with AI model security, API authorization gateways, and identity federation.',
      'Relevant certifications (CISSP, CISM, or CCSP) or equivalent demonstrable production engineering experience.'
    ],
    skills: ['Cybersecurity', 'AI Security', 'Zero-Trust', 'Cloud Security', 'Risk Assessment', 'SOC 2 / ISO 27001'],
    deadline: '2026-11-30',
    status: 'OPEN',
    createdBy: 'system@jupitergenx.ai',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'opp_ai_02',
    title: 'Enterprise AI & Automation Solutions Engineer',
    department: 'AI & Automation',
    location: 'Remote / US',
    employmentType: 'Full-time',
    experienceLevel: 'Senior / Lead',
    description: 'Architect, implement, and integrate production-grade enterprise generative AI workflows, intelligent automation systems, and agentic assistants for Fortune 1000 organizations.',
    responsibilities: [
      'Design scalable multi-agent systems and retrieval-augmented generation (RAG) pipelines for complex enterprise knowledge bases.',
      'Build robust API integrations connecting AI models with legacy ERP, CRM, and cloud data platform systems.',
      'Establish governance frameworks, audit logging, and accuracy verification benchmarks for deployed AI workloads.',
      'Partner directly with technical leadership to translate high-level business goals into resilient software pipelines.'
    ],
    requirements: [
      '5+ years of software engineering and systems integration experience with at least 2+ years deploying enterprise AI.',
      'Proficiency in TypeScript, Python, vector databases, and modern LLM orchestration frameworks.',
      'Strong background in distributed systems, asynchronous event architectures, and containerized deployment.',
      'BS or MS in Computer Science, Systems Engineering, or equivalent practical track record.'
    ],
    skills: ['Generative AI', 'Agentic Systems', 'Python / TypeScript', 'Workflow Automation', 'RAG Architecture'],
    deadline: '2026-11-15',
    status: 'OPEN',
    createdBy: 'system@jupitergenx.ai',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'opp_cloud_03',
    title: 'Cloud & Infrastructure Modernization Specialist',
    department: 'Cloud & Infrastructure',
    location: 'Wilmington, DE / Remote',
    employmentType: 'Full-time',
    experienceLevel: 'Mid-Level / Senior',
    description: 'Design and deploy resilient, high-availability hybrid cloud infrastructure and scalable compute backbones tailored for data platforms and high-throughput enterprise workloads.',
    responsibilities: [
      'Architect resilient multi-region infrastructure using infrastructure-as-code principles.',
      'Optimize compute, network, and storage tier latency and capacity for mission-critical client deployments.',
      'Implement automated disaster recovery, continuous backup, and immutable storage topologies.',
      'Monitor and tune production infrastructure metrics to achieve 99.999% availability standards.'
    ],
    requirements: [
      '4+ years managing production enterprise cloud environments (GCP, AWS, or Azure).',
      'Extensive hands-on experience with Terraform, Kubernetes, Linux systems internals, and network security.',
      'Proven expertise in database replication, backup verification, and high-availability design.',
      'Strong problem-solving acumen and rigorous approach to operational resilience.'
    ],
    skills: ['Cloud Architecture', 'Kubernetes', 'Terraform', 'Hybrid Cloud', 'Disaster Recovery'],
    deadline: '2026-12-15',
    status: 'OPEN',
    createdBy: 'system@jupitergenx.ai',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

class CareersDatabase {
  private data: DatabaseSchema = {
    opportunities: [],
    applications: [],
  };

  constructor() {
    this.load();
  }

  private load(): void {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        this.data = {
          opportunities: Array.isArray(parsed.opportunities) ? parsed.opportunities : [],
          applications: Array.isArray(parsed.applications) ? parsed.applications : [],
        };
      } else {
        // Seed default opportunities
        this.data = {
          opportunities: [...SEED_OPPORTUNITIES],
          applications: [],
        };
        this.save();
      }
    } catch (err) {
      console.error('[DB] Error loading database:', err);
      this.data = {
        opportunities: [...SEED_OPPORTUNITIES],
        applications: [],
      };
      this.save();
    }
  }

  private save(): void {
    try {
      const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
      fs.writeFileSync(tempFile, JSON.stringify(this.data, null, 2), 'utf-8');
      fs.renameSync(tempFile, DB_FILE);
    } catch (err) {
      console.error('[DB] Error saving database:', err);
    }
  }

  // Opportunity Methods
  public getOpportunities(includeAll: boolean = false): CareerOpportunity[] {
    if (includeAll) {
      return [...this.data.opportunities];
    }
    return this.data.opportunities.filter((opp) => opp.status === 'OPEN');
  }

  public getOpportunityById(id: string): CareerOpportunity | null {
    return this.data.opportunities.find((opp) => opp.id === id) || null;
  }

  public createOpportunity(
    oppData: Omit<CareerOpportunity, 'id' | 'createdAt' | 'updatedAt'>
  ): CareerOpportunity {
    const id = `opp_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
    const now = new Date().toISOString();
    const newOpp: CareerOpportunity = {
      ...oppData,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.data.opportunities.unshift(newOpp);
    this.save();
    return newOpp;
  }

  public updateOpportunity(
    id: string,
    updates: Partial<Omit<CareerOpportunity, 'id' | 'createdAt'>>
  ): CareerOpportunity | null {
    const index = this.data.opportunities.findIndex((opp) => opp.id === id);
    if (index === -1) return null;

    const existing = this.data.opportunities[index];
    const updated: CareerOpportunity = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.data.opportunities[index] = updated;
    this.save();
    return updated;
  }

  public deleteOpportunity(id: string): boolean {
    const initialLen = this.data.opportunities.length;
    this.data.opportunities = this.data.opportunities.filter((opp) => opp.id !== id);
    if (this.data.opportunities.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Application Methods
  public getApplications(filter?: {
    careerId?: string;
    applicantUserId?: string;
    applicantEmail?: string;
  }): CareerApplication[] {
    let list = [...this.data.applications];
    if (filter?.careerId) {
      list = list.filter((app) => app.careerId === filter.careerId);
    }
    if (filter?.applicantUserId) {
      list = list.filter((app) => app.applicantUserId === filter.applicantUserId);
    }
    if (filter?.applicantEmail) {
      const emailLower = filter.applicantEmail.trim().toLowerCase();
      list = list.filter((app) => app.applicantEmail.trim().toLowerCase() === emailLower);
    }
    return list;
  }

  public getApplicationById(id: string): CareerApplication | null {
    return this.data.applications.find((app) => app.id === id) || null;
  }

  public getApplicantCountForOpportunity(careerId: string): number {
    return this.data.applications.filter((app) => app.careerId === careerId).length;
  }

  public createApplication(
    appData: Omit<
      CareerApplication,
      'id' | 'status' | 'submittedAt' | 'updatedAt' | 'reviewedAt' | 'reviewedBy'
    >
  ): CareerApplication {
    const id = `app_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
    const now = new Date().toISOString();
    const newApp: CareerApplication = {
      ...appData,
      id,
      status: 'SUBMITTED',
      submittedAt: now,
      updatedAt: now,
      reviewedAt: null,
      reviewedBy: null,
    };
    this.data.applications.unshift(newApp);
    this.save();
    return newApp;
  }

  // CRITICAL REQUIREMENT 15:
  // When an admin opens an application:
  // If status is SUBMITTED, update to UNDER_REVIEW, set reviewedAt, reviewedBy.
  public markApplicationUnderReview(id: string, reviewedByEmail: string): CareerApplication | null {
    const app = this.data.applications.find((a) => a.id === id);
    if (!app) return null;

    if (app.status === 'SUBMITTED') {
      const now = new Date().toISOString();
      app.status = 'UNDER_REVIEW';
      app.reviewedAt = now;
      app.reviewedBy = reviewedByEmail;
      app.updatedAt = now;
      this.save();
    }
    return app;
  }

  public updateApplicationStatus(
    id: string,
    newStatus: ApplicationStatus,
    adminEmail: string
  ): CareerApplication | null {
    const app = this.data.applications.find((a) => a.id === id);
    if (!app) return null;

    const now = new Date().toISOString();
    app.status = newStatus;
    app.updatedAt = now;
    if (!app.reviewedAt) {
      app.reviewedAt = now;
      app.reviewedBy = adminEmail;
    }
    this.save();
    return app;
  }
}

export const db = new CareersDatabase();
