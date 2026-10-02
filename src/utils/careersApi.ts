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
  status: 'OPEN' | 'CLOSED' | 'ARCHIVED';
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
  applicantCount?: number;
}

export interface CareerApplication {
  id: string;
  careerId: string;
  careerTitle: string;
  applicantUserId?: string;
  applicantName: string;
  applicantEmail: string;
  phone: string;
  resume: string;
  coverLetter: string;
  linkedin: string;
  portfolio: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'SHORTLISTED' | 'REJECTED' | 'HIRED';
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

const getHeaders = () => {
  const token = localStorage.getItem('jgx_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const careersApi = {
  async getAuthMe(): Promise<{ authenticated: boolean; user: AuthUser | null }> {
    try {
      const res = await fetch('/api/auth/me', {
        headers: getHeaders(),
        credentials: 'include',
      });
      if (!res.ok) return { authenticated: false, user: null };
      return await res.json();
    } catch {
      return { authenticated: false, user: null };
    }
  },

  async getAuthConfig(): Promise<{ googleClientId: string; hasConfiguredAdmins: boolean }> {
    try {
      const res = await fetch('/api/auth/config');
      if (!res.ok) return { googleClientId: '', hasConfiguredAdmins: false };
      return await res.json();
    } catch {
      return { googleClientId: '', hasConfiguredAdmins: false };
    }
  },

  async loginWithGoogleToken(credential: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ credential }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('jgx_token', data.token);
      }
      return data;
    } catch (err: any) {
      return { success: false, error: err.message || 'Login network failure.' };
    }
  },

  async loginWithGoogleAccessToken(accessToken: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ accessToken }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('jgx_token', data.token);
      }
      return data;
    } catch (err: any) {
      return { success: false, error: err.message || 'OAuth network failure.' };
    }
  },

  async loginWithGoogleEmail(googleEmail: string, googleName?: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ googleEmail, googleName }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('jgx_token', data.token);
      }
      return data;
    } catch (err: any) {
      return { success: false, error: err.message || 'Direct Google auth network failure.' };
    }
  },

  async loginWithDevAccount(devEmail: string, devName?: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ devEmail, devName }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('jgx_token', data.token);
      }
      return data;
    } catch (err: any) {
      return { success: false, error: err.message || 'Login network failure.' };
    }
  },

  async logout(): Promise<void> {
    localStorage.removeItem('jgx_token');
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  },

  async getOpportunities(): Promise<CareerOpportunity[]> {
    const res = await fetch('/api/careers', {
      headers: getHeaders(),
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch opportunities');
    return data.opportunities || [];
  },

  async getOpportunity(id: string): Promise<CareerOpportunity> {
    const res = await fetch(`/api/careers/${id}`, {
      headers: getHeaders(),
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch opportunity');
    return data.opportunity;
  },

  async createOpportunity(data: Partial<CareerOpportunity>): Promise<CareerOpportunity> {
    const res = await fetch('/api/careers', {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to create opportunity');
    return result.opportunity;
  },

  async updateOpportunity(id: string, updates: Partial<CareerOpportunity>): Promise<CareerOpportunity> {
    const res = await fetch(`/api/careers/${id}`, {
      method: 'PATCH',
      headers: getHeaders(),
      credentials: 'include',
      body: JSON.stringify(updates),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to update opportunity');
    return result.opportunity;
  },

  async deleteOpportunity(id: string): Promise<void> {
    const res = await fetch(`/api/careers/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
      credentials: 'include',
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to delete opportunity');
  },

  async submitApplication(data: {
    careerId: string;
    applicantName: string;
    applicantEmail: string;
    phone?: string;
    resume?: string;
    coverLetter?: string;
    linkedin?: string;
    portfolio?: string;
  }): Promise<{ id: string; status: string; message: string }> {
    const res = await fetch('/api/applications', {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to submit application');
    return result;
  },

  async getMyApplications(): Promise<CareerApplication[]> {
    const res = await fetch('/api/applications/my', {
      headers: getHeaders(),
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch my applications');
    return data.applications || [];
  },

  async getOpportunityApplications(careerId: string): Promise<{ opportunity: CareerOpportunity; applications: CareerApplication[] }> {
    const res = await fetch(`/api/applications/opportunity/${careerId}`, {
      headers: getHeaders(),
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch applications');
    return data;
  },

  /**
   * CRITICAL REQUIREMENT 15:
   * When an authorized admin opens an application:
   * Server automatically updates status from SUBMITTED -> UNDER_REVIEW,
   * setting reviewedAt and reviewedBy in the database.
   */
  async getApplicationDetails(id: string): Promise<CareerApplication> {
    const res = await fetch(`/api/applications/${id}`, {
      headers: getHeaders(),
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to load application details');
    return data.application;
  },

  async updateApplicationStatus(id: string, status: string): Promise<CareerApplication> {
    const res = await fetch(`/api/applications/${id}/status`, {
      method: 'PATCH',
      headers: getHeaders(),
      credentials: 'include',
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update application status');
    return data.application;
  },
};
