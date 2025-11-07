import React from 'react';
import { Badge } from '@/components/ui/badge';
import { statusConfig } from '@/constants/constants';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status as keyof typeof statusConfig] as { label: string; color: string };
  if (!config) return null;

  return (
    <Badge className={config.color}>
      {config.label}
    </Badge>
  );
};