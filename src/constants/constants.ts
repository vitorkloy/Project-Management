import { 
  Home, 
  KanbanSquare, 
  ListChecks, 
  CalendarDays, 
  Users2, 
  FileBarChart,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export const statusConfig = {
  'pendente': { label: 'Pendente', color: 'bg-gray-200 text-gray-700', icon: Clock },
  'em-andamento': { label: 'Em Andamento', color: 'bg-blue-100 text-blue-700', icon: TrendingUp },
  'revisao': { label: 'Em Revisão', color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle },
  'concluido': { label: 'Concluído', color: 'bg-green-100 text-green-700', icon: CheckCircle }
};

export const priorityConfig = {
  'baixa': { label: 'Baixa', color: 'bg-gray-100 text-gray-600' },
  'media': { label: 'Média', color: 'bg-blue-100 text-blue-600' },
  'alta': { label: 'Alta', color: 'bg-orange-100 text-orange-600' },
  'urgente': { label: 'Urgente', color: 'bg-red-100 text-red-600' }
};

export const projects = [
  { id: 'all', name: 'Todos os Projetos' },
  { id: 'fiscal', name: 'Obrigações Fiscais' },
  { id: 'contabil', name: 'Escrituração Contábil' },
  { id: 'dp', name: 'Departamento Pessoal' },
  { id: 'consultoria', name: 'Consultoria' }
];

export const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'kanban', label: 'Kanban', icon: KanbanSquare },
  { id: 'list', label: 'Lista', icon: ListChecks },
  { id: 'calendar', label: 'Calendário', icon: CalendarDays },
  { id: 'team', label: 'Equipe', icon: Users2 },
  { id: 'reports', label: 'Relatórios', icon: FileBarChart },
];