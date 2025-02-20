// src/components/EmptyState.tsx
import React from 'react';
import { cn } from '@/utils/tailwind.ts';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, message, icon }) => (
  <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center')}>
    {icon && <div className="mb-4 text-gray-400">{icon}</div>}
    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-500">{message}</p>
  </div>
);