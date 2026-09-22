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
  Radio
} from 'lucide-react';
import { SYSTEM_NODES } from '../data/jupiterData';
import { SystemNode } from '../types';
import { subtleUpwardFadeVariants } from '../utils/motion';

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
    <section id="architecture" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-[#07080C] border-t border-white/[0.06]">
      <motion.div
        variants={subtleUpwardFadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="max-w-7xl mx-auto space-y-16"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.06] pb-6 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono-tech text-xs tracking-widest text-[#E5C388] uppercase mb-2">
              <span>04 // SYSTEM ARCHITECTURE</span>
              <span>•</span>
              <span>TOPOLOGICAL HIERARCHY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#F7F5F0] uppercase font-sans">
              SYSTEM ARCHITECTURE
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#D4CEBF] font-mono-tech">
            Inspect the complete topological hierarchy from physical hardware up through UI, applied AI, and comprehensive telemetry surveillance.
          </p>
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Topology Node Pipeline */}
          <div className="lg:col-span-7 card-luxury rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] text-xs font-mono-tech text-slate-400 mb-6">
              <span className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-[#E5C388]" />
                <span className="text-[#EDE8DF]">INTERACTIVE TOPOLOGY GRAPH</span>
              </span>
              <span className="text-[#E5C388] font-semibold">9 ACTIVE TIERS</span>
            </div>

            {/* Render Vertical Node Sequence with Connector Rays */}
            <div className="space-y-2 relative">
              {SYSTEM_NODES.map((node, idx) => {
                const Icon = getNodeIcon(node.layer);
                const isSelected = node.id === activeNode.id;
                const isConnected = activeNode.connectedTo.includes(node.id) || node.connectedTo.includes(activeNode.id);

                return (
                  <div key={node.id} className="relative">
                    <button
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`w-full p-3.5 rounded-lg text-left transition-colors duration-150 border flex items-center justify-between group cursor-pointer ${
                        isSelected
                          ? 'bg-[#141825] border-[#E5C388]/60 shadow-md shadow-black/40'
                          : isConnected
                          ? 'bg-[#0D101A]/80 border-white/15 text-slate-200'
                          : 'bg-[#0A0D15]/50 border-white/5 hover:border-white/15 hover:bg-[#101420]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-md flex items-center justify-center border transition-colors ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#E5C388] to-[#C5A059] text-[#0A0D12] border-white/30'
                            : isConnected
                            ? 'bg-[#E5C388]/15 border-[#E5C388]/30 text-[#E5C388]'
                            : 'bg-[#11141E] border-white/10 text-slate-400 group-hover:text-white'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono-tech text-[10px] text-slate-400">
                              0{idx + 1}
                            </span>
                            <span className={`text-xs sm:text-sm font-bold tracking-wider font-mono-tech uppercase ${
                              isSelected ? 'text-[#FFF8EE]' : 'text-slate-300 group-hover:text-white'
                            }`}>
                              {node.label}
                            </span>
                            {isConnected && !isSelected && (
                              <span className="text-[9px] font-mono-tech text-[#E5C388] bg-[#E5C388]/15 px-1.5 py-0.2 rounded border border-[#E5C388]/30">
                                LINKED
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-1 font-sans">
                            {node.name}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-mono-tech">
                        <span className="hidden sm:inline text-[11px] text-slate-400">
                          {node.throughput}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${
                          isSelected ? 'bg-[#E5C388]' : 'bg-emerald-400'
                        }`} />
                      </div>
                    </button>

                    {/* Flow connector line */}
                    {idx < SYSTEM_NODES.length - 1 && (
                      <div className="flex justify-center py-0.5">
                        <div className="w-[1px] h-2 bg-white/10" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Node Telemetry & Specification Inspector */}
          <div className="lg:col-span-5 card-luxury rounded-2xl p-8 shadow-xl relative overflow-hidden">
            <div className="space-y-6">
              {/* Node Status Badge */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <span className="px-2.5 py-1 rounded bg-[#E5C388]/10 border border-[#E5C388]/30 text-[#E5C388] font-mono-tech text-xs uppercase font-semibold">
                  TIER REF: {activeNode.label}
                </span>
                <span className="font-mono-tech text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  HEALTH: OPTIMAL
                </span>
              </div>

              {/* Node Title & Specs */}
              <div>
                <h3 className="text-2xl font-bold text-[#F7F5F0] uppercase font-sans">
                  {activeNode.name}
                </h3>
                <p className="text-sm text-[#D4CEBF] mt-2 leading-relaxed font-sans">
                  {activeNode.description}
                </p>
              </div>

              {/* Hardware/Runtime Technical Specifications */}
              <div className="p-4 rounded-lg bg-[#0F121C] border border-white/[0.08] space-y-1">
                <span className="font-mono-tech text-[10px] text-slate-400 uppercase tracking-wider block">
                  RUNTIME SPECIFICATIONS
                </span>
                <p className="font-mono-tech text-xs text-[#E5C388]">
                  {activeNode.specs}
                </p>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4 font-mono-tech text-xs">
                <div className="p-4 rounded-lg bg-[#0F121C]/80 border border-white/[0.08] space-y-1">
                  <span className="text-slate-400 block">THROUGHPUT</span>
                  <span className="text-[#F7F5F0] font-semibold text-sm">{activeNode.throughput}</span>
                </div>
                <div className="p-4 rounded-lg bg-[#0F121C]/80 border border-white/[0.08] space-y-1">
                  <span className="text-slate-400 block">LATENCY PROFILE</span>
                  <span className="text-emerald-400 font-semibold text-sm">{activeNode.latency}</span>
                </div>
              </div>

              {/* Connected Topology Nodes */}
              <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                <span className="font-mono-tech text-xs text-slate-400 uppercase tracking-wider block">
                  ACTIVE BIDIRECTIONAL CONNECTIONS
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeNode.connectedTo.map((targetId) => {
                    const targetNode = SYSTEM_NODES.find(n => n.id === targetId);
                    return (
                      <button
                        key={targetId}
                        onClick={() => setSelectedNodeId(targetId)}
                        className="px-2.5 py-1 rounded bg-[#131722] hover:bg-[#1A202E] border border-white/10 text-xs font-mono-tech text-[#E5C388] transition-colors cursor-pointer"
                      >
                        → {targetNode?.label || targetId}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
