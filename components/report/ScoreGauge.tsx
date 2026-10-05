'use client';

import React, { useId } from 'react';

interface ScoreGaugeProps {
  score: number;
  grade?: string;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  color?: string;
}

export function ScoreGauge({
  score,
  grade,
  size = 140,
  strokeWidth = 10,
  label,
  sublabel,
  color,
}: ScoreGaugeProps) {
  const uniqueId = useId().replace(/:/g, '');
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.max(0, Math.min(100, score));
  const progressOffset = circumference - (clampedScore / 100) * circumference;

  // Determine dynamic color palette & gradient stops based on score
  const isHigh = score >= 80;
  const isMedium = score >= 50;
  const isLow = score >= 25;

  const startColor = color || (isHigh ? '#10b981' : isMedium ? '#f59e0b' : isLow ? '#f97316' : '#ef4444');
  const endColor = color || (isHigh ? '#34d399' : isMedium ? '#fbbf24' : isLow ? '#fb923c' : '#f87171');
  const glowColor = color || (isHigh ? 'rgba(16, 185, 129, 0.4)' : isMedium ? 'rgba(245, 158, 11, 0.4)' : 'rgba(239, 68, 68, 0.4)');

  return (
    <div className="flex flex-col items-center justify-center text-center select-none">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90 overflow-visible"
        >
          <defs>
            <linearGradient id={`gauge-grad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={startColor} />
              <stop offset="100%" stopColor={endColor} />
            </linearGradient>
            <filter id={`gauge-glow-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer subtle decorative ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius + strokeWidth / 2 + 3}
            fill="none"
            stroke="rgba(255, 255, 255, 0.04)"
            strokeWidth={1}
            strokeDasharray="3 3"
          />

          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.07)"
            strokeWidth={strokeWidth}
          />

          {/* Progress fill with glowing gradient */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#gauge-grad-${uniqueId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
            filter={`url(#gauge-glow-${uniqueId})`}
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none font-mono drop-shadow-md">
            {score}
          </span>
          {grade ? (
            <span
              className="mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-sm transition-all"
              style={{
                backgroundColor: `${startColor}15`,
                color: endColor,
                border: `1px solid ${startColor}40`,
                boxShadow: `0 0 10px ${glowColor}`,
              }}
            >
              Grade {grade}
            </span>
          ) : (
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mt-0.5">
              / 100
            </span>
          )}
        </div>
      </div>

      {label && (
        <span className="mt-3.5 text-xs font-bold uppercase tracking-wider text-slate-200">
          {label}
        </span>
      )}
      {sublabel && (
        <span className="text-[11px] text-slate-400 font-medium mt-0.5 max-w-[140px] leading-tight">
          {sublabel}
        </span>
      )}
    </div>
  );
}
