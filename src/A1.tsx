import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Calendar, 
  Users, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  FileText,
  TrendingUp,
  BarChart3,
  Layout,
  KanbanSquare,
  ListTodo,
  Settings,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Tag,
  Paperclip,
  Menu,
  Home,
  FolderKanban,
  CalendarDays,
  ListChecks,
  Users2,
  FileBarChart
} from 'lucide-react';
import { Task, TeamMember, NewTask, Stats } from '../types/types';
import { statusConfig, priorityConfig, projects } from '../constants/constants';
import TaskCard from './TaskCard';

interface PageProps {
  tasks: Task[];
  teamMembers: TeamMember[];
  stats: Stats;
  showNewTaskDialog: boolean;
  setShowNewTaskDialog: (show: boolean) => void;
  newTask: NewTask;
  setNewTask: (task: NewTask) => void;
  handleCreateTask: () => void;
  selectedProject: string;
  setSelectedProject: (project: string) => void;
  draggedTask: Task | null;
  handleDragStart: (e: React.DragEvent, task: Task) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, status: string) => void;
  handleDragEnd: () => void;
  getTasksByStatus: (status: string) => Task[];
  getDaysUntilDue: (dueDate: string) => number;
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  getDaysInMonth: (date: Date) => (Date | null)[];
  getTasksForDay: (date: Date | null) => Task[];
  formatMonthYear: (date: Date) => string;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  goToToday: () => void;
  isToday: (date: Date | null) => boolean;
  isCurrentMonth: (date: Date | null) => boolean;
}

export const Dashboard: React.FC<PageProps> = ({ tasks, stats, showNewTaskDialog, setShowNewTaskDialog, newTask, setNewTask, handleCreateTask, getDaysUntilDue }) => (
  <div className="space-y-6">
    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <ListTodo className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pendentes</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg">
              <Clock className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Em Andamento</p>
              <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Concluídos</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Atrasados</p>
              <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Quick Actions */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Dialog open={showNewTaskDialog} onOpenChange={setShowNewTaskDialog}>
            <Dialog