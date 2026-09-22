import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Database, Filter, LineChart, Lightbulb, CheckCircle, ArrowRight, Activity, Terminal } from 'lucide-react';

export const DataEngineSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(2); // Default on Analysis
  const [streamCount, setStreamCount] = useState<number>(142980);

  useEffect(() => {
    const interval = setInterval(() => {
      setStreamCount(prev => prev + Math.floor(Math.random() * 24 + 12));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const dataSteps = [
    {
      id: 'data',
      title: 'DATA',
      badge: '01 Ingestion',
      icon: Database,
      desc: 'Raw heterogeneous inputs from enterprise relational databases, event streams, industrial sensors, and transactional logs.',
      subtext: 'Kafka & CDC streaming | Zero packet drops'
    },
    {
      id: 'pipeline',
      title: 'PIPELINE',
      badge: '02 Transformation',
      icon: Filter,
      desc: 'Real-time schema normalization, cryptographic deduplication, data quality enforcement, and windowed event aggregation.',
      subtext: 'Deterministic schema parsing | Sub-10ms lag'
    },
    {
      id: 'analysis',
      title: 'ANALYSIS',
      badge: '03 Modeling',
      icon: LineChart,
      desc: 'High-throughput analytical engines processing dimensional models, statistical anomalies, and longitudinal time-series vectors.',
      subtext: 'Columnar storage & distributed queries'
    },
    {
      id: 'insight',
      title: 'INSIGHT',
      badge: '04 Synthesis',
      icon: Lightbulb,
      desc: 'Synthesizing complex multi-dimensional system data into clear, unambiguous operational signals and anomaly warnings.',
      subtext: 'Context-aware scoring & confidence intervals'
    },
    {
      id: 'decision',
      title: 'DECISION',
      badge: '05 Execution',
      icon: CheckCircle,
      desc: 'Empowering organizational leaders and automated dispatch workflows to act with total confidence and zero ambiguity.',
      subtext: 'Audited transactional commits | Immediate feedback'
    }
  ];

  return (
    <section id="data-engine" className="relative py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-[#07080C] border-t border-[#E5C388]/15">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5C388]/15 pb-6 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono-tech text-xs tracking-widest text-[#E5C388] uppercase mb-2">
              <span>09 // DATA & ANALYTICS</span>
              <span>•</span>
              <span>DETERMINISTIC PIPELINES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#F7F5F0] uppercase font-sans">
              THE DATA CONTINUUM
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono-tech text-slate-400">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>STREAM RATE: <strong className="text-[#E5C388]">{streamCount.toLocaleString()} EVT/SEC</strong></span>
          </div>
        </div>

        {/* Five Stage Interactive Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {dataSteps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = idx === activeStep;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                data-cursor-hover
                className={`p-6 rounded-xl text-left transition-system border flex flex-col justify-between relative group ${
                  isSelected
                    ? 'bg-[#141825] border-[#E5C388]/60 shadow-xl shadow-amber-950/30'
                    : 'bg-[#0A0D15]/60 border-white/5 hover:border-[#E5C388]/25 hover:bg-[#101420]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono-tech text-xs text-[#E5C388] font-bold">
                      {step.badge}
                    </span>
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-[#E5C388]' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  </div>

                  <h3 className={`text-xl font-bold tracking-tight mb-2 font-sans ${
                    isSelected ? 'text-[#FFF8EE]' : 'text-slate-200 group-hover:text-white'
                  }`}>
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#D4CEBF] leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 text-[10px] font-mono-tech text-slate-400">
                  {step.subtext}
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Step Visualizer Telemetry Terminal */}
        <div className="p-8 rounded-2xl card-luxury shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5C388]/15">
            <div className="flex items-center gap-3 font-mono-tech text-xs">
              <span className="text-[#E5C388] font-bold">ACTIVE CONTINUUM STAGE:</span>
              <span className="text-[#EDE8DF] px-2.5 py-1 rounded bg-[#111522] border border-[#E5C388]/20 uppercase">
                {dataSteps[activeStep].title} — {dataSteps[activeStep].badge}
              </span>
            </div>
            <span className="font-mono-tech text-xs text-slate-400">
              REAL-TIME ANALYTICAL STREAM ENGINE
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono-tech text-xs">
            <div className="p-4 rounded-lg bg-[#0F121C] border border-[#E5C388]/15 space-y-1">
              <span className="text-slate-400">LINEAGE INTEGRITY</span>
              <p className="text-emerald-400 text-sm font-semibold">100% Deterministic (Zero Drift)</p>
            </div>
            <div className="p-4 rounded-lg bg-[#0F121C] border border-[#E5C388]/15 space-y-1">
              <span className="text-slate-400">SCHEMA CONFORMANCE</span>
              <p className="text-[#E5C388] text-sm font-semibold">Protobuf / Strict JSON Schema</p>
            </div>
            <div className="p-4 rounded-lg bg-[#0F121C] border border-[#E5C388]/15 space-y-1">
              <span className="text-slate-400">DECISION LATENCY</span>
              <p className="text-[#F7F5F0] text-sm font-semibold">&lt; 28ms End-to-End Execution</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
