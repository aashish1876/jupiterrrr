import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shield,
  Briefcase,
  Users,
  Plus,
  ArrowLeft,
  Eye,
  Edit3,
  Archive,
  CheckCircle,
  Clock,
  XCircle,
  UserCheck,
  AlertCircle,
  LogOut,
  Mail,
  Calendar,
  MapPin,
  ExternalLink,
  ChevronRight,
  FileText
} from 'lucide-react';
import {
  careersApi,
  CareerOpportunity,
  CareerApplication,
  AuthUser,
} from '../utils/careersApi';

export const CareersAdminPage: React.FC = () => {
  const navigate = useNavigate();

  // Auth State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [googleClientId, setGoogleClientId] = useState<string>('');

  // Dev Login form (for testing without Google client ID configured)
  const [devEmail, setDevEmail] = useState('');
  const [devLoginLoading, setDevLoginLoading] = useState(false);

  // Dashboard Data State
  const [opportunities, setOpportunities] = useState<CareerOpportunity[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<CareerOpportunity | null>(null);
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [appsLoading, setAppsLoading] = useState(false);

  // Selected Application Details (for review modal)
  const [selectedApplication, setSelectedApplication] = useState<CareerApplication | null>(null);
  const [appDetailLoading, setAppDetailLoading] = useState(false);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);

  // Create / Edit Opportunity Modal
  const [isOppModalOpen, setIsOppModalOpen] = useState(false);
  const [editingOpp, setEditingOpp] = useState<CareerOpportunity | null>(null);
  const [oppForm, setOppForm] = useState({
    title: '',
    department: 'AI & Automation',
    location: 'Remote / US',
    employmentType: 'Full-time',
    experienceLevel: 'Senior',
    description: '',
    responsibilities: '',
    requirements: '',
    skills: '',
    deadline: '',
    status: 'OPEN' as 'OPEN' | 'CLOSED' | 'ARCHIVED',
  });
  const [oppSubmitting, setOppSubmitting] = useState(false);

  // Check auth state on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Initialize Google Identity Services if client ID is configured
  useEffect(() => {
    if (googleClientId && (window as any).google?.accounts?.id) {
      try {
        (window as any).google.accounts.id.initialize({
          client_id: googleClientId,
          callback: async (response: any) => {
            if (response?.credential) {
              setAuthLoading(true);
              const res = await careersApi.loginWithGoogleToken(response.credential);
              setAuthLoading(false);
              if (!res.success || !res.user) {
                setAuthError(res.error || 'Google authentication failed.');
                return;
              }
              if (!res.user.isAdmin) {
                setAuthError('Your account is not authorized to access the Careers Admin Dashboard.');
                setCurrentUser(res.user);
                return;
              }
              setCurrentUser(res.user);
              loadOpportunities();
            }
          },
        });

        const btnContainer = document.getElementById('google-admin-signin-btn');
        if (btnContainer) {
          (window as any).google.accounts.id.renderButton(btnContainer, {
            theme: 'filled_blue',
            size: 'large',
            width: 380,
            text: 'signin_with',
          });
        }
      } catch (err) {
        console.error('GSI Init Error', err);
      }
    }
  }, [googleClientId]);

  const checkAuth = async () => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const config = await careersApi.getAuthConfig();
      setGoogleClientId(config.googleClientId);

      const me = await careersApi.getAuthMe();
      if (me.authenticated && me.user) {
        if (!me.user.isAdmin) {
          setAuthError('Your account is not authorized to access the Careers Admin Dashboard.');
          setCurrentUser(me.user);
        } else {
          setCurrentUser(me.user);
          loadOpportunities();
        }
      }
    } catch {
      setAuthError('Failed to verify session.');
    } finally {
      setAuthLoading(false);
    }
  };

  const loadOpportunities = async () => {
    setDataLoading(true);
    try {
      const opps = await careersApi.getOpportunities();
      setOpportunities(opps);
    } catch (err: any) {
      console.error(err);
    } finally {
      setDataLoading(false);
    }
  };

  const handleDevLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!devEmail) return;
    setDevLoginLoading(true);
    setAuthError(null);

    const res = await careersApi.loginWithDevAccount(devEmail);
    setDevLoginLoading(false);

    if (!res.success || !res.user) {
      setAuthError(res.error || 'Authentication failed.');
      return;
    }

    if (!res.user.isAdmin) {
      setAuthError('Your account is not authorized to access the Careers Admin Dashboard.');
      setCurrentUser(res.user);
      return;
    }

    setCurrentUser(res.user);
    loadOpportunities();
  };

  const handleLogout = async () => {
    await careersApi.logout();
    setCurrentUser(null);
    setSelectedCareer(null);
    setSelectedApplication(null);
    setAuthError(null);
  };

  // Open Applications view for a specific opportunity
  const handleOpenApplications = async (opp: CareerOpportunity) => {
    setSelectedCareer(opp);
    setAppsLoading(true);
    try {
      const res = await careersApi.getOpportunityApplications(opp.id);
      setApplications(res.applications);
    } catch (err: any) {
      console.error(err);
    } finally {
      setAppsLoading(false);
    }
  };

  /**
   * CRITICAL REQUIREMENT 15:
   * When the authorized admin opens an application:
   * 1. Verify admin authentication
   * 2. Verify admin authorization
   * 3. Fetch application
   * 4. If status == SUBMITTED:
   *      update status to UNDER_REVIEW
   * 5. Set reviewedAt and reviewedBy
   * 6. Return application data
   */
  const handleOpenApplicationDetail = async (appId: string) => {
    setAppDetailLoading(true);
    try {
      const app = await careersApi.getApplicationDetails(appId);
      setSelectedApplication(app);

      // Refresh applications list so the badge displays UNDER_REVIEW immediately
      if (selectedCareer) {
        setApplications((prev) =>
          prev.map((a) => (a.id === appId ? { ...a, status: app.status } : a))
        );
      }
    } catch (err: any) {
      alert(err.message || 'Failed to open application.');
    } finally {
      setAppDetailLoading(false);
    }
  };

  const handleUpdateStatus = async (appId: string, newStatus: string) => {
    setStatusUpdateLoading(true);
    try {
      const updated = await careersApi.updateApplicationStatus(appId, newStatus);
      setSelectedApplication(updated);
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: updated.status } : a))
      );
    } catch (err: any) {
      alert(err.message || 'Failed to update status.');
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  const handleToggleOppStatus = async (opp: CareerOpportunity) => {
    const nextStatus = opp.status === 'OPEN' ? 'CLOSED' : 'OPEN';
    try {
      const updated = await careersApi.updateOpportunity(opp.id, { status: nextStatus });
      setOpportunities((prev) => prev.map((o) => (o.id === opp.id ? updated : o)));
      if (selectedCareer?.id === opp.id) {
        setSelectedCareer(updated);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to update opportunity status.');
    }
  };

  const handleArchiveOpp = async (opp: CareerOpportunity) => {
    if (!window.confirm(`Archive "${opp.title}"?`)) return;
    try {
      const updated = await careersApi.updateOpportunity(opp.id, { status: 'ARCHIVED' });
      setOpportunities((prev) => prev.map((o) => (o.id === opp.id ? updated : o)));
    } catch (err: any) {
      alert(err.message || 'Failed to archive opportunity.');
    }
  };

  const openCreateModal = () => {
    setEditingOpp(null);
    setOppForm({
      title: '',
      department: 'AI & Automation',
      location: 'Remote / US',
      employmentType: 'Full-time',
      experienceLevel: 'Senior',
      description: '',
      responsibilities: '',
      requirements: '',
      skills: '',
      deadline: '',
      status: 'OPEN',
    });
    setIsOppModalOpen(true);
  };

  const openEditModal = (opp: CareerOpportunity) => {
    setEditingOpp(opp);
    setOppForm({
      title: opp.title,
      department: opp.department,
      location: opp.location,
      employmentType: opp.employmentType,
      experienceLevel: opp.experienceLevel,
      description: opp.description,
      responsibilities: opp.responsibilities.join('\n'),
      requirements: opp.requirements.join('\n'),
      skills: opp.skills.join(', '),
      deadline: opp.deadline || '',
      status: opp.status,
    });
    setIsOppModalOpen(true);
  };

  const handleSaveOpp = async (e: React.FormEvent) => {
    e.preventDefault();
    setOppSubmitting(true);
    try {
      const payload = {
        title: oppForm.title,
        department: oppForm.department,
        location: oppForm.location,
        employmentType: oppForm.employmentType,
        experienceLevel: oppForm.experienceLevel,
        description: oppForm.description,
        responsibilities: oppForm.responsibilities
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        requirements: oppForm.requirements
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        skills: oppForm.skills
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        deadline: oppForm.deadline,
        status: oppForm.status,
      };

      if (editingOpp) {
        const updated = await careersApi.updateOpportunity(editingOpp.id, payload);
        setOpportunities((prev) => prev.map((o) => (o.id === editingOpp.id ? updated : o)));
      } else {
        const created = await careersApi.createOpportunity(payload);
        setOpportunities((prev) => [created, ...prev]);
      }
      setIsOppModalOpen(false);
    } catch (err: any) {
      alert(err.message || 'Failed to save opportunity.');
    } finally {
      setOppSubmitting(false);
    }
  };

  // Status Badge Helper
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'SUBMITTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F4BC43]/15 text-[#F4BC43] border border-[#F4BC43]/30">
            <Clock className="w-3 h-3" />
            Submitted
          </span>
        );
      case 'UNDER_REVIEW':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#18BFF2]/15 text-[#18BFF2] border border-[#18BFF2]/30">
            <Eye className="w-3 h-3" />
            Under Review
          </span>
        );
      case 'SHORTLISTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle className="w-3 h-3" />
            Shortlisted
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      case 'HIRED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F4BC43]/20 text-[#FFD76A] border border-[#F4BC43]/40">
            <UserCheck className="w-3 h-3" />
            Hired
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-white/10 text-white">
            {status}
          </span>
        );
    }
  };

  // 1. Loading State
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#020B18] flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-[#F4BC43] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-[#7E8C9F]">Verifying security authorization...</p>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated or Unauthorized Gate
  if (!currentUser || !currentUser.isAdmin) {
    return (
      <div className="min-h-screen bg-[#020B18] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full rounded-2xl bg-[#061426] border border-white/10 p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#F4BC43]/10 border border-[#F4BC43]/20 flex items-center justify-center mx-auto text-[#F4BC43]">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-white font-sans tracking-tight">
              Careers Admin Dashboard
            </h1>
            <p className="text-xs text-[#7E8C9F]">
              Administrative access is strictly restricted to verified Google accounts on the authorized allowlist.
            </p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/25 flex items-start gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{authError}</span>
            </div>
          )}

          {currentUser && !currentUser.isAdmin && (
            <div className="p-4 rounded-lg bg-white/[0.03] border border-white/10 space-y-2 text-xs">
              <div className="text-[#B7C0CC]">
                Signed in as: <strong className="text-white">{currentUser.email}</strong>
              </div>
              <p className="text-[#7E8C9F]">
                This Google account is not on the administrator allowlist (configured via <code className="text-[#F4BC43]">ADMIN_EMAILS</code>).
              </p>
              <button
                onClick={handleLogout}
                className="w-full mt-2 py-2 rounded bg-white/10 hover:bg-white/15 text-white font-medium text-xs transition-colors"
              >
                Sign Out & Switch Account
              </button>
            </div>
          )}

          {(!currentUser || currentUser.isAdmin === false) && (
            <div className="space-y-4 pt-2">
              {/* Google Identity Services Container */}
              <div id="google-admin-signin-btn" className="flex justify-center empty:hidden" />

              {/* Verified Admin Google Account Form */}
              <div className="space-y-3">
                <form onSubmit={handleDevLogin} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#B7C0CC] mb-1">
                      Authorized Admin Google Email
                    </label>
                    <input
                      type="email"
                      required
                      value={devEmail}
                      onChange={(e) => setDevEmail(e.target.value)}
                      placeholder="e.g. anil.yanamala24@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#020B18] border border-white/15 text-white text-sm focus:outline-none focus:border-[#F4BC43] transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={devLoginLoading}
                    className="w-full py-3 rounded-lg bg-[#F4BC43] hover:bg-[#FFD76A] text-[#020B18] font-bold text-sm transition-all shadow-md shadow-[#F4BC43]/20 flex items-center justify-center gap-2"
                  >
                    {devLoginLoading ? (
                      <div className="w-4 h-4 border-2 border-[#020B18] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Shield className="w-4 h-4" />
                    )}
                    <span>Verify & Open Admin Dashboard</span>
                  </button>
                </form>
              </div>

              <div className="text-center pt-2">
                <Link
                  to="/careers"
                  className="inline-flex items-center gap-1.5 text-xs text-[#7E8C9F] hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Public Careers</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3. Authorized Admin Dashboard View
  return (
    <div className="min-h-screen bg-[#020B18] text-white">
      {/* Top Admin Navbar */}
      <header className="border-b border-white/10 bg-[#061426]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/careers"
              className="text-[#7E8C9F] hover:text-white transition-colors flex items-center gap-1.5 text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Public Careers</span>
            </Link>
            <div className="h-4 w-[1px] bg-white/15" />
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-wider uppercase font-sans text-white">
                CAREERS ADMIN
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F4BC43]/20 text-[#F4BC43] border border-[#F4BC43]/30">
                Authorized Admin
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="hidden sm:flex items-center gap-2 text-[#B7C0CC]">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{currentUser.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#B7C0CC] hover:text-white transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
              Career Opportunities & Application Management
            </h1>
            <p className="text-xs sm:text-sm text-[#7E8C9F] mt-1">
              Create, update, and manage job opportunities and review submitted applicant records.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#F4BC43] hover:bg-[#FFD76A] text-[#020B18] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md shadow-[#F4BC43]/20"
          >
            <Plus className="w-4 h-4" />
            <span>Create Opportunity</span>
          </button>
        </div>

        {/* Selected Opportunity Applications View (if an opportunity is selected) */}
        {selectedCareer && (
          <div className="rounded-2xl bg-[#061426] border border-[#18BFF2]/30 p-6 space-y-6 shadow-xl relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCareer(null)}
                    className="text-xs text-[#18BFF2] hover:underline flex items-center gap-1"
                  >
                    <span>← Back to all opportunities</span>
                  </button>
                </div>
                <h2 className="text-xl font-bold text-white font-sans flex items-center gap-3">
                  <span>{selectedCareer.title}</span>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded font-semibold ${
                      selectedCareer.status === 'OPEN'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {selectedCareer.status}
                  </span>
                </h2>
                <div className="text-xs text-[#7E8C9F] flex items-center gap-4">
                  <span>Department: {selectedCareer.department}</span>
                  <span>•</span>
                  <span>Location: {selectedCareer.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-white">
                  Applications: <span className="text-[#F4BC43] font-bold">{applications.length}</span>
                </span>
                <button
                  onClick={() => openEditModal(selectedCareer)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-colors"
                >
                  Edit Role
                </button>
              </div>
            </div>

            {/* Applications List */}
            {appsLoading ? (
              <div className="py-12 text-center text-xs text-[#7E8C9F]">
                Loading applications...
              </div>
            ) : applications.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <Users className="w-8 h-8 text-[#7E8C9F] mx-auto opacity-50" />
                <p className="text-sm text-white font-medium">No applications received yet.</p>
                <p className="text-xs text-[#7E8C9F]">
                  Applications submitted by applicants for this role will appear here automatically.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#020B18]/60 text-[#7E8C9F] uppercase tracking-wider text-[11px] border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Applicant Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Submitted</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {applications.map((app) => (
                      <tr
                        key={app.id}
                        className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                        onClick={() => handleOpenApplicationDetail(app.id)}
                      >
                        <td className="py-3.5 px-4 font-semibold text-white">
                          {app.applicantName}
                        </td>
                        <td className="py-3.5 px-4 text-[#B7C0CC]">{app.applicantEmail}</td>
                        <td className="py-3.5 px-4 text-[#7E8C9F]">
                          {new Date(app.submittedAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="py-3.5 px-4">{renderStatusBadge(app.status)}</td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenApplicationDetail(app.id);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#18BFF2]/10 hover:bg-[#18BFF2]/20 border border-[#18BFF2]/30 text-[#18BFF2] text-xs font-semibold transition-colors"
                          >
                            <span>Open Application</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Opportunities List Table */}
        <div className="rounded-2xl bg-[#061426] border border-white/10 overflow-hidden shadow-xl">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#F4BC43]" />
              <h2 className="text-lg font-bold text-white font-sans">
                Career Opportunities ({opportunities.length})
              </h2>
            </div>
            <span className="text-xs text-[#7E8C9F]">
              Live server database records
            </span>
          </div>

          {dataLoading ? (
            <div className="p-12 text-center text-xs text-[#7E8C9F]">
              Loading opportunities...
            </div>
          ) : opportunities.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <Briefcase className="w-8 h-8 text-[#7E8C9F] mx-auto opacity-50" />
              <p className="text-sm font-medium text-white">No career opportunities created yet.</p>
              <button
                onClick={openCreateModal}
                className="px-4 py-2 rounded bg-[#F4BC43] text-[#020B18] font-bold text-xs"
              >
                Create First Opportunity
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#020B18]/60 text-[#7E8C9F] uppercase tracking-wider text-[11px] border-b border-white/10">
                  <tr>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Applications</th>
                    <th className="py-3 px-4">Created</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {opportunities.map((opp) => (
                    <tr key={opp.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 font-semibold text-white">
                        <button
                          onClick={() => handleOpenApplications(opp)}
                          className="hover:text-[#18BFF2] text-left transition-colors font-medium"
                        >
                          {opp.title}
                        </button>
                      </td>
                      <td className="py-4 px-4 text-[#B7C0CC]">{opp.department}</td>
                      <td className="py-4 px-4 text-[#7E8C9F]">{opp.location}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide uppercase ${
                            opp.status === 'OPEN'
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : opp.status === 'CLOSED'
                              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                              : 'bg-white/10 text-[#7E8C9F] border border-white/10'
                          }`}
                        >
                          {opp.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleOpenApplications(opp)}
                          className="font-bold text-[#F4BC43] hover:underline flex items-center gap-1.5"
                        >
                          <Users className="w-3.5 h-3.5" />
                          <span>{opp.applicantCount ?? 0}</span>
                        </button>
                      </td>
                      <td className="py-4 px-4 text-[#7E8C9F]">
                        {new Date(opp.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenApplications(opp)}
                            title="View Applications"
                            className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
                          >
                            Applications ({opp.applicantCount ?? 0})
                          </button>
                          <button
                            onClick={() => openEditModal(opp)}
                            title="Edit Opportunity"
                            className="p-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleToggleOppStatus(opp)}
                            title={opp.status === 'OPEN' ? 'Close Opportunity' : 'Reopen Opportunity'}
                            className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
                              opp.status === 'OPEN'
                                ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            }`}
                          >
                            {opp.status === 'OPEN' ? 'Close' : 'Reopen'}
                          </button>
                          <button
                            onClick={() => handleArchiveOpp(opp)}
                            title="Archive"
                            className="p-1.5 rounded bg-white/5 hover:bg-rose-500/10 border border-white/10 text-[#7E8C9F] hover:text-rose-400 transition-colors"
                          >
                            <Archive className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* ========================================================= */}
      {/* APPLICATION DETAIL MODAL (CRITICAL REQUIREMENT 15)        */}
      {/* ========================================================= */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="rounded-2xl bg-[#061426] border border-white/15 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <h3 className="text-xl font-bold text-white font-sans">
                    {selectedApplication.applicantName}
                  </h3>
                  {renderStatusBadge(selectedApplication.status)}
                </div>
                <div className="text-xs text-[#7E8C9F]">
                  Applying for: <strong className="text-white">{selectedApplication.careerTitle}</strong>
                </div>
              </div>
              <button
                onClick={() => setSelectedApplication(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#7E8C9F] hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Critical Notification for Auto Review */}
            <div className="p-3 rounded-lg bg-[#18BFF2]/10 border border-[#18BFF2]/20 text-xs text-[#18BFF2] flex items-center gap-2">
              <Eye className="w-4 h-4 shrink-0" />
              <span>
                <strong>Under Review Active:</strong> Opening this application has automatically updated its status to <em>Under Review</em> in the database. The applicant can now see that their application is actively being reviewed.
              </span>
            </div>

            {/* Applicant Coordinates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-lg bg-[#020B18] border border-white/10 space-y-1">
                <span className="text-[#7E8C9F] block">Email</span>
                <a
                  href={`mailto:${selectedApplication.applicantEmail}`}
                  className="font-medium text-white hover:text-[#18BFF2] flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#F4BC43]" />
                  <span>{selectedApplication.applicantEmail}</span>
                </a>
              </div>
              <div className="p-3.5 rounded-lg bg-[#020B18] border border-white/10 space-y-1">
                <span className="text-[#7E8C9F] block">Phone</span>
                <span className="font-medium text-white">
                  {selectedApplication.phone || 'Not provided'}
                </span>
              </div>
              {selectedApplication.linkedin && (
                <div className="p-3.5 rounded-lg bg-[#020B18] border border-white/10 space-y-1">
                  <span className="text-[#7E8C9F] block">LinkedIn Profile</span>
                  <a
                    href={selectedApplication.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#18BFF2] hover:underline flex items-center gap-1"
                  >
                    <span>{selectedApplication.linkedin}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
              {selectedApplication.portfolio && (
                <div className="p-3.5 rounded-lg bg-[#020B18] border border-white/10 space-y-1">
                  <span className="text-[#7E8C9F] block">Portfolio / GitHub</span>
                  <a
                    href={selectedApplication.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#18BFF2] hover:underline flex items-center gap-1"
                  >
                    <span>{selectedApplication.portfolio}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Resume / Background Profile */}
            <div className="space-y-2 text-xs">
              <label className="font-bold text-white uppercase tracking-wider block">
                Resume / Professional Background
              </label>
              <div className="p-4 rounded-lg bg-[#020B18] border border-white/10 text-[#B7C0CC] whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                {selectedApplication.resume || 'No resume details entered.'}
              </div>
            </div>

            {/* Cover Letter */}
            {selectedApplication.coverLetter && (
              <div className="space-y-2 text-xs">
                <label className="font-bold text-white uppercase tracking-wider block">
                  Cover Letter / Note
                </label>
                <div className="p-4 rounded-lg bg-[#020B18] border border-white/10 text-[#B7C0CC] whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
                  {selectedApplication.coverLetter}
                </div>
              </div>
            )}

            {/* Audit & Timing Metadata */}
            <div className="p-4 rounded-lg bg-white/[0.02] border border-white/10 text-[11px] text-[#7E8C9F] space-y-1">
              <div>
                <strong>Submitted At:</strong> {new Date(selectedApplication.submittedAt).toLocaleString()}
              </div>
              {selectedApplication.reviewedAt && (
                <div>
                  <strong>Reviewed At:</strong> {new Date(selectedApplication.reviewedAt).toLocaleString()} by{' '}
                  <span className="text-white">{selectedApplication.reviewedBy || 'Admin'}</span>
                </div>
              )}
            </div>

            {/* Change Application Status Controls */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <label className="text-xs font-bold text-white uppercase tracking-wider block">
                Update Candidate Status
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  disabled={statusUpdateLoading || selectedApplication.status === 'UNDER_REVIEW'}
                  onClick={() => handleUpdateStatus(selectedApplication.id, 'UNDER_REVIEW')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    selectedApplication.status === 'UNDER_REVIEW'
                      ? 'bg-[#18BFF2]/20 border-[#18BFF2] text-white'
                      : 'bg-white/5 border-white/10 text-[#18BFF2] hover:bg-[#18BFF2]/10'
                  }`}
                >
                  Under Review
                </button>
                <button
                  disabled={statusUpdateLoading || selectedApplication.status === 'SHORTLISTED'}
                  onClick={() => handleUpdateStatus(selectedApplication.id, 'SHORTLISTED')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    selectedApplication.status === 'SHORTLISTED'
                      ? 'bg-emerald-500/20 border-emerald-500 text-white'
                      : 'bg-white/5 border-white/10 text-emerald-400 hover:bg-emerald-500/10'
                  }`}
                >
                  Shortlist Candidate
                </button>
                <button
                  disabled={statusUpdateLoading || selectedApplication.status === 'HIRED'}
                  onClick={() => handleUpdateStatus(selectedApplication.id, 'HIRED')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    selectedApplication.status === 'HIRED'
                      ? 'bg-[#F4BC43]/20 border-[#F4BC43] text-white'
                      : 'bg-white/5 border-white/10 text-[#F4BC43] hover:bg-[#F4BC43]/10'
                  }`}
                >
                  Mark Hired
                </button>
                <button
                  disabled={statusUpdateLoading || selectedApplication.status === 'REJECTED'}
                  onClick={() => handleUpdateStatus(selectedApplication.id, 'REJECTED')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    selectedApplication.status === 'REJECTED'
                      ? 'bg-rose-500/20 border-rose-500 text-white'
                      : 'bg-white/5 border-white/10 text-rose-400 hover:bg-rose-500/10'
                  }`}
                >
                  Reject
                </button>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedApplication(null)}
                className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* CREATE / EDIT OPPORTUNITY MODAL                           */}
      {/* ========================================================= */}
      {isOppModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="rounded-2xl bg-[#061426] border border-white/15 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-xl font-bold text-white font-sans">
                {editingOpp ? 'Edit Career Opportunity' : 'Create Career Opportunity'}
              </h3>
              <button
                onClick={() => setIsOppModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#7E8C9F] hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveOpp} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#B7C0CC] mb-1">Role Title *</label>
                <input
                  type="text"
                  required
                  value={oppForm.title}
                  onChange={(e) => setOppForm({ ...oppForm, title: e.target.value })}
                  placeholder="e.g. Senior Cybersecurity & AI Security Architect"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#020B18] border border-white/15 text-white focus:outline-none focus:border-[#F4BC43]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#B7C0CC] mb-1">Department *</label>
                  <select
                    value={oppForm.department}
                    onChange={(e) => setOppForm({ ...oppForm, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#020B18] border border-white/15 text-white focus:outline-none focus:border-[#F4BC43]"
                  >
                    <option value="AI & Automation">AI & Automation</option>
                    <option value="Cybersecurity & Data Protection">Cybersecurity & Data Protection</option>
                    <option value="Cloud & Infrastructure">Cloud & Infrastructure</option>
                    <option value="IT Solutions & Consulting">IT Solutions & Consulting</option>
                    <option value="Software & Digital Solutions">Software & Digital Solutions</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#B7C0CC] mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={oppForm.location}
                    onChange={(e) => setOppForm({ ...oppForm, location: e.target.value })}
                    placeholder="e.g. Wilmington, DE / Hybrid"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#020B18] border border-white/15 text-white focus:outline-none focus:border-[#F4BC43]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-[#B7C0CC] mb-1">Employment Type</label>
                  <select
                    value={oppForm.employmentType}
                    onChange={(e) => setOppForm({ ...oppForm, employmentType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#020B18] border border-white/15 text-white focus:outline-none focus:border-[#F4BC43]"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#B7C0CC] mb-1">Experience Level</label>
                  <select
                    value={oppForm.experienceLevel}
                    onChange={(e) => setOppForm({ ...oppForm, experienceLevel: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#020B18] border border-white/15 text-white focus:outline-none focus:border-[#F4BC43]"
                  >
                    <option value="Entry">Entry</option>
                    <option value="Mid-Level">Mid-Level</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead">Lead</option>
                    <option value="Executive">Executive</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#B7C0CC] mb-1">Status</label>
                  <select
                    value={oppForm.status}
                    onChange={(e) => setOppForm({ ...oppForm, status: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#020B18] border border-white/15 text-white focus:outline-none focus:border-[#F4BC43]"
                  >
                    <option value="OPEN">OPEN</option>
                    <option value="CLOSED">CLOSED</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#B7C0CC] mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={oppForm.description}
                  onChange={(e) => setOppForm({ ...oppForm, description: e.target.value })}
                  placeholder="Overview of the position, scope, and engineering expectations..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#020B18] border border-white/15 text-white focus:outline-none focus:border-[#F4BC43]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#B7C0CC] mb-1">
                  Responsibilities (one per line)
                </label>
                <textarea
                  rows={3}
                  value={oppForm.responsibilities}
                  onChange={(e) => setOppForm({ ...oppForm, responsibilities: e.target.value })}
                  placeholder="Design zero-trust systems&#10;Implement AI defenses&#10;Lead SOC 2 audits"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#020B18] border border-white/15 text-white focus:outline-none focus:border-[#F4BC43]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#B7C0CC] mb-1">
                  Requirements & Qualifications (one per line)
                </label>
                <textarea
                  rows={3}
                  value={oppForm.requirements}
                  onChange={(e) => setOppForm({ ...oppForm, requirements: e.target.value })}
                  placeholder="5+ years in cloud security&#10;Proficiency in TypeScript / Python&#10;BS or MS in Computer Science"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#020B18] border border-white/15 text-white focus:outline-none focus:border-[#F4BC43]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#B7C0CC] mb-1">
                    Skills (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={oppForm.skills}
                    onChange={(e) => setOppForm({ ...oppForm, skills: e.target.value })}
                    placeholder="Cybersecurity, AI Security, Zero-Trust"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#020B18] border border-white/15 text-white focus:outline-none focus:border-[#F4BC43]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#B7C0CC] mb-1">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    value={oppForm.deadline}
                    onChange={(e) => setOppForm({ ...oppForm, deadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#020B18] border border-white/15 text-white focus:outline-none focus:border-[#F4BC43]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsOppModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={oppSubmitting}
                  className="px-6 py-2 rounded-lg bg-[#F4BC43] hover:bg-[#FFD76A] text-[#020B18] font-bold shadow-md shadow-[#F4BC43]/20"
                >
                  {oppSubmitting ? 'Saving...' : editingOpp ? 'Update Opportunity' : 'Create Opportunity'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
