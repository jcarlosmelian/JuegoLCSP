
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  label: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, label }) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full my-4">
      <div className="flex justify-between mb-1 text-sm font-medium text-slate-300">
        <span>{label}</span>
        <span>{current} / {total}</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2.5">
        <div
          className="bg-sky-500 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
