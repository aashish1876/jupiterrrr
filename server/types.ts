export type OpportunityStatus = 'OPEN' | 'CLOSED' | 'ARCHIVED';

export type ApplicationStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'SHORTLISTED' | 'REJECTED' | 'HIRED';

export interface CareerOpportunity {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  deadline: string;
  status: OpportunityStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CareerApplication {
  id: string;
  careerId: string;
  careerTitle: string;
  applicantUserId: string;
  applicantName: string;
  applicantEmail: string;
  phone: string;
  resume: string;
  coverLetter: string;
  linkedin: string;
  portfolio: string;
  status: ApplicationStatus;
  submittedAt: string;
  updatedAt: string;
  reviewedAt: string | null;
  reviewedBy: string | null;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  isAdmin: boolean;
  isEmailVerified: boolean;
}
