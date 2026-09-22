import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Layers, Cpu, Cloud, Database, FileCode, CheckCircle2, ArrowRight } from 'lucide-react';

export interface StrategicCategory {
  id: string;
  name: string;
  badge: string;
  sectionId: string;
  icon: React.ComponentType<{ className?: string }>;
  headline: string;
  description: string;
}

export const STRATEGIC_CATEGORIES: StrategicCategory[] = [
  {
    id: 'software',
    name: 'Enterprise Software',
    badge: 'MISSION CRITICAL',
    sectionId: 'capabilities',
    icon: FileCode,
    headline: 'Deterministic, resilient core business software',
    description: 'Custom distributed systems built for fault tolerance, strict ACID compliance, and zero downtime.'
  },
  {
    id: 'ai',
    name: 'Applied AI & ML',
    badge: 'INTELLIGENCE PIPELINES',
    sectionId: 'intelligence',
    icon: Cpu,
    headline: 'Deterministic AI engineered as robust software',
    description: 'Production neural reasoning, domain RAG pipelines, and automated agentic decision engines.'
  },
  {
    id: 'cloud',
    name: 'Cloud Infrastructure',
    badge: 'MULTI-REGION MESH',
    sectionId: 'cloud-infrastructure',
    icon: Cloud,
    headline: 'High-availability multi-region resilient architecture',
    description: 'Self-healing Kubernetes clusters, Zero-RPO backup paradigms, and automated zero-loss failover.'
  },
  {
    id: 'data',
    name: 'Data Continuum',
    badge: 'REAL-TIME ANALYTICS',
    sectionId: 'data-engine',
    icon: Database,
    headline: 'Enterprise data streams from ingestion to insight',
    description: 'High-throughput event streaming, modern analytical warehousing, and continuous predictive models.'
  }
];

interface StrategicCategoryBarProps {
  activeCategory?: string;
  onSelectCategory?: (category: StrategicCategory) => void;
}

export const StrategicCategoryBar: React.FC<StrategicCategoryBarProps> = ({
  activeCategory = 'all',
  onSelectCategory
}) => {
  const [selected, setSelected] = useState(activeCategory);

  const handleSelect = (cat: StrategicCategory) => {
    setSelected(cat.id);
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
    const target = document.getElementById(cat.sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShowAll = () => {
    setSelected('all');
    const target = document.getElementById('capabilities');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#07080C]/95 border-y border-[#E5C388]/15 sticky top-16 z-30 backdrop-blur-md py-3 px-6 md:px-12 transition-system">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Label */}
        <div className="flex items-center gap-2 font-mono-tech text-xs text-[#E5C388] uppercase tracking-wider shrink-0">
          <Layers className="w-4 h-4 text-[#E5C388]" />
          <span className="font-semibold">STRATEGIC FOCUS CATEGORIES:</span>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={handleShowAll}
            className={`px-3 py-1.5 rounded text-xs font-mono-tech uppercase tracking-wider transition-system-fast shrink-0 ${
              selected === 'all'
                ? 'bg-[#E5C388] text-[#07080C] font-bold shadow-md shadow-amber-950/40'
                : 'bg-[#121520] hover:bg-[#181D2C] text-slate-300 border border-[#E5C388]/20'
            }`}
          >
            All Disciplines
          </button>

          {STRATEGIC_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isCurrent = selected === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono-tech uppercase tracking-wider transition-system-fast shrink-0 ${
                  isCurrent
                    ? 'bg-[#E5C388] text-[#07080C] font-bold shadow-md shadow-amber-950/40'
                    : 'bg-[#121520] hover:bg-[#181D2C] text-slate-300 hover:text-white border border-[#E5C388]/20'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-[#07080C]' : 'text-[#E5C388]'}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
