import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Eye, CheckCircle2 } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-[#020B18] min-h-screen text-white">
      <section className="relative pt-16 pb-16 border-b border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-xs font-mono tracking-wider text-[#F4BC43] mb-4">
            <Link to="/" className="hover:underline">HOME</Link>
            <span>/</span>
            <span className="text-white">PRIVACY POLICY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Privacy Policy & Data Sovereignty
          </h1>
          <p className="text-sm text-[#B7C0CC]">
            Effective Date: January 1, 2026 • Last Reviewed: September 2026
          </p>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-[#B7C0CC] text-sm leading-relaxed">
        
        <div className="p-6 rounded-2xl bg-[#081729] border border-white/10 space-y-3">
          <div className="flex items-center space-x-3 text-[#F4BC43]">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-lg font-bold text-white">Our Sovereign Privacy Commitment</h3>
          </div>
          <p>
            JupiterGenX AI LLC (&quot;JupiterGenX AI&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) maintains an uncompromising commitment to enterprise data protection, zero-knowledge privacy, and client data sovereignty. We do not monetize client telemetry, proprietary source code, or training datasets.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white font-sans">
            1. Information We Collect
          </h2>
          <p>
            In the execution of our technology consulting, software engineering, and infrastructure services, we collect only the minimal data strictly necessary for operational delivery:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-white">Business Contact Data:</strong> Name, business email address, company affiliation, telephone number, and communication records provided via consultation forms.</li>
            <li><strong className="text-white">System Diagnostics:</strong> Non-identifying technical metadata required for network latency optimization, security auditing, and server health monitoring.</li>
            <li><strong className="text-white">Customer Data:</strong> Any infrastructure credentials, model weights, or private databases accessed during formal client engagements are held under strict mutual non-disclosure and isolated in client-owned enclaves.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white font-sans">
            2. Artificial Intelligence & Training Data Boundaries
          </h2>
          <p>
            Client data is never used to train public foundation models or shared across commercial tenants. All fine-tuned models, vector embeddings, and enterprise knowledge stores engineered by JupiterGenX AI remain the exclusive intellectual and sovereign property of the respective client.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white font-sans">
            3. Encryption & Data Security Standards
          </h2>
          <p>
            We implement industry-leading cryptographic protections including AES-256 encryption at rest, TLS 1.3 encryption in transit, and hardware security module (HSM) key isolation. Our internal engineering environments are audited annually against SOC 2 Type II and ISO 27001 benchmarks.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white font-sans">
            4. International Transfers & Data Residency
          </h2>
          <p>
            We support localized sovereign data residency across the Americas, European Union, and regional cloud zones. Data transfer protocols strictly comply with GDPR Standard Contractual Clauses (SCCs) and regional data protection acts.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white font-sans">
            5. Contact Our Data Protection Officer
          </h2>
          <p>
            For privacy inquiries, audit verification requests, or data deletion directives, contact our Data Protection Office at:
          </p>
          <div className="p-4 rounded-lg bg-[#061426] border border-white/10 text-xs font-mono text-[#18BFF2]">
            privacy@jupitergenx.ai • JupiterGenX AI LLC • Attn: Data Protection Office
          </div>
        </div>

      </section>
    </div>
  );
};
