import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Filter } from 'lucide-react';
import type { Task, NewTask } from '@/types/types';
import { statusConfig, projects } from '@/constants/constants';
import TaskCard from '@/components/TaskCard';
import { NewTaskForm } from '@/components/NewTaskForm';

interface KanbanProps {
  tasks: Task[];
  selectedProject: string;
  setSelectedProject: (project: string) => void;
  draggedTask: Task | null;
  handleDragStart: (e: React.DragEvent, task: Task) => void;
  handleDragEnd: () => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, status: Task['status']) => void;
  getTasksByStatus: (status: Task['status']) => Task[];
  getDaysUntilDue: (dueDate: string) => number;
  showNewTaskDialog: boolean;
  setShowNewTaskDialog: (open: boolean) => void;
  onCreateTask: (task: NewTask) => void;
}

export const Kanban = ({
  selectedProject,
  setSelectedProject,
  draggedTask,
  handleDragStart,
  handleDragEnd,
  handleDragOver,
  handleDrop,
  getTasksByStatus,
  getDaysUntilDue,
  showNewTaskDialog,
  setShowNewTaskDialog,
  onCreateTask
}: KanbanProps) => {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {projects.map(project => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>

          <Dialog open={showNewTaskDialog} onOpenChange={setShowNewTaskDialog}>
            <DialogTrigger asChild>
              <Button className="bg-linear-to-r text-white from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <Plus className="h-4 w-4 mr-2" />
                Nova Tarefa
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader className="text-left">
                <DialogTitle>Criar Nova Tarefa</DialogTitle>
              </DialogHeader>
              <NewTaskForm 
                onClose={() => setShowNewTaskDialog(false)}
                onSubmit={onCreateTask}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Object.entries(statusConfig).map(([status, config]) => {
          const StatusIcon = config.icon;
          return (
            <div 
              key={status} 
              className="bg-gray-50 rounded-lg p-4"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status as Task['status'])}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <StatusIcon className="h-5 w-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">{config.label}</h3>
                  <Badge variant="secondary" className="ml-2">
                    {getTasksByStatus(status as Task['status']).length}
                  </Badge>
                </div>
              </div>
              <div className="space-y-3 min-h-[200px]">
                {getTasksByStatus(status as Task['status']).map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    draggedTask={draggedTask}
                    handleDragStart={handleDragStart}
                    handleDragEnd={handleDragEnd}
                    getDaysUntilDue={getDaysUntilDue}
                  />
                ))}
                {getTasksByStatus(status as Task['status']).length === 0 && (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    Arraste tarefas para cá
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
