/**
 * Loading skeleton components.
 * Provides shimmer animation placeholders for cards, text, and charts.
 */
import React from 'react';

/** Base skeleton element with shimmer animation */
const SkeletonBase: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-white/[0.04] rounded-xl ${className}`} />
);

/** Card skeleton placeholder */
export const CardSkeleton: React.FC = () => (
  <div className="glass-panel p-6 rounded-3xl border border-white/[0.04] space-y-4">
    <SkeletonBase className="h-4 w-1/3" />
    <SkeletonBase className="h-3 w-2/3" />
    <SkeletonBase className="h-20 w-full" />
    <div className="flex gap-3">
      <SkeletonBase className="h-8 w-20 rounded-lg" />
      <SkeletonBase className="h-8 w-20 rounded-lg" />
    </div>
  </div>
);

/** Wide card skeleton (for charts) */
export const ChartSkeleton: React.FC = () => (
  <div className="glass-panel p-6 rounded-3xl border border-white/[0.04] space-y-4">
    <div className="flex justify-between items-center">
      <SkeletonBase className="h-4 w-40" />
      <SkeletonBase className="h-4 w-24" />
    </div>
    <SkeletonBase className="h-64 w-full rounded-2xl" />
  </div>
);

/** Table row skeleton */
export const TableRowSkeleton: React.FC = () => (
  <div className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.03]">
    <SkeletonBase className="h-10 w-10 rounded-lg flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <SkeletonBase className="h-3 w-3/4" />
      <SkeletonBase className="h-2 w-1/2" />
    </div>
    <SkeletonBase className="h-6 w-16 rounded-full" />
  </div>
);

/** Profile skeleton */
export const ProfileSkeleton: React.FC = () => (
  <div className="space-y-8">
    <div className="glass-panel p-8 rounded-3xl border border-white/[0.04] flex items-center gap-6">
      <SkeletonBase className="h-24 w-24 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <SkeletonBase className="h-6 w-48" />
        <SkeletonBase className="h-3 w-64" />
        <SkeletonBase className="h-3 w-36" />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="glass-panel p-6 rounded-3xl border border-white/[0.04] space-y-3">
          <SkeletonBase className="h-3 w-24" />
          <SkeletonBase className="h-10 w-full rounded-lg" />
        </div>
      ))}
    </div>
  </div>
);

/** Dashboard grid skeleton */
export const DashboardSkeleton: React.FC = () => (
  <div className="space-y-8">
    <SkeletonBase className="h-36 w-full rounded-3xl" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => <CardSkeleton key={i} />)}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <ChartSkeleton />
      <ChartSkeleton />
    </div>
  </div>
);

export default {
  CardSkeleton,
  ChartSkeleton,
  TableRowSkeleton,
  ProfileSkeleton,
  DashboardSkeleton,
};
