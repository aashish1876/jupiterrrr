import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, ShieldCheck, Cloud, Cpu, Code2, ArrowRight, CheckCircle2, 
  ExternalLink, Sparkles, Layers, ShieldAlert, Database, Server
} from 'lucide-react';
import { IMAGES } from '../assets/images';

export const SolutionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const solutionCategories = [
    {
      id: 'ai-automation',
      title: 'AI & Automation',
      subtitle: 'Cognitive Computing & Intelligent Agent Systems',
      description:
        'Harness advanced generative models, deterministic autonomous agents, and enterprise-grade LLM workflows engineered to automate complex operations safely.',
      pagePath: '/ai-automation',
      icon: Bot,
      image: IMAGES.serviceAi,
      capabilities: [
        { name: 'Generative AI', desc: 'Enterprise custom LLMs, multimodal synthesis, and contextual prompt frameworks.' },
        { name: 'AI Agents & Agentic AI', desc: 'Autonomous multi-agent swarms for automated research, ticketing, and operations.' },
        { name: 'Enterprise AI Adoption', desc: 'Executive roadmap, ROI scoring, change management, and internal team enablement.' },
        { name: 'Workflow Automation', desc: 'End-to-end process orchestration connecting legacy ERP, CRM, and cloud services.' },
        { name: 'AI Integration', desc: 'Seamless API connectors, vector embeddings, and retrieval-augmented generation (RAG).' },
        { name: 'LLM Solutions', desc: 'Fine-tuning, private hosting, model quantization, and local on-prem inference.' },
        { name: 'AI Security', desc: 'Continuous red-teaming, prompt injection barriers, and data exfiltration defense.' },
        { name: 'Responsible AI Implementation', desc: 'Explainability audits, fairness benchmarks, and human-in-the-loop oversight.' },
      ],
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity & Data Protection',
      subtitle: 'Zero-Trust Architecture & Data Sovereignty',
      description:
        'Comprehensive cyber resilience safeguarding enterprise networks, identities, AI workloads, and sovereign data assets against nation-state and opportunistic threats.',
      pagePath: '/cybersecurity',
      icon: ShieldCheck,
      image: IMAGES.serviceSecurity,
      capabilities: [
        { name: 'AI Security & Safety', desc: 'Guarding neural weights, preventing training data poisoning, and securing inference.' },
        { name: 'Data Protection & Privacy', desc: 'Hardware-grade cryptographic encryption, sovereign boundary control, and PII masking.' },
        { name: 'Cybersecurity Architecture', desc: 'Zero-trust network architecture, micro-segmentation, and defensible security zones.' },
        { name: 'Threat & Vulnerability Assessment', desc: 'Proactive red-team penetration testing, vulnerability scanning, and exposure triage.' },
        { name: 'Identity & Access Governance', desc: 'Role-based access control (RBAC), multi-factor authentication, and privileged access.' },
        { name: 'Cyber Resilience & Continuity', desc: 'Incident response playbooks, tabletop simulations, and operational rapid recovery.' },
        { name: 'Backup & Disaster Recovery', desc: 'Immutable air-gapped backups, automated validation, and verifiable RTO/RPO targets.' },
        { name: 'Compliance & Risk Management', desc: 'ISO 27001, SOC 2, HIPAA, NIST CSF, and regional sovereign compliance readiness.' },
      ],
    },
    {
      id: 'cloud-infrastructure',
      title: 'Cloud & Infrastructure',
      subtitle: 'Hybrid-Cloud Topology & Resilient Systems',
      description:
        'Architect, migrate, and optimize resilient multi-cloud and on-premise infrastructure designed for ultra-low latency, mission-critical uptime, and elastic scaling.',
      pagePath: '/cloud-infrastructure',
      icon: Cloud,
      image: IMAGES.serviceCloud,
      capabilities: [
        { name: 'Cloud Migration & Modernization', desc: 'Structured lift-and-shift, re-platforming, and containerized modernization.' },
        { name: 'Hybrid & Multi-Cloud Architecture', desc: 'Unified control planes across AWS, Azure, Google Cloud, and private datacenters.' },
        { name: 'Enterprise Infrastructure', desc: 'High-density compute, resilient storage fabrics, and redundant networking backbones.' },
        { name: 'Data Storage & Virtualization', desc: 'Hyper-converged infrastructure, VMware/KVM virtualization, and SAN/NAS arrays.' },
        { name: 'Business Continuity', desc: 'Active-active multi-region failover, geo-redundancy, and high availability design.' },
        { name: 'Disaster Recovery Solutions', desc: 'Continuous data replication, cold/warm/hot DR sites, and automated cutover tests.' },
        { name: 'Infrastructure Optimization', desc: 'Cloud FinOps, resource rightsizing, cost management, and carbon footprint reduction.' },
        { name: 'IT Support & Monitoring', desc: '24/7/365 telemetry, proactive observability, automated alerting, and tier-3 escalation.' },
      ],
    },
    {
      id: 'it-solutions',
      title: 'IT Solutions & Consulting',
      subtitle: 'Strategic Technology Advisory & Implementation',
      description:
        'Bridging executive strategy with practical engineering execution. We deliver tailored advisory, system integration, and managed technology services.',
      pagePath: '/it-solutions',
      icon: Cpu,
      image: IMAGES.serviceIt,
      capabilities: [
        { name: 'Strategic IT Consulting', desc: 'Technology roadmaps, digital capability scoring, and IT investment governance.' },
        { name: 'Enterprise Architecture', desc: 'TOGAF-aligned blueprints, technical standards, and scalable target-state design.' },
        { name: 'Technology Implementation', desc: 'Turnkey hardware and software deployment managed by certified engineers.' },
        { name: 'System Integration', desc: 'Middleware, enterprise service bus, and cross-platform interoperability.' },
        { name: 'Infrastructure Modernization', desc: 'Retiring end-of-life systems and upgrading core networks and server infrastructure.' },
        { name: 'Professional Services', desc: 'Specialized engineering staff augmentation and dedicated project delivery teams.' },
        { name: 'Managed Technology Services', desc: 'Predictable SLA-backed IT management, patch governance, and user support.' },
        { name: 'Technology Assessments', desc: 'Objective technical audits, performance benchmarks, and gap remediation roadmaps.' },
      ],
    },
    {
      id: 'software-digital-solutions',
      title: 'Software & Digital Solutions',
      subtitle: 'Custom Engineering & Digital Platforms',
      description:
        'Engineer bespoke software systems, high-performance web portals, and intelligent digital applications that streamline business execution.',
      pagePath: '/software-digital-solutions',
      icon: Code2,
      image: IMAGES.serviceSoftware,
      capabilities: [
        { name: 'Custom Software Development', desc: 'Tailored enterprise software engineered with modern TypeScript, Go, and Python.' },
        { name: 'Enterprise Applications', desc: 'Scalable CRM, ERP extensions, and operational dashboards built for high throughput.' },
        { name: 'Web Applications & Portals', desc: 'Secure customer-facing portals, extranets, and responsive enterprise applications.' },
        { name: 'API & Integration Development', desc: 'Robust RESTful and GraphQL APIs with OpenAPI specifications and rate-limiting.' },
        { name: 'AI-Enabled Software', desc: 'Injecting machine learning, semantic search, and predictive scoring into apps.' },
        { name: 'Process Automation Tools', desc: 'Automated data pipelines, document parsing, and batch reconciliation tools.' },
        { name: 'Modernization of Legacy Systems', desc: 'Decoupling monolithic codebases into resilient microservices and modern UI.' },
        { name: 'Digital Experience Platforms', desc: 'Unified multi-channel customer and employee engagement platforms.' },
      ],
    },
  ];

  const filteredCategories = activeTab === 'all' 
    ? solutionCategories 
    : solutionCategories.filter((c) => c.id === activeTab);

  return (
    <div className="bg-[#020B18] min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-white/[0.08]">
        {/* Background glow */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#18BFF2]/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/2 left-10 w-[450px] h-[450px] bg-[#F4BC43]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#061426] border border-[#F4BC43]/30 text-[#F4BC43] text-xs font-bold tracking-[0.2em] uppercase font-sans mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#F4BC43]" />
            <span>SOLUTIONS DIRECTORY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-sans max-w-4xl mx-auto leading-tight">
            Technology Solutions Designed for <br className="hidden sm:inline" />
            <span className="text-[#F4BC43]">Real-World Challenges</span>
          </h1>

          <div className="w-20 h-[3px] bg-[#F4BC43] mx-auto mt-6 rounded-full" />

          <p className="mt-6 text-base sm:text-lg md:text-xl text-[#B7C0CC] max-w-3xl mx-auto leading-relaxed">
            JupiterGenX AI combines artificial intelligence, cybersecurity, cloud, infrastructure, data and technology consulting to help organizations modernize operations and prepare for what’s next.
          </p>

          {/* Quick jump filter buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-[#F4BC43] text-[#020B18] shadow-md shadow-[#F4BC43]/20'
                  : 'bg-[#061426] text-[#B7C0CC] hover:text-white border border-white/10'
              }`}
            >
              All Solutions
            </button>
            {solutionCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === cat.id
                    ? 'bg-[#F4BC43] text-[#020B18] shadow-md shadow-[#F4BC43]/20'
                    : 'bg-[#061426] text-[#B7C0CC] hover:text-white border border-white/10'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Detailed Directory */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {filteredCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <div
              key={category.id}
              id={category.id}
              className="bg-[#061426] border border-white/[0.12] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden group"
            >
              {/* Category Header */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-white/[0.08]">
                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#020B18] border border-[#F4BC43]/30 flex items-center justify-center text-[#F4BC43]">
                      <Icon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-[#18BFF2] uppercase tracking-wider font-bold">
                        SOLUTION VERTICAL 0{index + 1}
                      </span>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-sans">
                        {category.title}
                      </h2>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-[#B7C0CC] pt-1 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Direct Page Link Button */}
                <Link
                  to={category.pagePath}
                  className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#091A2D] hover:bg-[#F4BC43] text-white hover:text-[#020B18] border border-[#F4BC43]/40 hover:border-[#F4BC43] text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md group/btn"
                >
                  <span>Explore Dedicated Page</span>
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* 8 Included Capabilities Grid */}
              <div className="pt-8">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white font-sans flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#F4BC43]" />
                    <span>Included Core Capabilities & Architecture</span>
                  </h3>
                  <span className="text-xs text-[#7E8C9F] font-mono">
                    8 Core Modules
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.capabilities.map((cap, capIdx) => (
                    <div
                      key={capIdx}
                      className="bg-[#020B18]/70 hover:bg-[#020B18] p-5 rounded-xl border border-white/[0.08] hover:border-[#18BFF2]/40 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#18BFF2] shrink-0 mt-0.5" />
                          <h4 className="text-sm font-bold text-white font-sans leading-snug">
                            {cap.name}
                          </h4>
                        </div>
                        <p className="text-xs text-[#B7C0CC] leading-relaxed pl-6">
                          {cap.desc}
                        </p>
                      </div>

                      <div className="pt-4 pl-6 text-[10px] text-[#7E8C9F] font-mono uppercase tracking-wider flex items-center gap-1">
                        <span>Deployable Service</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Banner for this category */}
              <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#B7C0CC]">
                  Need a custom scope or architectural review for <strong className="text-white">{category.title}</strong>?
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    to="/contact"
                    className="text-xs font-bold text-[#F4BC43] hover:text-[#FFD76A] inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>Request Architecture Brief</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Global Call to Action Section */}
      <section className="bg-[#061426] border-t border-white/[0.08] py-16 sm:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-sans">
            Ready to Build Your Technology Roadmap?
          </h2>
          <p className="text-sm sm:text-base text-[#B7C0CC] leading-relaxed max-w-2xl mx-auto">
            Speak directly with our senior technology architects. We assess your environment, identify vulnerabilities, and craft an actionable blueprint.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-md bg-[#F4BC43] hover:bg-[#FFD76A] text-[#020B18] font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#F4BC43]/20"
            >
              Talk to an Expert
            </Link>
            <Link
              to="/about"
              className="px-8 py-3.5 rounded-md bg-[#020B18] hover:bg-[#091A2D] text-white border border-white/20 font-semibold text-sm transition-all"
            >
              About JupiterGenX AI
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
