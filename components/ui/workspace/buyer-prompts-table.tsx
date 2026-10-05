'use client'

import React, { useRef, useState, useMemo } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Check, Minus, ArrowRight, Bot, Sparkles, Search, ArrowUpDown, ChevronDown } from 'lucide-react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
} from '@tanstack/react-table'
import { toast } from 'sonner'

export type PromptRecord = {
  id: string
  prompt: string
  engine: 'ChatGPT' | 'Gemini' | 'AI Overviews'
  recommended: boolean
  position: string
  cited: boolean
  time: string
}

const defaultPromptsData: PromptRecord[] = [
  { id: '1', prompt: "Best accounting software for small business", engine: "ChatGPT", recommended: true, position: "#2", cited: true, time: "2h ago" },
  { id: '2', prompt: "Top CRM tools for startups 2025", engine: "Gemini", recommended: true, position: "#1", cited: true, time: "4h ago" },
  { id: '3', prompt: "Most affordable project management tools", engine: "ChatGPT", recommended: false, position: "—", cited: false, time: "1h ago" },
  { id: '4', prompt: "Best HR software for remote teams", engine: "AI Overviews", recommended: true, position: "#3", cited: true, time: "6h ago" },
  { id: '5', prompt: "Enterprise data analytics platforms", engine: "ChatGPT", recommended: true, position: "#4", cited: false, time: "3h ago" },
  { id: '6', prompt: "Best email marketing tools for ecommerce", engine: "Gemini", recommended: false, position: "—", cited: false, time: "5h ago" },
  { id: '7', prompt: "Top customer support software", engine: "AI Overviews", recommended: true, position: "#1", cited: true, time: "1h ago" },
  { id: '8', prompt: "Best inventory management software", engine: "ChatGPT", recommended: true, position: "#2", cited: true, time: "8h ago" },
]

function getEngineIcon(engine: string) {
  switch (engine) {
    case 'ChatGPT': return <Bot className="w-3.5 h-3.5 text-[#6B6B6B]" />
    case 'Gemini': return <Sparkles className="w-3.5 h-3.5 text-[#6B6B6B]" />
    case 'AI Overviews': return <Search className="w-3.5 h-3.5 text-[#6B6B6B]" />
    default: return null
  }
}

export function BuyerPromptsTable() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const prefersReducedMotion = useReducedMotion()

  const [sorting, setSorting] = useState<SortingState>([])
  const [engineFilter, setEngineFilter] = useState<string>('All')

  const columnHelper = createColumnHelper<PromptRecord>()

  const columns = useMemo(() => [
    columnHelper.accessor('prompt', {
      header: 'Prompt',
      cell: info => (
        <span 
          className="text-[#1A1A1A] font-medium max-w-[280px] block truncate cursor-pointer hover:underline"
          title={info.getValue()}
          onClick={() => {
            navigator.clipboard?.writeText(info.getValue())
            toast.success('Prompt copied to clipboard', {
              description: info.getValue(),
            })
          }}
        >
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('engine', {
      header: 'Engine',
      cell: info => (
        <div className="flex items-center gap-2">
          {getEngineIcon(info.getValue())}
          <span className="text-[#6B6B6B]">{info.getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor('recommended', {
      header: 'Recommended',
      cell: info => (
        info.getValue() ? (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[#1A1A1A] font-medium">Yes</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-400"></div>
            <span className="text-[#6B6B6B]">No</span>
          </div>
        )
      ),
    }),
    columnHelper.accessor('position', {
      header: 'Position',
      cell: info => (
        <span className={info.getValue() !== "—" ? "text-[#1A1A1A] font-mono font-medium" : "text-[#9B9B9B]"}>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('cited', {
      header: () => <div className="text-center">Cited</div>,
      cell: info => (
        <div className="flex justify-center">
          {info.getValue() ? (
            <Check className="w-4 h-4 text-emerald-600" strokeWidth={2.5} />
          ) : (
            <Minus className="w-4 h-4 text-[#D0D0CE]" />
          )}
        </div>
      ),
    }),
    columnHelper.accessor('time', {
      header: () => <div className="text-right">Last checked</div>,
      cell: info => (
        <div className="text-right text-[#9B9B9B] text-xs font-mono">
          {info.getValue()}
        </div>
      ),
    }),
  ], [columnHelper])

  const filteredData = useMemo(() => {
    if (engineFilter === 'All') return defaultPromptsData
    return defaultPromptsData.filter(d => d.engine === engineFilter)
  }, [engineFilter])

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const fadeUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 15 },
    visible: { opacity: 1, y: 0 }
  }
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  }

  const transition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }

  return (
    <section className="bg-[#FAFAF8] w-full py-20 sm:py-24 px-6 text-[#1A1A1A]">
      <motion.div 
        ref={ref}
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-5xl mx-auto flex flex-col"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <motion.div variants={fadeUp} transition={transition}>
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#9B9B9B] mb-3">Prompts</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1A1A1A] mb-3">What buyers are asking AI</h2>
            <p className="text-base text-[#6B6B6B] max-w-xl leading-relaxed">
              Real buyer-intent queries monitored across ChatGPT, Gemini, and Google AI Overviews with live recommendation positions.
            </p>
          </motion.div>

          {/* Engine Filter Pills */}
          <motion.div variants={fadeUp} transition={transition} className="flex items-center gap-1.5 p-1 bg-[#EFEFEA] rounded-lg self-start md:self-auto border border-[#E8E8E6]">
            {['All', 'ChatGPT', 'Gemini', 'AI Overviews'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setEngineFilter(tab)
                  toast.info(`Filtered prompts by ${tab}`)
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  engineFilter === tab
                    ? 'bg-white text-[#1A1A1A] shadow-xs font-semibold'
                    : 'text-[#6B6B6B] hover:text-[#1A1A1A]'
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>
        </div>

        {/* TanStack Table Container */}
        <motion.div variants={fadeUp} transition={transition} className="w-full overflow-x-auto rounded-lg border border-[#E8E8E6] bg-white shadow-xs mb-4">
          <table className="w-full min-w-[800px] text-sm text-left">
            <thead className="text-[10px] uppercase font-mono tracking-wider text-[#9B9B9B] border-b border-[#E8E8E6] bg-[#FAFAF8]/70">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th 
                      key={header.id} 
                      className="px-6 py-3.5 font-medium select-none cursor-pointer hover:text-[#1A1A1A] transition-colors"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-1.5">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <ArrowUpDown className="w-3 h-3 text-[#B0B0AE] opacity-60" />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr 
                  key={row.id}
                  onClick={() => {
                    document.getElementById('inspector')?.scrollIntoView({ behavior: 'smooth' });
                    toast.info(`Inspecting "${row.original.prompt}" in AI Answer Inspector ↓`);
                  }}
                  className="border-b border-[#E8E8E6] last:border-0 hover:bg-[#F5F5F3] transition-colors cursor-pointer"
                  title="Click to inspect verbatim AI response below"
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-3.5">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div variants={fadeUp} transition={transition} className="flex items-center justify-between px-2">
          <span className="text-xs text-[#9B9B9B]">Showing {filteredData.length} of 156 tracked buyer queries &bull; Click any row to inspect</span>
          <a 
            href="/console"
            className="text-sm font-semibold text-[#1A1A1A] hover:text-black transition-colors flex items-center gap-1 group"
          >
            <span>Explore all prompts in Console</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
