import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Shield,
  CheckCircle,
  AlertCircle,
  Eye,
  UserCheck,
  XCircle,
  FileText,
  Mail,
  Phone,
  Linkedin,
  Globe,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Lock,
  LogOut,
  RefreshCw,
  Search,
  Filter,
  Check,
  Calendar,
  Building2,
  ExternalLink
} from 'lucide-react';
import {
  careersApi,
  CareerOpportunity,
  CareerApplication,
  AuthUser,
} from '../utils/careersApi';

export const CareersPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Tab: 'opportunities' | 'my-applications'
  const [activeTab, setActiveTab] = useState<'opportunities' | 'my-applications'>('opportunities');

  // Opportunities State
  const [opportunities, setOpportunities] = useState<CareerOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOppId, setExpandedOppId] = useState<string | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('ALL');

  // Application Modal State
  const [applyingToOpp, setApplyingToOpp] = useState<CareerOpportunity | null>(null);
  const [appForm, setAppForm] = useState({
    applicantName: '',
    applicantEmail: '',
    phone: '',
    resume: '',
    coverLetter: '',
    linkedin: '',
    portfolio: '',
  });
  const [appSubmitting, setAppSubmitting] = useState(false);
  const [appSuccessMessage, setAppSuccessMessage] = useState<string | null>(null);
  const [appErrorMessage, setAppErrorMessage] = useState<string | null>(null);

  // Applicant Tracking State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [myApplications, setMyApplications] = useState<CareerApplication[]>([]);
  const [myAppsLoading, setMyAppsLoading] = useState(false);
  const [applicantLoginEmail, setApplicantLoginEmail] = useState('');
  const [applicantLoginLoading, setApplicantLoginLoading] = useState(false);
  const [applicantAuthError, setApplicantAuthError] = useState<string | null>(null);

  useEffect(() => {
    loadOpportunities();
    checkCurrentUser();
  }, []);

  const loadOpportunities = async () => {
    setLoading(true);
    try {
      const opps = await careersApi.getOpportunities();
      // Strictly ensure only OPEN opportunities are rendered to candidates
      const openOpps = opps.filter((o) => o.status === 'OPEN');
      setOpportunities(openOpps);

      // Check if URL specified a direct apply parameter
      const applyId = searchParams.get('apply');
      if (applyId) {
        const found = openOpps.find((o) => o.id === applyId);
        if (found) {
          handleOpenApplyModal(found);
        }
      }

      // Check if URL specified a role to expand
      const targetId = searchParams.get('role');
      if (targetId) {
        const found = openOpps.find((o) => o.id === targetId);
        if (found) setExpandedOppId(found.id);
      }
    } catch (err: any) {
      console.error('Failed to load opportunities:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkCurrentUser = async () => {
    try {
      const me = await careersApi.getAuthMe();
      if (me.authenticated && me.user) {
        setCurrentUser(me.user);
        loadMyApplications();
      }
    } catch {
      // Unauthenticated visitor is standard
    }
  };

  const loadMyApplications = async () => {
    setMyAppsLoading(true);
    try {
      const apps = await careersApi.getMyApplications();
      setMyApplications(apps);
    } catch (err) {
      console.error('Failed to fetch candidate applications:', err);
    } finally {
      setMyAppsLoading(false);
    }
  };

  const handleApplicantLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantLoginEmail.trim()) return;
    setApplicantLoginLoading(true);
    setApplicantAuthError(null);

    const res = await careersApi.loginWithDevAccount(applicantLoginEmail.trim());
    setApplicantLoginLoading(false);

    if (!res.success || !res.user) {
      setApplicantAuthError(res.error || 'Authentication failed. Please verify your email.');
      return;
    }

    setCurrentUser(res.user);
    loadMyApplications();
  };

  const handleApplicantLogout = async () => {
    await careersApi.logout();
    setCurrentUser(null);
    setMyApplications([]);
  };

  const handleOpenApplyModal = (opp: CareerOpportunity) => {
    setApplyingToOpp(opp);
    setAppSuccessMessage(null);
    setAppErrorMessage(null);
    // Auto-fill from logged-in session if available
    if (currentUser) {
      setAppForm((prev) => ({
        ...prev,
        applicantEmail: currentUser.email,
        applicantName: currentUser.name || prev.applicantName,
      }));
    }
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingToOpp) return;

    setAppSubmitting(true);
    setAppErrorMessage(null);
    setAppSuccessMessage(null);

    try {
      await careersApi.submitApplication({
        careerId: applyingToOpp.id,
        applicantName: appForm.applicantName,
        applicantEmail: appForm.applicantEmail,
        phone: appForm.phone,
        resume: appForm.resume,
        coverLetter: appForm.coverLetter,
        linkedin: appForm.linkedin,
        portfolio: appForm.portfolio,
      });

      setAppSuccessMessage(
        `Application submitted successfully for "${applyingToOpp.title}"! Your record is securely queued in the talent system.`
      );

      // Reset form fields
      setAppForm({
        applicantName: '',
        applicantEmail: '',
        phone: '',
        resume: '',
        coverLetter: '',
        linkedin: '',
        portfolio: '',
      });

      // Refresh applications if user is currently signed in
      if (currentUser) {
        loadMyApplications();
      }
    } catch (err: any) {
      setAppErrorMessage(err.message || 'Failed to submit application. Please check your submission details.');
    } finally {
      setAppSubmitting(false);
    }
  };

  // Filtered Opportunities
  const departments = ['ALL', ...Array.from(new Set(opportunities.map((o) => o.department)))];

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesDept = selectedDepartment === 'ALL' || opp.department === selectedDepartment;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      opp.title.toLowerCase().includes(query) ||
      opp.description.toLowerCase().includes(query) ||
      opp.department.toLowerCase().includes(query) ||
      opp.location.toLowerCase().includes(query) ||
      opp.skills?.some((s) => s.toLowerCase().includes(query));
    return matchesDept && matchesSearch;
  });

  // Application Status Badge Helper
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'SUBMITTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F4BC43]/15 text-[#F4BC43] border border-[#F4BC43]/30">
            <Clock className="w-3.5 h-3.5" />
            Submitted
          </span>
        );
      case 'UNDER_REVIEW':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#18BFF2]/15 text-[#18BFF2] border border-[#18BFF2]/30 shadow-sm shadow-[#18BFF2]/20">
            <Eye className="w-3.5 h-3.5 animate-pulse" />
            Under Review
          </span>
        );
      case 'SHORTLISTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle className="w-3.5 h-3.5" />
            Shortlisted
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30">
            <XCircle className="w-3.5 h-3.5" />
            Not Selected
          </span>
        );
      case 'HIRED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F4BC43]/20 text-[#FFD76A] border border-[#F4BC43]/40">
            <UserCheck className="w-3.5 h-3.5" />
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

  return (
    <div className="bg-[#020B18] min-h-screen text-white pb-24">
      {/* Top Hero Banner */}
      <section className="relative py-16 sm:py-24 border-b border-white/[0.08] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#061426]/60 via-[#020B18]/90 to-[#020B18] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18BFF2]/10 border border-[#18BFF2]/20 text-[#18BFF2] text-xs font-semibold tracking-wider uppercase">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Careers at JupiterGenX AI</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-sans">
                Build the Future of Secure Enterprise Technology
              </h1>
              <p className="text-sm sm:text-base text-[#B7C0CC] leading-relaxed">
                Join our engineering practice delivering applied generative AI, enterprise cybersecurity, zero-trust architectures, and mission-critical cloud infrastructure.
              </p>
            </div>

            {/* Admin Portal Gateway */}
            <div className="shrink-0 flex items-center gap-3">
              <Link
                to="/careers/admin"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#B7C0CC] hover:text-white transition-all shadow-sm"
              >
                <Lock className="w-3.5 h-3.5 text-[#F4BC43]" />
                <span>Careers Admin Portal</span>
              </Link>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-6 mt-10 border-b border-white/10">
            <button
              onClick={() => setActiveTab('opportunities')}
              className={`pb-3 text-xs sm:text-sm font-semibold tracking-wide transition-all relative flex items-center gap-2 ${
                activeTab === 'opportunities'
                  ? 'text-white border-b-2 border-[#F4BC43]'
                  : 'text-[#7E8C9F] hover:text-[#B7C0CC]'
              }`}
            >
              <Briefcase className="w-4 h-4 text-[#F4BC43]" />
              <span>Open Opportunities ({opportunities.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('my-applications')}
              className={`pb-3 text-xs sm:text-sm font-semibold tracking-wide transition-all relative flex items-center gap-2 ${
                activeTab === 'my-applications'
                  ? 'text-white border-b-2 border-[#F4BC43]'
                  : 'text-[#7E8C9F] hover:text-[#B7C0CC]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#18BFF2]" />
              <span>Track My Applications {currentUser && myApplications.length > 0 ? `(${myApplications.length})` : ''}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ========================================================= */}
        {/* TAB 1: OPEN OPPORTUNITIES                                */}
        {/* ========================================================= */}
        {activeTab === 'opportunities' && (
          <div className="space-y-8">
            {/* Search and Department Filter Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-[#061426]/70 p-4 sm:p-5 rounded-2xl border border-white/10 shadow-lg">
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#7E8C9F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by role title, skill, or keyword..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#020B18] border border-white/15 text-white text-xs sm:text-sm placeholder-[#7E8C9F] focus:outline-none focus:border-[#F4BC43] transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7E8C9F] hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Department pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                <Filter className="w-3.5 h-3.5 text-[#7E8C9F] shrink-0 hidden sm:block" />
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDepartment(dept)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedDepartment === dept
                        ? 'bg-[#18BFF2] text-[#020B18] shadow-md shadow-[#18BFF2]/20 font-bold'
                        : 'bg-white/5 text-[#B7C0CC] hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                  >
                    {dept === 'ALL' ? 'All Roles' : dept}
                  </button>
                ))}
              </div>
            </div>

            {/* Opportunities List Container */}
            {loading ? (
              <div className="py-24 text-center space-y-4">
                <div className="w-10 h-10 border-2 border-[#F4BC43] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs sm:text-sm text-[#7E8C9F]">Loading live career opportunities from database...</p>
              </div>
            ) : filteredOpportunities.length === 0 ? (
              <div className="py-20 text-center rounded-2xl bg-[#061426]/40 border border-white/10 p-8 sm:p-12 space-y-4">
                <Briefcase className="w-12 h-12 text-[#7E8C9F] mx-auto opacity-40" />
                <h3 className="text-xl font-bold text-white font-sans">
                  {opportunities.length === 0 ? 'No Open Opportunities Available' : 'No Matching Positions Found'}
                </h3>
                <p className="text-xs sm:text-sm text-[#7E8C9F] max-w-md mx-auto leading-relaxed">
                  {opportunities.length === 0
                    ? 'All active openings are currently in final selection stages. Please check back regularly for newly authorized requisitions.'
                    : `No active positions match "${searchQuery || selectedDepartment}". Try adjusting your search query or department filter.`}
                </p>
                {(searchQuery || selectedDepartment !== 'ALL') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedDepartment('ALL');
                    }}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
                  >
                    Reset Search Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-5">
                {filteredOpportunities.map((opp) => {
                  const isExpanded = expandedOppId === opp.id;
                  return (
                    <article
                      key={opp.id}
                      id={`opportunity-${opp.id}`}
                      className="rounded-2xl bg-[#061426] border border-white/10 overflow-hidden transition-all hover:border-[#18BFF2]/40 shadow-lg hover:shadow-[#18BFF2]/5"
                    >
                      {/* Card Primary Header */}
                      <div className="p-6 sm:p-8">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                          {/* Left Column: Details */}
                          <div className="space-y-3 flex-1">
                            {/* Badges Row */}
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#18BFF2]/10 text-[#18BFF2] border border-[#18BFF2]/20 flex items-center gap-1">
                                <Building2 className="w-3 h-3" />
                                {opp.department}
                              </span>
                              <span className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-white/5 text-[#B7C0CC] border border-white/5">
                                {opp.employmentType}
                              </span>
                              <span className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-white/5 text-[#B7C0CC] border border-white/5">
                                {opp.experienceLevel}
                              </span>
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Active Opening
                              </span>
                            </div>

                            {/* Job Title */}
                            <h2 className="text-xl sm:text-2xl font-bold text-white font-sans tracking-tight">
                              {opp.title}
                            </h2>

                            {/* Location & Metadata Row */}
                            <div className="flex flex-wrap items-center gap-4 text-xs text-[#7E8C9F]">
                              <span className="flex items-center gap-1.5 text-[#B7C0CC]">
                                <MapPin className="w-3.5 h-3.5 text-[#F4BC43] shrink-0" />
                                {opp.location}
                              </span>
                              {opp.deadline && (
                                <span className="flex items-center gap-1.5">
                                  <Clock className="w-3.5 h-3.5 text-[#18BFF2] shrink-0" />
                                  Application Deadline: {opp.deadline}
                                </span>
                              )}
                              {opp.createdAt && (
                                <span className="flex items-center gap-1.5 text-[#7E8C9F]">
                                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                                  Posted: {new Date(opp.createdAt).toLocaleDateString(undefined, {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })}
                                </span>
                              )}
                            </div>

                            {/* Brief Description */}
                            <p className="text-xs sm:text-sm text-[#B7C0CC] leading-relaxed line-clamp-2 pt-1">
                              {opp.description}
                            </p>

                            {/* Skills Tags */}
                            {opp.skills && opp.skills.length > 0 && (
                              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                                {opp.skills.map((skill, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-0.5 rounded bg-[#020B18] border border-white/10 text-[11px] text-[#7E8C9F]"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Right Column: Prominent Apply Link / Button */}
                          <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/10">
                            {/* Primary APPLY Link & Action */}
                            <button
                              onClick={() => handleOpenApplyModal(opp)}
                              className="px-6 py-3 rounded-xl bg-[#F4BC43] hover:bg-[#FFD76A] text-[#020B18] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md shadow-[#F4BC43]/20 flex items-center gap-2 group/apply shrink-0"
                            >
                              <span>Apply Now</span>
                              <ArrowRight className="w-4 h-4 transition-transform group-hover/apply:translate-x-0.5" />
                            </button>

                            {/* Toggle Details Button */}
                            <button
                              onClick={() => setExpandedOppId(isExpanded ? null : opp.id)}
                              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#B7C0CC] hover:text-white transition-colors flex items-center gap-1.5"
                            >
                              <span>{isExpanded ? 'Hide Details' : 'View Full Details'}</span>
                              {isExpanded ? (
                                <ChevronUp className="w-3.5 h-3.5 text-[#F4BC43]" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Direct Apply Anchor Link for deep-linking */}
                        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#7E8C9F]">
                          <span className="font-mono">Requisition ID: {opp.id}</span>
                          <button
                            onClick={() => handleOpenApplyModal(opp)}
                            className="text-[#F4BC43] hover:underline font-semibold flex items-center gap-1"
                          >
                            <span>Direct Application Form</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Expanded Full Details Section */}
                      {isExpanded && (
                        <div className="px-6 sm:px-8 pb-8 pt-6 border-t border-white/[0.08] bg-[#020B18]/50 space-y-6 text-xs sm:text-sm">
                          {/* Role Overview */}
                          <div className="space-y-2">
                            <h4 className="font-bold text-white text-xs uppercase tracking-wider font-sans text-[#18BFF2]">
                              Role Overview
                            </h4>
                            <p className="text-[#B7C0CC] leading-relaxed whitespace-pre-line">
                              {opp.description}
                            </p>
                          </div>

                          {/* Responsibilities */}
                          {opp.responsibilities && opp.responsibilities.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="font-bold text-white text-xs uppercase tracking-wider font-sans text-[#18BFF2]">
                                Key Responsibilities
                              </h4>
                              <ul className="space-y-2 text-[#B7C0CC]">
                                {opp.responsibilities.map((resp, idx) => (
                                  <li key={idx} className="flex items-start gap-2.5">
                                    <span className="text-[#F4BC43] mt-1 shrink-0">•</span>
                                    <span className="leading-relaxed">{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Qualifications / Requirements */}
                          {opp.requirements && opp.requirements.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="font-bold text-white text-xs uppercase tracking-wider font-sans text-[#18BFF2]">
                                Qualifications & Requirements
                              </h4>
                              <ul className="space-y-2 text-[#B7C0CC]">
                                {opp.requirements.map((req, idx) => (
                                  <li key={idx} className="flex items-start gap-2.5">
                                    <span className="text-[#18BFF2] mt-1 shrink-0">•</span>
                                    <span className="leading-relaxed">{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Core Skills & Competencies */}
                          {opp.skills && opp.skills.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="font-bold text-white text-xs uppercase tracking-wider font-sans text-[#18BFF2]">
                                Desired Core Competencies
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {opp.skills.map((skill, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 rounded-lg bg-[#061426] border border-white/15 text-xs text-[#B7C0CC]"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Bottom Apply Action */}
                          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <p className="text-xs text-[#7E8C9F]">
                              Applications submitted through this portal are directly ingested into our enterprise talent review queue.
                            </p>
                            <button
                              onClick={() => handleOpenApplyModal(opp)}
                              className="px-6 py-2.5 rounded-xl bg-[#F4BC43] hover:bg-[#FFD76A] text-[#020B18] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md shadow-[#F4BC43]/20 inline-flex items-center justify-center gap-2 shrink-0"
                            >
                              <span>Apply for {opp.title}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: TRACK MY APPLICATIONS                             */}
        {/* ========================================================= */}
        {activeTab === 'my-applications' && (
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Authenticated Applicant Status */}
            {currentUser ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#061426] border border-white/10 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#18BFF2]/10 border border-[#18BFF2]/20 flex items-center justify-center text-[#18BFF2] font-bold text-sm">
                      {currentUser.name ? currentUser.name[0].toUpperCase() : 'A'}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{currentUser.name || 'Candidate'}</div>
                      <div className="text-[#7E8C9F]">{currentUser.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={loadMyApplications}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#7E8C9F] hover:text-white transition-colors"
                      title="Refresh status"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${myAppsLoading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                      onClick={handleApplicantLogout}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-[#B7C0CC] hover:text-white transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white font-sans">
                      My Submitted Applications
                    </h3>
                    <span className="text-xs text-[#7E8C9F]">
                      Direct applicant tracking
                    </span>
                  </div>

                  {myAppsLoading ? (
                    <div className="py-12 text-center text-xs text-[#7E8C9F]">
                      Refreshing your applications...
                    </div>
                  ) : myApplications.length === 0 ? (
                    <div className="p-8 sm:p-12 rounded-2xl bg-[#061426]/60 border border-white/10 text-center space-y-4">
                      <FileText className="w-10 h-10 text-[#7E8C9F] mx-auto opacity-50" />
                      <p className="text-base font-semibold text-white">No active applications found.</p>
                      <p className="text-xs sm:text-sm text-[#7E8C9F] max-w-sm mx-auto">
                        You have not submitted any applications with <strong>{currentUser.email}</strong> yet.
                      </p>
                      <button
                        onClick={() => setActiveTab('opportunities')}
                        className="px-5 py-2.5 rounded-xl bg-[#F4BC43] text-[#020B18] font-bold text-xs shadow-md shadow-[#F4BC43]/20"
                      >
                        Explore Open Positions
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {myApplications.map((app) => (
                        <div
                          key={app.id}
                          className="p-6 rounded-2xl bg-[#061426] border border-white/10 space-y-4"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                            <div>
                              <h4 className="text-base font-bold text-white font-sans">
                                {app.careerTitle}
                              </h4>
                              <span className="text-xs text-[#7E8C9F]">
                                Application Record: <span className="font-mono">{app.id}</span>
                              </span>
                            </div>
                            <div>{renderStatusBadge(app.status)}</div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#B7C0CC]">
                            <div>
                              <span className="text-[#7E8C9F] block mb-1">Submitted Date</span>
                              <span className="font-medium text-white">
                                {new Date(app.submittedAt).toLocaleDateString(undefined, {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </span>
                            </div>
                            <div>
                              <span className="text-[#7E8C9F] block mb-1">Current Status Note</span>
                              {app.status === 'UNDER_REVIEW' ? (
                                <span className="text-[#18BFF2] font-semibold flex items-center gap-1.5">
                                  <Eye className="w-3.5 h-3.5 animate-pulse" />
                                  Your application is actively under review by our talent team.
                                </span>
                              ) : app.status === 'SUBMITTED' ? (
                                <span className="text-[#F4BC43]">
                                  Received and queued for initial qualification assessment.
                                </span>
                              ) : app.status === 'SHORTLISTED' ? (
                                <span className="text-emerald-400 font-semibold">
                                  Selected for candidate interviews. A recruiter will contact you.
                                </span>
                              ) : app.status === 'HIRED' ? (
                                <span className="text-[#FFD76A] font-bold">
                                  Offer extended. Welcome to JupiterGenX AI!
                                </span>
                              ) : (
                                <span className="text-[#7E8C9F]">
                                  Position filled or application closed.
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Unauthenticated Applicant Login */
              <div className="rounded-2xl bg-[#061426] border border-white/10 p-8 sm:p-10 space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-[#18BFF2]/10 border border-[#18BFF2]/20 flex items-center justify-center mx-auto text-[#18BFF2]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                    Track Your Application Status
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7E8C9F] max-w-md mx-auto leading-relaxed">
                    Enter the email address you used when submitting your application to view real-time status updates from our talent evaluation team.
                  </p>
                </div>

                {applicantAuthError && (
                  <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/25 text-xs text-rose-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{applicantAuthError}</span>
                  </div>
                )}

                <form onSubmit={handleApplicantLogin} className="space-y-4 max-w-md mx-auto">
                  <div>
                    <label className="block text-xs font-semibold text-[#B7C0CC] mb-1.5">
                      Applicant Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={applicantLoginEmail}
                      onChange={(e) => setApplicantLoginEmail(e.target.value)}
                      placeholder="e.g. candidate@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#020B18] border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#18BFF2] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={applicantLoginLoading}
                    className="w-full py-3 rounded-xl bg-[#18BFF2] hover:bg-[#18BFF2]/90 text-[#020B18] font-bold text-xs sm:text-sm transition-all shadow-md shadow-[#18BFF2]/20 flex items-center justify-center gap-2"
                  >
                    {applicantLoginLoading ? (
                      <div className="w-4 h-4 border-2 border-[#020B18] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    <span>View My Application Status</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* APPLICATION MODAL                                         */}
      {/* ========================================================= */}
      {applyingToOpp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="rounded-2xl bg-[#061426] border border-white/15 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[11px] font-semibold text-[#F4BC43] uppercase tracking-wider block">
                  Submit Candidate Application
                </span>
                <h3 className="text-xl font-bold text-white font-sans">
                  {applyingToOpp.title}
                </h3>
                <span className="text-xs text-[#7E8C9F]">
                  Department: {applyingToOpp.department} • Location: {applyingToOpp.location}
                </span>
              </div>
              <button
                onClick={() => setApplyingToOpp(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#7E8C9F] hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Error Message */}
            {appErrorMessage && (
              <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/25 flex items-start gap-2.5 text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <span>{appErrorMessage}</span>
              </div>
            )}

            {/* Success Confirmation View */}
            {appSuccessMessage ? (
              <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white font-sans">Application Received!</h4>
                <p className="text-xs sm:text-sm text-[#B7C0CC] leading-relaxed max-w-md mx-auto">
                  {appSuccessMessage}
                </p>
                <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={() => {
                      setApplyingToOpp(null);
                      setActiveTab('my-applications');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#18BFF2] text-[#020B18] font-bold text-xs"
                  >
                    Track Status in "My Applications"
                  </button>
                  <button
                    onClick={() => setApplyingToOpp(null)}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Application Form */
              <form onSubmit={handleApplicationSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#B7C0CC] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={appForm.applicantName}
                      onChange={(e) => setAppForm({ ...appForm, applicantName: e.target.value })}
                      placeholder="e.g. Alex Mercer"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#020B18] border border-white/15 text-white focus:outline-none focus:border-[#F4BC43] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#B7C0CC] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={appForm.applicantEmail}
                      onChange={(e) => setAppForm({ ...appForm, applicantEmail: e.target.value })}
                      placeholder="e.g. alex@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#020B18] border border-white/15 text-white focus:outline-none focus:border-[#F4BC43] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#B7C0CC] mb-1">
                      Phone Number (optional)
                    </label>
                    <input
                      type="tel"
                      value={appForm.phone}
                      onChange={(e) => setAppForm({ ...appForm, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#020B18] border border-white/15 text-white focus:outline-none focus:border-[#F4BC43] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#B7C0CC] mb-1">
                      LinkedIn Profile (optional)
                    </label>
                    <input
                      type="url"
                      value={appForm.linkedin}
                      onChange={(e) => setAppForm({ ...appForm, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#020B18] border border-white/15 text-white focus:outline-none focus:border-[#F4BC43] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#B7C0CC] mb-1">
                    Portfolio / GitHub Profile (optional)
                  </label>
                  <input
                    type="url"
                    value={appForm.portfolio}
                    onChange={(e) => setAppForm({ ...appForm, portfolio: e.target.value })}
                    placeholder="https://github.com/username or portfolio link"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#020B18] border border-white/15 text-white focus:outline-none focus:border-[#F4BC43] transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#B7C0CC] mb-1">
                    Resume / CV / Key Accomplishments *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={appForm.resume}
                    onChange={(e) => setAppForm({ ...appForm, resume: e.target.value })}
                    placeholder="Paste resume summary, key accomplishments, technical toolsets, or link to your hosted PDF resume..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#020B18] border border-white/15 text-white focus:outline-none focus:border-[#F4BC43] transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#B7C0CC] mb-1">
                    Cover Letter / Note to Talent Team (optional)
                  </label>
                  <textarea
                    rows={3}
                    value={appForm.coverLetter}
                    onChange={(e) => setAppForm({ ...appForm, coverLetter: e.target.value })}
                    placeholder="Briefly describe your experience and why you want to build high-consequence enterprise AI systems with JupiterGenX AI..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#020B18] border border-white/15 text-white focus:outline-none focus:border-[#F4BC43] transition-colors"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setApplyingToOpp(null)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={appSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-[#F4BC43] hover:bg-[#FFD76A] text-[#020B18] font-bold shadow-md shadow-[#F4BC43]/20 flex items-center gap-2 transition-all"
                  >
                    {appSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-[#020B18] border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
