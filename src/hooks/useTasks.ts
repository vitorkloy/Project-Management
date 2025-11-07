import { useState } from 'react';
import type { Task, NewTask } from '@/types/types';

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Escrituração Contábil - Janeiro 2025',
    description: 'Realizar lançamentos contábeis do mês de janeiro',
    status: 'em-andamento',
    priority: 'alta',
    client: 'Empresa ABC Ltda',
    assignee: 'Maria Silva',
    dueDate: '2025-01-30',
    tags: ['Escrituração', 'Mensal'],
    progress: 60,
    attachments: 3,
    comments: 5
  },
  {
    id: 2,
    title: 'Declaração IRPF 2025',
    description: 'Preparar e entregar declaração de IR pessoa física',
    status: 'pendente',
    priority: 'alta',
    client: 'João Santos',
    assignee: 'Carlos Oliveira',
    dueDate: '2025-04-30',
    tags: ['Fiscal', 'IRPF'],
    progress: 0,
    attachments: 1,
    comments: 2
  },
  {
    id: 3,
    title: 'Folha de Pagamento',
    description: 'Processar folha de pagamento mensal',
    status: 'em-andamento',
    priority: 'urgente',
    client: 'Tech Solutions SA',
    assignee: 'Ana Costa',
    dueDate: '2025-01-25',
    tags: ['DP', 'Mensal'],
    progress: 45,
    attachments: 2,
    comments: 8
  },
  {
    id: 4,
    title: 'Apuração ICMS',
    description: 'Calcular e apurar ICMS do período',
    status: 'revisao',
    priority: 'media',
    client: 'Comércio XYZ',
    assignee: 'Pedro Santos',
    dueDate: '2025-02-10',
    tags: ['Fiscal', 'ICMS'],
    progress: 90,
    attachments: 4,
    comments: 3
  },
  {
    id: 5,
    title: 'Balanço Patrimonial Q4',
    description: 'Elaborar balanço do 4º trimestre',
    status: 'concluido',
    priority: 'alta',
    client: 'Indústria Beta',
    assignee: 'Maria Silva',
    dueDate: '2025-01-15',
    tags: ['Contábil', 'Balanço'],
    progress: 100,
    attachments: 6,
    comments: 12
  },
  {
    id: 6,
    title: 'Planejamento Tributário 2025',
    description: 'Desenvolver estratégia tributária anual',
    status: 'pendente',
    priority: 'media',
    client: 'Empresa ABC Ltda',
    assignee: 'Carlos Oliveira',
    dueDate: '2025-02-28',
    tags: ['Planejamento', 'Tributário'],
    progress: 0,
    attachments: 0,
    comments: 1
  }
];

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const createTask = (newTask: NewTask) => {
    const task: Task = {
      id: tasks.length + 1,
      ...newTask,
      status: 'pendente',
      progress: 0,
      attachments: 0,
      comments: 0
    };
    setTasks([...tasks, task]);
  };

  const updateTaskStatus = (taskId: number, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus, progress: newStatus === 'concluido' ? 100 : task.progress }
        : task
    ));
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDrop = (newStatus: Task['status']) => {
    if (draggedTask) {
      updateTaskStatus(draggedTask.id, newStatus);
      setDraggedTask(null);
    }
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime() as number;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTasksForDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return tasks.filter(task => task.dueDate === dateStr);
  };

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pendente').length,
    inProgress: tasks.filter(t => t.status === 'em-andamento').length,
    completed: tasks.filter(t => t.status === 'concluido').length,
    overdue: tasks.filter(t => getDaysUntilDue(t.dueDate) < 0 && t.status !== 'concluido').length
  };

  return {
    tasks,
    draggedTask,
    stats,
    createTask,
    updateTaskStatus,
    handleDragStart,
    handleDrop,
    handleDragEnd,
    getTasksByStatus,
    getDaysUntilDue,
    getTasksForDay
  };
};

