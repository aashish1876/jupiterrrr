import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cloud, Network, ShieldCheck, RefreshCw, Server, ArrowRight, Cpu, Activity, Globe } from 'lucide-react';
import { tabContentVariants } from '../motion';

export const CloudInfrastructureSection: React.FC = () => {
  const [activeModel, setActiveModel] = useState<'multi-region' | 'mesh' | 'migration'>('multi-region');

  const infrastructureModels = [
    {
      id: 'multi-region',
      name: 'High-Availability Multi-Region',
      headline: 'Active-Active Fault Tolerant Cloud Topology',
      description: 'Zero single-point-of-failure infrastructure spanning multiple cloud availability zones and geographic edge points, backed by automated BGP failover and synchronous state replication.',
      tenets: [
        'Geographically distributed stateless compute pools',
        'Multi-master database clusters with sub-second replication',
        'Automated health checks with deterministic DNS failover routing',
        'Disaster recovery recovery-point-objective (RPO) = 0'
      ],
      metrics: {
        availability: '99.99% Target',
        failoverTime: '< 2.4 Seconds',
        topologyType: 'Multi-AZ Distributed'
      }
    },
    {
      id: 'mesh',
      name: 'Zero-Trust Network Mesh',
      headline: 'Cryptographic Microsegmentation & WireGuard Tunnels',
      description: 'Every node, service, and physical appliance communicates across mutual TLS 1.3 tunnels. Perimeter security is replaced by identity-attested service mesh routing.',
      tenets: [
        'End-to-end mTLS packet encryption between all microservices',
        'Hardware TPM device attestation for physical edge nodes',
        'Strict egress firewall rules and non-routable private subnetting',
        'Automated credential rotation on 24-hour cycles'
      ],
      metrics: {
        availability: 'Continuous Enforced',
        failoverTime: 'Instant Re-route',
        topologyType: 'Zero-Trust Mesh'
      }
    },
    {
      id: 'migration',
      name: 'Zero-Downtime Migration Engine',
      headline: 'Strangler Fig Migration & Dual-Write Pipelines',
      description: 'De-risked modernization of legacy enterprise systems. We implement bi-directional change-data-capture (CDC) pipelines and shadow traffic routing so old and new run in parallel until 100% parity is verified.',
      tenets: [
        'Transparent proxy gateway routing traffic conditionally',
        'Real-time Change Data Capture (CDC) streaming between stores',
        'Automated verification harnesses comparing dual-write responses',
        'One-click instant fallback safeguards throughout rollout'
      ],
      metrics: {
        availability: '100% Continuity',
        failoverTime: 'Zero Cutover Downtime',
        topologyType: 'Strangler Fig Proxy'
      }
    }
  ];

  const current = infrastructureModels.find(m => m.id === activeModel) || infrastructureModels[0];

  return (
    <section id="infrastructure" className="relative py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-[#07080C] border-t border-[#E5C388]/15">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5C388]/15 pb-6 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono-tech text-xs tracking-widest text-[#E5C388] uppercase mb-2">
              <span>08 // CLOUD & FOUNDATION</span>
              <span>•</span>
              <span>INDUSTRIAL RELIABILITY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#F7F5F0] uppercase font-sans">
              CLOUD & INFRASTRUCTURE
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#D4CEBF] font-mono-tech">
            Physical hardware, zero-trust network meshes, and cloud compute engineered for deterministic enterprise resilience.
          </p>
        </div>

        {/* Model Selector Bar */}
        <div className="flex flex-wrap gap-3 border-b border-[#E5C388]/15 pb-4">
          {infrastructureModels.map((model) => (
            <button
              key={model.id}
              onClick={() => setActiveModel(model.id as any)}
              data-cursor-hover
              className={`px-5 py-3 rounded-md font-mono-tech text-xs uppercase tracking-wider transition-system-fast ${
                activeModel === model.id
                  ? 'bg-gradient-to-r from-[#E5C388] via-[#DFC28E] to-[#C5A059] text-[#0A0D12] font-bold shadow-lg shadow-amber-950/30'
                  : 'bg-[#0D101A] hover:bg-[#131724] text-slate-300 border border-[#E5C388]/20'
              }`}
            >
              {model.name}
            </button>
          ))}
        </div>

        {/* Infrastructure Topology Visual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Interactive Architectural Schematic */}
          <div className="lg:col-span-7 card-luxury rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8"
              >
                <div>
                  <span className="font-mono-tech text-xs text-[#E5C388] uppercase tracking-widest font-semibold">
                    INFRASTRUCTURE TOPOLOGY // {current.id}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#F7F5F0] mt-1 font-sans">
                    {current.headline}
                  </h3>
                  <p className="text-sm sm:text-base text-[#D4CEBF] mt-4 leading-relaxed font-sans">
                    {current.description}
                  </p>
                </div>

                {/* Principles checklist */}
                <div className="space-y-3 pt-2">
                  {current.tenets.map((tenet, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-[#EDE8DF] font-sans">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{tenet}</span>
                    </div>
                  ))}
                </div>

                {/* Metrics ribbon */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E5C388]/15 text-xs font-mono-tech">
                  <div>
                    <span className="text-slate-400 block mb-1">AVAILABILITY</span>
                    <span className="text-[#F7F5F0] font-semibold">{current.metrics.availability}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">FAILOVER</span>
                    <span className="text-[#E5C388] font-semibold">{current.metrics.failoverTime}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">TOPOLOGY</span>
                    <span className="text-slate-200 font-semibold">{current.metrics.topologyType}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Technical Diagram Card */}
          <div className="lg:col-span-5 card-luxury rounded-2xl p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5C388]/15 text-xs font-mono-tech">
              <span className="text-slate-400 uppercase">SYSTEM ARCHITECTURE BLUEPRINT</span>
              <span className="text-[#E5C388] font-semibold">STATUS: VERIFIED</span>
            </div>

            {/* Visual network graph depiction */}
            <div className="h-64 rounded-xl bg-[#05060A] border border-[#E5C388]/15 p-6 flex flex-col justify-between relative overflow-hidden font-mono-tech text-[10px]">
              <div className="flex justify-between items-center text-slate-400">
                <span className="p-1.5 rounded bg-[#0F121C] border border-[#E5C388]/20 text-[#EDE8DF]">
                  PUBLIC INGRESS
                </span>
                <span className="text-[#E5C388] animate-pulse">ANYCAST BGP</span>
                <span className="p-1.5 rounded bg-[#0F121C] border border-[#E5C388]/20 text-[#EDE8DF]">
                  ISOLATED REGION 2
                </span>
              </div>

              <div className="flex justify-center items-center my-auto">
                <div className="w-full h-1 bg-gradient-to-r from-[#E5C388] via-[#DFC28E] to-emerald-400 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded bg-[#0A0D14] border border-[#E5C388]/50 text-[#E5C388] font-semibold shadow-md">
                    ZERO-LOSS GATEWAY
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-slate-400">
                <span className="p-1.5 rounded bg-[#0F121C] border border-[#E5C388]/20 text-[#EDE8DF]">
                  DATA SYNCHRONIZER
                </span>
                <span className="text-emerald-400">RPO = 0 VERIFIED</span>
                <span className="p-1.5 rounded bg-[#0F121C] border border-[#E5C388]/20 text-[#EDE8DF]">
                  EDGE STORAGE
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#070910] border border-[#E5C388]/15 space-y-2 text-xs font-mono-tech text-slate-400">
              <div className="flex justify-between">
                <span>GOVERNANCE:</span>
                <span className="text-[#F7F5F0]">Strict Infrastructure as Code</span>
              </div>
              <div className="flex justify-between">
                <span>DEPLOYMENT:</span>
                <span className="text-[#F7F5F0]">Immutable Container Artifacts</span>
              </div>
              <div className="flex justify-between">
                <span>OBSERVABILITY:</span>
                <span className="text-[#E5C388]">OpenTelemetry Traces & Metrics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
