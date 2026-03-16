import React from 'react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className, glow = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl",
        glow && "shadow-[0_0_20px_rgba(0,242,255,0.1)] border-cyan-500/20",
        className
      )}
    >
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="relative z-10 p-6">
        {children}
      </div>
    </motion.div>
  );
};

interface GlowTextProps {
  children: React.ReactNode;
  className?: string;
  color?: 'cyan' | 'blue' | 'purple';
}

export const GlowText: React.FC<GlowTextProps> = ({ children, className, color = 'cyan' }) => {
  const shadowColor = {
    cyan: 'shadow-cyan-500/50',
    blue: 'shadow-blue-500/50',
    purple: 'shadow-purple-500/50',
  }[color];

  const textColor = {
    cyan: 'text-cyan-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
  }[color];

  return (
    <span className={cn(textColor, "drop-shadow-[0_0_8px_rgba(0,242,255,0.5)]", className)}>
      {children}
    </span>
  );
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'info' }) => {
  const styles = {
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    error: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    info: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  }[variant];

  return (
    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border", styles)}>
      {children}
    </span>
  );
};
