import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Filter } from 'lucide-react';
import type { Task, NewTask } from '@/types/types';
import { statusConfig, priorityConfig, projects } from '@/constants/constants';
import { NewTaskForm } from '@/components/NewTaskForm';

interface ListViewProps {
  tasks: Task[];
  selectedProject: string;
  setSelectedProject: (project: string) => void;
  getDaysUntilDue: (dueDate: string) => number;
  showNewTaskDialog: boolean;
  setShowNewTaskDialog: (open: boolean) => void;
  onCreateTask: (task: NewTask) => void;
}

export const ListView = ({
  tasks,
  selectedProject,
  setSelectedProject,
  getDaysUntilDue,
  showNewTaskDialog,
  setShowNewTaskDialog,
  onCreateTask
}: ListViewProps) => {
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

            <Button variant="outline" size="sm" className="bg-white border border-gray-200 shadow-md hover:shadow-lg">
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

      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tarefa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prioridade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Responsável</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prazo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progresso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tasks.map(task => {
                const daysUntil = getDaysUntilDue(task.dueDate);
                const isOverdue = daysUntil < 0 && task.status !== 'concluido';
                
                return (
                  <tr key={task.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{task.title}</div>
                        <div className="text-sm text-gray-500 mt-1">{task.description}</div>
                        <div className="flex gap-1 mt-2">
                          {task.tags.map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={statusConfig[task.status].color}>
                        {statusConfig[task.status].label}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={priorityConfig[task.priority].color}>
                        {priorityConfig[task.priority].label}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{task.client}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-linear-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white text-xs font-semibold">
                          {task.assignee.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm text-gray-900">{task.assignee}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-sm ${isOverdue ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                        {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                        {isOverdue && <div className="text-xs">({Math.abs(daysUntil)}d atrasado)</div>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${task.status === 'concluido' ? 'bg-green-600' : 'bg-blue-600'}`}
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{task.progress}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
