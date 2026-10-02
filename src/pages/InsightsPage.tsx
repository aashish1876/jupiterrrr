import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Calendar, Clock, ArrowRight, ShieldCheck, 
  Sparkles, Filter, Lock, Cloud, Cpu, FileText, CheckCircle2 
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  summary: string;
  readingTime: string;
  date: string;
  author: string;
  authorRole: string;
  content: string[];
  keyTakeaways: string[];
}

export const InsightsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const categories = [
    'All',
    'Artificial Intelligence',
    'AI Security',
    'Cybersecurity',
    'Data Protection',
    'Cloud & Infrastructure',
    'Technology Strategy',
  ];

  const articles: Article[] = [
    {
      id: 'responsible-enterprise-genai',
      title: 'Architecting Enterprise Generative AI with Zero-Retention Data Enclaves',
      category: 'Artificial Intelligence',
      summary:
        'How modern enterprises isolate sensitive intellectual property while deploying multi-agent LLMs across regulated domains.',
      readingTime: '6 min read',
      date: 'October 2026',
      author: 'Marcus Vance',
      authorRole: 'Chief AI Architect',
      keyTakeaways: [
        'Confidential compute enclaves prevent LLM inference memory scraping.',
        'Zero-retention model agreements prevent proprietary customer data ingestion.',
        'Deterministic guardrail proxies filter hallucinated outputs prior to downstream execution.',
      ],
      content: [
        'Enterprise deployment of generative models is no longer an experimental sandbox activity—it is an infrastructural mandate. However, feeding proprietary source code, patient records, or financial portfolios into public third-party model endpoints creates unprecedented exposure vectors.',
        'At JupiterGenX AI, we implement sovereign AI architectures using isolated VPC enclaves, synthetic data sanitization, and cryptographic session tokens that guarantee inference sessions are discarded immediately post-computation.',
        'By establishing programmatic prompt evaluation filters and model guardrails, organizations can safely exploit agentic productivity while maintaining strict ISO 42001 and EU AI Act compliance.',
      ],
    },
    {
      id: 'ai-security-threat-vectors',
      title: 'Defending Neural Weights: Mitigating Indirect Prompt Injection & Model Poisoning',
      category: 'AI Security',
      summary:
        'A technical deep-dive into adversarial attacks targeting retrieval-augmented generation (RAG) pipelines and mitigation playbooks.',
      readingTime: '8 min read',
      date: 'September 2026',
      author: 'Dr. Elena Rostova',
      authorRole: 'Lead Security Researcher',
      keyTakeaways: [
        'RAG ingestion pipelines are vulnerable to poisoned external corpus injection.',
        'Semantic parsing must isolate untrusted external content from privileged system instructions.',
        'Continuous red-team fuzzing is essential to detect latent model vulnerabilities.',
      ],
      content: [
        'Traditional application security tools are blind to natural language exploit payloads. Indirect prompt injection occurs when external untrusted data sources—such as customer emails, scanned invoices, or web scrapes—contain hidden directives that hijack the agent’s execution instructions.',
        'Our security architecture team enforces strict dual-context boundaries. System execution prompts are segregated from raw text inputs, and intermediate agent decisions undergo secondary validation before executing privileged APIs.',
        'Furthermore, training weights and vector databases must be cryptographically hashed and continuously attested against tampering.',
      ],
    },
    {
      id: 'zero-trust-cyber-resilience',
      title: 'The Shift from Perimeter Defense to Immutable Cyber Resilience',
      category: 'Cybersecurity',
      summary:
        'Why enterprise networks must assume breach, enforce micro-segmentation, and establish air-gapped recovery architectures.',
      readingTime: '7 min read',
      date: 'September 2026',
      author: 'David Chen',
      authorRole: 'Principal Security Officer',
      keyTakeaways: [
        'Network perimeters are obsolete in decentralized, multi-cloud enterprise estates.',
        'Micro-segmentation restricts lateral threat movement within internal server clusters.',
        'Immutable backup repositories prevent ransomware from encrypting recovery volumes.',
      ],
      content: [
        'Ransomware operators have shifted from simple endpoint encryption to targeted operational destruction. Modern adversaries dwell inside compromised networks for an average of 14 days, identifying and wiping out backup servers before detonating.',
        'True cyber resilience requires immutable, write-once-read-many (WORM) storage paired with automated continuous restoration verification.',
        'JupiterGenX AI architects defensible security zones that ensure that even in the catastrophic event of a credential compromise, critical infrastructure remains isolated and instantly restorable.',
      ],
    },
    {
      id: 'sovereign-data-protection',
      title: 'Data Sovereignty & Cryptographic Governance in Cross-Border Workflows',
      category: 'Data Protection',
      summary:
        'Navigating stringent regional data sovereignty mandates without compromising cloud scalability or real-time analytics.',
      readingTime: '5 min read',
      date: 'August 2026',
      author: 'Sophia Martinez',
      authorRole: 'Head of Regulatory Engineering',
      keyTakeaways: [
        'Cross-border data movement requires automated geofencing at the storage layer.',
        'Customer-managed encryption keys (CMEK) ensure cloud providers cannot access raw payloads.',
        'Audit logs must be mathematically tamper-proof using cryptographic hashing.',
      ],
      content: [
        'Multinational enterprises face conflicting jurisdictional regulations regarding where data is stored, processed, and accessed. Relying on administrative policies alone is inadequate when non-compliance carries severe revenue penalties.',
        'Our engineering practice deploys hardware security modules (HSM) and automated geolocation routing policies that enforce sovereign residency at the infrastructure layer.',
      ],
    },
    {
      id: 'hybrid-cloud-modernization',
      title: 'FinOps & Topology: Eliminating Unplanned Cloud Infrastructure Overhang',
      category: 'Cloud & Infrastructure',
      summary:
        'Engineering strategies for rightsizing hybrid Kubernetes clusters and mitigating egress bandwidth cost traps.',
      readingTime: '6 min read',
      date: 'August 2026',
      author: 'Tariq Al-Mansoor',
      authorRole: 'Cloud Solutions Lead',
      keyTakeaways: [
        'Unmanaged cloud spend typically stems from overprovisioned standby clusters and unindexed storage tiers.',
        'Hybrid architectures require unified telemetry across on-prem and public cloud nodes.',
        'Spot and burst instances can cut batch computational costs by up to 60%.',
      ],
      content: [
        'Migrating to the cloud without an architectural modernization strategy frequently results in cloud costs exceeding original datacenter budgets. Lift-and-shift operations simply transplant inefficiency onto metered infrastructure.',
        'By re-architecting applications into containerized microservices managed via declarative Kubernetes topologies, enterprises gain elasticity while locking in predictable unit economics.',
      ],
    },
    {
      id: 'enterprise-technology-roadmap',
      title: 'The Pragmatic CTO: Translating Emerging Tech into Executive Value',
      category: 'Technology Strategy',
      summary:
        'A framework for evaluating emerging technology bets, avoiding vendor lock-in, and maintaining architectural agility.',
      readingTime: '5 min read',
      date: 'July 2026',
      author: 'JupiterGenX Advisory Council',
      authorRole: 'Strategic Advisory Group',
      keyTakeaways: [
        'Technology initiatives must be tethered to specific operational KPIs.',
        'Vendor lock-in should be mitigated through open standard protocols and portable abstractions.',
        'Iterative delivery phases de-risk multi-million dollar transformation programs.',
      ],
      content: [
        'The velocity of modern software innovation can paralyze technology leaders with hype cycles. Successful enterprises distinguish between durable shifts and transient novelties.',
        'JupiterGenX AI’s five-step delivery methodology—Discover, Design, Secure, Implement, Optimize—provides a rigorous governance framework that guarantees investments yield measurable ROI.',
      ],
    },
  ];

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter((a) => a.category === selectedCategory);

  return (
    <div className="bg-[#020B18] min-h-screen text-white">
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-20 border-b border-white/[0.08]">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#18BFF2]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#061426] border border-[#F4BC43]/30 text-[#F4BC43] text-xs font-bold tracking-[0.2em] uppercase font-sans mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#F4BC43]" />
            <span>THOUGHT LEADERSHIP & RESEARCH</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-sans max-w-4xl mx-auto">
            Insights & Technical Intelligence
          </h1>

          <div className="w-16 h-[2.5px] bg-[#F4BC43] mx-auto mt-5 rounded-full" />

          <p className="mt-5 text-base sm:text-lg text-[#B7C0CC] max-w-2xl mx-auto leading-relaxed">
            In-depth perspectives, architectural whitepapers, and operational frameworks from JupiterGenX AI engineers and cybersecurity researchers.
          </p>

          {/* Categories Filter Tabs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#F4BC43] text-[#020B18] shadow-md shadow-[#F4BC43]/20 font-bold'
                    : 'bg-[#061426] text-[#B7C0CC] hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-[#061426] border border-white/[0.12] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#F4BC43]/50 transition-all duration-300 group shadow-lg shadow-black/20"
            >
              <div className="p-6 space-y-4">
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs text-[#7E8C9F]">
                  <span className="px-2.5 py-1 rounded bg-[#020B18] border border-white/10 text-[#18BFF2] font-semibold text-[11px]">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readingTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-[#38CFFF] transition-colors leading-snug font-sans">
                  {article.title}
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-[#B7C0CC] leading-relaxed line-clamp-3">
                  {article.summary}
                </p>

                {/* Author Info */}
                <div className="pt-2 flex items-center justify-between text-xs text-[#7E8C9F] border-t border-white/[0.06]">
                  <div>
                    <span className="text-white font-medium">{article.author}</span>
                    <span className="text-white/40 block text-[10px]">{article.authorRole}</span>
                  </div>
                  <span>{article.date}</span>
                </div>
              </div>

              {/* Read Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setActiveArticle(article)}
                  className="w-full py-2.5 rounded-lg bg-[#020B18] hover:bg-[#F4BC43] text-white hover:text-[#020B18] border border-white/10 hover:border-[#F4BC43] text-xs font-bold transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <span>Read Full Briefing</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Modal for Full Article Reading */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-[#020B18]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#061426] border border-white/20 rounded-2xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl relative my-8 text-left">
            {/* Close Button */}
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center text-sm font-bold transition-all"
            >
              ✕
            </button>

            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-[#7E8C9F] mb-4">
              <span className="px-3 py-1 rounded bg-[#020B18] text-[#18BFF2] font-semibold border border-white/10">
                {activeArticle.category}
              </span>
              <span>•</span>
              <span>{activeArticle.date}</span>
              <span>•</span>
              <span>{activeArticle.readingTime}</span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans leading-tight mb-4">
              {activeArticle.title}
            </h2>

            {/* Author */}
            <div className="flex items-center gap-3 pb-6 border-b border-white/10 text-xs text-[#B7C0CC]">
              <div>
                <span className="font-bold text-white">{activeArticle.author}</span>
                <span className="text-[#18BFF2] ml-2 font-mono">[{activeArticle.authorRole}]</span>
              </div>
            </div>

            {/* Key Takeaways */}
            <div className="my-6 p-5 rounded-xl bg-[#091A2D] border border-white/10 space-y-2.5">
              <h4 className="text-xs font-bold tracking-wider text-[#F4BC43] uppercase font-sans">
                Executive Takeaways
              </h4>
              <ul className="space-y-2">
                {activeArticle.keyTakeaways.map((takeaway, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#B7C0CC]">
                    <CheckCircle2 className="w-4 h-4 text-[#F4BC43] shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Body Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-[#B7C0CC] leading-relaxed">
              {activeArticle.content.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#7E8C9F]">
                Interested in implementing this architectural model?
              </span>
              <div className="flex items-center gap-3">
                <Link
                  to="/contact"
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2.5 rounded-md bg-[#F4BC43] text-[#020B18] font-bold text-xs sm:text-sm hover:bg-[#FFD76A] transition-all"
                >
                  Consult with our Authors
                </Link>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-4 py-2.5 rounded-md bg-white/5 text-white hover:bg-white/10 text-xs sm:text-sm transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
