export type Task = {
  id: number;
  title: string;
  description: string;
  status: 'pendente' | 'em-andamento' | 'revisao' | 'concluido';
  priority: 'baixa' | 'media' | 'alta' | 'urgente';
  client: string;
  assignee: string;
  dueDate: string;
  tags: string[];
  progress: number;
  attachments: number;
  comments: number;
};

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  status: 'ativo' | 'ferias';
  tasksCompleted: number;
  tasksInProgress: number;
  specialties: string[];
  joinDate: string;
  productivity: number;
};

export type NewTask = {
  title: string;
  description: string;
  client: string;
  assignee: string;
  priority: 'baixa' | 'media' | 'alta' | 'urgente';
  dueDate: string;
  tags: string[];
};

export type Stats = {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  overdue: number;
};