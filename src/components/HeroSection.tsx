import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  ArrowUpRight, 
  ChevronDown, 
  Cpu, 
  ShieldCheck, 
  Activity, 
  Server, 
  Database, 
  Sparkles, 
  Terminal, 
  Zap,
  Radio
} from 'lucide-react';
import { COMPANY_DETAILS, CAPABILITIES } from '../data/jupiterData';

interface HeroSectionProps {
  onOpenInquiry: (category?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenInquiry }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeDomain, setActiveDomain] = useState<'financial' | 'energy' | 'logistics' | 'identity'>('financial');

  // Scroll-linked parallax and scale transformations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.4]);
  const stageY = useTransform(scrollYProgress, [0, 0.8], [0, 40]);

  // Domain telemetry data for interactive visualization
  const domainPresets = {
    financial: {
      title: 'High-Frequency Financial Ledger',
      nodes: ['Hardware HSM', 'Ultra-Low Latency Kernel', 'Deterministic State Machine', 'Zero-Trust Audit Log'],
      throughput: '142,000 tx/sec',
      latency: '1.2ms P99',
      sla: '99.999%',
      activeLayer: 'DETERMINISTIC KERNEL'
    },
    energy: {
      title: 'Distributed Grid Telemetry Engine',
      nodes: ['IoT SCADA Gateway', 'Time-Series Streaming Mesh', 'Predictive Balancing AI', 'Resilient Failover'],
      throughput: '85,000 telemetry/s',
      latency: '3.4ms P99',
      sla: '99.999%',
      activeLayer: 'STREAMING TIME-SERIES'
    },
    logistics: {
      title: 'Autonomous Multi-Node Fleet Router',
      nodes: ['Edge Compute Agents', 'Cellular Mesh Protocol', 'Constrained Route Optimizer', 'Cold-Store Backup'],
      throughput: '28,000 routes/s',
      latency: '6.8ms P99',
      sla: '99.99%',
      activeLayer: 'ROUTE OPTIMIZER'
    },
    identity: {
      title: 'Sovereign Biometric & Identity Vault',
      nodes: ['Secure Enclave Core', 'mTLS Inter-Service Mesh', 'Zero-Knowledge Proofs', 'Append-Only Ledger'],
      throughput: '64,000 verifications/s',
      latency: '2.1ms P99',
      sla: '99.999%',
      activeLayer: 'ENCLAVE CRYPTOGRAPHY'
    }
  };

  const currentPreset = domainPresets[activeDomain];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-12 lg:px-16 bg-[#FFFFFF] overflow-hidden flex flex-col justify-between"
    >
      {/* Subtle Blue Atmospheric Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] blue-spotlight-radial pointer-events-none" />
      <div className="absolute inset-0 grid-blueprint-ultra opacity-60 pointer-events-none" />

      {/* Main Hero Visual Flow */}
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative max-w-6xl mx-auto w-full text-center space-y-10 z-10"
      >
        {/* Top Minimalist Institutional Pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200/90 shadow-2xs font-mono-tech text-xs text-slate-700"
        >
          <span className="w-2 h-2 rounded-full bg-[#0071E3] animate-pulse" />
          <span className="font-semibold text-[#0B0D12]">JUPITERGENX AI</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 font-medium">EST. 2015 // TRINIDAD & TOBAGO</span>
        </motion.div>

        {/* Massive Display Typography */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 max-w-5xl mx-auto"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#0B0D12] leading-[1.03] font-sans">
            We build systems <br />
            <span className="apple-blue-text">that endure.</span>
          </h1>
          <p className="text-lg sm:text-2xl text-[#667085] font-normal max-w-3xl mx-auto leading-relaxed font-sans pt-2">
            An engineering firm designing resilient enterprise software, applied intelligence, and high-availability cloud infrastructure for organizations where downtime is not an option.
          </p>
        </motion.div>

        {/* Tactile Dual Actions */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <button
            onClick={() => onOpenInquiry()}
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0071E3] hover:bg-[#005FCC] text-white text-sm font-semibold tracking-wide shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/25 active:scale-97 transition-all cursor-pointer"
          >
            <span>Initiate System Briefing</span>
            <ArrowUpRight className="w-4 h-4 text-white/90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <a
            href="#capabilities"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200 text-slate-800 text-sm font-semibold tracking-wide active:scale-97 transition-all cursor-pointer"
          >
            <span>Explore Disciplines</span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </a>
        </motion.div>

        {/* Interactive Architecture Console Stage */}
        <motion.div
          style={{ y: stageY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="pt-6"
        >
          <div className="card-apple-clean p-6 sm:p-8 bg-white/90 backdrop-blur-xl border border-black/[0.08] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] max-w-4xl mx-auto text-left relative overflow-hidden">
            {/* Top Console Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#0071E3]/8 flex items-center justify-center text-[#0071E3]">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono-tech text-xs font-bold text-[#0B0D12] uppercase tracking-wider block">
                    TOPOLOGICAL BLUEPRINT SIMULATOR
                  </span>
                  <span className="text-[11px] text-[#667085] font-sans">
                    Live deterministic verification pipeline
                  </span>
                </div>
              </div>

              {/* Domain Switcher Pills */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200/60 font-mono-tech text-[11px]">
                {(['financial', 'energy', 'logistics', 'identity'] as const).map((domain) => (
                  <button
                    key={domain}
                    onClick={() => setActiveDomain(domain)}
                    className={`px-2.5 py-1 rounded-md capitalize transition-all cursor-pointer ${
                      activeDomain === domain
                        ? 'bg-white text-[#0071E3] font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {domain}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Live Architecture Topology Pipeline */}
            <div className="py-6 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#0B0D12] font-sans">
                  {currentPreset.title}
                </span>
                <span className="font-mono-tech text-[10px] px-2.5 py-0.5 rounded-full bg-[#0071E3]/8 text-[#0071E3] font-semibold border border-[#0071E3]/20">
                  TIER: {currentPreset.activeLayer}
                </span>
              </div>

              {/* Pipeline Nodes */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {currentPreset.nodes.map((node, index) => (
                  <div
                    key={node}
                    className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-2 relative group hover:border-[#0071E3]/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono-tech text-[10px] text-[#0071E3] font-bold">
                        0{index + 1}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <p className="text-xs font-semibold text-slate-800 font-sans leading-tight">
                      {node}
                    </p>
                  </div>
                ))}
              </div>

              {/* Real-time Telemetry Metrics Bar */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-center sm:text-left">
                <div>
                  <span className="font-mono-tech text-[10px] text-slate-400 uppercase tracking-wider block">
                    PEAK THROUGHPUT
                  </span>
                  <span className="font-mono-tech text-sm sm:text-base font-bold text-[#0B0D12]">
                    {currentPreset.throughput}
                  </span>
                </div>
                <div>
                  <span className="font-mono-tech text-[10px] text-slate-400 uppercase tracking-wider block">
                    LATENCY P99
                  </span>
                  <span className="font-mono-tech text-sm sm:text-base font-bold text-emerald-600">
                    {currentPreset.latency}
                  </span>
                </div>
                <div>
                  <span className="font-mono-tech text-[10px] text-slate-400 uppercase tracking-wider block">
                    SLA AVAILABILITY
                  </span>
                  <span className="font-mono-tech text-sm sm:text-base font-bold text-[#0071E3]">
                    {currentPreset.sla}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Scroll Indicator */}
      <div className="pt-12 text-center flex flex-col items-center gap-2">
        <span className="font-mono-tech text-[10px] text-slate-400 tracking-widest uppercase">
          SCROLL TO EXPLORE ARCHITECTURE
        </span>
        <ChevronDown className="w-4 h-4 text-slate-400 animate-bounce" />
      </div>
    </section>
  );
};
