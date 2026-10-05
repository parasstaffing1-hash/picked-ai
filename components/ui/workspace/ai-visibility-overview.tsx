'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Info, TrendingUp } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis } from 'recharts'

const trendData = [
  { day: 'Day 1', score: 54 },
  { day: 'Day 5', score: 58 },
  { day: 'Day 10', score: 62 },
  { day: 'Day 15', score: 60 },
  { day: 'Day 20', score: 69 },
  { day: 'Day 25', score: 73 },
  { day: 'Day 30', score: 78 },
]

function AnimatedCounter({ from, to, duration = 0.9, isInView }: { from: number; to: number; duration?: number; isInView: boolean }) {
  const [count, setCount] = useState(from)

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    let animationFrameId: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(Math.floor(easeProgress * (to - from) + from))
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      }
    }
    
    animationFrameId = requestAnimationFrame(step)

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [isInView, from, to, duration])

  return <span>{count}</span>
}

interface AiVisibilityOverviewProps {
  onOpenScan?: () => void;
}

export function AiVisibilityOverview({ onOpenScan }: AiVisibilityOverviewProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const prefersReducedMotion = useReducedMotion()

  const fadeUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 15 },
    visible: { opacity: 1, y: 0 }
  }
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const transition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }

  return (
    <section className="bg-[#FAFAF8] w-full pt-8 pb-20 sm:pt-12 sm:pb-28 px-6 text-[#1A1A1A]">
      <motion.div 
        ref={ref}
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-5xl mx-auto flex flex-col"
      >
        <motion.div variants={fadeUp} transition={transition} className="mb-14">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#9B9B9B] mb-4">AI Visibility</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1A1A1A] mb-4">How AI sees your business</h2>
          <p className="text-base text-[#6B6B6B] max-w-2xl leading-relaxed">
            Picked AI continuously monitors buyer-intent prompts across ChatGPT, Gemini, and Google AI Overviews to measure your brand's recommendation footprint.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Main Score Box with Recharts Trendline & Live Audit Trigger */}
          <motion.div variants={fadeUp} transition={transition} className="md:col-span-5 flex flex-col justify-between p-7 rounded-xl border border-[#E8E8E6] bg-white shadow-xs">
            <div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-7xl font-light tracking-tighter text-[#1A1A1A]">
                  <AnimatedCounter from={0} to={78} duration={0.9} isInView={isInView} />
                </span>
                <span className="text-2xl text-[#9B9B9B] font-light">/100</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-[#1A1A1A]">AI Visibility Score</span>
                <Info className="w-3.5 h-3.5 text-[#9B9B9B]" />
              </div>
              <p className="text-xs text-[#6B6B6B] mb-5">Overall visibility across tracked buyer prompts</p>
            </div>

            {/* Recharts 30-Day Trendline */}
            <div className="pt-4 border-t border-[#F0F0EE]">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#9B9B9B] font-mono uppercase tracking-wider text-[10px]">30-Day Velocity</span>
                <span className="inline-flex items-center gap-1 font-mono text-emerald-600 font-semibold">
                  <TrendingUp className="w-3 h-3" />
                  +24 pts
                </span>
              </div>
              <div className="h-16 w-full mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1A1A1A" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#1A1A1A" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1A1A1A', borderRadius: '6px', color: '#fff', fontSize: '11px', border: 'none' }}
                      itemStyle={{ color: '#E8B400' }}
                      formatter={(value: any) => [`${value} / 100`, 'Score']}
                      labelFormatter={() => ''}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#1A1A1A" 
                      strokeWidth={1.5} 
                      fillOpacity={1} 
                      fill="url(#scoreGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Action Button */}
              {onOpenScan && (
                <button
                  type="button"
                  onClick={onOpenScan}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#1A1A1A] hover:bg-black text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Audit Your Brand Score</span>
                  <span className="text-amber-400">&rarr;</span>
                </button>
              )}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} transition={transition} className="md:col-span-7 flex flex-col justify-center">
            <div className="flex flex-wrap sm:flex-nowrap gap-x-8 gap-y-6 mb-10 py-4 border-y border-[#E8E8E6]">
              <div className="flex flex-col gap-1 w-full sm:w-auto flex-1">
                <span className="text-[11px] font-mono text-[#9B9B9B] uppercase tracking-wider">Recommendation Rate</span>
                <span className="text-xl font-medium">64%</span>
              </div>
              <div className="hidden sm:block w-[1px] bg-[#E8E8E6]"></div>
              <div className="flex flex-col gap-1 w-full sm:w-auto flex-1">
                <span className="text-[11px] font-mono text-[#9B9B9B] uppercase tracking-wider">Citation Coverage</span>
                <span className="text-xl font-medium">72%</span>
              </div>
              <div className="hidden sm:block w-[1px] bg-[#E8E8E6]"></div>
              <div className="flex flex-col gap-1 w-full sm:w-auto flex-1">
                <span className="text-[11px] font-mono text-[#9B9B9B] uppercase tracking-wider">Competitive Position</span>
                <span className="text-xl font-medium">#2 <span className="text-sm text-[#6B6B6B] font-normal">of 18</span></span>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#1A1A1A]">ChatGPT</span>
                  <span className="text-[#6B6B6B] font-mono">82%</span>
                </div>
                <div className="w-full h-2 bg-[#F0F0EE] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={isInView ? { width: '82%' } : { width: 0 }} 
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-[#1A1A1A] rounded-full"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#1A1A1A]">Gemini</span>
                  <span className="text-[#6B6B6B] font-mono">71%</span>
                </div>
                <div className="w-full h-2 bg-[#F0F0EE] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={isInView ? { width: '71%' } : { width: 0 }} 
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-[#1A1A1A] rounded-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#1A1A1A]">AI Overviews</span>
                  <span className="text-[#6B6B6B] font-mono">68%</span>
                </div>
                <div className="w-full h-2 bg-[#F0F0EE] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={isInView ? { width: '68%' } : { width: 0 }} 
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-[#1A1A1A] rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
