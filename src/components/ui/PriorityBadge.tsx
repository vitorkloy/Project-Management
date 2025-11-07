import React from 'react';
import { Badge } from '@/components/ui/badge';
import { priorityConfig } from '@/constants/constants';

interface PriorityBadgeProps {
  priority: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const config = priorityConfig[priority as keyof typeof priorityConfig] as { label: string; color: string };
  if (!config) return null;

  return (
    <Badge className={config.color}>
      {config.label}
    </Badge>
  );
};