import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Network, 
  Server, 
  Database, 
  Code2, 
  Waypoints, 
  Layout, 
  Sparkles, 
  Activity, 
  Radio,
  ShieldCheck,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { SYSTEM_NODES } from '../data/jupiterData';
import { SystemNode } from '../types';

export const ArchitectureTopologySection: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-logic');

  const activeNode = SYSTEM_NODES.find(n => n.id === selectedNodeId) || SYSTEM_NODES[4];

  const getNodeIcon = (layer: SystemNode['layer']) => {
    switch (layer) {
      case 'hardware': return Server;
      case 'network': return Network;
      case 'compute': return Cpu;
      case 'database': return Database;
      case 'logic': return Code2;
      case 'api': return Waypoints;
      case 'ui': return Layout;
      case 'intelligence': return Sparkles;
      case 'telemetry': return Activity;
      default: return Cpu;
    }
  };

  return (
    <section id="architecture" className="relative py-28 md:py-40 px-6 md:px-12 lg:px-16 bg-[#FFFFFF] border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/[0.08] pb-6 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono-tech text-xs tracking-wider text-[#0071E3] uppercase font-bold">
              <span>04 // SYSTEM ARCHITECTURE</span>
              <span className="text-slate-300">•</span>
              <span className="text-[#667085]">TOPOLOGICAL INTEGRITY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0B0D12] uppercase font-sans">
              System Architecture.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#667085] font-sans leading-relaxed">
            Inspect the complete topological hierarchy from bare-metal hardware and network fabrics, through stateless compute, up to machine intelligence and telemetry.
          </p>
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Topology Node Rail */}
          <div className="lg:col-span-7 bg-[#F7F9FC] border border-black/[0.07] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] text-xs font-mono-tech text-slate-600">
              <span className="flex items-center gap-2 font-bold text-[#0B0D12]">
                <Radio className="w-4 h-4 text-[#0071E3]" />
                <span>TOPOLOGY PIPELINE INSPECTOR</span>
              </span>
              <span className="text-[#0071E3] font-bold bg-white px-2.5 py-1 rounded-full border border-black/[0.05]">
                9 ACTIVE TIERS
              </span>
            </div>

            {/* Vertical Nodes */}
            <div className="space-y-2 relative">
              {SYSTEM_NODES.map((node, idx) => {
                const Icon = getNodeIcon(node.layer);
                const isSelected = node.id === activeNode.id;
                const isConnected = activeNode.connectedTo.includes(node.id) || node.connectedTo.includes(activeNode.id);

                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`w-full p-3.5 rounded-2xl text-left transition-all duration-150 border flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#0071E3] shadow-sm ring-1 ring-[#0071E3]'
                        : isConnected
                        ? 'bg-white/80 border-slate-200 text-slate-700 hover:border-slate-300'
                        : 'bg-white/50 border-slate-200/60 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#0071E3] text-white'
                          : isConnected
                          ? 'bg-blue-50 text-[#0071E3]'
                          : 'bg-slate-100 text-slate-500 group-hover:text-slate-800'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono-tech text-[10px] text-slate-400 font-semibold">
                            0{idx + 1}
                          </span>
                          <span className={`text-xs sm:text-sm font-bold tracking-wider font-mono-tech uppercase ${
                            isSelected ? 'text-[#0071E3]' : 'text-slate-800 group-hover:text-[#0071E3]'
                          }`}>
                            {node.label}
                          </span>
                          {isConnected && !isSelected && (
                            <span className="text-[9px] font-mono-tech text-[#0071E3] bg-blue-50 px-1.5 py-0.5 rounded font-bold">
                              LINKED
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#667085] line-clamp-1 font-sans">
                          {node.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono-tech">
                      <span className="hidden sm:inline text-[11px] text-slate-400">
                        {node.throughput}
                      </span>
                      <div className={`w-2 h-2 rounded-full ${
                        isSelected ? 'bg-[#0071E3]' : 'bg-emerald-500'
                      }`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Node Details Inspector Card */}
          <div className="lg:col-span-5 bg-white border border-black/[0.08] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="font-mono-tech text-xs tracking-wider text-[#0071E3] font-bold uppercase">
                TIER SPECIFICATION // {activeNode.layer}
              </span>
              <span className="font-mono-tech text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                ACTIVE
              </span>
            </div>

            <div>
              <span className="font-mono-tech text-xs text-slate-400 uppercase tracking-widest block mb-1">
                {activeNode.label}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B0D12] font-sans">
                {activeNode.name}
              </h3>
            </div>

            <p className="text-sm text-[#667085] leading-relaxed font-sans">
              {activeNode.description}
            </p>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="font-mono-tech text-[10px] text-slate-400 block mb-1">
                  THROUGHPUT CAPACITY
                </span>
                <span className="font-mono-tech text-sm font-bold text-[#0071E3]">
                  {activeNode.throughput}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="font-mono-tech text-[10px] text-slate-400 block mb-1">
                  LATENCY BUDGET
                </span>
                <span className="font-mono-tech text-sm font-bold text-emerald-600">
                  {activeNode.latency}
                </span>
              </div>
            </div>

            {/* Guarantees */}
            <div className="space-y-3 pt-2">
              <span className="font-mono-tech text-xs text-slate-500 uppercase font-bold block">
                ENGINEERED GUARANTEES
              </span>
              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Stateless horizontal scale with automatic backpressure shedding</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Cryptographically verified data consistency and immutable logs</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                  <span>Zero-trust mTLS encryption across all inter-service hops</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
