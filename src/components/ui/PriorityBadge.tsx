import React from 'react';
import { Badge } from '@/components/ui/badge';
import { priorityConfig } from '@/utils/constants';

interface PriorityBadgeProps {
  priority: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const config = priorityConfig[priority];
  if (!config) return null;

  return (
    <Badge className={config.color}>
      {config.label}
    </Badge>
  );
};