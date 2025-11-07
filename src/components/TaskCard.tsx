import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, FileText, Paperclip, Tag, MoreVertical } from 'lucide-react';
import type { Task } from '@/types/types';
import { priorityConfig } from '@/constants/constants';

interface TaskCardProps {
  task: Task;
  draggedTask: Task | null;
  handleDragStart: (e: React.DragEvent, task: Task) => void;
  handleDragEnd: () => void;
  getDaysUntilDue: (dueDate: string) => number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, draggedTask, handleDragStart, handleDragEnd, getDaysUntilDue }) => {
  const daysUntil = getDaysUntilDue(task.dueDate);
  const isOverdue = daysUntil < 0 && task.status !== 'concluido';
  
  return (
    <Card 
      className={`border border-gray-200 shadow-md hover:shadow-lg transition-all cursor-move bg-white ${
        draggedTask?.id === task.id ? 'opacity-50 rotate-2 scale-105' : ''
      }`}
      draggable
      onDragStart={(e) => handleDragStart(e, task)}
      onDragEnd={handleDragEnd}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h4 className="font-semibold text-sm text-gray-900 flex-1 pr-2">
              {task.title}
            </h4>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-xs text-gray-600 line-clamp-2">
            {task.description}
          </p>

          <div className="flex flex-wrap gap-1">
            {task.tags.map((tag, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center space-x-2">
              <Users className="h-3 w-3" />
              <span>{task.client}</span>
            </div>
            <Badge className={priorityConfig[task.priority].color}>
              {priorityConfig[task.priority].label}
            </Badge>
          </div>

          {task.progress > 0 && task.status !== 'concluido' && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-600">
                <span>Progresso</span>
                <span>{task.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-blue-600 h-1.5 rounded-full transition-all"
                  style={{ width: `${task.progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-3 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Paperclip className="h-3 w-3" />
                <span>{task.attachments}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FileText className="h-3 w-3" />
                <span>{task.comments}</span>
              </div>
            </div>
            <div className={`flex items-center space-x-1 text-xs ${isOverdue ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
              <Calendar className="h-3 w-3" />
              <span>
                {isOverdue 
                  ? `${Math.abs(daysUntil)}d atrasado`
                  : daysUntil === 0 
                    ? 'Hoje' 
                    : `${daysUntil}d`
                }
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 text-xs">
            <span className="text-gray-600">{task.assignee}</span>
            <div className="h-6 w-6 rounded-full bg-linear-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white text-xs font-semibold">
              {task.assignee.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;