'use client'

import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown } from 'lucide-react'

export function HeroTransition() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <div className="relative w-full h-40 sm:h-52 bg-gradient-to-b from-[#050505] to-[#FAFAF8] flex items-center justify-center">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center gap-3 mt-12"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#9B9B9B]">Scroll to explore</span>
        <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-[#9B9B9B]/50 to-transparent"></div>
        <ArrowDown className="w-3 h-3 text-[#9B9B9B] animate-bounce" />
      </motion.div>
    </div>
  )
}
