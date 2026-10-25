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

const getHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('jgx_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

/**
 * Robust fetch wrapper that safely reads text before parsing JSON.
 * Prevents "Failed to execute 'json' on 'Response': Unexpected end of JSON input" errors.
 */
async function safeFetch<T = any>(
  url: string,
  options?: RequestInit,
  fallback: T = {} as T
): Promise<{ ok: boolean; status: number; data: T }> {
  try {
    const res = await fetch(url, options);
    let data: T = fallback;
    try {
      const text = await res.text();
      if (text && text.trim()) {
        data = JSON.parse(text);
      }
    } catch {
      data = fallback;
    }
    return { ok: res.ok, status: res.status, data };
  } catch (netErr: any) {
    console.warn(`[safeFetch] Network error for ${url}:`, netErr?.message || netErr);
    return { ok: false, status: 0, data: fallback };
  }
}

export const careersApi = {
  async getAuthMe(): Promise<{ authenticated: boolean; user: AuthUser | null }> {
    const { ok, data } = await safeFetch<{ authenticated: boolean; user: AuthUser | null }>(
      '/api/auth/me',
      {
        headers: getHeaders(),
        credentials: 'include',
      },
      { authenticated: false, user: null }
    );
    if (!ok || !data) return { authenticated: false, user: null };
    return data;
  },

  async getAuthConfig(): Promise<{ googleClientId: string; hasConfiguredAdmins: boolean }> {
    const { ok, data } = await safeFetch<{ googleClientId: string; hasConfiguredAdmins: boolean }>(
      '/api/auth/config',
      {
        headers: getHeaders(),
        credentials: 'include',
      },
      { googleClientId: '', hasConfiguredAdmins: false }
    );
    if (!ok || !data) return { googleClientId: '', hasConfiguredAdmins: false };
    return data;
  },

  async loginWithGoogleToken(credential: string): Promise<{ success: boolean; user?: AuthUser; token?: string; error?: string }> {
    const { ok, data } = await safeFetch<{ success: boolean; user?: AuthUser; token?: string; error?: string }>(
      '/api/auth/google',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ credential }),
      },
      { success: false, error: 'Authentication failed. Please try again.' }
    );
    if (ok && data?.token) {
      localStorage.setItem('jgx_token', data.token);
    }
    return data;
  },

  async loginWithGoogleAccessToken(accessToken: string): Promise<{ success: boolean; user?: AuthUser; token?: string; error?: string }> {
    const { ok, data } = await safeFetch<{ success: boolean; user?: AuthUser; token?: string; error?: string }>(
      '/api/auth/google',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ accessToken }),
      },
      { success: false, error: 'OAuth authentication failed.' }
    );
    if (ok && data?.token) {
      localStorage.setItem('jgx_token', data.token);
    }
    return data;
  },

  async loginWithGoogleEmail(googleEmail: string, googleName?: string): Promise<{ success: boolean; user?: AuthUser; token?: string; error?: string }> {
    const { ok, data } = await safeFetch<{ success: boolean; user?: AuthUser; token?: string; error?: string }>(
      '/api/auth/google',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ googleEmail, googleName, email: googleEmail, name: googleName }),
      },
      { success: false, error: 'Google sign-in could not be completed.' }
    );
    if (ok && data?.token) {
      localStorage.setItem('jgx_token', data.token);
    }
    return data;
  },

  async loginWithDevAccount(devEmail: string, devName?: string): Promise<{ success: boolean; user?: AuthUser; token?: string; error?: string }> {
    return this.loginWithGoogleEmail(devEmail, devName);
  },

  async logout(): Promise<void> {
    localStorage.removeItem('jgx_token');
    await safeFetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  },

  async getOpportunities(): Promise<CareerOpportunity[]> {
    const { ok, data } = await safeFetch<{ success: boolean; opportunities: CareerOpportunity[]; error?: string }>(
      '/api/careers',
      {
        headers: getHeaders(),
        credentials: 'include',
      },
      { success: false, opportunities: [] }
    );
    if (!ok) throw new Error(data?.error || 'Failed to fetch opportunities');
    return data?.opportunities || [];
  },

  async getOpportunity(id: string): Promise<CareerOpportunity> {
    const { ok, data } = await safeFetch<{ success: boolean; opportunity: CareerOpportunity; error?: string }>(
      `/api/careers/${id}`,
      {
        headers: getHeaders(),
        credentials: 'include',
      },
      { success: false, opportunity: null as any }
    );
    if (!ok || !data?.opportunity) throw new Error(data?.error || 'Failed to fetch opportunity');
    return data.opportunity;
  },

  async createOpportunity(payload: Partial<CareerOpportunity>): Promise<CareerOpportunity> {
    const { ok, data } = await safeFetch<{ success: boolean; opportunity: CareerOpportunity; error?: string }>(
      '/api/careers',
      {
        method: 'POST',
        headers: getHeaders(),
        credentials: 'include',
        body: JSON.stringify(payload),
      },
      { success: false, opportunity: null as any }
    );
    if (!ok || !data?.opportunity) throw new Error(data?.error || 'Failed to create opportunity');
    return data.opportunity;
  },

  async updateOpportunity(id: string, updates: Partial<CareerOpportunity>): Promise<CareerOpportunity> {
    const { ok, data } = await safeFetch<{ success: boolean; opportunity: CareerOpportunity; error?: string }>(
      `/api/careers/${id}`,
      {
        method: 'PATCH',
        headers: getHeaders(),
        credentials: 'include',
        body: JSON.stringify(updates),
      },
      { success: false, opportunity: null as any }
    );
    if (!ok || !data?.opportunity) throw new Error(data?.error || 'Failed to update opportunity');
    return data.opportunity;
  },

  async deleteOpportunity(id: string): Promise<void> {
    const { ok, data } = await safeFetch<{ success: boolean; error?: string }>(
      `/api/careers/${id}`,
      {
        method: 'DELETE',
        headers: getHeaders(),
        credentials: 'include',
      },
      { success: false }
    );
    if (!ok) throw new Error(data?.error || 'Failed to delete opportunity');
  },

  async submitApplication(appData: {
    careerId: string;
    applicantName: string;
    applicantEmail: string;
    phone?: string;
    resume?: string;
    coverLetter?: string;
    linkedin?: string;
    portfolio?: string;
  }): Promise<{ id: string; status: string; message: string }> {
    const { ok, data } = await safeFetch<{
      success: boolean;
      id?: string;
      status?: string;
      message?: string;
      error?: string;
      application?: any;
    }>(
      '/api/applications',
      {
        method: 'POST',
        headers: getHeaders(),
        credentials: 'include',
        body: JSON.stringify(appData),
      },
      { success: false }
    );
    if (!ok) throw new Error(data?.error || 'Failed to submit application');
    return {
      id: data?.application?.id || data?.id || '',
      status: data?.application?.status || data?.status || 'SUBMITTED',
      message: data?.message || 'Your application has been received successfully.',
    };
  },

  async getMyApplications(): Promise<CareerApplication[]> {
    const { ok, data } = await safeFetch<{ success: boolean; applications: CareerApplication[]; error?: string }>(
      '/api/applications/my',
      {
        headers: getHeaders(),
        credentials: 'include',
      },
      { success: false, applications: [] }
    );
    if (!ok) throw new Error(data?.error || 'Failed to fetch my applications');
    return data?.applications || [];
  },

  async getOpportunityApplications(careerId: string): Promise<{ opportunity: CareerOpportunity; applications: CareerApplication[] }> {
    const { ok, data } = await safeFetch<{
      success: boolean;
      opportunity: CareerOpportunity;
      applications: CareerApplication[];
      error?: string;
    }>(
      `/api/applications/opportunity/${careerId}`,
      {
        headers: getHeaders(),
        credentials: 'include',
      },
      { success: false, opportunity: null as any, applications: [] }
    );
    if (!ok) throw new Error(data?.error || 'Failed to fetch applications');
    return data;
  },

  /**
   * CRITICAL REQUIREMENT 15:
   * When an authorized admin opens an application:
   * Server automatically updates status from SUBMITTED -> UNDER_REVIEW,
   * setting reviewedAt and reviewedBy in the database.
   */
  async getApplicationDetails(id: string): Promise<CareerApplication> {
    const { ok, data } = await safeFetch<{ success: boolean; application: CareerApplication; error?: string }>(
      `/api/applications/${id}`,
      {
        headers: getHeaders(),
        credentials: 'include',
      },
      { success: false, application: null as any }
    );
    if (!ok || !data?.application) throw new Error(data?.error || 'Failed to load application details');
    return data.application;
  },

  async updateApplicationStatus(id: string, status: string): Promise<CareerApplication> {
    const { ok, data } = await safeFetch<{ success: boolean; application: CareerApplication; error?: string }>(
      `/api/applications/${id}/status`,
      {
        method: 'PATCH',
        headers: getHeaders(),
        credentials: 'include',
        body: JSON.stringify({ status }),
      },
      { success: false, application: null as any }
    );
    if (!ok || !data?.application) throw new Error(data?.error || 'Failed to update application status');
    return data.application;
  },
};
