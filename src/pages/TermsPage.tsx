import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Shield, CheckCircle2 } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="bg-[#020B18] min-h-screen text-white">
      <section className="relative pt-16 pb-16 border-b border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-xs font-mono tracking-wider text-[#F4BC43] mb-4">
            <Link to="/" className="hover:underline">HOME</Link>
            <span>/</span>
            <span className="text-white">TERMS OF SERVICE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Master Terms of Service
          </h1>
          <p className="text-sm text-[#B7C0CC]">
            Effective Date: January 1, 2026 • Version 2.4
          </p>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-[#B7C0CC] text-sm leading-relaxed">
        
        <div className="p-6 rounded-2xl bg-[#081729] border border-white/10 space-y-3">
          <div className="flex items-center space-x-3 text-[#F4BC43]">
            <FileText className="w-5 h-5" />
            <h3 className="text-lg font-bold text-white">Institutional Engagement Framework</h3>
          </div>
          <p>
            These Master Terms of Service govern the access to and utilization of JupiterGenX AI LLC (&quot;JupiterGenX AI&quot;) digital portals, enterprise software products, technology consulting deliverables, and managed cloud infrastructure services.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white font-sans">
            1. Scope of Professional Services
          </h2>
          <p>
            JupiterGenX AI provides advanced technological solutions encompassing artificial intelligence deployment, zero-trust cybersecurity architectures, cloud transformation, enterprise software engineering, and managed systems monitoring. Detailed deliverables, performance milestones, and acceptance criteria are delineated within individual Statements of Work (SOW) executed under this Master Framework.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white font-sans">
            2. Intellectual Property Rights
          </h2>
          <p>
            <strong className="text-white">Client Property:</strong> All client data, pre-existing proprietary intellectual property, bespoke business logic, and custom application deliverables paid for under an SOW shall remain the sole and exclusive property of the Client.
          </p>
          <p>
            <strong className="text-white">JupiterGenX Pre-existing IP:</strong> Core reusable frameworks, internal telemetry libraries, and deployment tooling developed independently by JupiterGenX AI remain the property of JupiterGenX AI, licensed to the client on a perpetual, non-exclusive basis for internal operations.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white font-sans">
            3. Confidentiality & Mutual NDA
          </h2>
          <p>
            Both parties agree to hold all non-public technical documentation, architectural schematics, financial terms, and source code in strict confidence. Obligations of non-disclosure shall persist indefinitely regarding proprietary source code and trade secrets.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white font-sans">
            4. Warranties & Service Level Guarantees (SLA)
          </h2>
          <p>
            All production deployments engineered by JupiterGenX AI undergo automated regression, security verification, and performance load profiling prior to handover. Managed services are governed by formal 99.999% uptime SLAs with dedicated incident response windows.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white font-sans">
            5. Governing Law & Dispute Resolution
          </h2>
          <p>
            These Terms shall be governed by and construed in accordance with standard commercial enterprise arbitration protocols, without regard to conflicts of law provisions.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white font-sans">
            6. Legal & Compliance Contact
          </h2>
          <div className="p-4 rounded-lg bg-[#061426] border border-white/10 text-xs font-mono text-[#18BFF2]">
            legal@jupitergenx.ai • JupiterGenX AI LLC • Attn: Corporate Counsel
          </div>
        </div>

      </section>
    </div>
  );
};
