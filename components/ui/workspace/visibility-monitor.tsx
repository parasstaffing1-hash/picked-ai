'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp, Bell, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const initialActivityGroups = [
  {
    date: 'Today',
    events: [
      {
        id: 1,
        time: '2:34 PM',
        type: 'gain',
        desc: "Gained recommendation in ChatGPT for 'best accounting software'",
        engine: 'ChatGPT',
      },
      {
        id: 2,
        time: '11:15 AM',
        type: 'improve',
        desc: "Position improved #4 → #2 on AI Overviews for 'top CRM tools'",
        engine: 'Google AIO',
      },
      {
        id: 3,
        time: '9:02 AM',
        type: 'new',
        desc: "New prompt detected: 'best HR software for remote teams'",
        engine: 'Gemini',
      }
    ]
  },
  {
    date: 'Yesterday',
    events: [
      {
        id: 4,
        time: '4:21 PM',
        type: 'loss',
        desc: 'Lost citation on Gemini — source removed: techradar.com',
        engine: 'Gemini',
      },
      {
        id: 5,
        time: '2:10 PM',
        type: 'gain',
        desc: 'Citation added: capterra.com now citing your business',
        engine: 'ChatGPT',
      },
      {
        id: 6,
        time: '10:45 AM',
        type: 'new',
        desc: "New prompt detected: 'accounting tools with AI features'",
        engine: 'Google AIO',
      }
    ]
  },
  {
    date: 'October 3, 2025',
    events: [
      {
        id: 7,
        time: '1:30 PM',
        type: 'improve',
        desc: "Position improved #6 → #3 on ChatGPT for 'fastest CRM setup'",
        engine: 'ChatGPT',
      },
      {
        id: 8,
        time: '11:00 AM',
        type: 'gain',
        desc: 'ProductHunt review directory indexed by Google AI Overviews',
        engine: 'Google AIO',
      }
    ]
  }
];

const extraActivityGroups = [
  {
    date: 'October 2, 2025',
    events: [
      {
        id: 9,
        time: '3:45 PM',
        type: 'gain',
        desc: "Gained citation on Forbes Technology Council software review",
        engine: 'ChatGPT',
      },
      {
        id: 10,
        time: '10:12 AM',
        type: 'loss',
        desc: 'Competitor A gained recommendation on Gemini for "startup bookkeeping"',
        engine: 'Gemini',
      }
    ]
  }
];

const typeColors = {
  gain: 'bg-emerald-500',
  loss: 'bg-rose-500',
  improve: 'bg-blue-500',
  new: 'bg-[#9B9B9B]',
};

export function VisibilityMonitor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' });

  const [showFullLog, setShowFullLog] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');

  const groups = showFullLog ? [...initialActivityGroups, ...extraActivityGroups] : initialActivityGroups;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section className="bg-[#FAFAF8] py-20 sm:py-24 px-6">
      <div className="max-w-5xl mx-auto" ref={containerRef}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div variants={itemVariants} className="space-y-4">
              <span className="text-xs font-mono text-[#6B6B6B] tracking-wider uppercase">
                Monitor
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] tracking-tight">
                Visibility changes in real time
              </h2>
              <p className="text-base text-[#6B6B6B] max-w-xl leading-relaxed">
                Track every recommendation, ranking jump, and citation discovery across all frontier AI models.
              </p>
            </motion.div>

            {/* Filter Pills */}
            <motion.div variants={itemVariants} className="flex items-center gap-1.5 p-1 bg-[#EFEFEA] rounded-lg border border-[#E8E8E6] self-start md:self-auto">
              {[
                { id: 'all', label: 'All Signals' },
                { id: 'gain', label: 'Gains' },
                { id: 'improve', label: 'Rankings' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setFilterType(f.id);
                    toast.info(`Filtered feed by: ${f.label}`);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    filterType === f.id
                      ? 'bg-white text-[#1A1A1A] shadow-xs font-semibold'
                      : 'text-[#6B6B6B] hover:text-[#1A1A1A]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Timeline Feed Card */}
          <motion.div variants={itemVariants} className="bg-white border border-[#E8E8E6] rounded-xl shadow-xs p-6 sm:p-8">
            <div className="space-y-8">
              {groups.map((group) => {
                const filteredEvents = filterType === 'all' 
                  ? group.events 
                  : group.events.filter(e => e.type === filterType);

                if (filteredEvents.length === 0) return null;

                return (
                  <div key={group.date} className="relative">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#9B9B9B] mb-4">{group.date}</h3>
                    <div className="space-y-0 relative before:absolute before:inset-y-0 before:left-[59px] before:w-px before:bg-[#E8E8E6]">
                      {filteredEvents.map((event) => (
                        <div
                          key={event.id}
                          onClick={() => {
                            navigator.clipboard?.writeText(event.desc);
                            toast.success('Telemetry event copied', {
                              description: event.desc,
                            });
                          }}
                          className="group flex items-start py-3 hover:bg-[#FAFAF8] -mx-4 px-4 rounded-lg transition-colors relative z-10 cursor-pointer select-none"
                        >
                          <div className="w-14 flex-shrink-0 pt-0.5">
                            <span className="text-[11px] font-mono text-[#9B9B9B]">{event.time}</span>
                          </div>
                          <div className="relative flex items-center justify-center w-4 pt-1.5 mx-2">
                            <div className={`w-2 h-2 rounded-full ${typeColors[event.type as keyof typeof typeColors]} ring-4 ring-white z-10`} />
                          </div>
                          <div className="flex-1 pt-0.5 pl-2 flex items-center justify-between gap-4">
                            <p className="text-sm text-[#1A1A1A] group-hover:underline">{event.desc}</p>
                            <span className="text-[10px] font-mono text-[#9B9B9B] bg-[#FAFAF8] border border-[#E8E8E6] px-2 py-0.5 rounded-md flex-shrink-0">
                              {event.engine}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* View Full Activity Log Toggle */}
            <div className="mt-8 pt-6 border-t border-[#E8E8E6] flex items-center justify-between">
              <button 
                type="button"
                onClick={() => {
                  setShowFullLog(prev => !prev);
                  if (!showFullLog) {
                    toast.info('Expanded historical telemetry feed');
                  }
                }}
                className="flex items-center gap-2 text-sm font-semibold text-[#1A1A1A] hover:text-black transition-colors cursor-pointer"
              >
                <span>{showFullLog ? 'Collapse activity log' : 'View full activity log'}</span>
                {showFullLog ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <div className="flex items-center gap-4 flex-wrap">
                <a
                  href="/console"
                  className="text-xs font-mono text-[#6B6B6B] hover:text-[#1A1A1A] underline underline-offset-4 transition-colors"
                >
                  Open Live Telemetry in Console &rarr;
                </a>
                <span className="text-xs font-mono text-[#9B9B9B]">
                  Live AI Crawler Signals
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
