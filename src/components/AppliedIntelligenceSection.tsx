import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, ShieldCheck, ArrowRight, Play, CheckCircle2, Sliders, Database, Cpu, Zap, Activity } from 'lucide-react';

export const AppliedIntelligenceSection: React.FC = () => {
  const [selectedPipelineInput, setSelectedPipelineInput] = useState<'telemetry' | 'transactions' | 'document'>('telemetry');
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [currentStage, setCurrentStage] = useState<number>(4); // All resolved by default

  const pipelineStages = [
    {
      id: 'input',
      title: '01 // INPUT',
      subtitle: 'Raw Signal Ingestion',
      description: 'Ingesting unstructured or high-velocity operational telemetry via authenticated streaming conduits.',
      telemetry: 'Type: Streaming Kafka | Rate: 12,000 evt/s'
    },
    {
      id: 'process',
      title: '02 // PROCESS',
      subtitle: 'Deterministic Cleansing',
      description: 'Strict schema validation, deduplication, anomaly pre-filtering, and cryptographic timestamping.',
      telemetry: 'Validation: 100% P99 | Null Bounds: 0%'
    },
    {
      id: 'model',
      title: '03 // MODEL',
      subtitle: 'Bounded Statistical Weights',
      description: 'Versioned, quantized machine learning models trained specifically for bounded operational inference.',
      telemetry: 'Model: Quantized INT8 | Drift: < 0.02'
    },
    {
      id: 'inference',
      title: '04 // INFERENCE',
      subtitle: 'Deterministic Gatekeeper',
      description: 'Statistical outputs validated against institutional rules, safety constraints, and compliance checks.',
      telemetry: 'Constraint Solver: SMT Verified'
    },
    {
      id: 'action',
      title: '05 // ACTION',
      subtitle: 'Audited Downstream Event',
      description: 'Triggering transactional execution or operator dispatch with immutable forensic audit trail.',
      telemetry: 'Execution: Sub-50ms | Audit: Committed'
    }
  ];

  const runSimulation = () => {
    if (pipelineRunning) return;
    setPipelineRunning(true);
    setCurrentStage(0);

    const interval = setInterval(() => {
      setCurrentStage(prev => {
        if (prev >= 4) {
          clearInterval(interval);
          setPipelineRunning(false);
          return 4;
        }
        return prev + 1;
      });
    }, 400);
  };

  return (
    <section id="intelligence" className="relative py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-[#07080C] border-t border-[#E5C388]/15">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5C388]/15 pb-6 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono-tech text-xs tracking-widest text-[#E5C388] uppercase mb-2">
              <span>07 // APPLIED INTELLIGENCE</span>
              <span>•</span>
              <span>ENGINEERING DISCIPLINE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#F7F5F0] uppercase font-sans">
              AI AS A SOFTWARE SYSTEM
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#D4CEBF] font-mono-tech">
            We reject black-box hype. We engineer applied machine intelligence with deterministic guardrails, mathematical bounds, and complete audit trails.
          </p>
        </div>

        {/* The 5-Step Pipeline Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
          {pipelineStages.map((stage, idx) => {
            const isCompleted = idx <= currentStage;
            const isCurrent = idx === currentStage && pipelineRunning;
            return (
              <div
                key={stage.id}
                className={`p-5 rounded-xl border transition-system relative flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-[#141825] border-[#E5C388]/70 shadow-xl shadow-amber-950/30'
                    : isCompleted
                    ? 'bg-[#0D101C]/80 border-[#E5C388]/20'
                    : 'bg-[#090B12]/40 border-white/5 opacity-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`font-mono-tech text-xs font-bold ${
                      isCompleted ? 'text-[#E5C388]' : 'text-slate-500'
                    }`}>
                      {stage.title}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${
                      isCurrent
                        ? 'bg-[#E5C388] animate-ping'
                        : isCompleted
                        ? 'bg-emerald-400'
                        : 'bg-slate-700'
                    }`} />
                  </div>
                  <h4 className="text-base font-semibold text-[#F7F5F0] tracking-tight mb-2 font-sans">
                    {stage.subtitle}
                  </h4>
                  <p className="text-xs text-[#D4CEBF] leading-relaxed font-sans">
                    {stage.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono-tech text-slate-400">
                  {stage.telemetry}
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Interactive Pipeline Simulator Console */}
        <div className="p-6 md:p-10 rounded-2xl card-luxury shadow-2xl relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E5C388]/15">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-[#E5C388]" />
              <div>
                <h3 className="text-sm font-mono-tech uppercase font-bold text-[#F7F5F0] tracking-wider">
                  PIPELINE VERIFICATION CONSOLE
                </h3>
                <span className="text-xs text-slate-400 font-mono-tech">
                  Test live deterministic constraint evaluation
                </span>
              </div>
            </div>

            {/* Input Signal Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-tech text-slate-400 hidden sm:inline">INPUT SOURCE:</span>
              <div className="flex p-1 rounded bg-[#0A0D15] border border-[#E5C388]/20 text-xs font-mono-tech">
                <button
                  onClick={() => setSelectedPipelineInput('telemetry')}
                  className={`px-3 py-1 rounded transition-system-colors ${
                    selectedPipelineInput === 'telemetry' ? 'bg-gradient-to-r from-[#E5C388] to-[#C5A059] text-[#0A0D12] font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Telemetry
                </button>
                <button
                  onClick={() => setSelectedPipelineInput('transactions')}
                  className={`px-3 py-1 rounded transition-system-colors ${
                    selectedPipelineInput === 'transactions' ? 'bg-gradient-to-r from-[#E5C388] to-[#C5A059] text-[#0A0D12] font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Transactions
                </button>
                <button
                  onClick={() => setSelectedPipelineInput('document')}
                  className={`px-3 py-1 rounded transition-system-colors ${
                    selectedPipelineInput === 'document' ? 'bg-gradient-to-r from-[#E5C388] to-[#C5A059] text-[#0A0D12] font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Doc Stream
                </button>
              </div>

              <button
                onClick={runSimulation}
                disabled={pipelineRunning}
                data-cursor-text="TRIGGER"
                className="px-4 py-1.5 rounded bg-gradient-to-r from-[#E5C388] via-[#DFC28E] to-[#C5A059] hover:brightness-110 disabled:opacity-50 text-[#0A0D12] font-mono-tech text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-system-fast shadow-md"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{pipelineRunning ? 'Executing...' : 'Run Pipeline'}</span>
              </button>
            </div>
          </div>

          {/* Console Log Output */}
          <div className="mt-6 font-mono-tech text-xs space-y-2 p-5 rounded-lg bg-[#05060A] border border-[#E5C388]/15 text-[#EDE8DF]">
            <div className="flex items-center gap-2 text-[#E5C388] font-semibold">
              <Activity className="w-3.5 h-3.5" />
              <span>[KERNEL] PIPELINE DISPATCHED WITH PAYLOAD: {selectedPipelineInput.toUpperCase()}</span>
            </div>
            <div className="text-slate-400 pl-4 border-l border-[#E5C388]/20">
              {currentStage >= 0 && `> INGESTION: 128 KB chunk parsed. Hash sha256:7f83b1657ff1fc53b92dc... OK`}
            </div>
            <div className="text-slate-400 pl-4 border-l border-[#E5C388]/20">
              {currentStage >= 1 && `> PRE-PROCESSING: Schema validation PASSED. Zero anomaly outliers in 10ms window.`}
            </div>
            <div className="text-slate-400 pl-4 border-l border-[#E5C388]/20">
              {currentStage >= 2 && `> MODEL INFERENCE: Vectorized tensor scoring computed in 14.8ms. Confidence 0.984.`}
            </div>
            <div className="text-slate-400 pl-4 border-l border-[#E5C388]/20">
              {currentStage >= 3 && `> CONSTRAINT SOLVER: Safety envelope check SATISFIED. Zero policy violations detected.`}
            </div>
            <div className="text-emerald-400 pl-4 border-l border-emerald-500/30 font-semibold">
              {currentStage >= 4 && `> ACTION COMMITTED: Event emitted to downstream enterprise queue. Audit record #8942 written to immutable ledger.`}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
