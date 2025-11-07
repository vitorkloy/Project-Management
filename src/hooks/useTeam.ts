import { useState } from 'react';
import type { TeamMember } from '@/types/types';

const initialTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Maria Silva',
    role: 'Contadora Sênior',
    email: 'maria.silva@contaflow.com',
    phone: '(12) 98765-4321',
    avatar: 'MS',
    status: 'ativo',
    tasksCompleted: 45,
    tasksInProgress: 3,
    specialties: ['Escrituração', 'Balanços'],
    joinDate: '2020-03-15',
    productivity: 95
  },
  {
    id: 2,
    name: 'Carlos Oliveira',
    role: 'Analista Fiscal',
    email: 'carlos.oliveira@contaflow.com',
    phone: '(12) 98765-4322',
    avatar: 'CO',
    status: 'ativo',
    tasksCompleted: 38,
    tasksInProgress: 2,
    specialties: ['IRPF', 'Planejamento Tributário'],
    joinDate: '2021-06-20',
    productivity: 88
  },
  {
    id: 3,
    name: 'Ana Costa',
    role: 'Analista de DP',
    email: 'ana.costa@contaflow.com',
    phone: '(12) 98765-4323',
    avatar: 'AC',
    status: 'ativo',
    tasksCompleted: 52,
    tasksInProgress: 4,
    specialties: ['Folha de Pagamento', 'eSocial'],
    joinDate: '2019-09-10',
    productivity: 92
  },
  {
    id: 4,
    name: 'Pedro Santos',
    role: 'Contador Júnior',
    email: 'pedro.santos@contaflow.com',
    phone: '(12) 98765-4324',
    avatar: 'PS',
    status: 'ativo',
    tasksCompleted: 28,
    tasksInProgress: 5,
    specialties: ['Fiscal', 'ICMS'],
    joinDate: '2022-11-05',
    productivity: 78
  },
  {
    id: 5,
    name: 'Juliana Alves',
    role: 'Assistente Contábil',
    email: 'juliana.alves@contaflow.com',
    phone: '(12) 98765-4325',
    avatar: 'JA',
    status: 'ferias',
    tasksCompleted: 15,
    tasksInProgress: 0,
    specialties: ['Lançamentos', 'Conciliação'],
    joinDate: '2023-04-18',
    productivity: 82
  }
];

export const useTeam = () => {
  const [teamMembers] = useState<TeamMember[]>(initialTeamMembers);

  const teamStats = {
    total: teamMembers.length,
    active: teamMembers.filter(m => m.status === 'ativo').length,
    averageProductivity: Math.round(teamMembers.reduce((acc, m) => acc + m.productivity, 0) / teamMembers.length),
    totalTasksInProgress: teamMembers.reduce((acc, m) => acc + m.tasksInProgress, 0)
  };

  return {
    teamMembers,
    teamStats
  };
};

