// src/components/views/Dashboard.tsx
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  ListTodo,
  Users2,
  FileBarChart
} from 'lucide-react';
import type { Stats, Task, NewTask } from '@/types/types';
import { NewTaskForm } from '@/components/NewTaskForm';

interface DashboardProps {
  stats: Stats;
  tasks: Task[];
  getDaysUntilDue: (dueDate: string) => number;
  showNewTaskDialog: boolean;
  setShowNewTaskDialog: (open: boolean) => void;
  onCreateTask: (task: NewTask) => void;
}

const cardsData = [
  {
    title: 'Total',
    icon: ListTodo,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
    statKey: 'total'
  },
  {
    title: 'Pendentes',
    icon: Clock,
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-600',
    statKey: 'pending'
  },
  {
    title: 'Em Andamento',
    icon: TrendingUp,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
    statKey: 'inProgress'
  },
  {
    title: 'Concluídos',
    icon: CheckCircle,
    bgColor: 'bg-green-100',
    textColor: 'text-green-600',
    statKey: 'completed'
  },
  {
    title: 'Atrasados',
    icon: AlertCircle,
    bgColor: 'bg-red-100',
    textColor: 'text-red-600',
    statKey: 'overdue'
  }
];

export const Dashboard = ({
  stats,
  tasks,
  getDaysUntilDue,
  showNewTaskDialog,
  setShowNewTaskDialog,
  onCreateTask
}: DashboardProps) => {
  const navigate = useNavigate();

  const urgentTasks = tasks
    .filter((t) => t.priority === 'urgente' || getDaysUntilDue(t.dueDate) < 0)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {cardsData.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.title}
              className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow bg-white"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4 last:mb-0">
                  <div>
                    <p className="text-sm text-gray-600">{card.title}</p>
                    <p
                      className={`text-2xl font-bold ${card.textColor}`}
                    >
                      {stats[card.statKey as keyof Stats]}
                    </p>
                  </div>
                  <div className={`p-3 ${card.bgColor} rounded-lg`}>
                    <Icon className={`h-6 w-6 ${card.textColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Ações Rápidas e Tarefas Urgentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ações Rápidas */}
        <Card className="border border-gray-200 shadow-md bg-white">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* Criar Nova Tarefa */}
            <Dialog open={showNewTaskDialog} onOpenChange={setShowNewTaskDialog}>
              <DialogTrigger asChild>
                <Button className="w-full justify-start bg-linear-to-r text-white from-blue-600 to-cyan-600">
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

            {/* Botões de navegação */}
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => navigate('/team')}
            >
              <Users2 className="h-4 w-4 mr-2" />
              Gerenciar Equipe
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => navigate('/reports')}
            >
              <FileBarChart className="h-4 w-4 mr-2" />
              Ver Relatórios
            </Button>
          </CardContent>
        </Card>

        {/* Tarefas Urgentes */}
        <Card className="border border-gray-200 shadow-md bg-white">
          <CardHeader>
            <CardTitle>Tarefas Urgentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {urgentTasks.length > 0 ? (
                urgentTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200 shadow-sm"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{task.title}</p>
                      <p className="text-xs text-gray-600">{task.client}</p>
                    </div>
                    <Badge className="bg-red-100 text-red-700">Urgente</Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Nenhuma tarefa urgente no momento.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
